import { isNonEmptyString } from '@sniptt/guards';

import { getPreviousZonedDayAtSameTime } from 'src/domain/timezone';

export const buildExpectedServiceEvents = (booking) => {
  const bookingId = booking.id;
  if (booking.status === "CANCELLED") return [];
  const bookingName = isNonEmptyString(booking.name) ? booking.name : "Booking";
  const bookingTimeZone = isNonEmptyString(booking.timezone) ? booking.timezone : "Europe/Lisbon";
  const checkinAt = isNonEmptyString(booking.checkinAt) ? booking.checkinAt : void 0;
  const rawMetadata = booking.rawMetadata ?? {};
  const pendingCheckinAt = rawMetadata.talkguestCheckinTimeKnown === false && isNonEmptyString(rawMetadata.talkguestCheckinEventAt) ? rawMetadata.talkguestCheckinEventAt : void 0;
  const eventCheckinAt = checkinAt ?? pendingCheckinAt;
  const checkinTimePending = !checkinAt && Boolean(pendingCheckinAt);
  const checkoutAt = isNonEmptyString(booking.checkoutAt) ? booking.checkoutAt : void 0;
  const events = [];
  if (eventCheckinAt) {
    events.push({
      sourceEventKey: `${bookingId}:KAIROS:GUEST_CONTACT_DEADLINE`,
      bookingId,
      eventType: "GUEST_CONTACT_DEADLINE",
      title: checkinTimePending ? `Guest contact deadline (check-in time pending) \u2014 ${bookingName}` : `Guest contact deadline \u2014 ${bookingName}`,
      startsAt: getPreviousZonedDayAtSameTime(
        eventCheckinAt,
        bookingTimeZone
      ),
      status: "SCHEDULED",
      source: "KAIROS",
      kairosRemindersEnabled: true,
      notes: checkinTimePending ? "TalkGuest has supplied the check-in date, but not the arrival time yet." : null
    });
    events.push({
      sourceEventKey: `${bookingId}:KAIROS:CHECK_IN`,
      bookingId,
      eventType: "CHECK_IN",
      title: checkinTimePending ? `Check-in (time pending) \u2014 ${bookingName}` : `Check-in \u2014 ${bookingName}`,
      startsAt: eventCheckinAt,
      status: "SCHEDULED",
      source: "KAIROS",
      kairosRemindersEnabled: true,
      notes: checkinTimePending ? "TalkGuest has supplied the check-in date, but not the arrival time yet." : null
    });
  }
  if (checkoutAt) {
    events.push({
      sourceEventKey: `${bookingId}:KAIROS:CHECK_OUT`,
      bookingId,
      eventType: "CHECK_OUT",
      title: `Check-out \u2014 ${bookingName}`,
      startsAt: checkoutAt,
      status: "SCHEDULED",
      source: "KAIROS",
      kairosRemindersEnabled: true
    });
  }
  return events;
};

// src/domain/contact-selection.ts
