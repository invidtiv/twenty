import { useCallback, useEffect, useState } from 'react';

import { defineFrontComponent } from 'twenty-sdk/define';

type CheckEvent = {
  id: string;
  title: string;
  startsAt: string;
  status: string;
  localTime: string;
  amount: number;
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
const ACCENT_BG = '#EEF0FF';
const GREEN_BG = '#DDF8E7';
const GREEN_INK = '#16794B';
const AMBER_BG = '#FFF0D5';
const AMBER_INK = '#A65300';

const monthLabel = (monthKey: string) => {
  const [year, month] = monthKey.split('-').map(Number);
  return new Intl.DateTimeFormat('en-GB', {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(Date.UTC(year, month - 1, 1)));
};

const formatDay = (iso: string) =>
  new Intl.DateTimeFormat('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    timeZone: 'UTC',
  }).format(new Date(iso));

const loadBalance = async (): Promise<Balance> => {
  const apiBaseUrl = process.env.TWENTY_API_URL;
  const token =
    process.env.TWENTY_APP_ACCESS_TOKEN ?? process.env.TWENTY_API_KEY;
  if (!apiBaseUrl || !token) {
    throw new Error('The balance view is missing its Twenty API configuration.');
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

const CheckBalance = () => {
  const [balance, setBalance] = useState<Balance>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();
  const [expanded, setExpanded] = useState<string>();

  const load = useCallback(async () => {
    setLoading(true);
    setError(undefined);
    try {
      setBalance(await loadBalance());
    } catch (caught) {
      setError(
        caught instanceof Error
          ? caught.message
          : 'Could not load the check balance.',
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const latestMonth = balance?.months[balance.months.length - 1];

  return (
    <div
      style={{
        height: '100%',
        minHeight: 620,
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
            <div style={{ fontSize: 18, fontWeight: 700 }}>Check Balance</div>
            <div style={{ marginTop: 4, fontSize: 12, color: MUTED }}>
              Check-ins earn 25€ before 21:00 and 30€ from 21:00 (Lisbon
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
            Loading check balance…
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
                gap: 14,
                flexWrap: 'wrap',
                marginBottom: 14,
              }}
            >
              <div
                style={{
                  flex: 1,
                  minWidth: 190,
                  background: '#FFFFFF',
                  border: '1px solid ' + BORDER,
                  borderRadius: 10,
                  padding: '16px 18px',
                }}
              >
                <div style={{ fontSize: 11, fontWeight: 650, color: MUTED }}>
                  TOTAL EARNED
                </div>
                <div style={{ fontSize: 28, fontWeight: 750, marginTop: 6 }}>
                  {balance.totalAmount}€
                </div>
                <div style={{ fontSize: 11, color: FAINT, marginTop: 4 }}>
                  {balance.totalChecks} check-ins
                </div>
              </div>
              <div
                style={{
                  flex: 1,
                  minWidth: 190,
                  background: ACCENT_BG,
                  border: '1px solid ' + ACCENT,
                  borderRadius: 10,
                  padding: '16px 18px',
                }}
              >
                <div style={{ fontSize: 11, fontWeight: 650, color: MUTED }}>
                  {latestMonth
                    ? monthLabel(latestMonth.month).toUpperCase()
                    : 'LATEST MONTH'}
                </div>
                <div style={{ fontSize: 28, fontWeight: 750, marginTop: 6 }}>
                  {latestMonth ? latestMonth.amount + '€' : '—'}
                </div>
                <div style={{ fontSize: 11, color: FAINT, marginTop: 4 }}>
                  {latestMonth
                    ? latestMonth.before21 +
                      ' before 21:00 · ' +
                      latestMonth.after21 +
                      ' after 21:00'
                    : ''}
                </div>
              </div>
              <div
                style={{
                  flex: 1,
                  minWidth: 190,
                  background: '#FFFFFF',
                  border: '1px solid ' + BORDER,
                  borderRadius: 10,
                  padding: '16px 18px',
                }}
              >
                <div style={{ fontSize: 11, fontWeight: 650, color: MUTED }}>
                  RULE
                </div>
                <div style={{ fontSize: 15, fontWeight: 700, marginTop: 8 }}>
                  25€ / 30€
                </div>
                <div style={{ fontSize: 11, color: FAINT, marginTop: 4 }}>
                  cut-off at 21:00 · Europe/Lisbon
                </div>
              </div>
            </div>

            <div
              style={{
                background: '#FFFFFF',
                border: '1px solid ' + BORDER,
                borderRadius: 10,
                overflow: 'hidden',
              }}
            >
              <table
                style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  fontSize: 12,
                }}
              >
                <thead>
                  <tr
                    style={{
                      background: '#F5F6F8',
                      borderBottom: '1px solid ' + BORDER,
                      color: MUTED,
                      textAlign: 'left',
                    }}
                  >
                    <th style={{ padding: '11px 16px', fontWeight: 650 }}>
                      MONTH
                    </th>
                    <th
                      style={{
                        padding: '11px 10px',
                        fontWeight: 650,
                        textAlign: 'center',
                      }}
                    >
                      CHECKS
                    </th>
                    <th
                      style={{
                        padding: '11px 10px',
                        fontWeight: 650,
                        textAlign: 'center',
                      }}
                    >
                      DONE
                    </th>
                    <th
                      style={{
                        padding: '11px 10px',
                        fontWeight: 650,
                        textAlign: 'center',
                      }}
                    >
                      SCHEDULED
                    </th>
                    <th
                      style={{
                        padding: '11px 10px',
                        fontWeight: 650,
                        textAlign: 'center',
                        color: GREEN_INK,
                      }}
                    >
                      &lt;21H
                    </th>
                    <th
                      style={{
                        padding: '11px 10px',
                        fontWeight: 650,
                        textAlign: 'center',
                        color: AMBER_INK,
                      }}
                    >
                      ≥21H
                    </th>
                    <th
                      style={{
                        padding: '11px 10px',
                        fontWeight: 650,
                        textAlign: 'right',
                      }}
                    >
                      AMOUNT
                    </th>
                    <th
                      style={{
                        padding: '11px 16px',
                        fontWeight: 650,
                        textAlign: 'right',
                      }}
                    >
                      BALANCE
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {balance.months.map((month) => {
                    const isOpen = expanded === month.month;
                    return (
                      <>
                        <tr
                          key={month.month}
                          onClick={() =>
                            setExpanded(isOpen ? undefined : month.month)
                          }
                          style={{
                            cursor: 'pointer',
                            borderBottom: '1px solid #ECEEF2',
                            background: isOpen ? '#F7F8FC' : '#FFFFFF',
                          }}
                        >
                          <td
                            style={{
                              padding: '12px 16px',
                              fontWeight: 650,
                            }}
                          >
                            {monthLabel(month.month)}
                          </td>
                          <td
                            style={{
                              padding: '12px 10px',
                              textAlign: 'center',
                              fontWeight: 700,
                            }}
                          >
                            {month.checks}
                          </td>
                          <td
                            style={{
                              padding: '12px 10px',
                              textAlign: 'center',
                            }}
                          >
                            {month.completed}
                          </td>
                          <td
                            style={{
                              padding: '12px 10px',
                              textAlign: 'center',
                            }}
                          >
                            {month.pending}
                          </td>
                          <td
                            style={{
                              padding: '12px 10px',
                              textAlign: 'center',
                              color: GREEN_INK,
                              fontWeight: 650,
                            }}
                          >
                            {month.before21}
                          </td>
                          <td
                            style={{
                              padding: '12px 10px',
                              textAlign: 'center',
                              color: AMBER_INK,
                              fontWeight: 650,
                            }}
                          >
                            {month.after21}
                          </td>
                          <td
                            style={{
                              padding: '12px 10px',
                              textAlign: 'right',
                              fontWeight: 750,
                            }}
                          >
                            {month.amount}€
                          </td>
                          <td
                            style={{
                              padding: '12px 16px',
                              textAlign: 'right',
                              color: ACCENT,
                              fontWeight: 750,
                            }}
                          >
                            {month.balance}€
                          </td>
                        </tr>
                        {isOpen &&
                          month.events.map((event) => (
                            <tr
                              key={event.id}
                              style={{
                                borderBottom: '1px solid #F0F1F5',
                                background: '#FFFFFF',
                              }}
                            >
                              <td
                                colSpan={8}
                                style={{ padding: '5px 16px 5px 30px' }}
                              >
                                <div
                                  style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    gap: 10,
                                    flexWrap: 'wrap',
                                    fontSize: 11.5,
                                  }}
                                >
                                  <span style={{ color: INK }}>
                                    {event.title}
                                    <span style={{ color: FAINT }}>
                                      {' '}
                                      · {formatDay(event.startsAt)} ·{' '}
                                      {event.localTime} Lisbon
                                    </span>
                                  </span>
                                  <span
                                    style={{
                                      display: 'flex',
                                      gap: 8,
                                      alignItems: 'center',
                                    }}
                                  >
                                    <span
                                      style={{
                                        color:
                                          event.status === 'COMPLETED'
                                            ? GREEN_INK
                                            : '#257B76',
                                        background:
                                          event.status === 'COMPLETED'
                                            ? GREEN_BG
                                            : '#E6F7F6',
                                        borderRadius: 10,
                                        padding: '2px 8px',
                                        fontSize: 10,
                                        fontWeight: 650,
                                      }}
                                    >
                                      {event.status === 'COMPLETED'
                                        ? 'COMPLETED'
                                        : 'SCHEDULED'}
                                    </span>
                                    <span style={{ fontWeight: 750 }}>
                                      {event.amount}€
                                    </span>
                                  </span>
                                </div>
                              </td>
                            </tr>
                          ))}
                      </>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr
                    style={{
                      borderTop: '2px solid ' + BORDER,
                      background: '#FBFBFC',
                    }}
                  >
                    <td
                      style={{
                        padding: '12px 16px',
                        fontWeight: 700,
                        fontSize: 12.5,
                      }}
                    >
                      TOTAL
                    </td>
                    <td
                      style={{
                        padding: '12px 10px',
                        textAlign: 'center',
                        fontWeight: 700,
                      }}
                    >
                      {balance.totalChecks}
                    </td>
                    <td colSpan={5} />
                    <td
                      style={{
                        padding: '12px 10px',
                        textAlign: 'right',
                        fontWeight: 750,
                      }}
                    >
                      {balance.totalAmount}€
                    </td>
                    <td
                      style={{
                        padding: '12px 16px',
                        textAlign: 'right',
                        color: ACCENT,
                        fontWeight: 750,
                      }}
                    >
                      {balance.totalAmount}€
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export const CHECK_BALANCE_TABLE_FRONT_COMPONENT_UNIVERSAL_IDENTIFIER =
  '57ebd235-56c4-43e0-99a1-ec58ff00d727';

export default defineFrontComponent({
  universalIdentifier: CHECK_BALANCE_TABLE_FRONT_COMPONENT_UNIVERSAL_IDENTIFIER,
  name: 'check-balance-table',
  description:
    'Kairos check balance: total and latest-month cards plus a per-month table with per-check detail.',
  component: CheckBalance,
});