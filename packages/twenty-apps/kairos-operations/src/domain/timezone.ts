export type ZonedDateParts = {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
};

export const getZonedDateParts = (instant: Date, timeZone: string): ZonedDateParts => {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(instant);
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return {
    year: Number(values.year),
    month: Number(values.month),
    day: Number(values.day),
    hour: Number(values.hour),
    minute: Number(values.minute),
    second: Number(values.second),
  };
};

export const zonedDateTimeToUtc = (desired: ZonedDateParts, timeZone: string): Date => {
  const desiredAsUtc = Date.UTC(
    desired.year,
    desired.month - 1,
    desired.day,
    desired.hour,
    desired.minute,
    desired.second,
  );
  let candidate = new Date(desiredAsUtc);
  for (let iteration = 0; iteration < 3; iteration += 1) {
    const actual = getZonedDateParts(candidate, timeZone);
    const actualAsUtc = Date.UTC(
      actual.year,
      actual.month - 1,
      actual.day,
      actual.hour,
      actual.minute,
      actual.second,
    );
    candidate = new Date(candidate.getTime() + desiredAsUtc - actualAsUtc);
  }
  return candidate;
};

export const zonedMidnightToUtc = (year: number, month: number, day: number, timeZone: string): Date =>
  zonedDateTimeToUtc({ year, month, day, hour: 0, minute: 0, second: 0 }, timeZone);

export const getPreviousZonedDayAtSameTime = (isoDate: string, timeZone: string): string => {
  const instant = new Date(isoDate);
  if (Number.isNaN(instant.getTime())) {
    throw new Error('isoDate must be a valid ISO 8601 timestamp');
  }
  const local = getZonedDateParts(instant, timeZone);
  const previousLocalDay = new Date(
    Date.UTC(local.year, local.month - 1, local.day - 1, local.hour, local.minute, local.second),
  );
  return zonedDateTimeToUtc(
    {
      year: previousLocalDay.getUTCFullYear(),
      month: previousLocalDay.getUTCMonth() + 1,
      day: previousLocalDay.getUTCDate(),
      hour: previousLocalDay.getUTCHours(),
      minute: previousLocalDay.getUTCMinutes(),
      second: previousLocalDay.getUTCSeconds(),
    },
    timeZone,
  ).toISOString();
};

export const getZonedDayBounds = (reference: Date, timeZone: string, dayOffset: number) => {
  const local = getZonedDateParts(reference, timeZone);
  const target = new Date(Date.UTC(local.year, local.month - 1, local.day + dayOffset));
  const next = new Date(Date.UTC(local.year, local.month - 1, local.day + dayOffset + 1));
  return {
    start: zonedMidnightToUtc(
      target.getUTCFullYear(),
      target.getUTCMonth() + 1,
      target.getUTCDate(),
      timeZone,
    ).toISOString(),
    end: zonedMidnightToUtc(
      next.getUTCFullYear(),
      next.getUTCMonth() + 1,
      next.getUTCDate(),
      timeZone,
    ).toISOString(),
  };
};

export const shiftZonedCalendarDays = (instant: Date, days: number, timeZone: string): Date => {
  const local = getZonedDateParts(instant, timeZone);
  const shifted = new Date(
    Date.UTC(local.year, local.month - 1, local.day + days, local.hour, local.minute, local.second),
  );
  return zonedDateTimeToUtc(
    {
      year: shifted.getUTCFullYear(),
      month: shifted.getUTCMonth() + 1,
      day: shifted.getUTCDate(),
      hour: shifted.getUTCHours(),
      minute: shifted.getUTCMinutes(),
      second: shifted.getUTCSeconds(),
    },
    timeZone,
  );
};
