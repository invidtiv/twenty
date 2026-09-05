// Front components run in a browser worker, so this identifier must not depend
// on the node:crypto-backed identifier factory used by manifest-only files.
export const OPERATIONS_TIMELINE_FRONT_COMPONENT_ID =
  '50210c2d-e1c2-40ba-a7c9-f5282c7f0824';
