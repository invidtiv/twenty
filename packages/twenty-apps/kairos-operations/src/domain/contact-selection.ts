import { numericValue, optionalText } from 'src/domain/utils';

export const asPreferredContact = (record) => ({
  id: record.id,
  contactType: optionalText(record.contactType) ?? "OTHER",
  contactValue: optionalText(record.contactValue) ?? "",
  source: optionalText(record.source) ?? "OTHER",
  confidence: optionalText(record.confidence) ?? "UNVERIFIED",
  isPreferred: record.isPreferred === true,
  preferenceMode: optionalText(record.preferenceMode) ?? "POLICY",
  priority: numericValue(record.priority, 100),
  validFrom: optionalText(record.validFrom),
  validUntil: optionalText(record.validUntil)
});
export const contactScore = (contact) => {
  if (contact.isPreferred && contact.preferenceMode === "MANUAL") {
    return 1e4 - contact.priority;
  }
  if (contact.source === "MANUAL" && contact.confidence === "CONFIRMED") {
    return 900 - contact.priority;
  }
  if (contact.source === "WHATSAPP" && contact.confidence === "CONFIRMED") {
    return 800 - contact.priority;
  }
  if (contact.confidence === "CONFIRMED") return 700 - contact.priority;
  if (contact.source === "TALKGUEST") return 600 - contact.priority;
  if (contact.confidence === "LIKELY") return 500 - contact.priority;
  return 100 - contact.priority;
};
export const isCurrentlyValid = (contact, now) => {
  const nowTime = now.getTime();
  const validFrom = contact.validFrom ? Date.parse(contact.validFrom) : void 0;
  const validUntil = contact.validUntil ? Date.parse(contact.validUntil) : void 0;
  return !(validFrom !== void 0 && validFrom > nowTime || validUntil !== void 0 && validUntil <= nowTime);
};
export const selectPreferredContact = (records, now) => records.map(asPreferredContact).filter(
  (contact) => contact.contactValue.length > 0 && isCurrentlyValid(contact, now)
).sort((left, right) => {
  const scoreDifference = contactScore(right) - contactScore(left);
  return scoreDifference !== 0 ? scoreDifference : left.id.localeCompare(right.id);
})[0];

// src/domain/kairos-operations-service.ts
