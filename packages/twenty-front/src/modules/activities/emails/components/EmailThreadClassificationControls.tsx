import { styled } from '@linaria/react';
import { useLingui } from '@lingui/react/macro';
import { type ComponentType } from 'react';

import {
  type EmailThreadClassificationKey,
  type EmailThreadClassificationState,
} from '@/activities/emails/utils/emailThreadClassification';
import { IconAlertTriangle, IconFlag, IconStar } from 'twenty-ui/display';
import { themeCssVariables } from 'twenty-ui/theme-constants';

const StyledClassificationControls = styled.div`
  align-items: center;
  display: flex;
  flex-shrink: 0;
  gap: ${themeCssVariables.spacing[1]};
`;

const getActiveClassificationBackground = (
  classificationKey: EmailThreadClassificationKey,
) => {
  switch (classificationKey) {
    case 'spam':
      return themeCssVariables.color.red3;
    case 'important':
      return themeCssVariables.color.yellow3;
    case 'needsAction':
      return themeCssVariables.color.blue3;
  }
};

const getActiveClassificationBorderColor = (
  classificationKey: EmailThreadClassificationKey,
) => {
  switch (classificationKey) {
    case 'spam':
      return themeCssVariables.color.red5;
    case 'important':
      return themeCssVariables.color.yellow5;
    case 'needsAction':
      return themeCssVariables.color.blue5;
  }
};

const getActiveClassificationColor = (
  classificationKey: EmailThreadClassificationKey,
) => {
  switch (classificationKey) {
    case 'spam':
      return themeCssVariables.color.red11;
    case 'important':
      return themeCssVariables.color.yellow11;
    case 'needsAction':
      return themeCssVariables.color.blue11;
  }
};

const StyledClassificationButton = styled.button<{
  active: boolean;
  classificationKey: EmailThreadClassificationKey;
  showLabel: boolean;
}>`
  align-items: center;
  background: ${({ active, classificationKey }) =>
    active ? getActiveClassificationBackground(classificationKey) : 'none'};
  border: 1px solid
    ${({ active, classificationKey }) =>
      active
        ? getActiveClassificationBorderColor(classificationKey)
        : 'transparent'};
  border-radius: ${themeCssVariables.border.radius.sm};
  color: ${({ active, classificationKey }) =>
    active
      ? getActiveClassificationColor(classificationKey)
      : themeCssVariables.font.color.tertiary};
  cursor: pointer;
  display: flex;
  gap: ${({ showLabel }) =>
    showLabel ? themeCssVariables.spacing[1] : themeCssVariables.spacing[0]};
  height: ${themeCssVariables.spacing[6]};
  justify-content: center;
  min-width: ${themeCssVariables.spacing[6]};
  padding: ${({ showLabel }) =>
    showLabel
      ? `${themeCssVariables.spacing[0]} ${themeCssVariables.spacing[2]}`
      : themeCssVariables.spacing[0]};
  width: ${({ showLabel }) =>
    showLabel ? 'auto' : themeCssVariables.spacing[6]};

  &:disabled {
    cursor: not-allowed;
    opacity: 0.48;
  }

  &:focus {
    box-shadow: 0 0 0 3px ${themeCssVariables.accent.tertiary};
    outline: none;
  }

  &:hover:not(:disabled) {
    background: ${({ active, classificationKey }) =>
      active
        ? getActiveClassificationBackground(classificationKey)
        : themeCssVariables.background.transparent.light};
  }
`;

const StyledClassificationLabel = styled.span`
  font-size: ${themeCssVariables.font.size.sm};
  font-weight: ${themeCssVariables.font.weight.medium};
`;

type ClassificationControl = {
  key: EmailThreadClassificationKey;
  label: string;
  Icon: ComponentType<{ size?: number; stroke?: number }>;
};

type EmailThreadClassificationControlsProps = {
  classificationState: EmailThreadClassificationState;
  disabled?: boolean;
  onToggle: (classificationKey: EmailThreadClassificationKey) => void;
  showLabels?: boolean;
};

export const EmailThreadClassificationControls = ({
  classificationState,
  disabled = false,
  onToggle,
  showLabels = false,
}: EmailThreadClassificationControlsProps) => {
  const { t } = useLingui();

  const classificationControls: ClassificationControl[] = [
    {
      key: 'spam',
      label: t`Spam`,
      Icon: IconAlertTriangle,
    },
    {
      key: 'important',
      label: t`Important`,
      Icon: IconStar,
    },
    {
      key: 'needsAction',
      label: t`Needs Action`,
      Icon: IconFlag,
    },
  ];

  return (
    <StyledClassificationControls>
      {classificationControls.map(({ key, label, Icon }) => (
        <StyledClassificationButton
          active={classificationState[key]}
          aria-label={label}
          aria-pressed={classificationState[key]}
          classificationKey={key}
          disabled={disabled}
          key={key}
          onClick={(event) => {
            event.stopPropagation();
            onToggle(key);
          }}
          showLabel={showLabels}
          title={label}
          type="button"
        >
          <Icon size={14} stroke={1.8} />
          {showLabels && (
            <StyledClassificationLabel>{label}</StyledClassificationLabel>
          )}
        </StyledClassificationButton>
      ))}
    </StyledClassificationControls>
  );
};
