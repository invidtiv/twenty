import { createHmac, timingSafeEqual } from 'crypto';
import { CoreApiClient } from 'twenty-client-sdk/core';
import { defineLogicFunction } from 'twenty-sdk/define';
import { type RoutePayload } from 'twenty-sdk/logic-function';

import { INGEST_APPLICATION_WEBHOOK_UNIVERSAL_IDENTIFIER } from 'src/constants/universal-identifiers';

type AnyMap = Record<string, unknown>;

type InboundApplicationPayload = {
  startupName?: string;
  companyName?: string;
  source?: string;
  campaign?: string;
  languageProfile?: string;
  notes?: string;
  receivedAt?: string;
  [key: string]: unknown;
};

type InboundStripePayload = {
  id?: string;
  type?: string;
  data?: { object?: Record<string, unknown> };
  created?: number;
  [key: string]: unknown;
};

type WebhookSource = 'TYPEFORM' | 'WEBFLOW' | 'STRIPE';

type WebhookRoutePayload = RoutePayload<InboundApplicationPayload | InboundStripePayload>;

type IntakeResponse = {
  success: boolean;
  source: string;
  id?: string;
  message: string;
  retryable?: boolean;
};

type NormalizedApplicationPayload = {
  startupName: string;
  campaignAttribution?: string;
  activeLanguageProfile: string;
  triageNotes?: string;
  intakeReceivedAt: string;
};

type NormalizedStripePayload = {
  ok: true;
  eventId: string;
  stripeType: string;
  stripeCustomerId: string;
  startupName: string;
  invoiceStatus: 'NOT_STARTED' | 'DRAFT' | 'SENT' | 'PAID' | 'OVERDUE';
  billingSchedule?: 'MONTHLY' | 'QUARTERLY' | 'ANNUAL';
  nextBillingDate?: string;
  subscriptionTier?: string;
  stripeTransactionHistory: Record<string, unknown>;
};

type FailedParse = { ok: false; reason: string; retryable?: boolean; skipped?: boolean };

type SignatureVerifier = (rawBody: string | null, headerValue?: string) => {
  ok: boolean;
  reason?: string;
};

const knownSources = new Set<string>(['TYPEFORM', 'WEBFLOW', 'STRIPE']);

const knownLanguageProfiles = new Set([
  'EN',
  'ES',
  'FR_FR_PARISIAN',
  'PT_PT_PRE_AO',
]);

const webhookSecretBySource = {
  TYPEFORM: 'QUIETSYSTEMS_TYPEFORM_WEBHOOK_SECRET',
  WEBFLOW: 'QUIETSYSTEMS_WEBFLOW_WEBHOOK_SECRET',
  STRIPE: 'QUIETSYSTEMS_STRIPE_WEBHOOK_SECRET',
} as const;

const signatureHeadersBySource = {
  TYPEFORM: ['typeform-signature', 'x-typeform-signature', 'Typeform-Signature'],
  WEBFLOW: ['webflow-signature', 'x-webflow-signature', 'Webflow-Signature'],
  STRIPE: ['stripe-signature', 'Stripe-Signature'],
} as const;

const stripeRelevantEventTypes = new Set([
  'checkout.session.completed',
  'payment_intent.succeeded',
  'invoice.paid',
  'invoice.payment_succeeded',
  'customer.subscription.created',
  'customer.subscription.updated',
  'customer.subscription.deleted',
  'charge.succeeded',
  'charge.failed',
]);

const normalizeOption = (
  value: string | undefined,
  knownValues: Set<string>,
  fallback?: string,
) => {
  const normalized = value?.trim().toUpperCase().replace(/-/g, '_');
  return normalized && knownValues.has(normalized) ? normalized : fallback;
};

const isRecord = (value: unknown): value is AnyMap => {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
};

const toString = (value: unknown): string | undefined => {
  if (typeof value === 'string') {
    const text = value.trim();
    return text.length > 0 ? text : undefined;
  }
  return undefined;
};

const toNumber = (value: unknown): number | undefined => {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value;
  }
  if (typeof value === 'string' && value.trim().length > 0) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : undefined;
  }
  return undefined;
};

const asObject = (value: unknown): AnyMap | undefined =>
  isRecord(value) ? value : undefined;

const getRawBodyForSignature = (event: {
  body: unknown;
  isBase64Encoded?: boolean;
  rawBody?: string;
}): string | null => {
  if (typeof event.rawBody === 'string') {
    return event.rawBody;
  }
  if (typeof event.body === 'string') {
    return event.isBase64Encoded
      ? Buffer.from(event.body, 'base64').toString('utf8')
      : event.body;
  }
  return null;
};

const getHeader = (headers: unknown, candidates: readonly string[]): string | undefined => {
  if (!isRecord(headers)) {
    return undefined;
  }

  for (const name of candidates) {
    const exact = headers[name];
    if (typeof exact === 'string' && exact.length > 0) {
      return exact;
    }

    const match = Object.entries(headers).find(
      ([key, value]) =>
        typeof value === 'string' &&
        key.toLowerCase() === name.toLowerCase() &&
        value.length > 0,
    );
    if (match) {
      return match[1] as string;
    }
  }

  return undefined;
};

const verifyHmac = (
  rawBody: string | null,
  header: string | undefined,
  secret: string,
): { ok: true } | { ok: false; reason: string } => {
  if (rawBody === null) {
    return {
      ok: false,
      reason:
        'raw request body is unavailable (the runtime parsed it as JSON); HMAC cannot be verified',
    };
  }

  if (!header) {
    return { ok: false, reason: 'missing signature header' };
  }

  const provided = header.startsWith('sha256=') ? header.slice('sha256='.length) : header;
  const expected = createHmac('sha256', secret).update(rawBody).digest('hex');

  if (provided.length !== expected.length) {
    return { ok: false, reason: 'signature length mismatch' };
  }

  const ok = timingSafeEqual(Buffer.from(provided, 'utf8'), Buffer.from(expected, 'utf8'));
  return ok
    ? { ok: true }
    : { ok: false, reason: 'signature mismatch' };
};

type StripeParsedHeader = { timestamp: string; signatures: string[] };

const parseStripeHeader = (
  header: string,
): { ok: true; parsed: StripeParsedHeader } | { ok: false; reason: string } => {
  const parts = header.split(',').map((part) => part.trim());
  const timestamp = parts
    .map((part) => part.split('=', 2))
    .find(([k]) => k === 't')?.[1];
  const signatures = parts
    .map((part) => part.split('=', 2))
    .filter(([k]) => k === 'v1')
    .map(([_, value]) => value)
    .filter((value): value is string => Boolean(value));

  if (!timestamp) {
    return { ok: false, reason: 'missing Stripe timestamp' };
  }
  if (signatures.length === 0) {
    return { ok: false, reason: 'missing Stripe signature(s)' };
  }

  return { ok: true, parsed: { timestamp, signatures } };
};

const verifyStripeSignature = (
  rawBody: string | null,
  header: string | undefined,
  secret: string,
  maxAgeMs = 5 * 60 * 1000,
): { ok: true } | { ok: false; reason: string } => {
  if (rawBody === null) {
    return {
      ok: false,
      reason:
        'raw request body is unavailable (the runtime parsed it as JSON); HMAC cannot be verified',
    };
  }

  if (!header) {
    return { ok: false, reason: 'missing Stripe-Signature header' };
  }

  const parsed = parseStripeHeader(header);
  if (!parsed.ok) {
    return parsed;
  }

  const timestampMs = Number(parsed.parsed.timestamp) * 1000;
  if (!Number.isFinite(timestampMs)) {
    return { ok: false, reason: 'invalid Stripe timestamp' };
  }

  const ageMs = Math.abs(Date.now() - timestampMs);
  if (ageMs > maxAgeMs) {
    return { ok: false, reason: 'Stripe signature timestamp is stale' };
  }

  const expected = createHmac('sha256', secret)
    .update(`${parsed.parsed.timestamp}.${rawBody}`)
    .digest('hex');

  const hasMatch = parsed.parsed.signatures.some((signature) => {
    if (signature.length !== expected.length) {
      return false;
    }
    try {
      return timingSafeEqual(Buffer.from(signature, 'utf8'), Buffer.from(expected, 'utf8'));
    } catch {
      return false;
    }
  });

  return hasMatch
    ? { ok: true }
    : { ok: false, reason: 'signature mismatch' };
};

const getVerifier = (source: 'TYPEFORM' | 'WEBFLOW' | 'STRIPE'): SignatureVerifier => {
  const secretName = webhookSecretBySource[source];
  const secret = process.env[secretName];

  if (!secret) {
    return (_rawBody, _headerValue) => ({ ok: true });
  }

  if (source === 'STRIPE') {
    return (rawBody, headerValue) => {
      const result = verifyStripeSignature(rawBody, headerValue, secret);
      return result.ok
        ? { ok: true }
        : { ok: false, reason: result.reason };
    };
  }

  return (rawBody, headerValue) => {
    const result = verifyHmac(rawBody, headerValue, secret);
    return result.ok ? { ok: true } : { ok: false, reason: result.reason };
  };
};

const readAnswerValue = (answer: AnyMap): string | undefined => {
  const direct =
    toString(answer.text) ??
    toString(answer.email) ??
    toString(answer.phone_number) ??
    toString(answer.url) ??
    toString(answer.date) ??
    toString(answer.long_text) ??
    (typeof answer.number === 'number' ? String(answer.number) : undefined) ??
    (typeof answer.boolean === 'boolean'
      ? answer.boolean
        ? 'true'
        : 'false'
      : undefined);

  if (direct) {
    return direct;
  }

  const choice = asObject(answer.choice);
  const dropdown = asObject(answer.dropdown);
  return (
    toString(choice?.label) ??
    toString(choice?.other) ??
    toString(dropdown?.label) ??
    toString(dropdown?.other) ??
    toString(dropdown?.value)
  );
};

const normalizeTypeformSubmission = (
  payload: InboundApplicationPayload,
): NormalizedApplicationPayload | FailedParse => {
  const formResponse = asObject(payload.form_response) ?? {};
  const answers = Array.isArray(formResponse.answers) ? formResponse.answers : [];

  let startupName = toString(payload.startupName) || toString(payload.companyName);
  let campaign = toString(payload.campaign);
  let language = toString(payload.languageProfile);
  let notes = toString(payload.notes);
  let receivedAt =
    toString(payload.receivedAt) ??
    toString(formResponse.submitted_at) ??
    toString(payload.created_at);

  for (const rawAnswer of answers) {
    const answer = asObject(rawAnswer);
    if (!answer) {
      continue;
    }

    const field = asObject(answer.field);
    const ref =
      toString(field?.ref) ||
      toString(field?.id) ||
      toString(field?.title) ||
      toString(answer.ref) ||
      toString(answer.key);

    if (!ref) {
      continue;
    }

    const key = ref.toLowerCase();
    const value = readAnswerValue(answer);
    if (!value) {
      continue;
    }

    if (!startupName && /(startup|company|business|firm|name)/i.test(key)) {
      startupName = value;
      continue;
    }

    if (!campaign && /(campaign|source|utm)/i.test(key)) {
      campaign = value;
      continue;
    }

    if (!language && /(language|lang)/i.test(key)) {
      language = value;
      continue;
    }

    if (!notes && /(note|comment|message|problem|goal|context)/i.test(key)) {
      notes = value;
    }
  }

  const hidden = asObject(formResponse.hidden) ?? asObject(payload.hidden) ?? {};
  if (!startupName) {
    startupName =
      toString(hidden.startupName) ||
      toString(hidden.companyName) ||
      toString(hidden.company);
  }

  if (!campaign) {
    campaign = toString(hidden.campaign) || toString(hidden.utm_campaign);
  }

  if (!language) {
    language = toString(hidden.languageProfile) || toString(hidden.language);
  }

  if (!notes) {
    notes = toString(formResponse.notes) || toString(hidden.notes);
  }

  if (!receivedAt) {
    receivedAt = new Date().toISOString();
  }

  if (!startupName) {
    return { ok: false, reason: 'Unable to infer startupName from Typeform payload' };
  }

  return {
    startupName,
    campaignAttribution: campaign,
    activeLanguageProfile:
      normalizeOption(language, knownLanguageProfiles, 'EN') ?? 'EN',
    triageNotes: notes,
    intakeReceivedAt: receivedAt,
  };
};

const normalizeWebflowSubmission = (
  payload: InboundApplicationPayload,
): NormalizedApplicationPayload | FailedParse => {
  const data = asObject(payload.data) ?? {};
  const nested = asObject(payload.payload) ?? {};

  const startupName =
    toString(payload.startupName) ||
    toString(payload.companyName) ||
    toString(data.companyName) ||
    toString(data.company) ||
    toString(data.name) ||
    toString((data.fields as AnyMap)?.companyName);

  if (!startupName) {
    return { ok: false, reason: 'Unable to infer startupName from Webflow payload' };
  }

  const campaign =
    toString(payload.campaign) ||
    toString(data.campaign) ||
    toString(data.utm_campaign) ||
    toString(nested.campaign);

  const notes =
    toString(payload.notes) ||
    toString(data.notes) ||
    toString(data.message) ||
    toString(nested.notes);

  const language =
    toString(payload.languageProfile) ||
    toString(data.languageProfile) ||
    toString(nested.languageProfile) ||
    'EN';

  const receivedAt =
    toString(payload.receivedAt) ||
    toString(data.receivedAt) ||
    toString(data.submittedAt) ||
    toString(data.createdOn) ||
    toString(nested.createdAt) ||
    new Date().toISOString();

  return {
    startupName,
    campaignAttribution: campaign,
    activeLanguageProfile:
      normalizeOption(language, knownLanguageProfiles, 'EN') ?? 'EN',
    triageNotes: notes,
    intakeReceivedAt: receivedAt,
  };
};

const mapInvoiceStatus = (
  stripeStatus: string | undefined,
  stripeType: string,
): 'NOT_STARTED' | 'DRAFT' | 'SENT' | 'PAID' | 'OVERDUE' => {
  const status = stripeStatus?.toLowerCase();

  if (status === 'paid' || status === 'succeeded' || stripeType === 'checkout.session.completed') {
    return 'PAID';
  }

  if (status === 'open') {
    return 'SENT';
  }

  if (
    status === 'past_due' ||
    status === 'unpaid' ||
    status === 'pastdue' ||
    status === 'payment_failed'
  ) {
    return 'OVERDUE';
  }

  if (status === 'draft') {
    return 'DRAFT';
  }

  return 'NOT_STARTED';
};

const mapSubscriptionTier = (tier: string | undefined): string | undefined => {
  const normalized = tier?.trim().toUpperCase();
  if (!normalized) return undefined;
  if (['STARTER', 'GROWTH', 'SCALE', 'ENTERPRISE'].includes(normalized)) {
    return normalized;
  }

  return undefined;
};

const readMetadataString = (value: unknown): string | undefined => {
  if (!isRecord(value)) {
    return toString(value);
  }

  return (
    toString(value.subscriptionTier) ??
    toString(value.subscription_tier) ??
    toString(value.planTier) ??
    toString(value.plan_tier) ??
    toString(value.tier)
  );
};

const readPlanMetadataTier = (stripeObject: AnyMap): string | undefined => {
  const plan = asObject(stripeObject.plan);
  const metadata = asObject(plan?.metadata);
  return readMetadataString(metadata);
};

const mapBillingSchedule = (
  schedule: string | undefined,
): 'MONTHLY' | 'QUARTERLY' | 'ANNUAL' | undefined => {
  const normalized = schedule?.trim().toLowerCase();
  if (normalized === 'annual' || normalized === 'year') {
    return 'ANNUAL';
  }
  if (normalized === 'quarterly' || normalized === 'quarter') {
    return 'QUARTERLY';
  }
  if (normalized === 'monthly' || normalized === 'month') {
    return 'MONTHLY';
  }

  return undefined;
};

const normalizeTimestampDate = (value: unknown): string | undefined => {
  const num = toNumber(value);
  if (num === undefined) {
    return undefined;
  }

  const normalized = num > 2_000_000_000 ? num : num * 1000;
  const date = new Date(normalized);
  if (Number.isNaN(date.getTime())) {
    return undefined;
  }

  return date.toISOString();
};

const normalizeStripeEvent = (
  payload: InboundStripePayload,
): NormalizedStripePayload | FailedParse => {
  const stripeType = toString(payload.type);
  if (!stripeType) {
    return { ok: false, reason: 'Missing Stripe event type', retryable: false };
  }

  if (!stripeRelevantEventTypes.has(stripeType)) {
    return {
      ok: false,
      reason: `Unsupported Stripe event type ${stripeType}`,
      retryable: false,
      skipped: true,
    };
  }

  const eventData = asObject(payload.data);
  const stripeObject = asObject(eventData?.object) ?? {};
  const stripeCustomerId =
    toString(stripeObject.customer) || toString(stripeObject.customerId);

  if (!stripeCustomerId) {
    return {
      ok: false,
      reason: `Missing customer on Stripe event ${stripeType}`,
      retryable: false,
    };
  }

  const metadata = asObject(stripeObject.metadata) ?? {};

  const startupName =
    toString(metadata.startupName) ||
    toString(metadata.companyName) ||
    toString(metadata.startup_name) ||
    toString(metadata.company_name) ||
    toString(stripeObject.client_reference_id) ||
    toString(stripeObject.customer_name) ||
    toString(stripeObject.description) ||
    `Stripe Customer ${stripeCustomerId}`;

  const stripeStatus = toString(stripeObject.status);

  return {
    ok: true,
    eventId: toString(payload.id) ?? `stripe-${stripeType}-${Date.now()}`,
    stripeType,
    stripeCustomerId,
    startupName,
    invoiceStatus: mapInvoiceStatus(stripeStatus, stripeType),
    billingSchedule: mapBillingSchedule(
      toString((stripeObject as { billing_cycle?: { interval?: unknown } }).billing_cycle?.interval) ||
        toString(stripeObject.billing) ||
        toString((stripeObject as { interval?: unknown }).interval) ||
        toString((stripeObject as { plan?: { interval?: unknown } }).plan?.interval),
    ),
    nextBillingDate: normalizeTimestampDate(
      toNumber((stripeObject as { current_period_end?: unknown }).current_period_end) ||
        toNumber((stripeObject as { period_end?: unknown }).period_end) ||
        toNumber((stripeObject as { billing_cycle_anchor?: unknown }).billing_cycle_anchor),
    ),
    subscriptionTier: mapSubscriptionTier(
      toString(metadata.subscriptionTier) ||
        toString(metadata.subscription_tier) ||
        toString(metadata.planTier) ||
        toString(metadata.plan_tier) ||
        readPlanMetadataTier(stripeObject),
    ),
    stripeTransactionHistory: {
      eventId: toString(payload.id) || undefined,
      eventType: stripeType,
      receivedAt: new Date().toISOString(),
      stripeObjectType: toString(stripeObject.object) ?? undefined,
      status: stripeStatus ?? undefined,
      periodEnd:
        normalizeTimestampDate(
          (stripeObject as { current_period_end?: unknown }).current_period_end,
        ) ?? undefined,
      amount:
        toNumber((stripeObject as { amount_paid?: unknown }).amount_paid) ??
        toNumber((stripeObject as { amount_total?: unknown }).amount_total),
      currency: toString((stripeObject as { currency?: unknown }).currency) || undefined,
    },
  };
};

export const handler = async (
  payload: WebhookRoutePayload,
): Promise<IntakeResponse> => {
  if (!payload.body) {
    return {
      success: false,
      source: 'UNKNOWN',
      message: 'Missing request body.',
      retryable: false,
    };
  }

  const body = asObject(payload.body) as InboundApplicationPayload;

  const rawBody = getRawBodyForSignature(payload);

  const explicitSource = normalizeOption(
    toString(body.source),
    knownSources,
  );

  const source =
    explicitSource
      ? (explicitSource as WebhookSource)
    : toString((body as InboundStripePayload).type) !== undefined &&
        isRecord((body as InboundStripePayload).data)
      ? 'STRIPE'
      : isRecord(body.form_response)
        ? 'TYPEFORM'
        : isRecord(body.data)
          ? 'WEBFLOW'
          : undefined;

  if (source === undefined) {
    return {
      success: false,
      source: 'UNKNOWN',
      message: 'Unsupported source.',
      retryable: false,
    };
  }

  const verificationTarget = source;
  const verifier =
    verificationTarget === 'STRIPE'
      ? getVerifier('STRIPE')
      : verificationTarget === 'WEBFLOW'
        ? getVerifier('WEBFLOW')
        : getVerifier('TYPEFORM');

  const signatureHeader = getHeader(
    payload.headers,
    verificationTarget === 'STRIPE'
      ? signatureHeadersBySource.STRIPE
      : verificationTarget === 'WEBFLOW'
        ? signatureHeadersBySource.WEBFLOW
        : signatureHeadersBySource.TYPEFORM,
  );

  const verification = verifier(rawBody, signatureHeader);
  const hasSecret =
    process.env[
      webhookSecretBySource[verificationTarget === 'STRIPE'
        ? 'STRIPE'
        : verificationTarget === 'WEBFLOW'
          ? 'WEBFLOW'
          : 'TYPEFORM']
    ];
  if (hasSecret && !verification.ok) {
    return {
      success: false,
      source: verificationTarget,
      message: `Invalid webhook signature (${verification.reason})`,
      retryable: false,
    };
  }
  if (!hasSecret) {
    console.warn(
      `[quietsystems-intake] ${verificationTarget} signature verification skipped (no secret env var set)`,
    );
  }

  const client = new CoreApiClient() as any;

  try {
    if (source === 'STRIPE') {
      const stripePayload = normalizeStripeEvent(body as InboundStripePayload);
      if (!stripePayload.ok) {
        return {
          success: false,
          source: 'STRIPE',
          message: stripePayload.reason,
          retryable: stripePayload.retryable,
        };
      }

      const {
        eventId,
        stripeType,
        stripeCustomerId,
        invoiceStatus,
        billingSchedule,
        nextBillingDate,
        startupName,
        subscriptionTier,
        stripeTransactionHistory,
      } = stripePayload;

      const { createBillingAccount } = await client.mutation({
        createBillingAccount: {
          __args: {
            data: {
              name: startupName,
              stripeCustomerId,
              invoiceStatus,
              billingSchedule,
              nextBillingDate: nextBillingDate ?? null,
              subscriptionTier: subscriptionTier ?? null,
              stripeTransactionHistory,
            },
          },
          id: true,
        },
      });

      if (!createBillingAccount?.id) {
        return {
          success: false,
          source: 'STRIPE',
          message: 'No billing account ID returned from createBillingAccount mutation.',
          retryable: true,
        };
      }

      return {
        success: true,
        source: 'STRIPE',
        id: createBillingAccount.id,
        message: `Billing account recorded for ${stripeCustomerId} (${stripeType}, event=${eventId}).`,
        retryable: false,
      };
    }

    const normalizedApplication =
      source === 'WEBFLOW'
        ? normalizeWebflowSubmission(body)
        : normalizeTypeformSubmission(body);

    if (!('startupName' in normalizedApplication)) {
      const failure = normalizedApplication as FailedParse;
      return {
        success: false,
        source,
        message: failure.reason,
        retryable: failure.retryable,
      };
    }

    const {
      startupName,
      campaignAttribution,
      activeLanguageProfile,
      triageNotes,
      intakeReceivedAt,
    } = normalizedApplication as NormalizedApplicationPayload;

    const { createStartupApplication } = await client.mutation({
      createStartupApplication: {
        __args: {
          data: {
            name: startupName,
            source,
            applicantStatus: 'RECEIVED',
            campaignAttribution: campaignAttribution ?? null,
            activeLanguageProfile,
            triageNotes: triageNotes ?? null,
            intakeReceivedAt,
          },
        },
        id: true,
      },
    });

    if (!createStartupApplication?.id) {
      return {
        success: false,
        source,
        message: 'No startup application ID returned from createStartupApplication mutation.',
        retryable: true,
      };
    }

    return {
      success: true,
      source,
      id: createStartupApplication.id,
      message: `Startup application recorded for ${startupName}.`,
      retryable: false,
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Unknown execution error';
    console.error('[quietsystems-intake] execution failure', message);

    return {
      success: false,
      source,
      message: `Failed to persist payload: ${message}`,
      retryable: true,
    };
  }
};

export default defineLogicFunction({
  universalIdentifier: INGEST_APPLICATION_WEBHOOK_UNIVERSAL_IDENTIFIER,
  name: 'quietsystems-ingest-application-webhook',
  description:
    'Creates Startup Application records from Typeform/Webflow payloads and Billing Account records from Stripe checkout/payment events.',
  timeoutSeconds: 10,
  handler,
  httpRouteTriggerSettings: {
    path: '/quietsystems/intake/application',
    httpMethod: 'POST',
    isAuthRequired: false,
    forwardedRequestHeaders: [
      'typeform-signature',
      'x-typeform-signature',
      'webflow-signature',
      'x-webflow-signature',
      'stripe-signature',
      'Stripe-Signature',
    ],
  },
});
