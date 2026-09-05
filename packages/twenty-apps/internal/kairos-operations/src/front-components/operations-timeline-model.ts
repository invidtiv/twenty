import {
  type OperationsTimeline,
  type TimelineBooking,
  type TimelineEvent,
  type TimelineProperty,
} from 'src/domain/operations-timeline-contract';
import {
  getZonedDateParts,
  zonedDateTimeToUtc,
} from 'src/domain/timezone';

export type TimelineRow = {
  booking: TimelineBooking;
  property: TimelineProperty;
  events: TimelineEvent[];
  stayStartsAt?: string;
  stayEndsAt?: string;
};

const timestamp = (value?: string | null): number | undefined => {
  if (!value) return undefined;
  const parsed = new Date(value).getTime();
  return Number.isNaN(parsed) ? undefined : parsed;
};

const shiftedLocalDate = (
  parts: { year: number; month: number; day: number },
  dayOffset: number,
) => {
  const shifted = new Date(
    Date.UTC(parts.year, parts.month - 1, parts.day + dayOffset),
  );
  return {
    year: shifted.getUTCFullYear(),
    month: shifted.getUTCMonth() + 1,
    day: shifted.getUTCDate(),
  };
};

export const getTimelineRange = (
  anchor: Date,
  dayCount: number,
  timeZone: string,
) => {
  const localAnchor = getZonedDateParts(anchor, timeZone);
  const firstDay = shiftedLocalDate(localAnchor, -2);
  const lastDay = shiftedLocalDate(firstDay, dayCount);
  const midnight = (parts: typeof firstDay) =>
    zonedDateTimeToUtc(
      { ...parts, hour: 0, minute: 0, second: 0 },
      timeZone,
    );
  return { start: midnight(firstDay), end: midnight(lastDay) };
};

export const getTimelineDays = (
  rangeStartsAt: string,
  dayCount: number,
  timeZone: string,
) => {
  const firstDay = getZonedDateParts(new Date(rangeStartsAt), timeZone);
  return Array.from({ length: dayCount }, (_, index) => {
    const day = shiftedLocalDate(firstDay, index);
    return new Date(Date.UTC(day.year, day.month - 1, day.day, 12));
  });
};

const calendarScalar = (value: string, timeZone: string): number | undefined => {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return undefined;
  const local = getZonedDateParts(parsed, timeZone);
  return (
    Date.UTC(local.year, local.month - 1, local.day) / (24 * 60 * 60 * 1000) +
    (local.hour * 60 * 60 + local.minute * 60 + local.second) / (24 * 60 * 60)
  );
};

export const buildTimelineRows = (
  timeline: OperationsTimeline,
): TimelineRow[] => {
  const propertyById = new Map(
    timeline.properties.map((property) => [property.id, property]),
  );
  const eventsByBooking = new Map<string, TimelineEvent[]>();
  for (const event of timeline.events) {
    if (!event.bookingId) continue;
    const events = eventsByBooking.get(event.bookingId) ?? [];
    events.push(event);
    eventsByBooking.set(event.bookingId, events);
  }

  return timeline.bookings
    .map((booking) => {
      const events = (eventsByBooking.get(booking.id) ?? []).sort(
        (left, right) =>
          (timestamp(left.startsAt) ?? 0) - (timestamp(right.startsAt) ?? 0),
      );
      const checkinEvent = events.find(
        ({ eventType }) => eventType === 'CHECK_IN',
      );
      const checkoutEvent = events.find(
        ({ eventType }) => eventType === 'CHECK_OUT',
      );
      return {
        booking,
        property:
          (booking.propertyId && propertyById.get(booking.propertyId)) || {
            id: 'unassigned',
            name: 'Unassigned property',
          },
        events,
        stayStartsAt:
          booking.checkinAt ??
          booking.rawMetadata?.talkguestCheckinEventAt ??
          checkinEvent?.startsAt,
        stayEndsAt: booking.checkoutAt ?? checkoutEvent?.startsAt,
      };
    })
    .sort((left, right) => {
      const propertyComparison = (left.property.name ?? '').localeCompare(
        right.property.name ?? '',
      );
      if (propertyComparison !== 0) return propertyComparison;
      return (
        (timestamp(left.stayStartsAt) ?? Number.POSITIVE_INFINITY) -
        (timestamp(right.stayStartsAt) ?? Number.POSITIVE_INFINITY)
      );
    });
};

export const clippedPosition = (
  startsAt: string | undefined,
  endsAt: string | undefined,
  rangeStartsAt: string,
  rangeEndsAt: string,
  timeZone = 'Europe/Lisbon',
): { leftPercent: number; widthPercent: number } | undefined => {
  const rangeStart = calendarScalar(rangeStartsAt, timeZone);
  const rangeEnd = calendarScalar(rangeEndsAt, timeZone);
  const itemStart = startsAt
    ? calendarScalar(startsAt, timeZone)
    : undefined;
  if (
    rangeStart === undefined ||
    rangeEnd === undefined ||
    itemStart === undefined ||
    rangeEnd <= rangeStart
  ) {
    return undefined;
  }
  const itemEnd = endsAt
    ? (calendarScalar(endsAt, timeZone) ?? itemStart + 1 / 24)
    : itemStart + 1 / 24;
  const clippedStart = Math.max(itemStart, rangeStart);
  const clippedEnd = Math.min(
    Math.max(itemEnd, itemStart + 1 / (24 * 60 * 60)),
    rangeEnd,
  );
  if (clippedEnd <= rangeStart || clippedStart >= rangeEnd) return undefined;
  const duration = rangeEnd - rangeStart;
  return {
    leftPercent: ((clippedStart - rangeStart) / duration) * 100,
    widthPercent: Math.max(((clippedEnd - clippedStart) / duration) * 100, 0.45),
  };
};
