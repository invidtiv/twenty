import {
  type RecordData,
  type RecordFilter,
  type Selection,
} from 'src/domain/types';

export type FindManyOptions = {
  filter?: RecordFilter;
  first?: number;
  orderBy?: Record<string, unknown>[];
};

export type RecordsRepository = {
  upsert(
    objectNamePlural: string,
    data: Record<string, unknown>,
    selection?: Selection,
  ): Promise<RecordData>;
  update(
    objectNameSingular: string,
    recordId: string,
    data: Record<string, unknown>,
    selection?: Selection,
  ): Promise<RecordData>;
  updateMany(
    objectNamePlural: string,
    filter: RecordFilter,
    data: Record<string, unknown>,
    selection?: Selection,
  ): Promise<RecordData[]>;
  findMany(
    objectNamePlural: string,
    options: FindManyOptions,
    selection?: Selection,
  ): Promise<RecordData[]>;
};
