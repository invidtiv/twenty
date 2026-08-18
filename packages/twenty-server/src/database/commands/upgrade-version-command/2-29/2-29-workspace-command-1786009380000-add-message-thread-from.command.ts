import { Command } from 'nest-commander';
import { STANDARD_OBJECTS } from 'twenty-shared/metadata';
import { isDefined } from 'twenty-shared/utils';

import { ProvisionedWorkspaceCommandRunner } from 'src/database/commands/command-runners/provisioned-workspace.command-runner';
import { WorkspaceIteratorService } from 'src/database/commands/command-runners/workspace-iterator.service';
import { type RunOnWorkspaceArgs } from 'src/database/commands/command-runners/workspace.command-runner';
import { ApplicationService } from 'src/engine/core-modules/application/application.service';
import { RegisteredWorkspaceCommand } from 'src/engine/core-modules/upgrade/decorators/registered-workspace-command.decorator';
import { findFlatEntityByUniversalIdentifier } from 'src/engine/metadata-modules/flat-entity/utils/find-flat-entity-by-universal-identifier.util';
import { type FlatFieldMetadata } from 'src/engine/metadata-modules/flat-field-metadata/types/flat-field-metadata.type';
import { type FlatObjectMetadata } from 'src/engine/metadata-modules/flat-object-metadata/types/flat-object-metadata.type';
import { type FlatViewField } from 'src/engine/metadata-modules/flat-view-field/types/flat-view-field.type';
import { WorkspaceCacheService } from 'src/engine/workspace-cache/services/workspace-cache.service';
import { getWorkspaceSchemaName } from 'src/engine/workspace-datasource/utils/get-workspace-schema-name.util';
import { computeTwentyStandardApplicationAllFlatEntityMaps } from 'src/engine/workspace-manager/twenty-standard-application/utils/twenty-standard-application-all-flat-entity-maps.constant';
import { WorkspaceMigrationValidateBuildAndRunService } from 'src/engine/workspace-manager/workspace-migration/services/workspace-migration-validate-build-and-run-service';

const MESSAGE_THREAD = STANDARD_OBJECTS.messageThread;
const MESSAGE_FROM_FIELD_UNIVERSAL_IDENTIFIER =
  MESSAGE_THREAD.fields.messageFrom.universalIdentifier;
const MESSAGE_FROM_VIEW_FIELD_UNIVERSAL_IDENTIFIER =
  MESSAGE_THREAD.views.allMessageThreads.viewFields.messageFrom
    .universalIdentifier;
const ALL_MESSAGE_THREADS_VIEW_UNIVERSAL_IDENTIFIER =
  MESSAGE_THREAD.views.allMessageThreads.universalIdentifier;

@RegisteredWorkspaceCommand('2.29.0', 1786009380000)
@Command({
  name: 'upgrade:2-29:add-message-thread-from',
  description:
    'Add the latest sender to message threads, expose it in the default view, and backfill existing threads',
})
export class AddMessageThreadFromCommand extends ProvisionedWorkspaceCommandRunner {
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
    if (!isDefined(dataSource)) {
      this.logger.log(`No data source for workspace ${workspaceId}, skipping`);

      return;
    }

    const isDryRun = options.dryRun ?? false;
    const {
      flatFieldMetadataMaps,
      flatObjectMetadataMaps,
      flatViewMaps,
      flatViewFieldMaps,
    } = await this.workspaceCacheService.getOrRecompute(workspaceId, [
      'flatFieldMetadataMaps',
      'flatObjectMetadataMaps',
      'flatViewMaps',
      'flatViewFieldMaps',
    ]);

    const messageThreadObject =
      findFlatEntityByUniversalIdentifier<FlatObjectMetadata>({
        flatEntityMaps: flatObjectMetadataMaps,
        universalIdentifier: MESSAGE_THREAD.universalIdentifier,
      });

    if (!isDefined(messageThreadObject)) {
      this.logger.log(
        `Message thread object does not exist for workspace ${workspaceId}, skipping`,
      );

      return;
    }

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

    const fieldsToCreate: FlatFieldMetadata[] = [];

    if (
      !isDefined(
        flatFieldMetadataMaps.byUniversalIdentifier[
          MESSAGE_FROM_FIELD_UNIVERSAL_IDENTIFIER
        ],
      )
    ) {
      const conflictingField = Object.values(
        flatFieldMetadataMaps.byUniversalIdentifier,
      )
        .filter(isDefined)
        .find(
          (field) =>
            field.objectMetadataUniversalIdentifier ===
              messageThreadObject.universalIdentifier &&
            field.name === 'messageFrom',
        );

      if (isDefined(conflictingField)) {
        throw new Error(
          `Cannot add standard messageThread.messageFrom because field name is already used by ${conflictingField.universalIdentifier}`,
        );
      }

      const standardField =
        findFlatEntityByUniversalIdentifier<FlatFieldMetadata>({
          flatEntityMaps: standardAllFlatEntityMaps.flatFieldMetadataMaps,
          universalIdentifier: MESSAGE_FROM_FIELD_UNIVERSAL_IDENTIFIER,
        });

      if (!isDefined(standardField)) {
        throw new Error('Standard application is missing messageThread.From');
      }

      fieldsToCreate.push(standardField);
    }

    const viewFieldsToCreate: FlatViewField[] = [];
    const defaultView =
      flatViewMaps.byUniversalIdentifier[
        ALL_MESSAGE_THREADS_VIEW_UNIVERSAL_IDENTIFIER
      ];

    if (
      isDefined(defaultView) &&
      !isDefined(
        flatViewFieldMaps.byUniversalIdentifier[
          MESSAGE_FROM_VIEW_FIELD_UNIVERSAL_IDENTIFIER
        ],
      )
    ) {
      const standardViewField =
        findFlatEntityByUniversalIdentifier<FlatViewField>({
          flatEntityMaps: standardAllFlatEntityMaps.flatViewFieldMaps,
          universalIdentifier: MESSAGE_FROM_VIEW_FIELD_UNIVERSAL_IDENTIFIER,
        });

      if (!isDefined(standardViewField)) {
        throw new Error(
          'Standard application is missing the messageThread.From view column',
        );
      }

      viewFieldsToCreate.push(standardViewField);
    }

    this.logger.log(
      `${isDryRun ? '[DRY RUN] ' : ''}Workspace ${workspaceId}: ${fieldsToCreate.length} field(s) and ${viewFieldsToCreate.length} view column(s) to create`,
    );

    if (isDryRun) {
      return;
    }

    if (fieldsToCreate.length > 0 || viewFieldsToCreate.length > 0) {
      const result =
        await this.workspaceMigrationValidateBuildAndRunService.validateBuildAndRunWorkspaceMigration(
          {
            isSystemBuild: true,
            workspaceId,
            applicationUniversalIdentifier:
              twentyStandardFlatApplication.universalIdentifier,
            allFlatEntityOperationByMetadataName: {
              fieldMetadata: {
                flatEntityToCreate: fieldsToCreate,
                flatEntityToDelete: [],
                flatEntityToUpdate: [],
              },
              viewField: {
                flatEntityToCreate: viewFieldsToCreate,
                flatEntityToDelete: [],
                flatEntityToUpdate: [],
              },
            },
          },
        );

      if (result.status === 'fail') {
        this.logger.error(
          `Failed to add messageThread.From metadata:\n${JSON.stringify(result, null, 2)}`,
        );

        throw new Error(
          `Failed to add messageThread.From for workspace ${workspaceId}`,
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
       ), thread_sender AS (
         SELECT
           latest_message."messageThreadId",
           COALESCE(
             NULLIF(trim(participant.handle), ''),
             NULLIF(trim(participant."displayName"), '')
           ) AS "messageFrom"
         FROM latest_message
         LEFT JOIN "${schemaName}"."messageParticipant" participant
           ON participant."messageId" = latest_message.id
          AND participant."deletedAt" IS NULL
          AND participant.role = 'FROM'
       )
       UPDATE "${schemaName}"."messageThread" thread
       SET "messageFrom" = thread_sender."messageFrom"
       FROM thread_sender
       WHERE thread.id = thread_sender."messageThreadId"
         AND thread."messageFrom" IS DISTINCT FROM thread_sender."messageFrom"`,
      undefined,
      undefined,
      { shouldBypassPermissionChecks: true },
    );

    this.logger.log(
      `Backfilled From for ${result?.[1] ?? 0} message thread(s) in workspace ${workspaceId}`,
    );
  }
}
