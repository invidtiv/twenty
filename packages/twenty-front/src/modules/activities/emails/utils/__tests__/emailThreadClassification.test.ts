import {
  getActiveEmailThreadClassificationKeys,
  getEmailThreadClassificationState,
  toggleEmailThreadClassificationState,
} from '@/activities/emails/utils/emailThreadClassification';

describe('emailThreadClassification', () => {
  it('normalizes missing classification metadata to inactive flags', () => {
    expect(getEmailThreadClassificationState(null)).toEqual({
      spam: false,
      important: false,
      needsAction: false,
    });
  });

  it('normalizes provider classification metadata into row flags', () => {
    expect(
      getEmailThreadClassificationState({
        provider: 'gmail',
        isSpam: true,
        isImportant: true,
        sourceLabelIds: ['SPAM', 'IMPORTANT'],
      }),
    ).toEqual({
      spam: true,
      important: true,
      needsAction: false,
    });
  });

  it('supports needs-action metadata from current and future UI field names', () => {
    expect(
      getEmailThreadClassificationState({
        isNeedsAction: true,
      }),
    ).toMatchObject({ needsAction: true });

    expect(
      getEmailThreadClassificationState({
        needsAction: true,
      }),
    ).toMatchObject({ needsAction: true });
  });

  it('toggles one manual classification flag without changing the others', () => {
    const state = {
      spam: false,
      important: true,
      needsAction: false,
    };

    expect(toggleEmailThreadClassificationState(state, 'needsAction')).toEqual({
      spam: false,
      important: true,
      needsAction: true,
    });
  });

  it('lists active flags in stable display order', () => {
    expect(
      getActiveEmailThreadClassificationKeys({
        spam: true,
        important: false,
        needsAction: true,
      }),
    ).toEqual(['spam', 'needsAction']);
  });
});
