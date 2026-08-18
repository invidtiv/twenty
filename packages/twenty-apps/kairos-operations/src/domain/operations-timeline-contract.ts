export type OperationsTimelineEvent = {
  id: string;
  [key: string]: unknown;
};

export type OperationsTimeline = {
  startsAt: string;
  endsAt: string;
  events: OperationsTimelineEvent[];
  bookings: OperationsTimelineEvent[];
  properties: OperationsTimelineEvent[];
};

const isRecordList = (value: unknown): value is OperationsTimelineEvent[] =>
  Array.isArray(value) &&
  value.every(
    (item) =>
      typeof item === 'object' &&
      item !== null &&
      typeof (item as Record<string, unknown>).id === 'string',
  );

export const parseOperationsTimelineResponse = (payload: unknown): OperationsTimeline => {
  if (typeof payload !== 'object' || payload === null) {
    throw new Error('Timeline returned no data.');
  }
  const data = payload as Record<string, unknown>;
  if (data.ok !== true || typeof data.timeline !== 'object' || data.timeline === null) {
    throw new Error('Timeline returned no data.');
  }
  const timeline = data.timeline as Record<string, unknown>;
  if (
    typeof timeline.startsAt !== 'string' ||
    timeline.startsAt.length === 0 ||
    typeof timeline.endsAt !== 'string' ||
    timeline.endsAt.length === 0 ||
    !isRecordList(timeline.events) ||
    !isRecordList(timeline.bookings) ||
    !isRecordList(timeline.properties)
  ) {
    throw new Error('Timeline returned an invalid data contract.');
  }
  return timeline as unknown as OperationsTimeline;
};
