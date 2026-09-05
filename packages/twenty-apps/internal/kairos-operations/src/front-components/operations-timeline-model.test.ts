import { describe, expect, it } from 'vitest';

import {
  buildTimelineRows,
  clippedPosition,
} from 'src/front-components/operations-timeline-model';

describe('operations timeline model', () => {
  it('should derive a date-only stay start from its check-in event', () => {
    const rows = buildTimelineRows({
      startsAt: '2026-08-10T00:00:00.000Z',
      endsAt: '2026-08-20T00:00:00.000Z',
      properties: [{ id: 'property-1', name: 'Alcantara I' }],
      bookings: [
        {
          id: 'booking-1',
          name: 'Ana M.',
          propertyId: 'property-1',
          checkinAt: null,
          checkoutAt: '2026-08-18T10:00:00.000Z',
        },
      ],
      events: [
        {
          id: 'event-1',
          bookingId: 'booking-1',
          eventType: 'CHECK_IN',
          startsAt: '2026-08-15T12:00:00.000Z',
        },
      ],
    });

    expect(rows[0]).toMatchObject({
      stayStartsAt: '2026-08-15T12:00:00.000Z',
      stayEndsAt: '2026-08-18T10:00:00.000Z',
      property: { name: 'Alcantara I' },
    });
  });

  it('should preserve a pending stay when its check-in event is outside the window', () => {
    const rows = buildTimelineRows({
      startsAt: '2026-08-16T00:00:00.000Z',
      endsAt: '2026-08-20T00:00:00.000Z',
      properties: [{ id: 'property-1', name: 'Alcantara I' }],
      bookings: [
        {
          id: 'booking-1',
          propertyId: 'property-1',
          checkinAt: null,
          checkoutAt: '2026-08-18T10:00:00.000Z',
          rawMetadata: {
            talkguestCheckinEventAt: '2026-08-15T12:00:00.000Z',
            talkguestCheckinTimeKnown: false,
          },
        },
      ],
      events: [],
    });

    expect(rows[0].stayStartsAt).toBe('2026-08-15T12:00:00.000Z');
  });

  it('should clip a stay bar to the visible timeline range', () => {
    expect(
      clippedPosition(
        '2026-08-08T00:00:00.000Z',
        '2026-08-15T00:00:00.000Z',
        '2026-08-10T00:00:00.000Z',
        '2026-08-20T00:00:00.000Z',
      ),
    ).toEqual({ leftPercent: 0, widthPercent: 50 });
  });

  it('should keep local calendar columns aligned across Lisbon DST', () => {
    expect(
      clippedPosition(
        '2026-03-29T11:00:00.000Z',
        undefined,
        '2026-03-28T00:00:00.000Z',
        '2026-03-29T23:00:00.000Z',
        'Europe/Lisbon',
      )?.leftPercent,
    ).toBe(75);
  });
});
