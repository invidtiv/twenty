import { isNonEmptyString } from '@sniptt/guards';

type ProcessEnvironment = Record<string, string | undefined>;

export const getInternalGraphqlUrl = (
  environment: ProcessEnvironment,
): string | undefined => {
  const internalApiUrl = environment.KAIROS_INTERNAL_API_URL;
  if (!isNonEmptyString(internalApiUrl)) return undefined;
  return `${internalApiUrl.replace(/\/$/, '')}/graphql`;
};
