import { randomUUID } from 'node:crypto';

import {
  type FindManyOptions,
  type RecordsRepository,
} from 'src/domain/records-repository';
import { type RecordData, type Selection } from 'src/domain/types';

const uniqueFieldByObject: Record<string, string> = {
  people: 'globalContactId',
  properties: 'externalPropertyId',
  bookings: 'sourceKey',
  bookingContactMethods: 'sourceContactKey',
  serviceEvents: 'sourceEventKey',
  communications: 'communicationKey',
  sourceRecords: 'sourceKey',
  whatsappContactWatches: 'watchKey',
};

const pluralBySingular: Record<string, string> = {
  person: 'people',
  property: 'properties',
  booking: 'bookings',
  bookingContactMethod: 'bookingContactMethods',
  serviceEvent: 'serviceEvents',
  communication: 'communications',
  sourceRecord: 'sourceRecords',
  whatsappContactWatch: 'whatsappContactWatches',
};

const compareField = (value: unknown, condition: unknown): boolean => {
  if (
    condition === null ||
    typeof condition !== 'object' ||
    Array.isArray(condition)
  ) {
    return value === condition;
  }
  const operators = condition as Record<string, unknown>;
  if (Object.keys(operators).length !== 1) {
    throw new Error('Twenty filters require exactly one operator per field');
  }
  if ('eq' in operators && value !== operators.eq) return false;
  if ('neq' in operators && value === operators.neq) return false;
  if ('in' in operators && Array.isArray(operators.in) && !operators.in.includes(value)) {
    return false;
  }
  if ('gte' in operators && String(value) < String(operators.gte)) return false;
  if ('lt' in operators && String(value) >= String(operators.lt)) return false;
  if (operators.is === 'NULL' && value !== null && value !== undefined) return false;
  if (operators.is === 'NOT_NULL' && (value === null || value === undefined)) return false;
  return true;
};

const matches = (record: RecordData, filter?: Record<string, unknown>): boolean => {
  if (!filter) return true;
  if (Array.isArray(filter.and) && !filter.and.every((item) => matches(record, item))) {
    return false;
  }
  if (Array.isArray(filter.or) && !filter.or.some((item) => matches(record, item))) {
    return false;
  }
  if (
    filter.not &&
    typeof filter.not === 'object' &&
    matches(record, filter.not as Record<string, unknown>)
  ) {
    return false;
  }
  return Object.entries(filter)
    .filter(([key]) => !['and', 'or', 'not'].includes(key))
    .every(([key, condition]) => compareField(record[key], condition));
};

export class InMemoryRecordsRepository implements RecordsRepository {
  private readonly recordsByObject = new Map<string, RecordData[]>();

  async upsert(
    objectNamePlural: string,
    data: Record<string, unknown>,
    _selection?: Selection,
  ): Promise<RecordData> {
    const records = this.all(objectNamePlural);
    const uniqueField = uniqueFieldByObject[objectNamePlural];
    const existing = uniqueField
      ? records.find((record) => record[uniqueField] === data[uniqueField])
      : undefined;
    if (existing) {
      Object.assign(existing, data);
      return { ...existing };
    }
    const created: RecordData = { id: randomUUID(), ...data };
    records.push(created);
    this.recordsByObject.set(objectNamePlural, records);
    return { ...created };
  }

  async update(
    objectNameSingular: string,
    recordId: string,
    data: Record<string, unknown>,
    _selection?: Selection,
  ): Promise<RecordData> {
    const objectNamePlural = pluralBySingular[objectNameSingular];
    const record = this.all(objectNamePlural).find((item) => item.id === recordId);
    if (!record) throw new Error(`${objectNameSingular} ${recordId} not found`);
    Object.assign(record, data);
    return { ...record };
  }

  async updateMany(
    objectNamePlural: string,
    filter: Record<string, unknown>,
    data: Record<string, unknown>,
    _selection?: Selection,
  ): Promise<RecordData[]> {
    const records = this.all(objectNamePlural).filter((record) => matches(record, filter));
    for (const record of records) Object.assign(record, data);
    return records.map((record) => ({ ...record }));
  }

  async findMany(
    objectNamePlural: string,
    options: FindManyOptions,
    _selection?: Selection,
  ): Promise<RecordData[]> {
    const records = this.all(objectNamePlural).filter((record) =>
      matches(record, options.filter),
    );
    for (const order of [...(options.orderBy ?? [])].reverse()) {
      const [field, direction] = Object.entries(order)[0] ?? [];
      if (!field) continue;
      const descending = String(direction).toLowerCase().startsWith('desc');
      records.sort((left, right) => {
        const leftValue = left[field];
        const rightValue = right[field];
        if (leftValue === rightValue) return 0;
        if (leftValue === null || leftValue === undefined) return 1;
        if (rightValue === null || rightValue === undefined) return -1;
        const comparison = String(leftValue).localeCompare(String(rightValue));
        return descending ? -comparison : comparison;
      });
    }
    return records
      .slice(0, options.first ?? Number.POSITIVE_INFINITY)
      .map((record) => ({ ...record }));
  }

  all(objectNamePlural: string): RecordData[] {
    return this.recordsByObject.get(objectNamePlural) ?? [];
  }
}
