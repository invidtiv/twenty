import { type CSSProperties, useCallback, useEffect, useState } from 'react';

import { defineFrontComponent } from 'twenty-sdk/define';

type CheckEvent = {
  id: string;
  title: string;
  startsAt: string;
  status: string;
  localTime: string;
  amount: number;
  propertyName?: string;
};

type MonthBucket = {
  month: string;
  checks: number;
  before21: number;
  after21: number;
  amount: number;
  completed: number;
  pending: number;
  balance: number;
  events: CheckEvent[];
};

type Balance = {
  timeZone: string;
  months: MonthBucket[];
  totalChecks: number;
  totalAmount: number;
};

const FONT =
  'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
const INK = '#20242C';
const MUTED = '#737B8C';
const FAINT = '#596171';
const BORDER = '#DDE0E7';
const BG = '#F7F8FA';
const ACCENT = '#6475E8';
const GREEN = '#16794B';
const GREEN_BG = '#DDF8E7';
const AMBER = '#A65300';
const AMBER_BG = '#FFF0D5';

const TIME_ZONE = 'Europe/Lisbon';

const monthLabel = (monthKey: string) => {
  const [year, month] = monthKey.split('-').map(Number);
  return new Intl.DateTimeFormat('en-GB', {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(Date.UTC(year, month - 1, 1)));
};

const plural = (count: number, word: string) =>
  count + ' ' + (count === 1 ? word : word + 's');

const monthShort = (monthKey: string) => {
  const [year, month] = monthKey.split('-').map(Number);
  return new Intl.DateTimeFormat('en-GB', {
    month: 'short',
    timeZone: 'UTC',
  }).format(new Date(Date.UTC(year, month - 1, 1)));
};

const formatDay = (iso: string) =>
  new Intl.DateTimeFormat('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    timeZone: TIME_ZONE,
  }).format(new Date(iso));

const loadBalance = async (): Promise<Balance> => {
  const apiBaseUrl = process.env.TWENTY_API_URL;
  const token =
    process.env.TWENTY_APP_ACCESS_TOKEN ?? process.env.TWENTY_API_KEY;
  if (!apiBaseUrl || !token) {
    throw new Error('The dashboard is missing its Twenty API configuration.');
  }
  const response = await fetch(apiBaseUrl + '/s/kairos/query', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
    body: JSON.stringify({ operation: 'getCheckBalance' }),
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok || payload?.ok !== true || !payload?.balance) {
    throw new Error('Could not load the check balance.');
  }
  return payload.balance as Balance;
};

const cardStyle: CSSProperties = {
  background: '#FFFFFF',
  border: '1px solid ' + BORDER,
  borderRadius: 10,
};

const KairosDashboard = () => {
  const [balance, setBalance] = useState<Balance>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();

  const load = useCallback(async () => {
    setLoading(true);
    setError(undefined);
    try {
      setBalance(await loadBalance());
    } catch (caught) {
      setError(
        caught instanceof Error ? caught.message : 'Could not load the dashboard.',
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const months = balance?.months ?? [];
  const chartMonths = months.slice(-12);

  const beforeAmount = months.reduce(
    (sum, month) => sum + month.before21 * 25,
    0,
  );
  const afterAmount = months.reduce(
    (sum, month) => sum + month.after21 * 30,
    0,
  );

  const flatEvents = months.flatMap((month) =>
    month.events.map((event) => ({ ...event, month: month.month })),
  );
  const upcoming = flatEvents
    .filter((event) => event.status !== 'COMPLETED')
    .sort((a, b) => a.startsAt.localeCompare(b.startsAt));
  const completed = flatEvents
    .filter((event) => event.status === 'COMPLETED')
    .sort((a, b) => b.startsAt.localeCompare(a.startsAt));

  const maxMonthAmount = Math.max(
    1,
    ...chartMonths.map((month) => month.amount),
  );
  const chartHeight = 210;
  const chartWidth = 680;
  const plotTop = 26;
  const plotBottom = chartHeight - 30;
  const plotHeight = plotBottom - plotTop;
  const slot = chartWidth / Math.max(1, chartMonths.length);
  const barWidth = Math.min(46, slot * 0.6);
  const totalShare = Math.max(1, beforeAmount + afterAmount);
  const donutRadius = 62;
  const donutCircumference = 2 * Math.PI * donutRadius;
  const beforeFraction = beforeAmount / totalShare;

  return (
    <div
      style={{
        height: '100%',
        minHeight: 640,
        display: 'flex',
        flexDirection: 'column',
        background: BG,
        color: INK,
        fontFamily: FONT,
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          padding: '18px 20px 14px',
          background: '#FFFFFF',
          borderBottom: '1px solid ' + BORDER,
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: 16,
            flexWrap: 'wrap',
          }}
        >
          <div>
            <div style={{ fontSize: 18, fontWeight: 700 }}>
              Kairos Dashboard
            </div>
            <div style={{ marginTop: 4, fontSize: 12, color: MUTED }}>
              Check-in earnings: 25€ before 21:00, 30€ from 21:00 (Lisbon
              time). Scheduled check-ins count.
            </div>
          </div>
          <button
            type="button"
            onClick={() => void load()}
            style={{
              border: '1px solid ' + BORDER,
              background: '#FFFFFF',
              color: '#3E4451',
              borderRadius: 7,
              padding: '7px 10px',
              fontSize: 12,
              fontWeight: 600,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            Refresh
          </button>
        </div>
      </div>

      <div style={{ overflow: 'auto', flex: 1, margin: 14 }}>
        {loading && (
          <div style={{ padding: 36, color: MUTED, fontSize: 13 }}>
            Loading dashboard…
          </div>
        )}
        {error && (
          <div
            style={{
              marginBottom: 12,
              padding: 16,
              borderRadius: 8,
              background: '#FFF0F0',
              color: '#A43C3C',
              fontSize: 13,
            }}
          >
            {error}
          </div>
        )}
        {!loading && !error && balance && (
          <>
            <div
              style={{
                display: 'flex',
                gap: 12,
                flexWrap: 'wrap',
                marginBottom: 14,
              }}
            >
              {[
                {
                  label: 'TOTAL EARNED',
                  value: balance.totalAmount + '€',
                  sub: balance.totalChecks + ' check-ins',
                  accent: false,
                },
                {
                  label: 'BEFORE 21:00',
                  value: beforeAmount + '€',
                  sub:
                    plural(
                      months.reduce((sum, month) => sum + month.before21, 0),
                      'check',
                    ) + ' at 25€',
                  accent: false,
                },
                {
                  label: 'AFTER 21:00',
                  value: afterAmount + '€',
                  sub:
                    plural(
                      months.reduce((sum, month) => sum + month.after21, 0),
                      'check',
                    ) + ' at 30€',
                  accent: false,
                },
                {
                  label: 'AVERAGE / CHECK',
                  value:
                    balance.totalChecks > 0
                      ? Math.round((balance.totalAmount / balance.totalChecks) * 100) /
                          100 +
                        '€'
                      : '—',
                  sub: 'per check-in',
                  accent: true,
                },
              ].map((card) => (
                <div
                  key={card.label}
                  style={{
                    ...cardStyle,
                    flex: 1,
                    minWidth: 170,
                    padding: '14px 16px',
                    background: card.accent ? '#EEF0FF' : '#FFFFFF',
                    borderColor: card.accent ? ACCENT : BORDER,
                  }}
                >
                  <div
                    style={{ fontSize: 10.5, fontWeight: 650, color: MUTED }}
                  >
                    {card.label}
                  </div>
                  <div style={{ fontSize: 24, fontWeight: 750, marginTop: 5 }}>
                    {card.value}
                  </div>
                  <div style={{ fontSize: 11, color: FAINT, marginTop: 3 }}>
                    {card.sub}
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                display: 'flex',
                gap: 14,
                flexWrap: 'wrap',
                marginBottom: 14,
              }}
            >
              <div
                style={{
                  ...cardStyle,
                  flex: 2,
                  minWidth: 430,
                  padding: '16px 18px 12px',
                }}
              >
                <div style={{ fontSize: 13, fontWeight: 700 }}>
                  Monthly earnings
                </div>
                <div style={{ fontSize: 11, color: FAINT, marginTop: 2 }}>
                  Stacked: 25€ checks (green) + 30€ checks (amber)
                </div>
                <svg
                  viewBox={'0 0 ' + chartWidth + ' ' + chartHeight}
                  style={{ width: '100%', marginTop: 8 }}
                  role="img"
                  aria-label="Monthly earnings bar chart"
                >
                  {[0.25, 0.5, 0.75, 1].map((fraction) => {
                    const y = plotBottom - plotHeight * fraction;
                    return (
                      <g key={fraction}>
                        <line
                          x1={0}
                          x2={chartWidth}
                          y1={y}
                          y2={y}
                          stroke="#ECEEF2"
                          strokeDasharray="3 4"
                        />
                        <text
                          x={chartWidth - 4}
                          y={y - 5}
                          textAnchor="end"
                          fontSize={10}
                          fill={MUTED}
                        >
                          {Math.round(maxMonthAmount * fraction)}€
                        </text>
                      </g>
                    );
                  })}
                  {chartMonths.map((month, index) => {
                    const x = slot * index + (slot - barWidth) / 2;
                    const totalHeight = (month.amount / maxMonthAmount) * plotHeight;
                    const beforeHeight =
                      ((month.before21 * 25) / maxMonthAmount) * plotHeight;
                    const afterHeight = totalHeight - beforeHeight;
                    return (
                      <g key={month.month}>
                        <rect
                          x={x}
                          y={plotBottom - beforeHeight}
                          width={barWidth}
                          height={beforeHeight}
                          rx={4}
                          fill={GREEN_BG}
                          stroke={GREEN}
                          strokeOpacity={0.45}
                        />
                        <rect
                          x={x}
                          y={plotBottom - totalHeight}
                          width={barWidth}
                          height={afterHeight}
                          rx={4}
                          fill={AMBER_BG}
                          stroke={AMBER}
                          strokeOpacity={0.45}
                        />
                        <text
                          x={x + barWidth / 2}
                          y={plotBottom - totalHeight - 6}
                          textAnchor="middle"
                          fontSize={11}
                          fontWeight={700}
                          fill={INK}
                        >
                          {month.amount}€
                        </text>
                        <text
                          x={x + barWidth / 2}
                          y={chartHeight - 12}
                          textAnchor="middle"
                          fontSize={10.5}
                          fill={FAINT}
                        >
                          {monthShort(month.month)}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>

              <div
                style={{
                  ...cardStyle,
                  flex: 1,
                  minWidth: 260,
                  padding: '16px 18px',
                }}
              >
                <div style={{ fontSize: 13, fontWeight: 700 }}>
                  Before / after 21:00
                </div>
                <div style={{ fontSize: 11, color: FAINT, marginTop: 2 }}>
                  Share of earned amount
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 10,
                  }}
                >
                  <svg
                    viewBox="0 0 180 180"
                    style={{ width: 168, height: 168 }}
                    role="img"
                    aria-label="Before and after 21:00 share donut"
                  >
                    <circle
                      cx={90}
                      cy={90}
                      r={donutRadius}
                      fill="none"
                      stroke="#ECEEF2"
                      strokeWidth={24}
                    />
                    <circle
                      cx={90}
                      cy={90}
                      r={donutRadius}
                      fill="none"
                      stroke={GREEN}
                      strokeWidth={24}
                      strokeDasharray={
                        donutCircumference * beforeFraction +
                        ' ' +
                        donutCircumference
                      }
                      strokeDashoffset={-donutCircumference * 0.25}
                      transform="rotate(-90 90 90)"
                    />
                    {beforeFraction < 1 && (
                      <circle
                        cx={90}
                        cy={90}
                        r={donutRadius}
                        fill="none"
                        stroke={AMBER}
                        strokeWidth={24}
                        strokeDasharray={
                          donutCircumference * (1 - beforeFraction) +
                          ' ' +
                          donutCircumference
                        }
                        strokeDashoffset={
                          -donutCircumference * (0.25 + beforeFraction)
                        }
                        transform="rotate(-90 90 90)"
                      />
                    )}
                    <text
                      x={90}
                      y={86}
                      textAnchor="middle"
                      fontSize={20}
                      fontWeight={750}
                      fill={INK}
                    >
                      {beforeAmount + afterAmount}€
                    </text>
                    <text
                      x={90}
                      y={104}
                      textAnchor="middle"
                      fontSize={10}
                      fill={MUTED}
                    >
                      total
                    </text>
                  </svg>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: 12,
                    }}
                  >
                    <span style={{ color: FAINT }}>
                      <span
                        style={{
                          display: 'inline-block',
                          width: 9,
                          height: 9,
                          borderRadius: 2,
                          background: GREEN,
                          marginRight: 6,
                        }}
                      />
                      Before 21:00
                    </span>
                    <span style={{ fontWeight: 700 }}>
                      {beforeAmount}€ ·{' '}
                      {Math.round(beforeFraction * 100)}%
                    </span>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: 12,
                    }}
                  >
                    <span style={{ color: FAINT }}>
                      <span
                        style={{
                          display: 'inline-block',
                          width: 9,
                          height: 9,
                          borderRadius: 2,
                          background: AMBER,
                          marginRight: 6,
                        }}
                      />
                      From 21:00
                    </span>
                    <span style={{ fontWeight: 700 }}>
                      {afterAmount}€ ·{' '}
                      {Math.round((1 - beforeFraction) * 100)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                gap: 14,
                flexWrap: 'wrap',
                marginBottom: 14,
              }}
            >
              <div
                style={{
                  ...cardStyle,
                  flex: 1,
                  minWidth: 380,
                  padding: '16px 18px 14px',
                }}
              >
                <div style={{ fontSize: 13, fontWeight: 700 }}>
                  Upcoming check-ins
                </div>
                <div style={{ fontSize: 11, color: FAINT, marginTop: 2 }}>
                  Scheduled · {plural(upcoming.length, 'check')}
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginTop: 10,
                    maxHeight: 300,
                    overflow: 'auto',
                  }}
                >
                  {upcoming.length === 0 && (
                    <div style={{ padding: 18, color: MUTED, fontSize: 12 }}>
                      No upcoming check-ins.
                    </div>
                  )}
                  {upcoming.map((event) => (
                    <div
                      key={event.id}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: 10,
                        padding: '9px 2px',
                        borderBottom: '1px solid #F0F1F5',
                        fontSize: 12,
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 10,
                          minWidth: 0,
                        }}
                      >
                        <div
                          style={{
                            flexShrink: 0,
                            width: 58,
                            textAlign: 'center',
                            background: '#EEF0FF',
                            color: '#3D50C7',
                            borderRadius: 7,
                            padding: '4px 2px',
                            fontSize: 10,
                            fontWeight: 650,
                          }}
                        >
                          {formatDay(event.startsAt)}
                        </div>
                        <div style={{ minWidth: 0 }}>
                          <div
                            style={{
                              fontWeight: 650,
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {event.title}
                          </div>
                          <div style={{ fontSize: 10.5, color: FAINT }}>
                            {event.localTime} Lisbon
                            {event.propertyName
                              ? ' · ' + event.propertyName
                              : ''}
                          </div>
                        </div>
                      </div>
                      <span
                        style={{
                          flexShrink: 0,
                          fontWeight: 750,
                          color:
                            event.amount >= 30 ? AMBER : GREEN,
                        }}
                      >
                        {event.amount}€
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div
                style={{
                  ...cardStyle,
                  flex: 1,
                  minWidth: 380,
                  padding: '16px 18px 14px',
                }}
              >
                <div style={{ fontSize: 13, fontWeight: 700 }}>
                  Completed check-ins
                </div>
                <div style={{ fontSize: 11, color: FAINT, marginTop: 2 }}>
                  Most recent first · {plural(completed.length, 'check')}
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginTop: 10,
                    maxHeight: 300,
                    overflow: 'auto',
                  }}
                >
                  {completed.length === 0 && (
                    <div style={{ padding: 18, color: MUTED, fontSize: 12 }}>
                      No completed check-ins yet.
                    </div>
                  )}
                  {completed.map((event) => (
                    <div
                      key={event.id}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: 10,
                        padding: '9px 2px',
                        borderBottom: '1px solid #F0F1F5',
                        fontSize: 12,
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 10,
                          minWidth: 0,
                        }}
                      >
                        <div
                          style={{
                            flexShrink: 0,
                            width: 58,
                            textAlign: 'center',
                            background: GREEN_BG,
                            color: GREEN,
                            borderRadius: 7,
                            padding: '4px 2px',
                            fontSize: 10,
                            fontWeight: 650,
                          }}
                        >
                          {formatDay(event.startsAt)}
                        </div>
                        <div style={{ minWidth: 0 }}>
                          <div
                            style={{
                              fontWeight: 650,
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {event.title}
                          </div>
                          <div style={{ fontSize: 10.5, color: FAINT }}>
                            {event.localTime} Lisbon
                            {event.propertyName
                              ? ' · ' + event.propertyName
                              : ''}
                            {' · '}
                            {monthLabel(event.month)}
                          </div>
                        </div>
                      </div>
                      <span
                        style={{
                          flexShrink: 0,
                          fontWeight: 750,
                          color:
                            event.amount >= 30 ? AMBER : GREEN,
                        }}
                      >
                        {event.amount}€
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export const KAIROS_DASHBOARD_FRONT_COMPONENT_UNIVERSAL_IDENTIFIER =
  '8bafc54c-6e55-43ef-a299-431e65a3b5e4';

export default defineFrontComponent({
  universalIdentifier: KAIROS_DASHBOARD_FRONT_COMPONENT_UNIVERSAL_IDENTIFIER,
  name: 'kairos-dashboard',
  description:
    'Kairos check-in earnings dashboard: monthly bars, 21:00 split donut, upcoming and completed check-in lists.',
  component: KairosDashboard,
});