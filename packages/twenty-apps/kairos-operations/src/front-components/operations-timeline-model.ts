import type { OperationsTimeline, OperationsTimelineEvent } from 'src/domain/operations-timeline-contract';
import { getZonedDateParts, zonedDateTimeToUtc } from 'src/domain/timezone';

export type TimelineRow = {
  booking: OperationsTimelineEvent;
  property: OperationsTimelineEvent;
  events: OperationsTimelineEvent[];
  stayStartsAt?: string;
  stayEndsAt?: string;
};

const toEpochMs = (iso?: string): number | undefined => {
  if (!iso) return undefined;
  const value = new Date(iso).getTime();
  return Number.isNaN(value) ? undefined : value;
};

const addUtcDays = (parts: { year: number; month: number; day: number }, days: number) => {
  const date = new Date(Date.UTC(parts.year, parts.month - 1, parts.day + days));
  return {
    year: date.getUTCFullYear(),
    month: date.getUTCMonth() + 1,
    day: date.getUTCDate(),
  };
};

const getDayNumber = (iso: string, timeZone: string): number | undefined => {
  const instant = new Date(iso);
  if (Number.isNaN(instant.getTime())) return undefined;
  const local = getZonedDateParts(instant, timeZone);
  return (
    Date.UTC(local.year, local.month - 1, local.day) / (1440 * 60 * 1e3) +
    (local.hour * 60 * 60 + local.minute * 60 + local.second) / (1440 * 60)
  );
};

export const getTimelineRange = (anchor: Date, dayCount: number, timeZone: string) => {
  const local = getZonedDateParts(anchor, timeZone);
  const startParts = addUtcDays(local, -2);
  const endParts = addUtcDays(startParts, dayCount);
  const start = zonedDateTimeToUtc({ ...startParts, hour: 0, minute: 0, second: 0 }, timeZone);
  const end = zonedDateTimeToUtc({ ...endParts, hour: 0, minute: 0, second: 0 }, timeZone);
  return { start, end };
};

export const getTimelineDays = (anchor: Date | string, dayCount: number, timeZone: string): Date[] => {
  const local = getZonedDateParts(new Date(anchor), timeZone);
  return Array.from({ length: dayCount }, (_, index) => {
    const parts = addUtcDays(local, index);
    return new Date(Date.UTC(parts.year, parts.month - 1, parts.day, 12));
  });
};

export const getEventGeometry = (
  eventStartsAt?: string,
  eventEndsAt?: string,
  rangeStart?: string,
  rangeEnd?: string,
  timeZone = 'Europe/Lisbon',
) => {
  const rangeStartNumber = rangeStart ? getDayNumber(rangeStart, timeZone) : undefined;
  const rangeEndNumber = rangeEnd ? getDayNumber(rangeEnd, timeZone) : undefined;
  const eventStartNumber = eventStartsAt ? getDayNumber(eventStartsAt, timeZone) : undefined;
  if (
    rangeStartNumber === undefined ||
    rangeEndNumber === undefined ||
    eventStartNumber === undefined ||
    rangeEndNumber <= rangeStartNumber
  ) {
    return undefined;
  }
  const eventEndNumber = eventEndsAt
    ? (getDayNumber(eventEndsAt, timeZone) ?? eventStartNumber + 1 / 24)
    : eventStartNumber + 1 / 24;
  const left = Math.max(eventStartNumber, rangeStartNumber);
  const right = Math.min(Math.max(eventEndNumber, eventStartNumber + 1 / (1440 * 60)), rangeEndNumber);
  if (right <= rangeStartNumber || left >= rangeEndNumber) return undefined;
  const total = rangeEndNumber - rangeStartNumber;
  return {
    leftPercent: ((left - rangeStartNumber) / total) * 100,
    widthPercent: Math.max(((right - left) / total) * 100, 0.45),
  };
};

export const buildTimelineRows = (timeline: OperationsTimeline): TimelineRow[] => {
  const propertyById = new Map(timeline.properties.map((property) => [property.id, property]));
  const eventsByBookingId = new Map<string, OperationsTimelineEvent[]>();
  for (const event of timeline.events) {
    const bookingId = event.bookingId;
    if (typeof bookingId !== 'string') continue;
    const bucket = eventsByBookingId.get(bookingId) ?? [];
    bucket.push(event);
    eventsByBookingId.set(bookingId, bucket);
  }
  return timeline.bookings
    .map((booking) => {
      const events = (eventsByBookingId.get(booking.id as string) ?? []).sort(
        (a, b) => (toEpochMs(a.startsAt as string) ?? 0) - (toEpochMs(b.startsAt as string) ?? 0),
      );
      const checkIn = events.find(({ eventType }) => eventType === 'CHECK_IN');
      const checkOut = events.find(({ eventType }) => eventType === 'CHECK_OUT');
      const rawMetadata = booking.rawMetadata as Record<string, unknown> | undefined;
      return {
        booking,
        property:
          (booking.propertyId &&
            propertyById.get(booking.propertyId as string)) ||
          ({ id: 'unassigned', name: 'Unassigned property' } as OperationsTimelineEvent),
        events,
        stayStartsAt:
          (booking.checkinAt as string) ??
          (rawMetadata?.talkguestCheckinEventAt as string) ??
          (checkIn?.startsAt as string),
        stayEndsAt: (booking.checkoutAt as string) ?? (checkOut?.startsAt as string),
      } as TimelineRow;
    })
    .sort((a, b) => {
      const nameOrder = ((a.property.name as string) ?? '').localeCompare(
        (b.property.name as string) ?? '',
      );
      if (nameOrder !== 0) return nameOrder;
      return (
        (toEpochMs(a.stayStartsAt) ?? Number.POSITIVE_INFINITY) -
        (toEpochMs(b.stayStartsAt) ?? Number.POSITIVE_INFINITY)
      );
    });
};