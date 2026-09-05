import { kairosId } from 'src/constants/kairos-id';
export { OPERATIONS_TIMELINE_FRONT_COMPONENT_ID } from 'src/constants/front-component-identifiers';

const field = (objectName: string, fieldName: string) =>
  kairosId(`object.${objectName}.field.${fieldName}`);

export const APPLICATION_ID = kairosId('application');
export const DEFAULT_ROLE_ID = kairosId('role.default');
export const KAIROS_API_ROLE_ID = kairosId('role.kairosApi');
export const NAVIGATION_FOLDER_ID = kairosId('navigation.folder');
export const OPERATIONS_TIMELINE_PAGE_LAYOUT_ID = kairosId(
  'pageLayout.operationsTimeline',
);
export const OPERATIONS_TIMELINE_PAGE_TAB_ID = kairosId(
  'pageLayout.operationsTimeline.tab',
);
export const OPERATIONS_TIMELINE_WIDGET_ID = kairosId(
  'pageLayout.operationsTimeline.widget',
);

export const PROPERTY = {
  object: kairosId('object.property'),
  fields: {
    name: field('property', 'name'),
    externalPropertyId: field('property', 'externalPropertyId'),
    propertyAddress: field('property', 'propertyAddress'),
    mapUrl: field('property', 'mapUrl'),
    defaultCheckinNotes: field('property', 'defaultCheckinNotes'),
    accessNotes: field('property', 'accessNotes'),
    accessSecretReference: field('property', 'accessSecretReference'),
    active: field('property', 'active'),
    timezone: field('property', 'timezone'),
    metadata: field('property', 'metadata'),
    bookings: field('property', 'bookings'),
  },
} as const;

export const BOOKING = {
  object: kairosId('object.booking'),
  fields: {
    name: field('booking', 'name'),
    bookingId: field('booking', 'bookingId'),
    source: field('booking', 'source'),
    externalBookingId: field('booking', 'externalBookingId'),
    sourceKey: field('booking', 'sourceKey'),
    sourceUrl: field('booking', 'sourceUrl'),
    sourceLastSeenAt: field('booking', 'sourceLastSeenAt'),
    guest: field('booking', 'guest'),
    property: field('booking', 'property'),
    contactMethods: field('booking', 'contactMethods'),
    preferredContactMethod: field('booking', 'preferredContactMethod'),
    serviceEvents: field('booking', 'serviceEvents'),
    communications: field('booking', 'communications'),
    whatsappContactWatches: field('booking', 'whatsappContactWatches'),
    sourceRecords: field('booking', 'sourceRecords'),
    tasks: field('booking', 'tasks'),
    checkinAt: field('booking', 'checkinAt'),
    checkoutAt: field('booking', 'checkoutAt'),
    arrivalWindowStart: field('booking', 'arrivalWindowStart'),
    arrivalWindowEnd: field('booking', 'arrivalWindowEnd'),
    timezone: field('booking', 'timezone'),
    status: field('booking', 'status'),
    readinessStatus: field('booking', 'readinessStatus'),
    riskLevel: field('booking', 'riskLevel'),
    needsHumanReview: field('booking', 'needsHumanReview'),
    missingInformation: field('booking', 'missingInformation'),
    lastReviewedAt: field('booking', 'lastReviewedAt'),
    aiSummary: field('booking', 'aiSummary'),
    internalNotes: field('booking', 'internalNotes'),
    specialInstructions: field('booking', 'specialInstructions'),
    rawMetadata: field('booking', 'rawMetadata'),
  },
} as const;

export const WHATSAPP_CONTACT_WATCH = {
  object: kairosId('object.whatsappContactWatch'),
  fields: {
    name: field('whatsappContactWatch', 'name'),
    watchKey: field('whatsappContactWatch', 'watchKey'),
    booking: field('whatsappContactWatch', 'booking'),
    serviceEventId: field('whatsappContactWatch', 'serviceEventId'),
    contactMethodId: field('whatsappContactWatch', 'contactMethodId'),
    normalizedPhone: field('whatsappContactWatch', 'normalizedPhone'),
    activatedAt: field('whatsappContactWatch', 'activatedAt'),
    activationWatermarkMessageId: field('whatsappContactWatch', 'activationWatermarkMessageId'),
    monitorUntil: field('whatsappContactWatch', 'monitorUntil'),
    status: field('whatsappContactWatch', 'status'),
    guestName: field('whatsappContactWatch', 'guestName'),
    propertyName: field('whatsappContactWatch', 'propertyName'),
    checkinAt: field('whatsappContactWatch', 'checkinAt'),
    checkoutAt: field('whatsappContactWatch', 'checkoutAt'),
    metadata: field('whatsappContactWatch', 'metadata'),
  },
} as const;

export const CONTACT_METHOD = {
  object: kairosId('object.bookingContactMethod'),
  fields: {
    name: field('bookingContactMethod', 'name'),
    sourceContactKey: field('bookingContactMethod', 'sourceContactKey'),
    booking: field('bookingContactMethod', 'booking'),
    person: field('bookingContactMethod', 'person'),
    contactType: field('bookingContactMethod', 'contactType'),
    contactValue: field('bookingContactMethod', 'contactValue'),
    source: field('bookingContactMethod', 'source'),
    sourceRecord: field('bookingContactMethod', 'sourceRecord'),
    priority: field('bookingContactMethod', 'priority'),
    isPreferred: field('bookingContactMethod', 'isPreferred'),
    preferenceMode: field('bookingContactMethod', 'preferenceMode'),
    confidence: field('bookingContactMethod', 'confidence'),
    lastVerifiedAt: field('bookingContactMethod', 'lastVerifiedAt'),
    validFrom: field('bookingContactMethod', 'validFrom'),
    validUntil: field('bookingContactMethod', 'validUntil'),
    notes: field('bookingContactMethod', 'notes'),
    preferredForBookings: field('bookingContactMethod', 'preferredForBookings'),
  },
} as const;

export const SERVICE_EVENT = {
  object: kairosId('object.serviceEvent'),
  fields: {
    title: field('serviceEvent', 'title'),
    sourceEventKey: field('serviceEvent', 'sourceEventKey'),
    booking: field('serviceEvent', 'booking'),
    eventType: field('serviceEvent', 'eventType'),
    startsAt: field('serviceEvent', 'startsAt'),
    endsAt: field('serviceEvent', 'endsAt'),
    status: field('serviceEvent', 'status'),
    location: field('serviceEvent', 'location'),
    notes: field('serviceEvent', 'notes'),
    source: field('serviceEvent', 'source'),
    externalEventId: field('serviceEvent', 'externalEventId'),
    kairosRemindersEnabled: field('serviceEvent', 'kairosRemindersEnabled'),
    externalCalendarProvider: field('serviceEvent', 'externalCalendarProvider'),
    externalCalendarId: field('serviceEvent', 'externalCalendarId'),
    externalCalendarEventId: field('serviceEvent', 'externalCalendarEventId'),
    lastCalendarSyncAt: field('serviceEvent', 'lastCalendarSyncAt'),
    calendarSyncStatus: field('serviceEvent', 'calendarSyncStatus'),
  },
} as const;

export const COMMUNICATION = {
  object: kairosId('object.communication'),
  fields: {
    summary: field('communication', 'summary'),
    communicationKey: field('communication', 'communicationKey'),
    booking: field('communication', 'booking'),
    person: field('communication', 'person'),
    direction: field('communication', 'direction'),
    channel: field('communication', 'channel'),
    occurredAt: field('communication', 'occurredAt'),
    rawSourceRecord: field('communication', 'rawSourceRecord'),
    actionRequired: field('communication', 'actionRequired'),
    processedByKairos: field('communication', 'processedByKairos'),
    confidence: field('communication', 'confidence'),
    metadata: field('communication', 'metadata'),
  },
} as const;

export const SOURCE_RECORD = {
  object: kairosId('object.sourceRecord'),
  fields: {
    name: field('sourceRecord', 'name'),
    sourceType: field('sourceRecord', 'sourceType'),
    externalId: field('sourceRecord', 'externalId'),
    sourceKey: field('sourceRecord', 'sourceKey'),
    receivedAt: field('sourceRecord', 'receivedAt'),
    sourceTimestamp: field('sourceRecord', 'sourceTimestamp'),
    booking: field('sourceRecord', 'booking'),
    contactMethods: field('sourceRecord', 'contactMethods'),
    communications: field('sourceRecord', 'communications'),
    parseStatus: field('sourceRecord', 'parseStatus'),
    contentHash: field('sourceRecord', 'contentHash'),
    rawText: field('sourceRecord', 'rawText'),
    rawMetadata: field('sourceRecord', 'rawMetadata'),
    parserVersion: field('sourceRecord', 'parserVersion'),
    error: field('sourceRecord', 'error'),
  },
} as const;

export const PERSON_FIELDS = {
  globalContactId: field('person', 'globalContactId'),
  personType: field('person', 'personType'),
  preferredLanguage: field('person', 'preferredLanguage'),
  preferredContactMethod: field('person', 'preferredContactMethod'),
  contactNotes: field('person', 'contactNotes'),
  lastVerifiedAt: field('person', 'lastVerifiedAt'),
  guestBookings: field('person', 'guestBookings'),
  bookingContactMethods: field('person', 'bookingContactMethods'),
  communications: field('person', 'communications'),
} as const;

export const TASK_BOOKING_FIELD = field('task', 'booking');

export const viewId = (viewName: string) => kairosId(`view.${viewName}`);
export const viewEntityId = (viewName: string, entityName: string) =>
  kairosId(`view.${viewName}.${entityName}`);
export const navigationId = (itemName: string) =>
  kairosId(`navigation.${itemName}`);
