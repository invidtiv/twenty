import { CoreApiClient } from 'twenty-client-sdk/core';

import {
  type FindManyOptions,
  type RecordsRepository,
} from 'src/domain/records-repository';
import { type RecordData, type Selection } from 'src/domain/types';
import { getInternalGraphqlUrl } from 'src/runtime/configure-internal-api-url';

const createCoreApiClient = (): CoreApiClient => {
  const graphqlUrl = getInternalGraphqlUrl(process.env);
  const RuntimeCoreApiClient = CoreApiClient as unknown as new (options?: {
    url?: string;
  }) => CoreApiClient;
  return new RuntimeCoreApiClient(graphqlUrl ? { url: graphqlUrl } : undefined);
};

const capitalize = (value: string): string =>
  value.length === 0 ? value : `${value[0].toUpperCase()}${value.slice(1)}`;

const isRecord = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === 'object' && !Array.isArray(value);

const toRecordData = (value: unknown, context: string): RecordData => {
  if (!isRecord(value) || typeof value.id !== 'string') {
    throw new Error(`${context} did not return a record with an id`);
  }
  return value as RecordData;
};

const extractMutationRecord = (
  result: unknown,
  mutationName: string,
): RecordData => {
  if (!isRecord(result)) throw new Error(`${mutationName} returned no result`);
  const mutationResult = result[mutationName];
  if (Array.isArray(mutationResult)) {
    return toRecordData(mutationResult[0], mutationName);
  }
  return toRecordData(mutationResult, mutationName);
};

const extractConnectionRecords = (
  result: unknown,
  objectNamePlural: string,
): RecordData[] => {
  if (!isRecord(result) || !isRecord(result[objectNamePlural])) return [];
  const edges = result[objectNamePlural].edges;
  if (!Array.isArray(edges)) return [];
  return edges
    .map((edge) => (isRecord(edge) ? edge.node : undefined))
    .filter((node): node is Record<string, unknown> => isRecord(node))
    .map((node) => toRecordData(node, objectNamePlural));
};

const extractMutationRecords = (
  result: unknown,
  mutationName: string,
): RecordData[] => {
  if (!isRecord(result) || !Array.isArray(result[mutationName])) return [];
  return result[mutationName].map((record) => toRecordData(record, mutationName));
};

export class CoreApiRecordsRepository implements RecordsRepository {
  private readonly client = createCoreApiClient();

  async upsert(
    objectNamePlural: string,
    data: Record<string, unknown>,
    selection: Selection = { id: true },
  ): Promise<RecordData> {
    const mutationName = `create${capitalize(objectNamePlural)}`;
    const result: unknown = await this.client.mutation({
      [mutationName]: {
        __args: { data: [data], upsert: true },
        ...selection,
      },
    });
    return extractMutationRecord(result, mutationName);
  }

  async update(
    objectNameSingular: string,
    recordId: string,
    data: Record<string, unknown>,
    selection: Selection = { id: true },
  ): Promise<RecordData> {
    const mutationName = `update${capitalize(objectNameSingular)}`;
    const result: unknown = await this.client.mutation({
      [mutationName]: {
        __args: { id: recordId, data },
        ...selection,
      },
    });
    return extractMutationRecord(result, mutationName);
  }

  async updateMany(
    objectNamePlural: string,
    filter: Record<string, unknown>,
    data: Record<string, unknown>,
    selection: Selection = { id: true },
  ): Promise<RecordData[]> {
    const mutationName = `update${capitalize(objectNamePlural)}`;
    const result: unknown = await this.client.mutation({
      [mutationName]: {
        __args: { filter, data },
        ...selection,
      },
    });
    return extractMutationRecords(result, mutationName);
  }

  async findMany(
    objectNamePlural: string,
    options: FindManyOptions,
    selection: Selection = { id: true },
  ): Promise<RecordData[]> {
    const result: unknown = await this.client.query({
      [objectNamePlural]: {
        __args: {
          ...(options.filter ? { filter: options.filter } : {}),
          ...(options.first ? { first: options.first } : {}),
          ...(options.orderBy ? { orderBy: options.orderBy } : {}),
        },
        edges: { node: selection },
      },
    });
    return extractConnectionRecords(result, objectNamePlural);
  }
}
