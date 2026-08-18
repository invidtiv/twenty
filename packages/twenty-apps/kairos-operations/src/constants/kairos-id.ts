import { createHash } from 'node:crypto';

const IDENTIFIER_NAMESPACE = 'kairos-operations.twenty.app.v1';

// Twenty requires stable UUID v4-shaped universal identifiers. Deriving them
// from a private app namespace keeps every manifest entity stable across syncs.
export const kairosId = (entityKey: string): string => {
  const hex = createHash('sha256')
    .update(`${IDENTIFIER_NAMESPACE}:${entityKey}`)
    .digest('hex')
    .slice(0, 32)
    .split('');

  hex[12] = '4';
  hex[16] = ['8', '9', 'a', 'b'][Number.parseInt(hex[16], 16) % 4];

  return [
    hex.slice(0, 8).join(''),
    hex.slice(8, 12).join(''),
    hex.slice(12, 16).join(''),
    hex.slice(16, 20).join(''),
    hex.slice(20, 32).join(''),
  ].join('-');
};
