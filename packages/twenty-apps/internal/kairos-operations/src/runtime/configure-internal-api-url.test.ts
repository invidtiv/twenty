import { describe, expect, it } from 'vitest';

import { getInternalGraphqlUrl } from 'src/runtime/configure-internal-api-url';

describe('configureInternalApiUrl', () => {
  it('should resolve the internal GraphQL URL for server-side calls', () => {
    const environment = {
      TWENTY_API_URL: 'http://100.115.155.120:2020',
      KAIROS_INTERNAL_API_URL: 'http://127.0.0.1:2020/',
    };

    expect(getInternalGraphqlUrl(environment)).toBe(
      'http://127.0.0.1:2020/graphql',
    );
  });

  it('should use the generated client default when no internal URL is configured', () => {
    const environment = { TWENTY_API_URL: 'https://twenty.example.com' };

    expect(getInternalGraphqlUrl(environment)).toBeUndefined();
  });
});
