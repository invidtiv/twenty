import {
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS,
  ViewSortDirection,
  ViewType,
  defineView,
} from 'twenty-sdk/define';

import { viewEntityId, viewId } from 'src/constants/identifiers';

export const EMAILS_VIEW_ID = viewId('emails');

const messageThread = STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.messageThread;

export default defineView({
  universalIdentifier: EMAILS_VIEW_ID,
  name: 'Emails',
  objectUniversalIdentifier: messageThread.universalIdentifier,
  type: ViewType.TABLE,
  icon: 'IconMail',
  position: 1,
  fields: [
    {
      universalIdentifier: viewEntityId('emails', 'field.subject'),
      fieldMetadataUniversalIdentifier:
        messageThread.fields.subject.universalIdentifier,
      position: 0,
      isVisible: true,
      size: 360,
    },
    {
      universalIdentifier: viewEntityId('emails', 'field.messages'),
      fieldMetadataUniversalIdentifier:
        messageThread.fields.messages.universalIdentifier,
      position: 1,
      isVisible: true,
      size: 180,
    },
    {
      universalIdentifier: viewEntityId('emails', 'field.updatedAt'),
      fieldMetadataUniversalIdentifier:
        messageThread.fields.updatedAt.universalIdentifier,
      position: 2,
      isVisible: true,
      size: 180,
    },
    {
      universalIdentifier: viewEntityId('emails', 'field.createdAt'),
      fieldMetadataUniversalIdentifier:
        messageThread.fields.createdAt.universalIdentifier,
      position: 3,
      isVisible: true,
      size: 180,
    },
  ],
  sorts: [
    {
      universalIdentifier: viewEntityId('emails', 'sort.updatedAt'),
      fieldMetadataUniversalIdentifier:
        messageThread.fields.updatedAt.universalIdentifier,
      direction: ViewSortDirection.DESC,
    },
  ],
});
