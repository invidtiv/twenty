import { isNonEmptyString } from '@sniptt/guards';

import {
  getDisplayNameFromParticipant,
  type EmailParticipantDisplayNameFields,
} from '@/activities/emails/utils/getDisplayNameFromParticipant';

export const getCanonicalSenderEmailFromParticipant = ({
  participant,
}: {
  participant: EmailParticipantDisplayNameFields;
}) => {
  if (isNonEmptyString(participant.handle)) {
    return participant.handle;
  }

  return getDisplayNameFromParticipant({ participant });
};
