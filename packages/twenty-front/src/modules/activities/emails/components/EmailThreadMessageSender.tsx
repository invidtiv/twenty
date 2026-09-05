import { styled } from '@linaria/react';

import { ParticipantChip } from '@/activities/components/ParticipantChip';
import { getCanonicalSenderEmailFromParticipant } from '@/activities/emails/utils/getCanonicalSenderEmailFromParticipant';
import { type EmailThreadMessageParticipant } from '@/activities/emails/types/EmailThreadMessageParticipant';
import { useAtomStateValue } from '@/ui/utilities/state/jotai/hooks/useAtomStateValue';
import { AppTooltip, TooltipPosition } from 'twenty-ui/display';
import { themeCssVariables } from 'twenty-ui/theme-constants';
import { dateLocaleState } from '~/localization/states/dateLocaleState';
import {
  beautifyPastDateRelativeToNow,
  formatToHumanReadableDate,
} from '~/utils/date-utils';

const StyledEmailThreadMessageSender = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${themeCssVariables.spacing[1]};
`;

const StyledThreadMessageSenderHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledThreadMessageSentAt = styled.div`
  align-items: flex-end;
  color: ${themeCssVariables.font.color.tertiary};
  display: flex;
  font-size: ${themeCssVariables.font.size.sm};
`;

const StyledThreadMessageFrom = styled.div`
  color: ${themeCssVariables.font.color.tertiary};
  font-size: ${themeCssVariables.font.size.sm};
`;

type EmailThreadMessageSenderProps = {
  sender: EmailThreadMessageParticipant;
  sentAt: string;
};

export const EmailThreadMessageSender = ({
  sender,
  sentAt,
}: EmailThreadMessageSenderProps) => {
  const { localeCatalog } = useAtomStateValue(dateLocaleState);
  const tooltipId = `date-tooltip-${sentAt.replace(/[^a-zA-Z0-9]/g, '-')}`;
  const canonicalSenderEmail = getCanonicalSenderEmailFromParticipant({
    participant: sender,
  });

  return (
    <StyledEmailThreadMessageSender>
      <StyledThreadMessageSenderHeader>
        <ParticipantChip participant={sender} variant="bold" />
        <StyledThreadMessageSentAt id={tooltipId}>
          {beautifyPastDateRelativeToNow(sentAt, localeCatalog)}
        </StyledThreadMessageSentAt>
      </StyledThreadMessageSenderHeader>
      <StyledThreadMessageFrom>{canonicalSenderEmail}</StyledThreadMessageFrom>
      <AppTooltip
        anchorSelect={`#${tooltipId}`}
        content={formatToHumanReadableDate(sentAt)}
        place={TooltipPosition.Top}
      />
    </StyledEmailThreadMessageSender>
  );
};
