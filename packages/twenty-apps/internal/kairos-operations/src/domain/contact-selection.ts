import { type PreferredContact, type RecordData } from 'src/domain/types';

const optionalText = (value: unknown): string | undefined =>
  typeof value === 'string' && value.length > 0 ? value : undefined;

const numericValue = (value: unknown, fallback: number): number =>
  typeof value === 'number' && Number.isFinite(value) ? value : fallback;

export const asPreferredContact = (record: RecordData): PreferredContact => ({
  id: record.id,
  contactType: optionalText(record.contactType) ?? 'OTHER',
  contactValue: optionalText(record.contactValue) ?? '',
  source: optionalText(record.source) ?? 'OTHER',
  confidence: optionalText(record.confidence) ?? 'UNVERIFIED',
  isPreferred: record.isPreferred === true,
  preferenceMode: optionalText(record.preferenceMode) ?? 'POLICY',
  priority: numericValue(record.priority, 100),
  validFrom: optionalText(record.validFrom),
  validUntil: optionalText(record.validUntil),
});

const isCurrentlyValid = (contact: PreferredContact, now: Date): boolean => {
  const nowTime = now.getTime();
  const validFrom = contact.validFrom ? Date.parse(contact.validFrom) : undefined;
  const validUntil = contact.validUntil ? Date.parse(contact.validUntil) : undefined;

  return !(
    (validFrom !== undefined && validFrom > nowTime) ||
    (validUntil !== undefined && validUntil <= nowTime)
  );
};

const contactScore = (contact: PreferredContact): number => {
  if (contact.isPreferred && contact.preferenceMode === 'MANUAL') {
    return 10_000 - contact.priority;
  }
  if (contact.source === 'MANUAL' && contact.confidence === 'CONFIRMED') {
    return 900 - contact.priority;
  }
  if (contact.source === 'WHATSAPP' && contact.confidence === 'CONFIRMED') {
    return 800 - contact.priority;
  }
  if (contact.confidence === 'CONFIRMED') return 700 - contact.priority;
  if (contact.source === 'TALKGUEST') return 600 - contact.priority;
  if (contact.confidence === 'LIKELY') return 500 - contact.priority;
  return 100 - contact.priority;
};

export const selectPreferredContact = (
  records: RecordData[],
  now: Date,
): PreferredContact | undefined =>
  records
    .map(asPreferredContact)
    .filter(
      (contact) =>
        contact.contactValue.length > 0 && isCurrentlyValid(contact, now),
    )
    .sort((left, right) => {
      const scoreDifference = contactScore(right) - contactScore(left);
      return scoreDifference !== 0
        ? scoreDifference
        : left.id.localeCompare(right.id);
    })[0];
