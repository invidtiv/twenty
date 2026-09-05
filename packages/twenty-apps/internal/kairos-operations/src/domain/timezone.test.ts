import { describe, expect, it } from 'vitest';

import {
  getPreviousZonedDayAtSameTime,
  shiftZonedCalendarDays,
  getZonedDayBounds,
} from 'src/domain/timezone';

describe('getZonedDayBounds', () => {
  it('returns tomorrow in Europe/Lisbon across summer time', () => {
    expect(
      getZonedDayBounds(
        new Date('2026-08-09T22:00:00.000Z'),
        'Europe/Lisbon',
        1,
      ),
    ).toEqual({
      start: '2026-08-09T23:00:00.000Z',
      end: '2026-08-10T23:00:00.000Z',
    });
  });
});

describe('shiftZonedCalendarDays', () => {
  it('should shift by Lisbon calendar days across the autumn DST boundary', () => {
    expect(
      shiftZonedCalendarDays(
        new Date('2026-10-24T23:30:00.000Z'),
        14,
        'Europe/Lisbon',
      ).toISOString(),
    ).toBe('2026-11-08T00:30:00.000Z');
  });
});

describe('getPreviousZonedDayAtSameTime', () => {
  it('should preserve the Lisbon clock time across the autumn DST boundary', () => {
    expect(
      getPreviousZonedDayAtSameTime(
        '2026-10-25T16:00:00.000Z',
        'Europe/Lisbon',
      ),
    ).toBe('2026-10-24T15:00:00.000Z');
  });
});
