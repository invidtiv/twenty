import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { type ComponentProps } from 'react';
import { ThemeProvider } from 'twenty-ui/theme-constants';

import { EmailThreadClassificationControls } from '@/activities/emails/components/EmailThreadClassificationControls';

jest.mock('@linaria/react', () => {
  const React = jest.requireActual('react');
  const createStyledComponentFactory = (tagName: string) => () => {
    const StyledComponent = ({
      active: _active,
      classificationKey: _classificationKey,
      showLabel: _showLabel,
      ...props
    }: ComponentProps<'button'> & {
      active?: boolean;
      classificationKey?: string;
      showLabel?: boolean;
    }) => React.createElement(tagName, props);

    return StyledComponent;
  };

  return {
    styled: new Proxy(createStyledComponentFactory, {
      apply: (_target, _thisArg, [tagName]: [string]) =>
        createStyledComponentFactory(tagName),
      get: (_target, tagName: string) => createStyledComponentFactory(tagName),
    }),
  };
});

const renderControls = ({
  onToggle = jest.fn(),
  showLabels,
}: {
  onToggle?: (key: 'spam' | 'important' | 'needsAction') => void;
  showLabels?: boolean;
} = {}) => {
  render(
    <I18nProvider i18n={i18n}>
      <ThemeProvider colorScheme="light">
        <EmailThreadClassificationControls
          classificationState={{
            spam: true,
            important: false,
            needsAction: true,
          }}
          onToggle={onToggle}
          showLabels={showLabels}
        />
      </ThemeProvider>
    </I18nProvider>,
  );

  return { onToggle };
};

describe('EmailThreadClassificationControls', () => {
  it('renders pressed state for active classification flags', () => {
    renderControls();

    expect(screen.getByRole('button', { name: 'Spam' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    expect(screen.getByRole('button', { name: 'Important' })).toHaveAttribute(
      'aria-pressed',
      'false',
    );
    expect(
      screen.getByRole('button', { name: 'Needs Action' }),
    ).toHaveAttribute('aria-pressed', 'true');
  });

  it('calls onToggle without relying on row click behavior', async () => {
    const user = userEvent.setup();
    const onToggle = jest.fn();

    renderControls({ onToggle });

    await user.click(screen.getByRole('button', { name: 'Important' }));

    expect(onToggle).toHaveBeenCalledWith('important');
  });

  it('can render visible labels for thread detail surfaces', () => {
    renderControls({ showLabels: true });

    expect(screen.getByText('Spam')).toBeVisible();
    expect(screen.getByText('Important')).toBeVisible();
    expect(screen.getByText('Needs Action')).toBeVisible();
  });
});
