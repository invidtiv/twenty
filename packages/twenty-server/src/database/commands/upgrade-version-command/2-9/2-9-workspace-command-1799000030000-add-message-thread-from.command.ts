import { Command } from 'nest-commander';
import { STANDARD_OBJECTS } from 'twenty-shared/metadata';
import { isDefined } from 'twenty-shared/utils';

import { ActiveOrSuspendedWorkspaceCommandRunner } from 'src/database/commands/command-runners/active-or-suspended-workspace.command-runner';
import { WorkspaceIteratorService } from 'src/database/commands/command-runners/workspace-iterator.service';
import { type RunOnWorkspaceArgs } from 'src/database/commands/command-runners/workspace.command-runner';
import { ApplicationService } from 'src/engine/core-modules/application/application.service';
import { RegisteredWorkspaceCommand } from 'src/engine/core-modules/upgrade/decorators/registered-workspace-command.decorator';
import { findFlatEntityByUniversalIdentifier } from 'src/engine/metadata-modules/flat-entity/utils/find-flat-entity-by-universal-identifier.util';
import { type FlatObjectMetadata } from 'src/engine/metadata-modules/flat-object-metadata/types/flat-object-metadata.type';
import { type FlatView } from 'src/engine/metadata-modules/flat-view/types/flat-view.type';
import { WorkspaceCacheService } from 'src/engine/workspace-cache/services/workspace-cache.service';
import { getWorkspaceSchemaName } from 'src/engine/workspace-datasource/utils/get-workspace-schema-name.util';
import { computeTwentyStandardApplicationAllFlatEntityMaps } from 'src/engine/workspace-manager/twenty-standard-application/utils/twenty-standard-application-all-flat-entity-maps.constant';
import { WorkspaceMigrationValidateBuildAndRunService } from 'src/engine/workspace-manager/workspace-migration/services/workspace-migration-validate-build-and-run-service';
import { type UniversalFlatFieldMetadata } from 'src/engine/workspace-manager/workspace-migration/universal-flat-entity/types/universal-flat-field-metadata.type';
import { type UniversalFlatViewField } from 'src/engine/workspace-manager/workspace-migration/universal-flat-entity/types/universal-flat-view-field.type';

const MESSAGE_THREAD_OBJECT_UNIVERSAL_IDENTIFIER =
  STANDARD_OBJECTS.messageThread.universalIdentifier;
const MESSAGE_THREAD_FROM_FIELD_UNIVERSAL_IDENTIFIER =
  STANDARD_OBJECTS.messageThread.fields.messageFrom.universalIdentifier;
const MESSAGE_THREAD_TO_FIELD_UNIVERSAL_IDENTIFIER =
  STANDARD_OBJECTS.messageThread.fields.messageTo.universalIdentifier;
const ALL_MESSAGE_THREADS_VIEW_UNIVERSAL_IDENTIFIER =
  STANDARD_OBJECTS.messageThread.views.allMessageThreads.universalIdentifier;

const DERIVED_THREAD_FIELD_UNIVERSAL_IDENTIFIERS = [
  MESSAGE_THREAD_FROM_FIELD_UNIVERSAL_IDENTIFIER,
  MESSAGE_THREAD_TO_FIELD_UNIVERSAL_IDENTIFIER,
] as const;

@RegisteredWorkspaceCommand('2.9.0', 1799000030000)
@Command({
  name: 'upgrade:2-9:add-message-thread-from',
  description:
    'Add From and To fields to message threads, show From in the default table, and backfill existing threads',
})
export class AddMessageThreadFromCommand extends ActiveOrSuspendedWorkspaceCommandRunner {
  constructor(
    protected readonly workspaceIteratorService: WorkspaceIteratorService,
    private readonly applicationService: ApplicationService,
    private readonly workspaceCacheService: WorkspaceCacheService,
    private readonly workspaceMigrationValidateBuildAndRunService: WorkspaceMigrationValidateBuildAndRunService,
  ) {
    super(workspaceIteratorService);
  }

  override async runOnWorkspace({
    workspaceId,
    dataSource,
    options,
  }: RunOnWorkspaceArgs): Promise<void> {
    if (!dataSource) {
      this.logger.log(`No data source for workspace ${workspaceId}, skipping`);

      return;
    }

    const isDryRun = options.dryRun ?? false;
    const { twentyStandardFlatApplication } =
      await this.applicationService.findWorkspaceTwentyStandardAndCustomApplicationOrThrow(
        { workspaceId },
      );
    const { allFlatEntityMaps: standardAllFlatEntityMaps } =
      computeTwentyStandardApplicationAllFlatEntityMaps({
        now: new Date().toISOString(),
        workspaceId,
        twentyStandardApplicationId: twentyStandardFlatApplication.id,
      });
    const {
      flatObjectMetadataMaps,
      flatFieldMetadataMaps,
      flatViewMaps,
      flatViewFieldMaps,
    } = await this.workspaceCacheService.getOrRecompute(workspaceId, [
      'flatObjectMetadataMaps',
      'flatFieldMetadataMaps',
      'flatViewMaps',
      'flatViewFieldMaps',
    ]);

    const messageThreadObject =
      findFlatEntityByUniversalIdentifier<FlatObjectMetadata>({
        flatEntityMaps: flatObjectMetadataMaps,
        universalIdentifier: MESSAGE_THREAD_OBJECT_UNIVERSAL_IDENTIFIER,
      });

    if (!isDefined(messageThreadObject)) {
      this.logger.log(
        `messageThread object metadata not found for workspace ${workspaceId}, skipping`,
      );

      return;
    }

    const fieldsToCreate = DERIVED_THREAD_FIELD_UNIVERSAL_IDENTIFIERS.map(
      (universalIdentifier) =>
        findFlatEntityByUniversalIdentifier<UniversalFlatFieldMetadata>({
          flatEntityMaps: standardAllFlatEntityMaps.flatFieldMetadataMaps,
          universalIdentifier,
        }),
    )
      .filter(isDefined)
      .filter(
        (standardField) =>
          !isDefined(
            flatFieldMetadataMaps.byUniversalIdentifier[
              standardField.universalIdentifier
            ],
          ),
      );

    for (const fieldToCreate of fieldsToCreate) {
      const conflictingField = Object.values(
        flatFieldMetadataMaps.byUniversalIdentifier,
      )
        .filter(isDefined)
        .find(
          (field) =>
            field.objectMetadataUniversalIdentifier ===
              messageThreadObject.universalIdentifier &&
            field.name === fieldToCreate.name,
        );

      if (isDefined(conflictingField)) {
        throw new Error(
          `Cannot add standard messageThread.${fieldToCreate.name}: field name is already used by ${conflictingField.universalIdentifier}`,
        );
      }
    }

    const existingView = findFlatEntityByUniversalIdentifier<FlatView>({
      flatEntityMaps: flatViewMaps,
      universalIdentifier: ALL_MESSAGE_THREADS_VIEW_UNIVERSAL_IDENTIFIER,
    });
    const standardViewFields = Object.values(
      standardAllFlatEntityMaps.flatViewFieldMaps.byUniversalIdentifier,
    )
      .filter(isDefined)
      .filter(
        (viewField) =>
          viewField.viewUniversalIdentifier ===
          ALL_MESSAGE_THREADS_VIEW_UNIVERSAL_IDENTIFIER,
      );
    const viewFieldsToCreate: UniversalFlatViewField[] = [];
    const viewFieldsToUpdate: UniversalFlatViewField[] = [];

    if (isDefined(existingView)) {
      for (const standardViewField of standardViewFields) {
        const existingViewField =
          flatViewFieldMaps.byUniversalIdentifier[
            standardViewField.universalIdentifier
          ];

        if (!isDefined(existingViewField)) {
          viewFieldsToCreate.push(standardViewField);
          continue;
        }

        if (
          existingViewField.position !== standardViewField.position ||
          existingViewField.size !== standardViewField.size ||
          existingViewField.isVisible !== standardViewField.isVisible
        ) {
          viewFieldsToUpdate.push({
            ...existingViewField,
            position: standardViewField.position,
            size: standardViewField.size,
            isVisible: standardViewField.isVisible,
          });
        }
      }
    }

    this.logger.log(
      `${isDryRun ? '[DRY RUN] ' : ''}Adding ${fieldsToCreate.length} messageThread fields, ${viewFieldsToCreate.length} view fields, and updating ${viewFieldsToUpdate.length} view fields in workspace ${workspaceId}`,
    );

    if (isDryRun) {
      return;
    }

    if (
      fieldsToCreate.length > 0 ||
      viewFieldsToCreate.length > 0 ||
      viewFieldsToUpdate.length > 0
    ) {
      const validateAndBuildResult =
        await this.workspaceMigrationValidateBuildAndRunService.validateBuildAndRunWorkspaceMigration(
          {
            allFlatEntityOperationByMetadataName: {
              fieldMetadata: {
                flatEntityToCreate: fieldsToCreate,
                flatEntityToDelete: [],
                flatEntityToUpdate: [],
              },
              viewField: {
                flatEntityToCreate: viewFieldsToCreate,
                flatEntityToDelete: [],
                flatEntityToUpdate: viewFieldsToUpdate,
              },
            },
            workspaceId,
            applicationUniversalIdentifier:
              twentyStandardFlatApplication.universalIdentifier,
            isSystemBuild: true,
          },
        );

      if (validateAndBuildResult.status === 'fail') {
        throw new Error(
          `Failed to add messageThread From metadata in workspace ${workspaceId}: ${JSON.stringify(validateAndBuildResult, null, 2)}`,
        );
      }
    }

    const schemaName = getWorkspaceSchemaName(workspaceId);
    const result = await dataSource.query(
      `WITH latest_message AS (
         SELECT DISTINCT ON (message."messageThreadId")
           message.id,
           message."messageThreadId"
         FROM "${schemaName}"."message" message
         WHERE message."deletedAt" IS NULL
           AND message."messageThreadId" IS NOT NULL
         ORDER BY
           message."messageThreadId",
           message."receivedAt" DESC NULLS LAST,
           message."createdAt" DESC
       ), thread_participants AS (
         SELECT
           latest_message."messageThreadId",
           string_agg(
             DISTINCT COALESCE(
               NULLIF(trim(participant.handle), ''),
               NULLIF(trim(participant."displayName"), '')
             ),
             ', '
           ) FILTER (WHERE participant.role = 'FROM') AS "messageFrom",
           string_agg(
             DISTINCT COALESCE(
               NULLIF(trim(participant.handle), ''),
               NULLIF(trim(participant."displayName"), '')
             ),
             ', '
           ) FILTER (WHERE participant.role = 'TO') AS "messageTo"
         FROM latest_message
         LEFT JOIN "${schemaName}"."messageParticipant" participant
           ON participant."messageId" = latest_message.id
          AND participant."deletedAt" IS NULL
         GROUP BY latest_message."messageThreadId"
       )
       UPDATE "${schemaName}"."messageThread" thread
       SET
         "messageFrom" = thread_participants."messageFrom",
         "messageTo" = thread_participants."messageTo"
       FROM thread_participants
       WHERE thread.id = thread_participants."messageThreadId"
         AND (
           thread."messageFrom" IS DISTINCT FROM thread_participants."messageFrom"
           OR thread."messageTo" IS DISTINCT FROM thread_participants."messageTo"
         )`,
      undefined,
      undefined,
      { shouldBypassPermissionChecks: true },
    );

    this.logger.log(
      `Backfilled From/To for ${result?.[1] ?? 0} message threads in workspace ${workspaceId}`,
    );
  }
}
