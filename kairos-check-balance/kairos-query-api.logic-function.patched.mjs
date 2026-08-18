import { createRequire as __createRequire } from 'module';
const require = __createRequire(import.meta.url);
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  try {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  } catch (e) {
    throw mod = 0, e;
  }
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/@sniptt/guards/build/guards/primitives.js
var require_primitives = __commonJS({
  "node_modules/@sniptt/guards/build/guards/primitives.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isSymbol = exports.isBigInt = exports.isString = exports.isNumber = exports.isBoolean = exports.isUndefined = void 0;
    var isUndefined = (term) => {
      return typeof term === "undefined";
    };
    exports.isUndefined = isUndefined;
    var isBoolean = (term) => {
      return typeof term === "boolean";
    };
    exports.isBoolean = isBoolean;
    var isNumber = (term) => {
      return typeof term === "number" && !Number.isNaN(term);
    };
    exports.isNumber = isNumber;
    var isString = (term) => {
      return typeof term === "string";
    };
    exports.isString = isString;
    var isBigInt = (term) => {
      return typeof term === "bigint";
    };
    exports.isBigInt = isBigInt;
    var isSymbol = (term) => {
      return typeof term === "symbol";
    };
    exports.isSymbol = isSymbol;
  }
});

// node_modules/@sniptt/guards/build/guards/structural.js
var require_structural = __commonJS({
  "node_modules/@sniptt/guards/build/guards/structural.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isDate = exports.isWeakSet = exports.isWeakMap = exports.isSet = exports.isMap = exports.isArray = exports.isObject = exports.isFunction = exports.isNull = void 0;
    var isNull = (term) => {
      return term === null;
    };
    exports.isNull = isNull;
    var isFunction = (term) => {
      return typeof term === "function";
    };
    exports.isFunction = isFunction;
    var isObject = (term) => {
      return !exports.isNull(term) && typeof term === "object";
    };
    exports.isObject = isObject;
    var isArray = (term) => {
      return Array.isArray(term);
    };
    exports.isArray = isArray;
    var isMap = (term) => {
      return term instanceof Map;
    };
    exports.isMap = isMap;
    var isSet = (term) => {
      return term instanceof Set;
    };
    exports.isSet = isSet;
    var isWeakMap = (term) => {
      return term instanceof WeakMap;
    };
    exports.isWeakMap = isWeakMap;
    var isWeakSet = (term) => {
      return term instanceof WeakSet;
    };
    exports.isWeakSet = isWeakSet;
    var isDate = (term) => {
      return term instanceof Date;
    };
    exports.isDate = isDate;
  }
});

// node_modules/@sniptt/guards/build/guards/convenience.js
var require_convenience = __commonJS({
  "node_modules/@sniptt/guards/build/guards/convenience.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isNegativeInteger = exports.isNonNegativeInteger = exports.isPositiveInteger = exports.isInteger = exports.isNumberOrNaN = exports.isNonEmptyString = exports.isNonEmptyArray = exports.isObjectOrNull = void 0;
    var primitives_1 = require_primitives();
    var structural_1 = require_structural();
    var isObjectOrNull = (term) => {
      return typeof term === "object";
    };
    exports.isObjectOrNull = isObjectOrNull;
    var isNonEmptyArray = (term) => {
      return structural_1.isArray(term) && term.length > 0;
    };
    exports.isNonEmptyArray = isNonEmptyArray;
    var isNonEmptyString3 = (term) => {
      return primitives_1.isString(term) && term.length > 0;
    };
    exports.isNonEmptyString = isNonEmptyString3;
    var isNumberOrNaN = (term) => {
      return typeof term === "number";
    };
    exports.isNumberOrNaN = isNumberOrNaN;
    var isInteger = (term) => {
      return primitives_1.isNumber(term) && Number.isInteger(term);
    };
    exports.isInteger = isInteger;
    var isPositiveInteger = (term) => {
      return exports.isInteger(term) && term > 0;
    };
    exports.isPositiveInteger = isPositiveInteger;
    var isNonNegativeInteger = (term) => {
      return exports.isInteger(term) && term >= 0;
    };
    exports.isNonNegativeInteger = isNonNegativeInteger;
    var isNegativeInteger = (term) => {
      return exports.isInteger(term) && term < 0;
    };
    exports.isNegativeInteger = isNegativeInteger;
  }
});

// node_modules/@sniptt/guards/build/index.js
var require_build = __commonJS({
  "node_modules/@sniptt/guards/build/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.structural = exports.primitives = exports.convenience = void 0;
    exports.convenience = __importStar(require_convenience());
    __exportStar(require_convenience(), exports);
    exports.primitives = __importStar(require_primitives());
    __exportStar(require_primitives(), exports);
    exports.structural = __importStar(require_structural());
    __exportStar(require_structural(), exports);
  }
});

// twenty-sdk-define-stub:__twenty-sdk-define-stub__
var __defineFactoryStub = (config) => ({
  success: true,
  config,
  errors: []
});
var __anyHandler = {
  get(_target, prop) {
    if (prop === "__esModule") return true;
    if (prop === Symbol.toPrimitive) return () => "";
    if (typeof prop === "symbol") return void 0;
    return new Proxy(() => void 0, __anyHandler);
  },
  apply() {
    return new Proxy(() => void 0, __anyHandler);
  }
};
var __anyStub = new Proxy(() => void 0, __anyHandler);
var defineLogicFunction = __defineFactoryStub;

// src/constants/kairos-id.ts
import { createHash } from "node:crypto";
var IDENTIFIER_NAMESPACE = "kairos-operations.twenty.app.v1";
var kairosId = (entityKey) => {
  const hex = createHash("sha256").update(`${IDENTIFIER_NAMESPACE}:${entityKey}`).digest("hex").slice(0, 32).split("");
  hex[12] = "4";
  hex[16] = ["8", "9", "a", "b"][Number.parseInt(hex[16], 16) % 4];
  return [
    hex.slice(0, 8).join(""),
    hex.slice(8, 12).join(""),
    hex.slice(12, 16).join(""),
    hex.slice(16, 20).join(""),
    hex.slice(20, 32).join("")
  ].join("-");
};

// src/domain/kairos-operations-service.ts
import { createHash as createHash2, randomUUID } from "node:crypto";

// src/domain/expected-service-events.ts
var import_guards = __toESM(require_build());

// src/domain/timezone.ts
var getZonedDateParts = (date, timeZone) => {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23"
  }).formatToParts(date);
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return {
    year: Number(values.year),
    month: Number(values.month),
    day: Number(values.day),
    hour: Number(values.hour),
    minute: Number(values.minute),
    second: Number(values.second)
  };
};
var zonedDateTimeToUtc = (desired, timeZone) => {
  const desiredAsUtc = Date.UTC(
    desired.year,
    desired.month - 1,
    desired.day,
    desired.hour,
    desired.minute,
    desired.second
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
      actual.second
    );
    candidate = new Date(candidate.getTime() + desiredAsUtc - actualAsUtc);
  }
  return candidate;
};
var zonedMidnightToUtc = (year, month, day, timeZone) => zonedDateTimeToUtc(
  { year, month, day, hour: 0, minute: 0, second: 0 },
  timeZone
);
var getPreviousZonedDayAtSameTime = (isoDate, timeZone) => {
  const instant = new Date(isoDate);
  if (Number.isNaN(instant.getTime())) {
    throw new Error("isoDate must be a valid ISO 8601 timestamp");
  }
  const local = getZonedDateParts(instant, timeZone);
  const previousLocalDay = new Date(
    Date.UTC(
      local.year,
      local.month - 1,
      local.day - 1,
      local.hour,
      local.minute,
      local.second
    )
  );
  return zonedDateTimeToUtc(
    {
      year: previousLocalDay.getUTCFullYear(),
      month: previousLocalDay.getUTCMonth() + 1,
      day: previousLocalDay.getUTCDate(),
      hour: previousLocalDay.getUTCHours(),
      minute: previousLocalDay.getUTCMinutes(),
      second: previousLocalDay.getUTCSeconds()
    },
    timeZone
  ).toISOString();
};
var getZonedDayBounds = (reference, timeZone, dayOffset) => {
  const local = getZonedDateParts(reference, timeZone);
  const target = new Date(Date.UTC(local.year, local.month - 1, local.day + dayOffset));
  const next = new Date(Date.UTC(local.year, local.month - 1, local.day + dayOffset + 1));
  return {
    start: zonedMidnightToUtc(
      target.getUTCFullYear(),
      target.getUTCMonth() + 1,
      target.getUTCDate(),
      timeZone
    ).toISOString(),
    end: zonedMidnightToUtc(
      next.getUTCFullYear(),
      next.getUTCMonth() + 1,
      next.getUTCDate(),
      timeZone
    ).toISOString()
  };
};

// src/domain/expected-service-events.ts
var buildExpectedServiceEvents = (booking) => {
  const bookingId = booking.id;
  if (booking.status === "CANCELLED") return [];
  const bookingName = (0, import_guards.isNonEmptyString)(booking.name) ? booking.name : "Booking";
  const bookingTimeZone = (0, import_guards.isNonEmptyString)(booking.timezone) ? booking.timezone : "Europe/Lisbon";
  const checkinAt = (0, import_guards.isNonEmptyString)(booking.checkinAt) ? booking.checkinAt : void 0;
  const rawMetadata = booking.rawMetadata ?? {};
  const pendingCheckinAt = rawMetadata.talkguestCheckinTimeKnown === false && (0, import_guards.isNonEmptyString)(rawMetadata.talkguestCheckinEventAt) ? rawMetadata.talkguestCheckinEventAt : void 0;
  const eventCheckinAt = checkinAt ?? pendingCheckinAt;
  const checkinTimePending = !checkinAt && Boolean(pendingCheckinAt);
  const checkoutAt = (0, import_guards.isNonEmptyString)(booking.checkoutAt) ? booking.checkoutAt : void 0;
  const events = [];
  if (eventCheckinAt) {
    events.push({
      sourceEventKey: `${bookingId}:KAIROS:GUEST_CONTACT_DEADLINE`,
      bookingId,
      eventType: "GUEST_CONTACT_DEADLINE",
      title: checkinTimePending ? `Guest contact deadline (check-in time pending) \u2014 ${bookingName}` : `Guest contact deadline \u2014 ${bookingName}`,
      startsAt: getPreviousZonedDayAtSameTime(
        eventCheckinAt,
        bookingTimeZone
      ),
      status: "SCHEDULED",
      source: "KAIROS",
      kairosRemindersEnabled: true,
      notes: checkinTimePending ? "TalkGuest has supplied the check-in date, but not the arrival time yet." : null
    });
    events.push({
      sourceEventKey: `${bookingId}:KAIROS:CHECK_IN`,
      bookingId,
      eventType: "CHECK_IN",
      title: checkinTimePending ? `Check-in (time pending) \u2014 ${bookingName}` : `Check-in \u2014 ${bookingName}`,
      startsAt: eventCheckinAt,
      status: "SCHEDULED",
      source: "KAIROS",
      kairosRemindersEnabled: true,
      notes: checkinTimePending ? "TalkGuest has supplied the check-in date, but not the arrival time yet." : null
    });
  }
  if (checkoutAt) {
    events.push({
      sourceEventKey: `${bookingId}:KAIROS:CHECK_OUT`,
      bookingId,
      eventType: "CHECK_OUT",
      title: `Check-out \u2014 ${bookingName}`,
      startsAt: checkoutAt,
      status: "SCHEDULED",
      source: "KAIROS",
      kairosRemindersEnabled: true
    });
  }
  return events;
};

// src/domain/contact-selection.ts
var optionalText = (value) => typeof value === "string" && value.length > 0 ? value : void 0;
var numericValue = (value, fallback) => typeof value === "number" && Number.isFinite(value) ? value : fallback;
var asPreferredContact = (record) => ({
  id: record.id,
  contactType: optionalText(record.contactType) ?? "OTHER",
  contactValue: optionalText(record.contactValue) ?? "",
  source: optionalText(record.source) ?? "OTHER",
  confidence: optionalText(record.confidence) ?? "UNVERIFIED",
  isPreferred: record.isPreferred === true,
  preferenceMode: optionalText(record.preferenceMode) ?? "POLICY",
  priority: numericValue(record.priority, 100),
  validFrom: optionalText(record.validFrom),
  validUntil: optionalText(record.validUntil)
});
var isCurrentlyValid = (contact, now) => {
  const nowTime = now.getTime();
  const validFrom = contact.validFrom ? Date.parse(contact.validFrom) : void 0;
  const validUntil = contact.validUntil ? Date.parse(contact.validUntil) : void 0;
  return !(validFrom !== void 0 && validFrom > nowTime || validUntil !== void 0 && validUntil <= nowTime);
};
var contactScore = (contact) => {
  if (contact.isPreferred && contact.preferenceMode === "MANUAL") {
    return 1e4 - contact.priority;
  }
  if (contact.source === "MANUAL" && contact.confidence === "CONFIRMED") {
    return 900 - contact.priority;
  }
  if (contact.source === "WHATSAPP" && contact.confidence === "CONFIRMED") {
    return 800 - contact.priority;
  }
  if (contact.confidence === "CONFIRMED") return 700 - contact.priority;
  if (contact.source === "TALKGUEST") return 600 - contact.priority;
  if (contact.confidence === "LIKELY") return 500 - contact.priority;
  return 100 - contact.priority;
};
var selectPreferredContact = (records, now) => records.map(asPreferredContact).filter(
  (contact) => contact.contactValue.length > 0 && isCurrentlyValid(contact, now)
).sort((left, right) => {
  const scoreDifference = contactScore(right) - contactScore(left);
  return scoreDifference !== 0 ? scoreDifference : left.id.localeCompare(right.id);
})[0];

// src/domain/kairos-operations-service.ts
var recordSelection = { id: true };
var bookingSelection = {
  id: true,
  name: true,
  bookingId: true,
  sourceKey: true,
  guestId: true,
  propertyId: true,
  preferredContactMethodId: true,
  checkinAt: true,
  checkoutAt: true,
  arrivalWindowStart: true,
  arrivalWindowEnd: true,
  timezone: true,
  status: true,
  readinessStatus: true,
  riskLevel: true,
  needsHumanReview: true,
  missingInformation: true,
  rawMetadata: true
};
var contactSelection = {
  id: true,
  name: true,
  bookingId: true,
  personId: true,
  sourceContactKey: true,
  contactType: true,
  contactValue: true,
  source: true,
  priority: true,
  isPreferred: true,
  preferenceMode: true,
  confidence: true,
  lastVerifiedAt: true,
  validFrom: true,
  validUntil: true,
  notes: true
};
var serviceEventSelection = {
  id: true,
  title: true,
  eventType: true,
  startsAt: true,
  endsAt: true,
  status: true,
  location: true,
  notes: true,
  source: true,
  externalEventId: true,
  bookingId: true,
  kairosRemindersEnabled: true
};
var whatsappWatchSelection = {
  id: true,
  watchKey: true,
  bookingId: true,
  serviceEventId: true,
  contactMethodId: true,
  normalizedPhone: true,
  activatedAt: true,
  activationWatermarkMessageId: true,
  monitorUntil: true,
  status: true,
  guestName: true,
  propertyName: true,
  checkinAt: true,
  checkoutAt: true,
  metadata: true
};
var timelineBookingSelection = {
  id: true,
  name: true,
  bookingId: true,
  source: true,
  externalBookingId: true,
  propertyId: true,
  checkinAt: true,
  checkoutAt: true,
  timezone: true,
  status: true,
  readinessStatus: true,
  riskLevel: true,
  needsHumanReview: true,
  rawMetadata: true
};
var timelinePropertySelection = {
  id: true,
  name: true,
  externalPropertyId: true,
  timezone: true,
  active: true
};
var emailThreadSelection = {
  id: true,
  subject: true,
  createdAt: true,
  updatedAt: true
};
var emailMessageSelection = {
  id: true,
  messageThreadId: true,
  headerMessageId: true,
  subject: true,
  text: true,
  receivedAt: true,
  createdAt: true
};
var emailParticipantSelection = {
  id: true,
  messageId: true,
  role: true,
  handle: true,
  displayName: true
};
var emailAssociationSelection = {
  id: true,
  messageId: true,
  messageThreadId: true,
  messageExternalId: true,
  messageThreadExternalId: true,
  direction: true
};
var compactRecord = (record) => Object.fromEntries(
  Object.entries(record).filter(([, value]) => value !== void 0)
);
var requiredText = (value, fieldName) => {
  const normalized = value.trim();
  if (normalized.length === 0) throw new Error(`${fieldName} is required`);
  return normalized;
};
var normalizeOption = (value) => requiredText(value, "option").toUpperCase().replace(/[\s-]+/g, "_");
var normalizeInternationalPhone = (value) => {
  let text = requiredText(value, "contactValue");
  if (text.startsWith("00")) text = `+${text.slice(2)}`;
  if (!text.startsWith("+")) {
    throw new Error("preferred phone must include an international country code");
  }
  const digits = text.slice(1).replace(/\D/g, "");
  if (digits.length < 8 || digits.length > 15) {
    throw new Error("preferred phone is not a valid international number");
  }
  return `+${digits}`;
};
var validDate = (value, fieldName) => {
  const parsed = new Date(requiredText(value, fieldName));
  if (Number.isNaN(parsed.getTime())) {
    throw new Error(`${fieldName} must be an ISO 8601 timestamp`);
  }
  return parsed;
};
var validLimit = (value, maximum) => {
  if (!Number.isInteger(value) || value < 1 || value > maximum) {
    throw new Error(`limit must be an integer between 1 and ${maximum}`);
  }
  return value;
};
var linkValue = (url) => url ? {
  primaryLinkLabel: url,
  primaryLinkUrl: url,
  secondaryLinks: null
} : void 0;
var stableBookingUuid = (sourceKey) => {
  const hex = createHash2("sha256").update(`kairos-booking-v1:${sourceKey}`).digest("hex").slice(0, 32).split("");
  hex[12] = "4";
  hex[16] = ["8", "9", "a", "b"][Number.parseInt(hex[16], 16) % 4];
  return `${hex.slice(0, 8).join("")}-${hex.slice(8, 12).join("")}-${hex.slice(12, 16).join("")}-${hex.slice(16, 20).join("")}-${hex.slice(20).join("")}`;
};
var textValue = (record, field) => record && typeof record[field] === "string" ? record[field] : void 0;
var objectValue = (record, field) => {
  const value = record[field];
  return value !== null && typeof value === "object" && !Array.isArray(value) ? value : void 0;
};
var appendMissingInformation = (existing, message) => {
  const current = typeof existing === "string" ? existing.trim() : "";
  return current.includes(message) ? current : [current, message].filter(Boolean).join("\n");
};
var KairosOperationsService = class {
  constructor(repository, now = () => /* @__PURE__ */ new Date()) {
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
        contentHash: input.contentHash ?? createHash2("sha256").update(rawForHash).digest("hex"),
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
};

// src/runtime/core-api-records-repository.ts
import { CoreApiClient } from "twenty-client-sdk/core";

// src/runtime/configure-internal-api-url.ts
var import_guards2 = __toESM(require_build());
var getInternalGraphqlUrl = (environment) => {
  const internalApiUrl = environment.KAIROS_INTERNAL_API_URL;
  if (!(0, import_guards2.isNonEmptyString)(internalApiUrl)) return void 0;
  return `${internalApiUrl.replace(/\/$/, "")}/graphql`;
};

// src/runtime/core-api-records-repository.ts
var createCoreApiClient = () => {
  const graphqlUrl = getInternalGraphqlUrl(process.env);
  const RuntimeCoreApiClient = CoreApiClient;
  return new RuntimeCoreApiClient(graphqlUrl ? { url: graphqlUrl } : void 0);
};
var capitalize = (value) => value.length === 0 ? value : `${value[0].toUpperCase()}${value.slice(1)}`;
var isRecord = (value) => value !== null && typeof value === "object" && !Array.isArray(value);
var toRecordData = (value, context) => {
  if (!isRecord(value) || typeof value.id !== "string") {
    throw new Error(`${context} did not return a record with an id`);
  }
  return value;
};
var extractMutationRecord = (result, mutationName) => {
  if (!isRecord(result)) throw new Error(`${mutationName} returned no result`);
  const mutationResult = result[mutationName];
  if (Array.isArray(mutationResult)) {
    return toRecordData(mutationResult[0], mutationName);
  }
  return toRecordData(mutationResult, mutationName);
};
var extractConnectionRecords = (result, objectNamePlural) => {
  if (!isRecord(result) || !isRecord(result[objectNamePlural])) return [];
  const edges = result[objectNamePlural].edges;
  if (!Array.isArray(edges)) return [];
  return edges.map((edge) => isRecord(edge) ? edge.node : void 0).filter((node) => isRecord(node)).map((node) => toRecordData(node, objectNamePlural));
};
var extractMutationRecords = (result, mutationName) => {
  if (!isRecord(result) || !Array.isArray(result[mutationName])) return [];
  return result[mutationName].map((record) => toRecordData(record, mutationName));
};
var CoreApiRecordsRepository = class {
  client = createCoreApiClient();
  async upsert(objectNamePlural, data, selection = { id: true }) {
    const mutationName = `create${capitalize(objectNamePlural)}`;
    const result = await this.client.mutation({
      [mutationName]: {
        __args: { data: [data], upsert: true },
        ...selection
      }
    });
    return extractMutationRecord(result, mutationName);
  }
  async update(objectNameSingular, recordId, data, selection = { id: true }) {
    const mutationName = `update${capitalize(objectNameSingular)}`;
    const result = await this.client.mutation({
      [mutationName]: {
        __args: { id: recordId, data },
        ...selection
      }
    });
    return extractMutationRecord(result, mutationName);
  }
  async updateMany(objectNamePlural, filter, data, selection = { id: true }) {
    const mutationName = `update${capitalize(objectNamePlural)}`;
    const result = await this.client.mutation({
      [mutationName]: {
        __args: { filter, data },
        ...selection
      }
    });
    return extractMutationRecords(result, mutationName);
  }
  async findMany(objectNamePlural, options, selection = { id: true }) {
    const result = await this.client.query({
      [objectNamePlural]: {
        __args: {
          ...options.filter ? { filter: options.filter } : {},
          ...options.first ? { first: options.first } : {},
          ...options.orderBy ? { orderBy: options.orderBy } : {}
        },
        edges: { node: selection }
      }
    });
    return extractConnectionRecords(result, objectNamePlural);
  }
};

// src/logic-functions/kairos-query-api.logic-function.ts
var handler = async (event) => {
  const request = event.body ?? {};
  const service = new KairosOperationsService(new CoreApiRecordsRepository());
  switch (request.operation) {
    case "getTomorrowCheckins":
      return {
        ok: true,
        records: await service.getTomorrowCheckins(
          request.timeZone ?? "Europe/Lisbon"
        )
      };
    case "getIncompleteBookings":
      return { ok: true, records: await service.getIncompleteBookings() };
    case "getUpcomingEvents":
      return {
        ok: true,
        records: await service.getUpcomingEvents(request.hours ?? 24)
      };
    case "getServiceEvents":
      if (!request.startsAt || !request.endsAt) {
        throw new Error("startsAt and endsAt are required");
      }
      return {
        ok: true,
        records: await service.getServiceEvents(
          request.startsAt,
          request.endsAt
        )
      };
    case "getCheckBalance":
      return {
        ok: true,
        balance: await service.getCheckBalance(
          request.timeZone ?? "Europe/Lisbon"
        )
      };
    case "getOperationsTimeline":
      if (!request.startsAt || !request.endsAt) {
        throw new Error("startsAt and endsAt are required");
      }
      return {
        ok: true,
        timeline: await service.getOperationsTimeline(
          request.startsAt,
          request.endsAt
        )
      };
    case "getRecentEmails":
      return {
        ok: true,
        records: await service.getRecentEmails(
          request.limit ?? 25,
          request.sender,
          request.receivedAfter
        )
      };
    case "getEmailThread":
      if (!request.threadId) throw new Error("threadId is required");
      return {
        ok: true,
        record: await service.getEmailThread(request.threadId)
      };
    case "getPreferredContact":
      if (!request.bookingId) throw new Error("bookingId is required");
      return {
        ok: true,
        record: await service.getPreferredContact(request.bookingId)
      };
    case "getActiveWhatsappContactWatches":
      return {
        ok: true,
        records: await service.getActiveWhatsappContactWatches(
          request.at ?? (/* @__PURE__ */ new Date()).toISOString()
        )
      };
    default:
      throw new Error(`Unsupported operation: ${request.operation ?? ""}`);
  }
};
var kairos_query_api_logic_function_default = defineLogicFunction({
  universalIdentifier: kairosId("logicFunction.queryApi"),
  name: "kairos-query-api",
  description: "Authenticated operational queries for bookings, calendar events, contact resolution, and read-only email access.",
  timeoutSeconds: 30,
  handler,
  httpRouteTriggerSettings: {
    path: "/kairos/query",
    httpMethod: "POST",
    isAuthRequired: true
  }
});
export {
  kairos_query_api_logic_function_default as default
};
//# sourceMappingURL=kairos-query-api.logic-function.mjs.map
