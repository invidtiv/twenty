import { createHash } from 'node:crypto';

export const optionalText = (value) => typeof value === "string" && value.length > 0 ? value : void 0;
export const numericValue = (value, fallback) => typeof value === "number" && Number.isFinite(value) ? value : fallback;
export const recordSelection = { id: true };
export const bookingSelection = {
  id: true,
  name: true,
  bookingId: true,
  sourceKey: true,
  guestId: true,
  propertyId: true,
  preferredContactMethodId: true,
  checkinAt: true,
  checkoutAt: true,
  arrivalWindowStart: true,
  arrivalWindowEnd: true,
  timezone: true,
  status: true,
  readinessStatus: true,
  riskLevel: true,
  needsHumanReview: true,
  missingInformation: true,
  rawMetadata: true
};
export const contactSelection = {
  id: true,
  name: true,
  bookingId: true,
  personId: true,
  sourceContactKey: true,
  contactType: true,
  contactValue: true,
  source: true,
  priority: true,
  isPreferred: true,
  preferenceMode: true,
  confidence: true,
  lastVerifiedAt: true,
  validFrom: true,
  validUntil: true,
  notes: true
};
export const serviceEventSelection = {
  id: true,
  title: true,
  eventType: true,
  startsAt: true,
  endsAt: true,
  status: true,
  location: true,
  notes: true,
  source: true,
  externalEventId: true,
  bookingId: true,
  kairosRemindersEnabled: true
};
export const whatsappWatchSelection = {
  id: true,
  watchKey: true,
  bookingId: true,
  serviceEventId: true,
  contactMethodId: true,
  normalizedPhone: true,
  activatedAt: true,
  activationWatermarkMessageId: true,
  monitorUntil: true,
  status: true,
  guestName: true,
  propertyName: true,
  checkinAt: true,
  checkoutAt: true,
  metadata: true
};
export const timelineBookingSelection = {
  id: true,
  name: true,
  bookingId: true,
  source: true,
  externalBookingId: true,
  propertyId: true,
  checkinAt: true,
  checkoutAt: true,
  timezone: true,
  status: true,
  readinessStatus: true,
  riskLevel: true,
  needsHumanReview: true,
  rawMetadata: true
};
export const timelinePropertySelection = {
  id: true,
  name: true,
  externalPropertyId: true,
  timezone: true,
  active: true
};
export const emailThreadSelection = {
  id: true,
  subject: true,
  createdAt: true,
  updatedAt: true
};
export const emailMessageSelection = {
  id: true,
  messageThreadId: true,
  headerMessageId: true,
  subject: true,
  text: true,
  receivedAt: true,
  createdAt: true
};
export const emailParticipantSelection = {
  id: true,
  messageId: true,
  role: true,
  handle: true,
  displayName: true
};
export const emailAssociationSelection = {
  id: true,
  messageId: true,
  messageThreadId: true,
  messageExternalId: true,
  messageThreadExternalId: true,
  direction: true
};
export const compactRecord = (record) => Object.fromEntries(
  Object.entries(record).filter(([, value]) => value !== void 0)
);
export const requiredText = (value, fieldName) => {
  const normalized = value.trim();
  if (normalized.length === 0) throw new Error(`${fieldName} is required`);
  return normalized;
};
export const normalizeOption = (value) => requiredText(value, "option").toUpperCase().replace(/[\s-]+/g, "_");
export const normalizeInternationalPhone = (value) => {
  let text = requiredText(value, "contactValue");
  if (text.startsWith("00")) text = `+${text.slice(2)}`;
  if (!text.startsWith("+")) {
    throw new Error("preferred phone must include an international country code");
  }
  const digits = text.slice(1).replace(/\D/g, "");
  if (digits.length < 8 || digits.length > 15) {
    throw new Error("preferred phone is not a valid international number");
  }
  return `+${digits}`;
};
export const validDate = (value, fieldName) => {
  const parsed = new Date(requiredText(value, fieldName));
  if (Number.isNaN(parsed.getTime())) {
    throw new Error(`${fieldName} must be an ISO 8601 timestamp`);
  }
  return parsed;
};
export const validLimit = (value, maximum) => {
  if (!Number.isInteger(value) || value < 1 || value > maximum) {
    throw new Error(`limit must be an integer between 1 and ${maximum}`);
  }
  return value;
};
export const linkValue = (url) => url ? {
  primaryLinkLabel: url,
  primaryLinkUrl: url,
  secondaryLinks: null
} : void 0;
export const stableBookingUuid = (sourceKey) => {
  const hex = createHash("sha256").update(`kairos-booking-v1:${sourceKey}`).digest("hex").slice(0, 32).split("");
  hex[12] = "4";
  hex[16] = ["8", "9", "a", "b"][Number.parseInt(hex[16], 16) % 4];
  return `${hex.slice(0, 8).join("")}-${hex.slice(8, 12).join("")}-${hex.slice(12, 16).join("")}-${hex.slice(16, 20).join("")}-${hex.slice(20).join("")}`;
};
export const textValue = (record, field) => record && typeof record[field] === "string" ? record[field] : void 0;
export const objectValue = (record, field) => {
  const value = record[field];
  return value !== null && typeof value === "object" && !Array.isArray(value) ? value : void 0;
};
export const appendMissingInformation = (existing, message) => {
  const current = typeof existing === "string" ? existing.trim() : "";
  return current.includes(message) ? current : [current, message].filter(Boolean).join("\n");
};
