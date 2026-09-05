export const EMAIL_THREAD_CLASSIFICATION_KEYS = [
  'spam',
  'important',
  'needsAction',
] as const;

export type EmailThreadClassificationKey =
  (typeof EMAIL_THREAD_CLASSIFICATION_KEYS)[number];

export type EmailThreadClassificationState = Record<
  EmailThreadClassificationKey,
  boolean
>;

export type EmailThreadClassificationMetadata = Partial<{
  provider: 'gmail' | 'imap' | 'microsoft' | 'smtp' | 'inboundEmail';
  isSpam: boolean | null;
  isImportant: boolean | null;
  isNeedsAction: boolean | null;
  needsAction: boolean | null;
  sourceLabelIds: string[];
}>;

export const getEmailThreadClassificationState = (
  classification: EmailThreadClassificationMetadata | null | undefined,
): EmailThreadClassificationState => ({
  spam: classification?.isSpam === true,
  important: classification?.isImportant === true,
  needsAction:
    classification?.isNeedsAction === true ||
    classification?.needsAction === true,
});

export const toggleEmailThreadClassificationState = (
  classificationState: EmailThreadClassificationState,
  classificationKey: EmailThreadClassificationKey,
): EmailThreadClassificationState => ({
  ...classificationState,
  [classificationKey]: !classificationState[classificationKey],
});

export const getActiveEmailThreadClassificationKeys = (
  classificationState: EmailThreadClassificationState,
) =>
  EMAIL_THREAD_CLASSIFICATION_KEYS.filter(
    (classificationKey) => classificationState[classificationKey],
  );
