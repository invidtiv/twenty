import { styled } from '@linaria/react';

import { ActivityRow } from '@/activities/components/ActivityRow';
import { EmailThreadClassificationControls } from '@/activities/emails/components/EmailThreadClassificationControls';
import { EmailThreadNotShared } from '@/activities/emails/components/EmailThreadNotShared';
import {
  type EmailThreadClassificationKey,
  type EmailThreadClassificationMetadata,
  getEmailThreadClassificationState,
  toggleEmailThreadClassificationState,
} from '@/activities/emails/utils/emailThreadClassification';
import { getCanonicalSenderEmailFromParticipant } from '@/activities/emails/utils/getCanonicalSenderEmailFromParticipant';
import { useOpenRecordInSidePanel } from '@/side-panel/hooks/useOpenRecordInSidePanel';
import { useContext, useState } from 'react';

import { CoreObjectNameSingular } from 'twenty-shared/types';
import { isDefined } from 'twenty-shared/utils';
import { Avatar } from 'twenty-ui/display';
import { ThemeContext, themeCssVariables } from 'twenty-ui/theme-constants';
import {
  MessageChannelVisibility,
  type TimelineThread,
} from '~/generated/graphql';
import { formatToHumanReadableDate } from '~/utils/date-utils';

const StyledHeading = styled.div<{ unread: boolean }>`
  display: flex;
  max-width: 20%;
  overflow: hidden;
  width: fit-content;
`;

const StyledParticipantsContainer = styled.div`
  align-items: flex-start;
  display: flex;
`;

const StyledAvatarWrapper = styled.div`
  margin-left: calc(-1 * ${themeCssVariables.spacing[1]});
`;

const StyledSenderNames = styled.span`
  display: flex;
  margin: ${themeCssVariables.spacing[0]} ${themeCssVariables.spacing[1]};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const StyledThreadCount = styled.span`
  color: ${themeCssVariables.font.color.tertiary};
`;

const StyledSubjectAndBody = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  gap: ${themeCssVariables.spacing[2]};
  overflow: hidden;
`;

const StyledSubject = styled.span`
  color: ${themeCssVariables.font.color.primary};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const StyledBody = styled.span`
  color: ${themeCssVariables.font.color.tertiary};
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const StyledReceivedAt = styled.div`
  font-size: ${themeCssVariables.font.size.sm};
  font-weight: ${themeCssVariables.font.weight.regular};
  padding: ${themeCssVariables.spacing[0]} ${themeCssVariables.spacing[1]};
`;

type TimelineThreadWithClassification = TimelineThread & {
  classification?: EmailThreadClassificationMetadata | null;
  lastMessageClassification?: EmailThreadClassificationMetadata | null;
};

type EmailThreadPreviewProps = {
  thread: TimelineThreadWithClassification;
};

export const EmailThreadPreview = ({ thread }: EmailThreadPreviewProps) => {
  const { theme } = useContext(ThemeContext);
  const { openRecordInSidePanel } = useOpenRecordInSidePanel();
  const [classificationState, setClassificationState] = useState(() =>
    getEmailThreadClassificationState(
      thread.lastMessageClassification ?? thread.classification,
    ),
  );

  const visibility = thread.visibility;
  const senderHandles = [
    getCanonicalSenderEmailFromParticipant({
      participant: thread.firstParticipant,
    }),
    ...(thread.lastTwoParticipants ?? []).map((participant) =>
      getCanonicalSenderEmailFromParticipant({ participant }),
    ),
  ];

  const senderNames = senderHandles.join(', ');

  const [finalDisplayedName, finalAvatarUrl, isCountIcon] =
    thread.participantCount > 3
      ? [`${thread.participantCount}`, '', true]
      : [
          thread?.lastTwoParticipants?.[1]?.displayName,
          thread?.lastTwoParticipants?.[1]?.avatarUrl,
          false,
        ];

  const handleThreadClick = () => {
    const canOpen =
      thread.visibility === MessageChannelVisibility.SHARE_EVERYTHING;

    if (canOpen) {
      openRecordInSidePanel({
        recordId: thread.id,
        objectNameSingular: CoreObjectNameSingular.MessageThread,
      });
    }
  };

  const isDisabled = visibility !== MessageChannelVisibility.SHARE_EVERYTHING;

  const handleToggleClassification = (
    classificationKey: EmailThreadClassificationKey,
  ) => {
    setClassificationState((currentClassificationState) =>
      toggleEmailThreadClassificationState(
        currentClassificationState,
        classificationKey,
      ),
    );
  };

  return (
    <ActivityRow onClick={handleThreadClick} disabled={isDisabled}>
      <StyledHeading unread={!thread.read}>
        <StyledParticipantsContainer>
          <Avatar
            avatarUrl={thread?.firstParticipant?.avatarUrl}
            placeholder={thread.firstParticipant.displayName}
            placeholderColorSeed={
              thread.firstParticipant.workspaceMemberId ||
              thread.firstParticipant.personId
            }
            type="rounded"
          />
          {isDefined(thread?.lastTwoParticipants?.[0]) && (
            <StyledAvatarWrapper>
              <Avatar
                avatarUrl={thread.lastTwoParticipants[0].avatarUrl}
                placeholder={thread.lastTwoParticipants[0].displayName}
                placeholderColorSeed={
                  thread.lastTwoParticipants[0].workspaceMemberId ||
                  thread.lastTwoParticipants[0].personId
                }
                type="rounded"
              />
            </StyledAvatarWrapper>
          )}
          {finalDisplayedName && (
            <StyledAvatarWrapper>
              <Avatar
                avatarUrl={finalAvatarUrl}
                placeholder={finalDisplayedName}
                type="rounded"
                color={isCountIcon ? theme.grayScale.gray11 : undefined}
                backgroundColor={
                  isCountIcon ? theme.grayScale.gray2 : undefined
                }
              />
            </StyledAvatarWrapper>
          )}
        </StyledParticipantsContainer>

        <StyledSenderNames>{senderNames}</StyledSenderNames>
        <StyledThreadCount>{thread.numberOfMessagesInThread}</StyledThreadCount>
      </StyledHeading>

      <StyledSubjectAndBody>
        {visibility === MessageChannelVisibility.METADATA && (
          <EmailThreadNotShared visibility={visibility} />
        )}
        {visibility === MessageChannelVisibility.SUBJECT && (
          <>
            <StyledSubject>{thread.subject}</StyledSubject>
            <EmailThreadNotShared visibility={visibility} />
          </>
        )}
        {visibility === MessageChannelVisibility.SHARE_EVERYTHING && (
          <>
            <StyledSubject>{thread.subject}</StyledSubject>
            <StyledBody>{thread.lastMessageBody}</StyledBody>
          </>
        )}
      </StyledSubjectAndBody>
      <EmailThreadClassificationControls
        classificationState={classificationState}
        disabled={isDisabled}
        onToggle={handleToggleClassification}
      />
      <StyledReceivedAt>
        {formatToHumanReadableDate(thread.lastMessageReceivedAt)}
      </StyledReceivedAt>
    </ActivityRow>
  );
};
