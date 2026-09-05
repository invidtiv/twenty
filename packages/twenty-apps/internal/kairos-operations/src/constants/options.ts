export const BOOKING_SOURCES = [
  'WHATSAPP',
  'TALKGUEST',
  'EMAIL',
  'MANUAL',
  'KAIROS',
  'FUTURE_API',
] as const;

export const BOOKING_STATUSES = [
  'NEW',
  'CONFIRMED',
  'PREPARING',
  'WAITING_FOR_GUEST',
  'READY',
  'IN_PROGRESS',
  'COMPLETED',
  'CANCELLED',
  'PROBLEM',
] as const;

export const READINESS_STATUSES = [
  'UNKNOWN',
  'MISSING_CONTACT',
  'MISSING_LOCATION',
  'MISSING_ARRIVAL_DETAILS',
  'READY',
  'NEEDS_REVIEW',
] as const;

export const RISK_LEVELS = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'] as const;
export const CONTACT_TYPES = ['WHATSAPP', 'PHONE', 'EMAIL', 'OTHER'] as const;
export const CONTACT_CONFIDENCE = ['CONFIRMED', 'LIKELY', 'UNVERIFIED'] as const;
export const EVENT_TYPES = [
  'GUEST_CONTACT_DEADLINE',
  'DAY_BEFORE_PREPARATION',
  'CHECK_IN',
  'KEY_HANDOVER',
  'FOLLOW_UP',
  'CHECK_OUT',
  'CUSTOM',
] as const;
export const EVENT_STATUSES = [
  'SCHEDULED',
  'READY',
  'IN_PROGRESS',
  'COMPLETED',
  'CANCELLED',
  'PROBLEM',
] as const;
export const COMMUNICATION_DIRECTIONS = ['INBOUND', 'OUTBOUND'] as const;
export const COMMUNICATION_CHANNELS = [
  'WHATSAPP',
  'PHONE',
  'EMAIL',
  'VOICE_CALL',
  'OTHER',
] as const;
export const PARSE_STATUSES = [
  'RECEIVED',
  'PARSED',
  'RECONCILED',
  'NEEDS_REVIEW',
  'ERROR',
] as const;

export const option = (
  value: string,
  label: string,
  position: number,
  color: string,
) => ({ value, label, position, color });
