import { ViewKey, defineView } from 'twenty-sdk/define';

import {
  STARTUP_APPLICATIONS_VIEW_UNIVERSAL_IDENTIFIER,
  STARTUP_APPLICATION_CAMPAIGN_FIELD_UNIVERSAL_IDENTIFIER,
  STARTUP_APPLICATION_CHECKPOINT_FIELD_UNIVERSAL_IDENTIFIER,
  STARTUP_APPLICATION_LANGUAGE_FIELD_UNIVERSAL_IDENTIFIER,
  STARTUP_APPLICATION_NAME_FIELD_UNIVERSAL_IDENTIFIER,
  STARTUP_APPLICATION_OBJECT_UNIVERSAL_IDENTIFIER,
  STARTUP_APPLICATION_RECEIVED_AT_FIELD_UNIVERSAL_IDENTIFIER,
  STARTUP_APPLICATION_SOURCE_FIELD_UNIVERSAL_IDENTIFIER,
  STARTUP_APPLICATION_STATUS_FIELD_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';

export default defineView({
  universalIdentifier: STARTUP_APPLICATIONS_VIEW_UNIVERSAL_IDENTIFIER,
  name: 'Startup Applications',
  objectUniversalIdentifier: STARTUP_APPLICATION_OBJECT_UNIVERSAL_IDENTIFIER,
  icon: 'IconUserPlus',
  key: ViewKey.INDEX,
  position: 0,
  fields: [
    { universalIdentifier: 'baf779f4-4961-4d42-9c44-ce765f3ffe3e', fieldMetadataUniversalIdentifier: STARTUP_APPLICATION_NAME_FIELD_UNIVERSAL_IDENTIFIER, position: 0, isVisible: true, size: 220 },
    { universalIdentifier: '08b42b22-34e3-4878-a8bf-525ee401b3a7', fieldMetadataUniversalIdentifier: STARTUP_APPLICATION_STATUS_FIELD_UNIVERSAL_IDENTIFIER, position: 1, isVisible: true, size: 150 },
    { universalIdentifier: '25c724d1-0639-40d6-a966-3a0aaf255277', fieldMetadataUniversalIdentifier: STARTUP_APPLICATION_SOURCE_FIELD_UNIVERSAL_IDENTIFIER, position: 2, isVisible: true, size: 140 },
    { universalIdentifier: 'e03d2299-462a-4bbc-9705-ae3d4ed70964', fieldMetadataUniversalIdentifier: STARTUP_APPLICATION_CAMPAIGN_FIELD_UNIVERSAL_IDENTIFIER, position: 3, isVisible: true, size: 180 },
    { universalIdentifier: '24fc0c88-3a07-4487-a155-39bc94014423', fieldMetadataUniversalIdentifier: STARTUP_APPLICATION_CHECKPOINT_FIELD_UNIVERSAL_IDENTIFIER, position: 4, isVisible: true, size: 220 },
    { universalIdentifier: '09f72abd-2c50-45c1-b757-54b57a55444d', fieldMetadataUniversalIdentifier: STARTUP_APPLICATION_LANGUAGE_FIELD_UNIVERSAL_IDENTIFIER, position: 5, isVisible: true, size: 180 },
    { universalIdentifier: '870ded64-9037-4b85-8673-6ebc6f2ef952', fieldMetadataUniversalIdentifier: STARTUP_APPLICATION_RECEIVED_AT_FIELD_UNIVERSAL_IDENTIFIER, position: 6, isVisible: true, size: 170 },
  ],
});
