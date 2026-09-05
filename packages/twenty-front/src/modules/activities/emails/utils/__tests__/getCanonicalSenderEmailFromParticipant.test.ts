import { type EmailThreadMessageParticipant } from '@/activities/emails/types/EmailThreadMessageParticipant';

import { MessageParticipantRole } from 'twenty-shared/types';
import { getCanonicalSenderEmailFromParticipant } from '@/activities/emails/utils/getCanonicalSenderEmailFromParticipant';

describe('getCanonicalSenderEmailFromParticipant', () => {
  const participantWithHandle = {
    displayName: '',
    handle: 'user@company.com',
    role: MessageParticipantRole.FROM,
  } as EmailThreadMessageParticipant;

  const participantWithDisplayName = {
    displayName: 'John Doe',
    handle: '',
    role: MessageParticipantRole.FROM,
  } as EmailThreadMessageParticipant;

  const participantWithoutInfo = {
    displayName: '',
    handle: '',
    role: MessageParticipantRole.FROM,
  } as EmailThreadMessageParticipant;

  it('returns handle when available', () => {
    expect(
      getCanonicalSenderEmailFromParticipant({
        participant: participantWithHandle,
      }),
    ).toBe('user@company.com');
  });

  it('falls back to display name when handle is missing', () => {
    expect(
      getCanonicalSenderEmailFromParticipant({
        participant: participantWithDisplayName,
      }),
    ).toBe('John Doe');
  });

  it('returns Unknown when no sender info is available', () => {
    expect(
      getCanonicalSenderEmailFromParticipant({
        participant: participantWithoutInfo,
      }),
    ).toBe('Unknown');
  });
});
