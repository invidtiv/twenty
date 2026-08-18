import { isNonEmptyString } from '@sniptt/guards';
import { CoreApiClient } from 'twenty-client-sdk/core';

import { type FindManyOptions, type RecordData, type RecordsRepository, type Selection } from 'src/domain/types';


var getInternalGraphqlUrl = (environment) => {
  const internalApiUrl = environment.KAIROS_INTERNAL_API_URL;
  if (!isNonEmptyString(internalApiUrl)) return void 0;
  return `${internalApiUrl.replace(/\/$/, "")}/graphql`;
};

// src/runtime/core-api-records-repository.ts
var createCoreApiClient = () => {
  const graphqlUrl = getInternalGraphqlUrl(process.env);
  const RuntimeCoreApiClient = CoreApiClient;
  return new RuntimeCoreApiClient(graphqlUrl ? { url: graphqlUrl } : void 0);
};
var capitalize = (value) => value.length === 0 ? value : `${value[0].toUpperCase()}${value.slice(1)}`;
var isRecord = (value) => value !== null && typeof value === "object" && !Array.isArray(value);
var toRecordData = (value, context) => {
  if (!isRecord(value) || typeof value.id !== "string") {
    throw new Error(`${context} did not return a record with an id`);
  }
  return value;
};
var extractMutationRecord = (result, mutationName) => {
  if (!isRecord(result)) throw new Error(`${mutationName} returned no result`);
  const mutationResult = result[mutationName];
  if (Array.isArray(mutationResult)) {
    return toRecordData(mutationResult[0], mutationName);
  }
  return toRecordData(mutationResult, mutationName);
};
var extractConnectionRecords = (result, objectNamePlural) => {
  if (!isRecord(result) || !isRecord(result[objectNamePlural])) return [];
  const edges = result[objectNamePlural].edges;
  if (!Array.isArray(edges)) return [];
  return edges.map((edge) => isRecord(edge) ? edge.node : void 0).filter((node) => isRecord(node)).map((node) => toRecordData(node, objectNamePlural));
};
var extractMutationRecords = (result, mutationName) => {
  if (!isRecord(result) || !Array.isArray(result[mutationName])) return [];
  return result[mutationName].map((record) => toRecordData(record, mutationName));
};
export class CoreApiRecordsRepository implements RecordsRepository {
  client = createCoreApiClient();
  async upsert(objectNamePlural: string, data: Record<string, unknown>, selection: Selection = { id: true }): Promise<RecordData> {
    const mutationName = `create${capitalize(objectNamePlural)}`;
    const result = await this.client.mutation({
      [mutationName]: {
        __args: { data: [data], upsert: true },
        ...selection
      }
    });
    return extractMutationRecord(result, mutationName);
  }
  async update(objectNameSingular: string, recordId: string, data: Record<string, unknown>, selection: Selection = { id: true }): Promise<RecordData> {
    const mutationName = `update${capitalize(objectNameSingular)}`;
    const result = await this.client.mutation({
      [mutationName]: {
        __args: { id: recordId, data },
        ...selection
      }
    });
    return extractMutationRecord(result, mutationName);
  }
  async updateMany(objectNamePlural: string, filter: Record<string, unknown>, data: Record<string, unknown>, selection: Selection = { id: true }): Promise<RecordData[]> {
    const mutationName = `update${capitalize(objectNamePlural)}`;
    const result = await this.client.mutation({
      [mutationName]: {
        __args: { filter, data },
        ...selection
      }
    });
    return extractMutationRecords(result, mutationName);
  }
  async findMany(objectNamePlural: string, options: FindManyOptions, selection: Selection = { id: true }): Promise<RecordData[]> {
    const result = await this.client.query({
      [objectNamePlural]: {
        __args: {
          ...options.filter ? { filter: options.filter } : {},
          ...options.first ? { first: options.first } : {},
          ...options.orderBy ? { orderBy: options.orderBy } : {}
        },
        edges: { node: selection }
      }
    });
    return extractConnectionRecords(result, objectNamePlural);
  }
};

// src/logic-functions/kairos-records-api.logic-function.t