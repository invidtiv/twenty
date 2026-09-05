import { isNonEmptyString, isObject } from '@sniptt/guards';

export type TimelineEvent = {
  id: string;
  title?: string;
  eventType?: string;
  startsAt?: string;
  endsAt?: string;
  status?: string;
  bookingId?: string;
};

export type TimelineBooking = {
  id: string;
  name?: string;
  propertyId?: string;
  checkinAt?: string | null;
  checkoutAt?: string;
  timezone?: string;
  status?: string;
  readinessStatus?: string;
  riskLevel?: string;
  rawMetadata?: {
    talkguestCheckinEventAt?: string;
    talkguestCheckinTimeKnown?: boolean;
  };
};

export type TimelineProperty = {
  id: string;
  name?: string;
};

export type OperationsTimeline = {
  startsAt: string;
  endsAt: string;
  events: TimelineEvent[];
  bookings: TimelineBooking[];
  properties: TimelineProperty[];
};

const hasRecordIds = (value: unknown): value is Array<{ id: string }> =>
  Array.isArray(value) &&
  value.every((record) => isObject(record) && isNonEmptyString(record.id));

export const parseOperationsTimelineResponse = (
  value: unknown,
): OperationsTimeline => {
  if (!isObject(value)) {
    throw new Error('Timeline returned no data.');
  }
  const response = value as Record<string, unknown>;
  if (response.ok !== true || !isObject(response.timeline)) {
    throw new Error('Timeline returned no data.');
  }
  const timeline = response.timeline as Record<string, unknown>;
  if (
    !isNonEmptyString(timeline.startsAt) ||
    !isNonEmptyString(timeline.endsAt) ||
    !hasRecordIds(timeline.events) ||
    !hasRecordIds(timeline.bookings) ||
    !hasRecordIds(timeline.properties)
  ) {
    throw new Error('Timeline returned an invalid data contract.');
  }
  return timeline as OperationsTimeline;
};
