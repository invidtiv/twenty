import { createHash, randomUUID } from 'node:crypto';
import type { RecordsRepository } from 'src/domain/types';
import { appendMissingInformation, bookingSelection, compactRecord, contactSelection, emailAssociationSelection, emailMessageSelection, emailParticipantSelection, emailThreadSelection, linkValue, normalizeInternationalPhone, normalizeOption, objectValue, recordSelection, requiredText, serviceEventSelection, stableBookingUuid, textValue, timelineBookingSelection, timelinePropertySelection, validDate, validLimit, whatsappWatchSelection } from 'src/domain/utils';
import { getZonedDayBounds } from 'src/domain/timezone';
import { buildExpectedServiceEvents } from 'src/domain/expected-service-events';
import { selectPreferredContact } from 'src/domain/contact-selection';

export class KairosOperationsService {
  constructor(repository: RecordsRepository, now: () => Date = () => new Date()) {
    this.repository = repository;
    this.now = now;
  }
  repository;
  now;
  async upsertPerson(input) {
    return this.repository.upsert(
      "people",
      compactRecord({
        globalContactId: requiredText(input.globalContactId, "globalContactId"),
        name: {
          firstName: requiredText(input.firstName, "firstName"),
          lastName: input.lastName?.trim() ?? ""
        },
        personType: input.personType?.map(normalizeOption),
        preferredLanguage: input.preferredLanguage,
        preferredContactMethod: input.preferredContactMethod ? normalizeOption(input.preferredContactMethod) : void 0,
        contactNotes: input.contactNotes,
        lastVerifiedAt: input.lastVerifiedAt,
        emails: input.emails,
        phones: input.phones
      }),
      {
        id: true,
        globalContactId: true,
        name: { firstName: true, lastName: true }
      }
    );
  }
  async upsertProperty(input) {
    return this.repository.upsert(
      "properties",
      compactRecord({
        externalPropertyId: requiredText(
          input.externalPropertyId,
          "externalPropertyId"
        ),
        name: requiredText(input.name, "name"),
        propertyAddress: input.address,
        mapUrl: linkValue(input.mapUrl),
        defaultCheckinNotes: input.defaultCheckinNotes,
        accessNotes: input.accessNotes,
        accessSecretReference: input.accessSecretReference,
        active: input.active ?? true,
        timezone: input.timezone ?? "Europe/Lisbon",
        metadata: input.metadata
      }),
      { id: true, externalPropertyId: true, name: true }
    );
  }
  async upsertBooking(input) {
    const source = normalizeOption(input.source);
    const externalBookingId = requiredText(
      input.externalBookingId,
      "externalBookingId"
    );
    const sourceKey = `${source}:${externalBookingId}`;
    const [existing] = await this.repository.findMany(
      "bookings",
      { filter: { sourceKey: { eq: sourceKey } }, first: 1 },
      bookingSelection
    );
    const booking = await this.repository.upsert(
      "bookings",
      compactRecord({
        bookingId: textValue(existing, "bookingId") ?? stableBookingUuid(sourceKey),
        source,
        externalBookingId,
        sourceKey,
        name: input.name?.trim() || (existing ? void 0 : `${source} ${externalBookingId}`),
        sourceUrl: linkValue(input.sourceUrl),
        sourceLastSeenAt: input.sourceLastSeenAt ?? this.now().toISOString(),
        guestId: input.guestId,
        propertyId: input.propertyId,
        checkinAt: input.checkinAt,
        checkoutAt: input.checkoutAt,
        arrivalWindowStart: input.arrivalWindowStart,
        arrivalWindowEnd: input.arrivalWindowEnd,
        timezone: input.timezone ?? (existing ? void 0 : "Europe/Lisbon"),
        status: input.status ? normalizeOption(input.status) : existing ? void 0 : "NEW",
        riskLevel: input.riskLevel ? normalizeOption(input.riskLevel) : void 0,
        needsHumanReview: input.needsHumanReview,
        aiSummary: input.aiSummary,
        internalNotes: input.internalNotes,
        specialInstructions: input.specialInstructions,
        rawMetadata: input.rawMetadata
      }),
      bookingSelection
    );
    return this.reconcileBooking(booking.id);
  }
  async persistContactMethod(input) {
    const source = normalizeOption(input.source);
    const contactType = normalizeOption(input.contactType);
    const sourceSlot = input.sourceSlot?.trim() || "PRIMARY";
    const sourceContactKey = `${input.bookingId}:${source}:${contactType}:${sourceSlot}`;
    const [existing] = await this.repository.findMany(
      "bookingContactMethods",
      { filter: { sourceContactKey: { eq: sourceContactKey } }, first: 1 },
      contactSelection
    );
    return this.repository.upsert(
      "bookingContactMethods",
      compactRecord({
        sourceContactKey,
        name: `${source} ${contactType}: ${requiredText(input.contactValue, "contactValue")}`,
        bookingId: requiredText(input.bookingId, "bookingId"),
        personId: input.personId,
        contactType,
        contactValue: input.contactValue.trim(),
        source,
        sourceRecordId: input.sourceRecordId,
        priority: input.priority ?? (existing ? void 0 : 100),
        confidence: input.confidence ? normalizeOption(input.confidence) : existing ? void 0 : "UNVERIFIED",
        lastVerifiedAt: input.lastVerifiedAt,
        validFrom: input.validFrom,
        validUntil: input.validUntil,
        notes: input.notes,
        ...input.makePreferred === true ? { isPreferred: true, preferenceMode: "MANUAL" } : {}
      }),
      contactSelection
    );
  }
  async upsertBookingContactMethod(input) {
    const contact = await this.persistContactMethod(input);
    if (input.makePreferred === true) {
      await this.setPreferredContact(input.bookingId, contact.id);
    }
    await this.reconcileBooking(input.bookingId);
    return contact;
  }
  async reconcileBookingContactMethods(input) {
    const bookingId = requiredText(input.bookingId, "bookingId");
    const source = normalizeOption(input.source);
    const activeSourceKeys = new Set(
      input.activeContacts.map(
        ({ contactType, sourceSlot }) => [
          bookingId,
          source,
          normalizeOption(contactType),
          requiredText(sourceSlot, "sourceSlot")
        ].join(":")
      )
    );
    const sourceContacts = await this.repository.findMany(
      "bookingContactMethods",
      {
        filter: {
          bookingId: { eq: bookingId },
          source: { eq: source }
        },
        first: 100
      },
      contactSelection
    );
    for (const contact of sourceContacts) {
      const sourceContactKey = textValue(contact, "sourceContactKey");
      const isActive = sourceContactKey ? activeSourceKeys.has(sourceContactKey) : false;
      const validUntil = textValue(contact, "validUntil");
      if (isActive && validUntil) {
        await this.repository.update(
          "bookingContactMethod",
          contact.id,
          { validUntil: null },
          contactSelection
        );
      }
      if (!isActive && !validUntil) {
        await this.repository.update(
          "bookingContactMethod",
          contact.id,
          {
            validUntil: this.now().toISOString(),
            isPreferred: false,
            preferenceMode: "POLICY"
          },
          contactSelection
        );
      }
    }
    return this.reconcileBooking(bookingId);
  }
  async setPreferredContact(bookingId, contactMethodId) {
    const contacts = await this.getContactRecords(bookingId);
    const selected = contacts.find((contact) => contact.id === contactMethodId);
    if (!selected) {
      throw new Error("Contact method does not belong to the booking");
    }
    for (const contact of contacts) {
      const shouldBePreferred = contact.id === contactMethodId;
      await this.repository.update(
        "bookingContactMethod",
        contact.id,
        {
          isPreferred: shouldBePreferred,
          preferenceMode: shouldBePreferred ? "MANUAL" : "POLICY"
        },
        contactSelection
      );
    }
    await this.repository.update(
      "booking",
      bookingId,
      { preferredContactMethodId: contactMethodId },
      bookingSelection
    );
    return {
      ...selectPreferredContact(
        contacts.map((contact) => ({
          ...contact,
          isPreferred: contact.id === contactMethodId,
          preferenceMode: contact.id === contactMethodId ? "MANUAL" : "POLICY"
        })),
        this.now()
      )
    };
  }
  async upsertServiceEvent(input) {
    const source = normalizeOption(input.source);
    const eventType = normalizeOption(input.eventType);
    const sourceSlot = input.externalEventId ?? input.sourceSlot ?? eventType;
    const sourceEventKey = `${input.bookingId}:${source}:${sourceSlot}`;
    const [existing] = await this.repository.findMany(
      "serviceEvents",
      { filter: { sourceEventKey: { eq: sourceEventKey } }, first: 1 },
      { id: true, sourceEventKey: true, status: true }
    );
    return this.repository.upsert(
      "serviceEvents",
      compactRecord({
        sourceEventKey,
        bookingId: requiredText(input.bookingId, "bookingId"),
        eventType,
        title: requiredText(input.title, "title"),
        startsAt: requiredText(input.startsAt, "startsAt"),
        endsAt: input.endsAt,
        status: input.status ? normalizeOption(input.status) : existing ? void 0 : "SCHEDULED",
        location: input.location,
        notes: input.notes,
        source,
        externalEventId: input.externalEventId,
        kairosRemindersEnabled: input.kairosRemindersEnabled ?? true
      }),
      { id: true, sourceEventKey: true, eventType: true, startsAt: true }
    );
  }
  async completeServiceEventById(eventId, expectedStartsAt) {
    const id = requiredText(eventId, "eventId");
    const expected = requiredText(expectedStartsAt, "expectedStartsAt");
    const [event] = await this.repository.findMany(
      "serviceEvents",
      { filter: { id: { eq: id } }, first: 1 },
      { id: true, startsAt: true, status: true }
    );
    if (!event) throw new Error("Service Event not found");
    const currentTime = Date.parse(textValue(event, "startsAt") ?? "");
    const expectedTime = Date.parse(expected);
    if (!Number.isFinite(currentTime) || !Number.isFinite(expectedTime) || currentTime !== expectedTime) {
      throw new Error("Service Event occurrence changed");
    }
    const status = textValue(event, "status");
    if (status === "CANCELLED") throw new Error("Service Event is cancelled");
    if (status === "COMPLETED") return event;
    const [completed] = await this.repository.updateMany(
      "serviceEvents",
      {
        id: { eq: id },
        startsAt: { eq: textValue(event, "startsAt") },
        status: { eq: status }
      },
      { status: "COMPLETED" },
      { id: true, startsAt: true, status: true }
    );
    if (!completed) throw new Error("Service Event occurrence changed");
    return completed;
  }
  async confirmWelcomeSent(eventId, expectedStartsAt, confirmedAt, activationWatermarkMessageId) {
    const id = requiredText(eventId, "eventId");
    const [event] = await this.repository.findMany(
      "serviceEvents",
      { filter: { id: { eq: id } }, first: 1 },
      serviceEventSelection
    );
    if (!event) throw new Error("Service Event not found");
    if (textValue(event, "eventType") !== "GUEST_CONTACT_DEADLINE") {
      throw new Error("welcome confirmation requires a GUEST_CONTACT_DEADLINE event");
    }
    const eventTime = Date.parse(textValue(event, "startsAt") ?? "");
    const expectedTime = Date.parse(requiredText(expectedStartsAt, "expectedStartsAt"));
    if (!Number.isFinite(eventTime) || !Number.isFinite(expectedTime) || eventTime !== expectedTime) {
      throw new Error("Service Event occurrence changed");
    }
    const watchKey = `WELCOME_SENT:${id}`;
    const [existingWatch] = await this.repository.findMany(
      "whatsappContactWatches",
      { filter: { watchKey: { eq: watchKey } }, first: 1 },
      whatsappWatchSelection
    );
    const existingStatus = textValue(existingWatch, "status");
    if (existingStatus === "ACTIVE") {
      if (textValue(event, "status") !== "COMPLETED") {
        throw new Error("active WhatsApp watch has an incomplete activation event");
      }
      return { event, watch: existingWatch };
    }
    if (existingWatch && existingStatus !== "PENDING") {
      throw new Error(`WhatsApp watch cannot be reactivated from ${existingStatus}`);
    }
    let watchData;
    {
      const bookingId = requiredText(textValue(event, "bookingId") ?? "", "bookingId");
      const booking = await this.getBooking(bookingId);
      if (event.kairosRemindersEnabled === false) {
        throw new Error("Kairos reminders are disabled for this booking");
      }
      const preferred = await this.getPreferredContact(bookingId);
      if (!preferred || !["PHONE", "WHATSAPP"].includes(preferred.contactType)) {
        throw new Error("booking requires a preferred WhatsApp or phone contact");
      }
      const normalizedPhone = normalizeInternationalPhone(preferred.contactValue);
      const checkoutAt = requiredText(textValue(booking, "checkoutAt") ?? "", "checkoutAt");
      const activation = validDate(confirmedAt, "confirmedAt").toISOString();
      if (!Number.isSafeInteger(activationWatermarkMessageId) || activationWatermarkMessageId < 0) {
        throw new Error("activationWatermarkMessageId must be a non-negative integer");
      }
      const propertyId = textValue(booking, "propertyId");
      const [property] = propertyId ? await this.repository.findMany(
        "properties",
        { filter: { id: { eq: propertyId } }, first: 1 },
        { id: true, name: true }
      ) : [];
      watchData = {
        name: `WhatsApp watch \u2014 ${textValue(booking, "name") ?? bookingId}`,
        watchKey,
        bookingId,
        serviceEventId: id,
        contactMethodId: preferred.id,
        normalizedPhone,
        activatedAt: activation,
        activationWatermarkMessageId,
        monitorUntil: checkoutAt,
        guestName: textValue(booking, "name") ?? "",
        propertyName: textValue(property, "name") ?? "",
        checkinAt: textValue(booking, "checkinAt"),
        checkoutAt,
        metadata: {
          contactSource: preferred.source,
          contactConfidence: preferred.confidence,
          expectedStartsAt
        }
      };
      await this.repository.upsert(
        "whatsappContactWatches",
        { ...watchData, status: "PENDING" },
        whatsappWatchSelection
      );
    }
    const completed = await this.completeServiceEventById(id, expectedStartsAt);
    const watch = await this.repository.upsert(
      "whatsappContactWatches",
      { ...watchData, status: "ACTIVE" },
      whatsappWatchSelection
    );
    return { event: completed, watch };
  }
  async getActiveWhatsappContactWatches(at) {
    const instant = validDate(at, "at").getTime();
    const records = await this.repository.findMany(
      "whatsappContactWatches",
      { filter: { status: { eq: "ACTIVE" } }, first: 500 },
      whatsappWatchSelection
    );
    const active = [];
    for (const watch of records) {
      const activated = Date.parse(textValue(watch, "activatedAt") ?? "");
      const until = Date.parse(textValue(watch, "monitorUntil") ?? "");
      if (!Number.isFinite(activated) || !Number.isFinite(until) || instant < activated || instant > until) continue;
      const [activationEvent] = await this.repository.findMany(
        "serviceEvents",
        { filter: { id: { eq: textValue(watch, "serviceEventId") } }, first: 1 },
        { id: true, startsAt: true, status: true, kairosRemindersEnabled: true }
      );
      const metadata = objectValue(watch, "metadata");
      const expectedStartsAt = typeof metadata?.expectedStartsAt === "string" ? metadata.expectedStartsAt : void 0;
      if (!activationEvent || textValue(activationEvent, "status") !== "COMPLETED" || activationEvent.kairosRemindersEnabled === false || expectedStartsAt && Date.parse(textValue(activationEvent, "startsAt") ?? "") !== Date.parse(expectedStartsAt)) continue;
      const booking = await this.getBooking(requiredText(textValue(watch, "bookingId") ?? "", "bookingId"));
      if (textValue(booking, "status") === "CANCELLED") continue;
      const preferred = await this.getPreferredContact(booking.id);
      if (!preferred || preferred.id !== textValue(watch, "contactMethodId")) continue;
      let currentPhone;
      try {
        currentPhone = normalizeInternationalPhone(preferred.contactValue);
      } catch {
        continue;
      }
      if (currentPhone !== textValue(watch, "normalizedPhone")) continue;
      const canonicalCheckout = textValue(booking, "checkoutAt") ?? textValue(watch, "monitorUntil");
      if (!canonicalCheckout || instant > Date.parse(canonicalCheckout)) continue;
      active.push({
        ...watch,
        monitorUntil: canonicalCheckout,
        guestName: textValue(booking, "name") ?? textValue(watch, "guestName") ?? "",
        checkinAt: textValue(booking, "checkinAt"),
        checkoutAt: canonicalCheckout
      });
    }
    return active;
  }
  async upsertSourceRecord(input) {
    const sourceType = normalizeOption(input.sourceType);
    const externalId = requiredText(input.externalId, "externalId");
    const sourceKey = `${sourceType}:${externalId}`;
    const rawForHash = input.rawText ?? JSON.stringify(input.rawMetadata ?? {});
    const [existing] = await this.repository.findMany(
      "sourceRecords",
      { filter: { sourceKey: { eq: sourceKey } }, first: 1 },
      { id: true, sourceKey: true, parseStatus: true }
    );
    const parseStatus = input.parseStatus ? normalizeOption(input.parseStatus) : textValue(existing, "parseStatus") ?? "RECEIVED";
    const sourceRecord = await this.repository.upsert(
      "sourceRecords",
      compactRecord({
        name: sourceKey,
        sourceType,
        externalId,
        sourceKey,
        receivedAt: input.receivedAt ?? this.now().toISOString(),
        sourceTimestamp: input.sourceTimestamp,
        bookingId: input.bookingId,
        parseStatus,
        contentHash: input.contentHash ?? createHash("sha256").update(rawForHash).digest("hex"),
        rawText: input.rawText,
        rawMetadata: input.rawMetadata,
        parserVersion: input.parserVersion,
        error: input.error
      }),
      { id: true, sourceKey: true, parseStatus: true, bookingId: true }
    );
    if (input.bookingId && (parseStatus === "ERROR" || parseStatus === "NEEDS_REVIEW")) {
      await this.flagBookingForSourceReview(
        input.bookingId,
        input.error ?? `${sourceKey} requires reconciliation`
      );
    }
    return sourceRecord;
  }
  async createCommunication(input) {
    const communicationKey = input.externalId ? `${normalizeOption(input.channel)}:${input.externalId}` : randomUUID();
    return this.repository.upsert(
      "communications",
      compactRecord({
        communicationKey,
        bookingId: requiredText(input.bookingId, "bookingId"),
        personId: input.personId,
        direction: normalizeOption(input.direction),
        channel: normalizeOption(input.channel),
        occurredAt: requiredText(input.occurredAt, "occurredAt"),
        summary: requiredText(input.summary, "summary"),
        rawSourceRecordId: input.rawSourceRecordId,
        actionRequired: input.actionRequired ?? false,
        processedByKairos: input.processedByKairos ?? false,
        confidence: input.confidence ? normalizeOption(input.confidence) : "UNVERIFIED",
        metadata: input.metadata
      }),
      { id: true, communicationKey: true, summary: true }
    );
  }
  async getBooking(bookingId) {
    const [booking] = await this.repository.findMany(
      "bookings",
      { filter: { id: { eq: bookingId } }, first: 1 },
      bookingSelection
    );
    if (!booking) throw new Error(`Booking ${bookingId} was not found`);
    return booking;
  }
  getContactRecords(bookingId) {
    return this.repository.findMany(
      "bookingContactMethods",
      { filter: { bookingId: { eq: bookingId } }, first: 200 },
      contactSelection
    );
  }
  async ensurePersonFallbackContact(booking, contacts) {
    const guestId = textValue(booking, "guestId");
    if (contacts.length > 0 || !guestId) return contacts;
    const [person] = await this.repository.findMany(
      "people",
      { filter: { id: { eq: guestId } }, first: 1 },
      {
        id: true,
        phones: { primaryPhoneNumber: true },
        emails: { primaryEmail: true }
      }
    );
    if (!person) return contacts;
    const phones = objectValue(person, "phones");
    const emails = objectValue(person, "emails");
    const primaryPhone = phones?.primaryPhoneNumber;
    const primaryEmail = emails?.primaryEmail;
    const value = typeof primaryPhone === "string" && primaryPhone.length > 0 ? primaryPhone : typeof primaryEmail === "string" && primaryEmail.length > 0 ? primaryEmail : void 0;
    if (!value) return contacts;
    const fallback = await this.persistContactMethod({
      bookingId: booking.id,
      personId: guestId,
      source: "OTHER",
      sourceSlot: "PERSON_DEFAULT",
      contactType: value === primaryPhone ? "PHONE" : "EMAIL",
      contactValue: value,
      confidence: "LIKELY",
      notes: "Policy fallback derived from the linked Person default contact."
    });
    return [fallback];
  }
  async reconcileBooking(bookingId) {
    const booking = await this.getBooking(bookingId);
    let contacts = await this.getContactRecords(bookingId);
    contacts = await this.ensurePersonFallbackContact(booking, contacts);
    const selected = selectPreferredContact(contacts, this.now());
    for (const contact of contacts) {
      const shouldBePreferred = selected?.id === contact.id;
      const isManualPreference = contact.isPreferred === true && contact.preferenceMode === "MANUAL";
      if (contact.isPreferred !== shouldBePreferred) {
        await this.repository.update(
          "bookingContactMethod",
          contact.id,
          {
            isPreferred: shouldBePreferred,
            preferenceMode: shouldBePreferred && isManualPreference ? "MANUAL" : "POLICY"
          },
          contactSelection
        );
      }
    }
    const missing = [];
    if (!selected) missing.push("No usable booking contact");
    if (!textValue(booking, "propertyId")) missing.push("Property/location");
    if (!textValue(booking, "checkinAt")) missing.push("Check-in time");
    const lowConfidence = selected?.confidence === "UNVERIFIED";
    const needsHumanReview = booking.needsHumanReview === true || lowConfidence;
    const readinessStatus = !selected ? "MISSING_CONTACT" : !textValue(booking, "propertyId") ? "MISSING_LOCATION" : !textValue(booking, "checkinAt") ? "MISSING_ARRIVAL_DETAILS" : needsHumanReview ? "NEEDS_REVIEW" : "READY";
    const updatedBooking = await this.repository.update(
      "booking",
      bookingId,
      {
        preferredContactMethodId: selected?.id ?? null,
        readinessStatus,
        needsHumanReview,
        missingInformation: missing.join("\n") || null,
        lastReviewedAt: this.now().toISOString()
      },
      bookingSelection
    );
    const expectedEvents = buildExpectedServiceEvents(updatedBooking);
    for (const event of expectedEvents) {
      await this.repository.upsert("serviceEvents", event, recordSelection);
    }
    const expectedEventKeys = new Set(
      expectedEvents.map((event) => event.sourceEventKey)
    );
    const derivedEvents = await this.repository.findMany(
      "serviceEvents",
      {
        filter: {
          bookingId: { eq: bookingId },
          source: { eq: "KAIROS" }
        },
        first: 100
      },
      { id: true, sourceEventKey: true, eventType: true, status: true }
    );
    const derivedEventTypes = /* @__PURE__ */ new Set([
      "GUEST_CONTACT_DEADLINE",
      "DAY_BEFORE_PREPARATION",
      "CHECK_IN",
      "CHECK_OUT"
    ]);
    for (const event of derivedEvents) {
      const sourceEventKey = textValue(event, "sourceEventKey");
      if (sourceEventKey && derivedEventTypes.has(textValue(event, "eventType") ?? "") && !expectedEventKeys.has(sourceEventKey) && event.status !== "CANCELLED") {
        await this.repository.update(
          "serviceEvent",
          event.id,
          { status: "CANCELLED" },
          recordSelection
        );
      }
    }
    return updatedBooking;
  }
  async flagBookingForSourceReview(bookingId, reason) {
    const booking = await this.getBooking(bookingId);
    await this.repository.update(
      "booking",
      bookingId,
      {
        needsHumanReview: true,
        readinessStatus: "NEEDS_REVIEW",
        missingInformation: appendMissingInformation(
          booking.missingInformation,
          `Source review: ${reason}`
        )
      },
      bookingSelection
    );
    return this.reconcileBooking(bookingId);
  }
  async getTomorrowCheckins(timeZone = "Europe/Lisbon") {
    const { start, end } = getZonedDayBounds(this.now(), timeZone, 1);
    return this.repository.findMany(
      "bookings",
      {
        filter: {
          and: [
            { checkinAt: { gte: start } },
            { checkinAt: { lt: end } },
            { not: { status: { in: ["CANCELLED", "COMPLETED"] } } }
          ]
        },
        first: 500,
        orderBy: [{ checkinAt: "AscNullsLast" }]
      },
      {
        ...bookingSelection,
        guest: { id: true, name: { firstName: true, lastName: true } },
        property: { id: true, name: true, propertyAddress: true },
        preferredContactMethod: {
          id: true,
          contactType: true,
          contactValue: true,
          source: true,
          confidence: true
        }
      }
    );
  }
  async getIncompleteBookings() {
    const bookings = await this.repository.findMany(
      "bookings",
      {
        filter: { not: { status: { in: ["CANCELLED", "COMPLETED"] } } },
        first: 500,
        orderBy: [{ checkinAt: "AscNullsLast" }]
      },
      bookingSelection
    );
    return bookings.filter(
      (booking) => booking.readinessStatus !== "READY" || booking.needsHumanReview === true || !textValue(booking, "preferredContactMethodId")
    );
  }
  async getUpcomingEvents(hours) {
    if (!Number.isFinite(hours) || hours <= 0 || hours > 24 * 31) {
      throw new Error("hours must be between 0 and 744");
    }
    const start = this.now();
    const end = new Date(start.getTime() + hours * 60 * 60 * 1e3);
    return this.repository.findMany(
      "serviceEvents",
      {
        filter: {
          and: [
            { startsAt: { gte: start.toISOString() } },
            { startsAt: { lt: end.toISOString() } },
            { not: { status: { in: ["CANCELLED", "COMPLETED"] } } }
          ]
        },
        first: 500,
        orderBy: [{ startsAt: "AscNullsLast" }]
      },
      serviceEventSelection
    );
  }
  async getServiceEvents(startsAt, endsAt) {
    const start = validDate(startsAt, "startsAt");
    const end = validDate(endsAt, "endsAt");
    if (end <= start) throw new Error("endsAt must be after startsAt");
    if (end.getTime() - start.getTime() > 366 * 24 * 60 * 60 * 1e3) {
      throw new Error("calendar query range cannot exceed 366 days");
    }
    return this.repository.findMany(
      "serviceEvents",
      {
        filter: {
          and: [
            { startsAt: { gte: start.toISOString() } },
            { startsAt: { lt: end.toISOString() } },
            { not: { status: { in: ["CANCELLED"] } } }
          ]
        },
        first: 500,
        orderBy: [{ startsAt: "AscNullsLast" }]
      },
      serviceEventSelection
    );
  }
  async getOperationsTimeline(startsAt, endsAt) {
    const start = validDate(startsAt, "startsAt");
    const end = validDate(endsAt, "endsAt");
    const events = await this.getServiceEvents(startsAt, endsAt);
    const eventBookingIds = new Set(
      events.map((event) => textValue(event, "bookingId")).filter((id) => Boolean(id))
    );
    const allBookings = await this.repository.findMany(
      "bookings",
      {
        filter: { not: { status: { in: ["CANCELLED"] } } },
        first: 500,
        orderBy: [{ checkinAt: "AscNullsLast" }]
      },
      timelineBookingSelection
    );
    const bookings = allBookings.filter((booking) => {
      if (eventBookingIds.has(booking.id)) return true;
      const checkin = textValue(booking, "checkinAt");
      const checkout = textValue(booking, "checkoutAt");
      const rawMetadata = objectValue(booking, "rawMetadata");
      const pendingCheckin = rawMetadata && typeof rawMetadata.talkguestCheckinEventAt === "string" ? rawMetadata.talkguestCheckinEventAt : void 0;
      if (!checkin && !pendingCheckin && !checkout) return false;
      const bookingStart = new Date(checkin ?? pendingCheckin ?? checkout);
      const bookingEnd = checkout ? new Date(checkout) : bookingStart;
      return bookingStart < end && bookingEnd >= start;
    });
    const propertyIds = [
      ...new Set(
        bookings.map((booking) => textValue(booking, "propertyId")).filter((id) => Boolean(id))
      )
    ];
    const properties = propertyIds.length === 0 ? [] : await this.repository.findMany(
      "properties",
      { filter: { id: { in: propertyIds } }, first: 500 },
      timelinePropertySelection
    );
    return {
      startsAt: start.toISOString(),
      endsAt: end.toISOString(),
      events,
      bookings,
      properties
    };
  }
  async hydrateEmailMessages(messages) {
    if (messages.length === 0) return [];
    const messageIds = messages.map(({ id }) => id);
    const threadIds = [
      ...new Set(
        messages.map((message) => textValue(message, "messageThreadId")).filter((id) => Boolean(id))
      )
    ];
    const [participants, associations, threads] = await Promise.all([
      this.repository.findMany(
        "messageParticipants",
        { filter: { messageId: { in: messageIds } }, first: 500 },
        emailParticipantSelection
      ),
      this.repository.findMany(
        "messageChannelMessageAssociations",
        { filter: { messageId: { in: messageIds } }, first: 500 },
        emailAssociationSelection
      ),
      threadIds.length === 0 ? Promise.resolve([]) : this.repository.findMany(
        "messageThreads",
        { filter: { id: { in: threadIds } }, first: 100 },
        emailThreadSelection
      )
    ]);
    return messages.map((message) => ({
      ...message,
      thread: threads.find(
        (thread) => thread.id === textValue(message, "messageThreadId")
      ),
      participants: participants.filter(
        (participant) => participant.messageId === message.id
      ),
      channelAssociations: associations.filter(
        (association) => association.messageId === message.id
      )
    }));
  }
  async getRecentEmails(limit = 25, sender, receivedAfter) {
    const normalizedLimit = validLimit(limit, 100);
    const normalizedSender = sender?.trim().toLowerCase();
    const receivedAfterDate = receivedAfter ? validDate(receivedAfter, "receivedAfter") : void 0;
    const messages = await this.repository.findMany(
      "messages",
      {
        filter: receivedAfterDate ? { receivedAt: { gte: receivedAfterDate.toISOString() } } : void 0,
        first: normalizedSender ? 100 : normalizedLimit,
        orderBy: [{ receivedAt: "DescNullsLast" }]
      },
      emailMessageSelection
    );
    const hydrated = await this.hydrateEmailMessages(messages);
    if (!normalizedSender) return hydrated;
    return hydrated.filter((message) => {
      const participants = message.participants;
      return Array.isArray(participants) && participants.some(
        (participant) => participant !== null && typeof participant === "object" && textValue(participant, "role") === "FROM" && (textValue(participant, "handle") ?? "").toLowerCase().includes(normalizedSender)
      );
    }).slice(0, normalizedLimit);
  }
  async getEmailThread(threadId) {
    const normalizedThreadId = requiredText(threadId, "threadId");
    const [thread] = await this.repository.findMany(
      "messageThreads",
      { filter: { id: { eq: normalizedThreadId } }, first: 1 },
      emailThreadSelection
    );
    if (!thread) throw new Error(`Email thread ${normalizedThreadId} was not found`);
    const messages = await this.repository.findMany(
      "messages",
      {
        filter: { messageThreadId: { eq: normalizedThreadId } },
        first: 500,
        orderBy: [{ receivedAt: "AscNullsLast" }]
      },
      emailMessageSelection
    );
    return { ...thread, messages: await this.hydrateEmailMessages(messages) };
  }
  async getPreferredContact(bookingId) {
    const booking = await this.getBooking(bookingId);
    const contacts = await this.ensurePersonFallbackContact(
      booking,
      await this.getContactRecords(bookingId)
    );
    return selectPreferredContact(contacts, this.now());
  }

  async getCheckBalance(timeZone) {
    const zone = typeof timeZone === "string" && timeZone.length > 0 ? timeZone : "Europe/Lisbon";
    const localParts = (iso) => {
      const parts = new Intl.DateTimeFormat("en-CA", {
        timeZone: zone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h23"
      }).formatToParts(new Date(iso));
      const get = (type) => parts.find((part) => part.type === type)?.value ?? "";
      return {
        month: `${get("year")}-${get("month")}`,
        hour: Number(get("hour")),
        minute: Number(get("minute"))
      };
    };
    const events = await this.repository.findMany(
      "serviceEvents",
      {
        filter: {
          and: [
            { eventType: { eq: "CHECK_IN" } },
            { not: { status: { eq: "CANCELLED" } } }
          ]
        },
        first: 500,
        orderBy: [{ startsAt: "AscNullsLast" }]
      },
      {
        id: true,
        title: true,
        startsAt: true,
        status: true,
        bookingId: true,
        propertyId: true,
        checkValue: true
      }
    );
    const properties = await this.repository.findMany(
      "properties",
      { first: 200 },
      { id: true, name: true }
    );
    const propertyNameById = new Map(
      properties.map((property) => [property.id, textValue(property, "name")])
    );
    const buckets = /* @__PURE__ */ new Map();
    let totalChecks = 0;
    let totalAmount = 0;
    for (const event of events) {
      const startsAt = textValue(event, "startsAt");
      if (!startsAt) continue;
      const local = localParts(startsAt);
      const before21 = local.hour < 21;
      const amount = before21 ? 25 : 30;
      totalChecks += 1;
      totalAmount += amount;
      let bucket = buckets.get(local.month);
      if (!bucket) {
        bucket = {
          month: local.month,
          checks: 0,
          before21: 0,
          after21: 0,
          amount: 0,
          completed: 0,
          pending: 0,
          events: []
        };
        buckets.set(local.month, bucket);
      }
      bucket.checks += 1;
      if (before21) bucket.before21 += 1;
      else bucket.after21 += 1;
      bucket.amount += amount;
      if (textValue(event, "status") === "COMPLETED") bucket.completed += 1;
      else bucket.pending += 1;
      bucket.events.push({
        id: event.id,
        title: textValue(event, "title"),
        startsAt,
        status: textValue(event, "status"),
        localTime: `${String(local.hour).padStart(2, "0")}:${String(local.minute).padStart(2, "0")}`,
        amount,
        checkValue: typeof event.checkValue === "number" ? event.checkValue : void 0,
        propertyName: propertyNameById.get(textValue(event, "propertyId")) ?? void 0
      });
    }
    const months = [...buckets.values()].sort((a, b) => a.month.localeCompare(b.month));
    let runningBalance = 0;
    for (const month of months) {
      runningBalance += month.amount;
      month.balance = runningBalance;
    }
    return {
      timeZone: zone,
      months,
      totalChecks,
      totalAmount,
      balance: totalAmount
    };
  }
}
