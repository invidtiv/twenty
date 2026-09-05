import { type TimelineEvent } from 'src/domain/operations-timeline-contract';
import {
  clippedPosition,
  type TimelineRow,
} from 'src/front-components/operations-timeline-model';

export const LABEL_WIDTH = 260;
export const TIMELINE_TIME_ZONE = 'Europe/Lisbon';

export const colorsByEventType: Record<
  string,
  { background: string; text: string }
> = {
  GUEST_CONTACT_DEADLINE: { background: '#FFF0D5', text: '#A65300' },
  CHECK_IN: { background: '#DDF8E7', text: '#16794B' },
  CHECK_OUT: { background: '#E7EEFF', text: '#3559A8' },
  CLEANING: { background: '#F0E6FF', text: '#7048A8' },
  KEY_HANDOVER: { background: '#E6F7F6', text: '#257B76' },
};

export const eventLabel = (event: TimelineEvent) =>
  ({
    GUEST_CONTACT_DEADLINE: 'Contact guest',
    CHECK_IN: 'Check-in',
    CHECK_OUT: 'Check-out',
    CLEANING: 'Cleaning',
    KEY_HANDOVER: 'Key handover',
  })[event.eventType ?? ''] ?? event.title ?? 'Service event';

const isPendingEvent = (event: TimelineEvent) =>
  event.title?.toLowerCase().includes('time pending') === true;

const formatTime = (value?: string, timeZone = TIMELINE_TIME_ZONE) => {
  if (!value) return 'Time pending';
  return new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone,
  }).format(new Date(value));
};

export const ToolbarButton = ({
  children,
  active = false,
  onClick,
}: {
  children: string;
  active?: boolean;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    style={{
      border: `1px solid ${active ? '#6475E8' : '#D8DCE5'}`,
      background: active ? '#EEF0FF' : '#FFFFFF',
      color: active ? '#3D50C7' : '#3E4451',
      borderRadius: 7,
      padding: '7px 10px',
      fontSize: 12,
      fontWeight: 600,
      cursor: 'pointer',
      whiteSpace: 'nowrap',
    }}
  >
    {children}
  </button>
);

const TimelineEventCard = ({
  event,
  row,
  rangeStart,
  rangeEnd,
  index,
}: {
  event: TimelineEvent;
  row: TimelineRow;
  rangeStart: string;
  rangeEnd: string;
  index: number;
}) => {
  const position = clippedPosition(
    event.startsAt,
    event.endsAt,
    rangeStart,
    rangeEnd,
    TIMELINE_TIME_ZONE,
  );
  if (!position) return null;
  const colors = colorsByEventType[event.eventType ?? ''] ?? {
    background: '#F1F3F7',
    text: '#4D5563',
  };
  const pending = isPendingEvent(event);
  const displayedTime = pending
    ? 'Time pending'
    : formatTime(event.startsAt, row.booking.timezone);
  return (
    <div
      title={`${event.title ?? eventLabel(event)} · ${displayedTime} · ${event.status ?? 'Scheduled'}`}
      style={{
        position: 'absolute',
        left: `calc(${position.leftPercent}% + 3px)`,
        top: 39 + (index % 2) * 27,
        width: 82,
        height: 22,
        boxSizing: 'border-box',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        borderRadius: 6,
        padding: '4px 7px',
        background: colors.background,
        color: colors.text,
        border: `1px solid ${colors.text}25`,
        fontSize: 10,
        fontWeight: 650,
        opacity: event.status === 'COMPLETED' ? 0.65 : 1,
        zIndex: 3,
      }}
    >
      {eventLabel(event)} · {displayedTime}
    </div>
  );
};

export const BookingRow = ({
  row,
  rangeStart,
  rangeEnd,
  dayCount,
}: {
  row: TimelineRow;
  rangeStart: string;
  rangeEnd: string;
  dayCount: number;
}) => {
  const stay = clippedPosition(
    row.stayStartsAt,
    row.stayEndsAt,
    rangeStart,
    rangeEnd,
    TIMELINE_TIME_ZONE,
  );
  return (
    <div style={{ display: 'flex', minHeight: 94, borderBottom: '1px solid #ECEEF2' }}>
      <div style={{ position: 'sticky', left: 0, width: LABEL_WIDTH, minWidth: LABEL_WIDTH, boxSizing: 'border-box', padding: '12px 14px 10px 18px', background: '#FFFFFF', borderRight: '1px solid #DDE0E7', zIndex: 6 }}>
        <div style={{ fontSize: 13, fontWeight: 650, color: '#20242C' }}>
          {row.booking.name ?? 'Unnamed booking'}
        </div>
        <div style={{ display: 'flex', gap: 6, marginTop: 7, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 10, color: '#596171', background: '#F1F3F7', borderRadius: 10, padding: '3px 7px' }}>
            {row.booking.readinessStatus?.replaceAll('_', ' ') ?? 'No readiness'}
          </span>
          {row.booking.status && (
            <span style={{ fontSize: 10, color: '#596171', padding: '3px 2px' }}>
              {row.booking.status.replaceAll('_', ' ')}
            </span>
          )}
        </div>
      </div>
      <div style={{ position: 'relative', width: dayCount * 92, minWidth: dayCount * 92, backgroundImage: 'repeating-linear-gradient(to right, transparent 0, transparent 91px, #ECEEF2 91px, #ECEEF2 92px)' }}>
        {stay && (
          <div title="Guest stay" style={{ position: 'absolute', left: `${stay.leftPercent}%`, width: `${stay.widthPercent}%`, top: 11, height: 18, minWidth: 5, borderRadius: 9, background: 'linear-gradient(90deg, #6577EA, #8C72D9)', boxShadow: '0 1px 3px #5967BE45', zIndex: 2 }} />
        )}
        {row.events.map((event, index) => (
          <TimelineEventCard key={event.id} event={event} row={row} rangeStart={rangeStart} rangeEnd={rangeEnd} index={index} />
        ))}
      </div>
    </div>
  );
};
