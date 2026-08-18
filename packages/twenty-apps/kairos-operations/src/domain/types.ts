export type RecordData = Record<string, unknown>;

export type Selection = Record<string, boolean | Record<string, boolean> | Record<string, unknown>>;

export type FindManyOptions = {
  filter?: Record<string, unknown>;
  first?: number;
  orderBy?: Record<string, string>[];
};

export type RecordsRepository = {
  upsert: (objectNamePlural: string, data: Record<string, unknown>, selection?: Selection) => Promise<RecordData>;
  update: (objectNameSingular: string, recordId: string, data: Record<string, unknown>, selection?: Selection) => Promise<RecordData>;
  updateMany: (objectNamePlural: string, filter: Record<string, unknown>, data: Record<string, unknown>, selection?: Selection) => Promise<RecordData[]>;
  findMany: (objectNamePlural: string, options: FindManyOptions, selection?: Selection) => Promise<RecordData[]>;
};

export type PersonInput = Record<string, unknown>;
export type PropertyInput = Record<string, unknown>;
export type BookingInput = Record<string, unknown>;
export type ContactMethodInput = Record<string, unknown>;
export type ContactSnapshotInput = Record<string, unknown>;
export type ServiceEventInput = Record<string, unknown>;
export type SourceRecordInput = Record<string, unknown>;
export type CommunicationInput = Record<string, unknown>;
