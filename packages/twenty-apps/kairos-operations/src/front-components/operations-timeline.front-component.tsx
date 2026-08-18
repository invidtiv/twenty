import { useCallback, useEffect, useMemo, useState } from 'react';
import { defineFrontComponent } from 'twenty-sdk/define';

import { OPERATIONS_TIMELINE_FRONT_COMPONENT_ID } from 'src/constants/front-component-identifiers';
import {
  parseOperationsTimelineResponse,
  type OperationsTimeline,
} from 'src/domain/operations-timeline-contract';
import { shiftZonedCalendarDays } from 'src/domain/timezone';
import {
  buildTimelineRows,
  getTimelineDays,
  getTimelineRange,
  type TimelineRow,
} from 'src/front-components/operations-timeline-model';
import {
  BookingRow,
  LABEL_WIDTH,
  TIMELINE_TIME_ZONE,
  ToolbarButton,
  colorsByEventType,
  eventLabel,
} from 'src/front-components/operations-timeline-parts';

const formatDay = (date: Date) =>
  new Intl.DateTimeFormat('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    timeZone: 'UTC',
  }).format(date);

const formatCurrentDay = () =>
  new Intl.DateTimeFormat('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    timeZone: TIMELINE_TIME_ZONE,
  }).format(new Date());

const callTimeline = async (
  startsAt: string,
  endsAt: string,
): Promise<OperationsTimeline> => {
  const apiBaseUrl = process.env.TWENTY_API_URL;
  const token =
    process.env.TWENTY_APP_ACCESS_TOKEN ?? process.env.TWENTY_API_KEY;
  if (!apiBaseUrl || !token) {
    throw new Error('The timeline is missing its Twenty API configuration.');
  }
  const response = await fetch(`${apiBaseUrl}/s/kairos/query`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      operation: 'getOperationsTimeline',
      startsAt,
      endsAt,
    }),
  });
  if (!response.ok) {
    const message = await response.text().catch(() => '');
    throw new Error(message.slice(0, 180) || `Timeline request failed (${response.status}).`);
  }
  return parseOperationsTimelineResponse(await response.json());
};

const OperationsTimeline = () => {
  const [anchor, setAnchor] = useState(() => new Date());
  const [dayCount, setDayCount] = useState(14);
  const [query, setQuery] = useState('');
  const [timeline, setTimeline] = useState<OperationsTimeline>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();
  const range = useMemo(
    () => getTimelineRange(anchor, dayCount, TIMELINE_TIME_ZONE),
    [anchor, dayCount],
  );

  const load = useCallback(async () => {
    setLoading(true);
    setError(undefined);
    try {
      setTimeline(await callTimeline(range.start.toISOString(), range.end.toISOString()));
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Could not load the timeline.');
    } finally {
      setLoading(false);
    }
  }, [range.start.getTime(), range.end.getTime()]);

  useEffect(() => {
    void load();
  }, [load]);

  const rows = useMemo(() => {
    if (!timeline) return [];
    const normalizedQuery = query.trim().toLowerCase();
    return buildTimelineRows(timeline).filter(
      (row) =>
        !normalizedQuery ||
        ((row.booking.name as string) ?? '').toLowerCase().includes(normalizedQuery) ||
        ((row.property.name as string) ?? '').toLowerCase().includes(normalizedQuery),
    );
  }, [query, timeline]);
  const groups = useMemo(() => {
    const grouped = new Map<string, { name: string; rows: TimelineRow[] }>();
    for (const row of rows) {
      const group = grouped.get(row.property.id);
      grouped.set(row.property.id, {
        name: (row.property.name as string) ?? 'Unassigned property',
        rows: [...(group?.rows ?? []), row],
      });
    }
    return [...grouped.entries()].map(([id, group]) => ({ id, ...group }));
  }, [rows]);
  const days = getTimelineDays(
    range.start.toISOString(),
    dayCount,
    TIMELINE_TIME_ZONE,
  );
  const rangeStart = range.start.toISOString();
  const rangeEnd = range.end.toISOString();

  return (
    <div style={{ height: '100%', minHeight: 620, display: 'flex', flexDirection: 'column', background: '#F7F8FA', color: '#20242C', fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
      <div style={{ padding: '18px 20px 14px', background: '#FFFFFF', borderBottom: '1px solid #DDE0E7' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 700 }}>Operations Timeline</div>
            <div style={{ marginTop: 4, fontSize: 12, color: '#737B8C' }}>
              Stay spans, contact deadlines, check-ins and check-outs by property
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, flexWrap: 'wrap' }}>
            <input
              aria-label="Filter bookings"
              value={query}
              onChange={(event) => setQuery(event.currentTarget.value)}
              placeholder="Filter guest or property"
              style={{ width: 185, border: '1px solid #D8DCE5', borderRadius: 7, padding: '7px 9px', fontSize: 12, outline: 'none' }}
            />
            <ToolbarButton onClick={() => setAnchor((current) => shiftZonedCalendarDays(current, -dayCount, TIMELINE_TIME_ZONE))}>←</ToolbarButton>
            <ToolbarButton onClick={() => setAnchor(new Date())}>Today</ToolbarButton>
            <ToolbarButton onClick={() => setAnchor((current) => shiftZonedCalendarDays(current, dayCount, TIMELINE_TIME_ZONE))}>→</ToolbarButton>
            <ToolbarButton active={dayCount === 14} onClick={() => setDayCount(14)}>14 days</ToolbarButton>
            <ToolbarButton active={dayCount === 30} onClick={() => setDayCount(30)}>30 days</ToolbarButton>
            <ToolbarButton onClick={() => void load()}>Refresh</ToolbarButton>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 14, marginTop: 13, flexWrap: 'wrap', fontSize: 11, color: '#667080' }}>
          {Object.entries(colorsByEventType).slice(0, 3).map(([type, colors]) => (
            <span key={type} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <span style={{ width: 8, height: 8, borderRadius: 2, background: colors.background, border: `1px solid ${colors.text}55` }} />
              {eventLabel({ id: type, eventType: type })}
            </span>
          ))}
          <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <span style={{ width: 20, height: 6, borderRadius: 4, background: '#6D75DF' }} /> Guest stay
          </span>
        </div>
      </div>

      <div style={{ overflow: 'auto', flex: 1, margin: 14, background: '#FFFFFF', border: '1px solid #DDE0E7', borderRadius: 10 }}>
        <div style={{ minWidth: LABEL_WIDTH + dayCount * 92 }}>
          <div style={{ display: 'flex', position: 'sticky', top: 0, zIndex: 10, height: 45, background: '#FFFFFF', borderBottom: '1px solid #DDE0E7' }}>
            <div style={{ position: 'sticky', left: 0, zIndex: 11, width: LABEL_WIDTH, minWidth: LABEL_WIDTH, boxSizing: 'border-box', padding: '15px 18px', borderRight: '1px solid #DDE0E7', background: '#FFFFFF', fontSize: 11, fontWeight: 650, color: '#737B8C' }}>
              PROPERTY / BOOKING
            </div>
            {days.map((day) => {
              const isToday = formatDay(day) === formatCurrentDay();
              return (
                <div key={day.toISOString()} style={{ width: 92, minWidth: 92, boxSizing: 'border-box', padding: '14px 8px', borderRight: '1px solid #ECEEF2', background: isToday ? '#F0F2FF' : '#FFFFFF', color: isToday ? '#4657CB' : '#667080', fontSize: 11, fontWeight: isToday ? 700 : 550, textAlign: 'center' }}>
                  {formatDay(day)}
                </div>
              );
            })}
          </div>

          {loading && <div style={{ padding: 36, color: '#737B8C', fontSize: 13 }}>Loading operational timeline…</div>}
          {error && (
            <div style={{ margin: 20, padding: 16, borderRadius: 8, background: '#FFF0F0', color: '#A43C3C', fontSize: 13 }}>
              {error}
            </div>
          )}
          {!loading && !error && groups.length === 0 && (
            <div style={{ padding: 36, color: '#737B8C', fontSize: 13 }}>No bookings overlap this window.</div>
          )}
          {!loading && !error && groups.map(({ id, name, rows: propertyRows }) => (
            <div key={id}>
              <div style={{ display: 'flex', height: 36, background: '#F5F6F8', borderBottom: '1px solid #DDE0E7' }}>
                <div style={{ position: 'sticky', left: 0, width: LABEL_WIDTH, minWidth: LABEL_WIDTH, zIndex: 7, boxSizing: 'border-box', padding: '10px 18px', borderRight: '1px solid #DDE0E7', background: '#F5F6F8', fontSize: 12, fontWeight: 700 }}>
                  {name} <span style={{ color: '#8A92A2', fontWeight: 500 }}>· {propertyRows.length}</span>
                </div>
                <div style={{ width: dayCount * 92, minWidth: dayCount * 92 }} />
              </div>
              {propertyRows.map((row) => (
                <BookingRow key={row.booking.id} row={row} rangeStart={rangeStart} rangeEnd={rangeEnd} dayCount={dayCount} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default defineFrontComponent({
  universalIdentifier: OPERATIONS_TIMELINE_FRONT_COMPONENT_ID,
  name: 'Operations Timeline',
  description:
    'Property swimlanes combining booking stay bars with operational event cards.',
  component: OperationsTimeline,
});