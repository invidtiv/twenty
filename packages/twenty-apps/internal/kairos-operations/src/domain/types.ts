export type RecordData = { id: string } & Record<string, unknown>;
export type Selection = { [fieldName: string]: true | Selection };
export type RecordFilter = Record<string, unknown>;

export type PersonInput = {
  globalContactId: string;
  firstName: string;
  lastName?: string;
  personType?: string[];
  preferredLanguage?: string;
  preferredContactMethod?: string;
  contactNotes?: string;
  lastVerifiedAt?: string;
  emails?: Record<string, unknown>;
  phones?: Record<string, unknown>;
};

export type PropertyInput = {
  externalPropertyId: string;
  name: string;
  address?: string;
  mapUrl?: string;
  defaultCheckinNotes?: string;
  accessNotes?: string;
  accessSecretReference?: string;
  active?: boolean;
  timezone?: string;
  metadata?: Record<string, unknown>;
};

export type BookingInput = {
  source: string;
  externalBookingId: string;
  name?: string;
  sourceUrl?: string;
  sourceLastSeenAt?: string;
  guestId?: string;
  propertyId?: string;
  checkinAt?: string | null;
  checkoutAt?: string;
  arrivalWindowStart?: string;
  arrivalWindowEnd?: string;
  timezone?: string;
  status?: string;
  riskLevel?: string;
  needsHumanReview?: boolean;
  aiSummary?: string;
  internalNotes?: string;
  specialInstructions?: string;
  rawMetadata?: Record<string, unknown>;
};

export type ContactMethodInput = {
  bookingId: string;
  source: string;
  contactType: string;
  contactValue: string;
  sourceSlot?: string;
  personId?: string;
  sourceRecordId?: string;
  priority?: number;
  confidence?: string;
  lastVerifiedAt?: string;
  validFrom?: string;
  validUntil?: string;
  notes?: string;
  makePreferred?: boolean;
};

export type ContactSnapshotInput = {
  bookingId: string;
  source: string;
  activeContacts: Array<{
    contactType: string;
    sourceSlot: string;
  }>;
};

export type ServiceEventInput = {
  bookingId: string;
  source: string;
  eventType: string;
  title: string;
  startsAt: string;
  endsAt?: string;
  status?: string;
  location?: string;
  notes?: string;
  externalEventId?: string;
  sourceSlot?: string;
  kairosRemindersEnabled?: boolean;
};

export type SourceRecordInput = {
  sourceType: string;
  externalId: string;
  receivedAt?: string;
  sourceTimestamp?: string;
  bookingId?: string;
  parseStatus?: string;
  contentHash?: string;
  rawText?: string;
  rawMetadata?: Record<string, unknown>;
  parserVersion?: string;
  error?: string;
};

export type CommunicationInput = {
  bookingId: string;
  externalId?: string;
  personId?: string;
  direction: string;
  channel: string;
  occurredAt: string;
  summary: string;
  rawSourceRecordId?: string;
  actionRequired?: boolean;
  processedByKairos?: boolean;
  confidence?: string;
  metadata?: Record<string, unknown>;
};


export type PreferredContact = {
  id: string;
  contactType: string;
  contactValue: string;
  source: string;
  confidence: string;
  isPreferred: boolean;
  preferenceMode: string;
  priority: number;
  validFrom?: string;
  validUntil?: string;
};
