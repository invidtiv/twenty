---
name: twenty-core-frontend-development
description: "Implement and customize Twenty frontend features by working inside the correct module boundaries, using canonical frontend commands, and validating GraphQL/client-state/UI changes with repo-native tooling."
---

# Twenty Core Frontend Development

## Use This Skill When

- The task touches `packages/twenty-front` UI, routing, pages, components, or frontend state.
- You need to add or modify frontend GraphQL operations, fragments, queries, mutations, or subscriptions.
- You need to work with Jotai state, hooks, or UI components.
- You need to validate frontend work with lint/typecheck/tests/storybook.
- You need to add or modify pages, routes, or settings screens.

## Tech Stack

- **Framework**: React 18 (functional components only)
- **Routing**: React Router
- **GraphQL**: Apollo Client + GraphQL Codegen
- **State**: Jotai (atoms + selectors)
- **Styling**: Linaria (CSS-in-JS, zero-runtime)
- **Build**: Vite (via Nx)
- **Testing**: Jest (utilities) + Storybook (component testing)
- **Linting**: Oxlint + oxfmt
- **i18n**: Lingui
- **UI Library**: `twenty-ui` (shared component package)
- **Validation**: Zod

## Primary References

- `CLAUDE.md`
- `packages/twenty-front/project.json`
- `packages/twenty-front/src/index.tsx`
- `packages/twenty-docs/developers/contribute/capabilities/frontend-development/frontend-commands.mdx`
- `packages/twenty-docs/developers/contribute/capabilities/frontend-development/folder-architecture-front.mdx`
- `packages/twenty-docs/developers/contribute/capabilities/frontend-development/best-practices-front.mdx`
- `packages/twenty-docs/developers/contribute/capabilities/frontend-development/style-guide.mdx`
- `packages/twenty-docs/developers/contribute/capabilities/frontend-development/hotkeys.mdx`

## Folder Architecture

```
packages/twenty-front/src/
├── index.tsx                  # ReactDOM root render → <App />
├── pages/                     # Route-level page components
│   ├── auth/
│   ├── object-record/
│   ├── onboarding/
│   ├── settings/              # Settings sub-pages (accounts, profile, members, etc.)
│   └── ...
├── modules/                   # Feature modules
│   ├── ui/                    # Reusable UI primitives (DISPLAY, INPUT, FEEDBACK, LAYOUT, NAVIGATION)
│   │   ├── display/
│   │   ├── input/
│   │   ├── feedback/
│   │   ├── layout/
│   │   └── navigation/
│   ├── app/                   # App bootstrap, routing, global effects
│   ├── apollo/                # Apollo client config, optimistic effects
│   ├── auth/                  # Authentication state & components
│   ├── object-metadata/       # Schema metadata queries
│   ├── object-record/         # Record CRUD hooks & components
│   ├── settings/              # Settings domain modules
│   └── ...
├── generated/                 # GraphQL codegen output (core API)
├── generated-metadata/        # GraphQL codegen output (metadata API)
├── generated-admin/           # GraphQL codegen output (admin API)
├── hooks/                     # Global hooks
├── types/                     # Global types
├── utils/                     # Global utilities
└── testing/                   # Test utilities & decorators
```

### Module structure convention

Every module under `src/modules/<name>/` should follow this structure:

```
<module-name>/
├── components/          # React components
│   └── <ComponentName>/
├── constants/
├── contexts/
├── graphql/
│   ├── fragments/
│   ├── queries/
│   └── mutations/
├── hooks/
│   └── internal/        # Hooks only used within this module
├── states/
│   └── selectors/       # Derived Jotai selectors
├── types/
└── utils/
```

### UI module structure

The `modules/ui/` folder contains reusable, business-logic-free components:

```
ui/
├── display/             # Text, icons, avatars, chips, tags
├── input/               # Buttons, text inputs, selects, toggles
├── feedback/            # Loaders, dialogs, snackbars, toasts
├── layout/              # Tables, modals, dropdowns, side panels, pages
└── navigation/          # Breadcrumbs, tabs, menus
```

**Rule**: `ui/` components cannot import from other `modules/`. They must be pure and reusable. Other modules can import from `ui/`.

## Canonical Commands

From repository root:

```bash
# Development
npx nx start twenty-front                              # Dev server with HMR
npx nx run twenty-front:preview                        # Preview production build

# GraphQL codegen
npx nx run twenty-front:graphql:generate               # Core API types
npx nx run twenty-front:graphql:generate --configuration=metadata   # Metadata API types

# Code quality
npx nx lint:diff-with-main twenty-front                # Lint changed files (preferred)
npx nx lint:diff-with-main twenty-front --configuration=fix
npx nx lint twenty-front                               # Full lint
npx nx lint twenty-front --configuration=fix
npx nx typecheck twenty-front                          # TypeScript check
npx nx fmt twenty-front                                # Format (oxfmt)

# Testing
npx nx test twenty-front                               # Jest unit tests
npx nx run twenty-front:storybook:serve:dev            # Storybook dev server
npx nx run twenty-front:storybook:test                 # Storybook tests (needs serve:dev running)
npx nx run twenty-front:storybook:coverage             # Storybook coverage

# Translations
npx nx run twenty-front:lingui:extract                 # Extract i18n strings
npx nx run twenty-front:lingui:compile                 # Compile i18n catalogs

# Build
npx nx build twenty-front                              # Production build
```

### Running a single test file

```bash
cd packages/twenty-front && npx jest "pattern or filename"
# or
npx jest path/to/test.test.ts --config=packages/twenty-front/jest.config.mjs
```

## Import Aliases

Always use aliases instead of relative paths:

```ts
// ❌ Bad
import { MyUtil } from '../../../../../utils/MyUtil';

// ✅ Good
import { MyUtil } from '~/utils/MyUtil';
import { MyComponent } from '@/module-name/components/MyComponent';
import { Button } from 'twenty-ui/input';
```

| Alias | Resolves to |
|-------|-------------|
| `~` | `src/` |
| `@` | `src/modules/` |
| `@testing` | `src/testing/` |
| `twenty-ui/*` | Shared UI package subpaths |

## Component Style Guide

### Functional components with named exports

```tsx
// ❌ Bad
const MyComponent = () => <div />;
export default MyComponent;

// ✅ Good
export const MyComponent = () => <div />;
```

### Props types

```tsx
// ❌ Bad
export const MyComponent = (props) => <div>{props.name}</div>;

// ✅ Good
type MyComponentProps = {
  name: string;
};

export const MyComponent = ({ name }: MyComponentProps) => (
  <div>{name}</div>
);
```

### No `React.FC`

Do not use `React.FC` or `React.FunctionComponent` — it implicitly adds `children`.

### No single-variable prop spreading

```tsx
// ❌ Bad
const MyComponent = (props: MyComponentProps) => <OtherComponent {...props} />;

// ✅ Good
const MyComponent = ({ prop1, prop2 }: MyComponentProps) => (
  <OtherComponent {...{ prop1, prop2 }} />
);
```

### Styled components with Linaria

```tsx
import { styled } from '@linaria/react';

// ✅ Good — prefix with "Styled"
const StyledTitle = styled.div`
  color: ${({ theme }) => theme.font.color.primary};
  font-size: ${({ theme }) => theme.font.size.md};
  margin-left: ${({ theme }) => theme.spacing(1)};
`;
```

### Theming

- Use theme values for colors, spacing, font sizes, borders.
- Do not introduce new colors — use the existing palette.
- Avoid raw `px` or `rem` values.

### Pass uninstantiated components as props

```tsx
// ✅ Good
<Parent Icon={MyIcon} />

// In child:
const Child = ({ Icon }: { Icon: IconComponent }) => (
  <Icon size={theme.icon.size.md} />
);
```

## TypeScript Conventions

- Use `type` instead of `interface`.
- Use string literals instead of enums (except GraphQL codegen enums and internal library enums).
- Use `??` (nullish coalescing) instead of `||`.
- Use `?.` (optional chaining) instead of manual null checks.
- **No type-only imports** — the Oxlint rule `typescript/consistent-type-imports` enforces this.

```tsx
// ❌ Bad
import { type Meta } from '@storybook/react';
import type { Meta } from '@storybook/react';

// ✅ Good
import { Meta } from '@storybook/react';
```

## State Management (Jotai)

Use Jotai atoms for all shared state. Avoid `useRef` for state.

### Basic state atom

```ts
import { createAtomState } from '@/ui/utilities/state/jotai/utils/createAtomState';

export const myState = createAtomState<string>({
  key: 'myState',
  defaultValue: 'default',
});
```

With local/session storage persistence:
```ts
export const persistedState = createAtomState<string>({
  key: 'persistedState',
  defaultValue: '',
  useLocalStorage: true,
  // useSessionStorage: true,
  // useCookieStorage: { cookieKey: 'my_cookie', ... },
});
```

### Family state (parametrized)

```ts
import { createAtomFamilyState } from '@/ui/utilities/state/jotai/utils/createAtomFamilyState';

export const itemByIdState = createAtomFamilyState<string, string>({
  key: 'itemByIdState',
  defaultValue: '',
});
```

### Component-scoped state

```ts
import { createComponentInstanceContext } from '@/ui/utilities/state/component-state/utils/createComponentInstanceContext';
import { createAtomComponentState } from '@/ui/utilities/state/jotai/utils/createAtomComponentState';

export const MyComponentContext = createComponentInstanceContext();

export const myComponentState = createAtomComponentState<string>({
  key: 'myComponentState',
  defaultValue: '',
  componentInstanceContext: MyComponentContext,
});
```

### Using state in components

```tsx
import { useAtomState } from '@/ui/utilities/state/jotai/hooks/useAtomState';
import { useAtomStateValue } from '@/ui/utilities/state/jotai/hooks/useAtomStateValue';
import { useSetAtomState } from '@/ui/utilities/state/jotai/hooks/useSetAtomState';

const [value, setValue] = useAtomState(myState);
const readonlyValue = useAtomStateValue(myState);
const setValueOnly = useSetAtomState(myState);
```

### Selectors (derived state)

Place derived atoms in `states/selectors/`. They compute values from other atoms and are auto-memoized.

## GraphQL Patterns

GraphQL operations live in `src/modules/<module>/graphql/`.

### Fragments

```ts
import { gql } from '@apollo/client';

export const MY_FRAGMENT = gql`
  fragment MyFragment on MyType {
    id
    name
  }
`;
```

### Queries

```ts
import { gql } from '@apollo/client';

export const FIND_MANY_ITEMS = gql`
  ${MY_FRAGMENT}
  query FindManyItems {
    items {
      edges {
        node {
          ...MyFragment
        }
      }
    }
  }
`;
```

### Mutations

```ts
export const UPDATE_ITEM = gql`
  ${MY_FRAGMENT}
  mutation UpdateItem($input: UpdateItemInput!) {
    updateItem(input: $input) {
      ...MyFragment
    }
  }
`;
```

### Codegen

After modifying GraphQL operations or the backend schema:
```bash
npx nx run twenty-front:graphql:generate
npx nx run twenty-front:graphql:generate --configuration=metadata
```

Generated types appear in `src/generated/`, `src/generated-metadata/`, `src/generated-admin/`.

## Re-renders & Performance

### Avoid `useEffect` when possible

Move logic into event handlers (`handleClick`, `handleChange`) or use Apollo's `onCompleted` / `onError` callbacks.

### Extract `useEffect` into sibling components

```tsx
// ❌ Bad — useEffect in the render component causes re-renders
export const Page = () => {
  useEffect(() => { setData(dep); }, [dep]);
  return <div>{data}</div>;
};

// ✅ Good — sidecar component isolates the effect
export const Page = () => <div>{data}</div>;
export const PageData = () => {
  useEffect(() => { setData(dep); }, [dep]);
  return <></>;
};
```

### Do NOT use `React.memo`

It breaks the re-render chain and leads to hard-to-debug issues. Fix the root cause instead.

### Limit `useCallback` / `useMemo`

They are usually unnecessary and hurt readability.

### No `useRef` for state

Use `useState` or Jotai atoms instead.

## Hotkeys

Use `useScopedHotkeys` to avoid conflicts between overlapping key listeners.

```tsx
import { useScopedHotkeys } from '@/ui/utilities/hotkey/hooks/useScopedHotkeys';
import { usePreviousHotkeyScope } from '@/ui/utilities/hotkey/hooks/usePreviousHotkeyScope';

const {
  setHotkeyScopeAndMemorizePreviousScope,
  goBackToPreviousHotkeyScope,
} = usePreviousHotkeyScope();

useEffect(() => {
  setHotkeyScopeAndMemorizePreviousScope(PageHotkeyScope.MyPage);
  return () => goBackToPreviousHotkeyScope();
}, []);

useScopedHotkeys(
  Key.Enter,
  () => { /* handle Enter */ },
  PageHotkeyScope.MyPage,
);
```

## Naming Conventions

- **Variables**: descriptive, no generic names like `value`, `data`, `dummy`.
- **Event handlers**: prefix with `handle` (`handleEmailChange`), not `on`.
- **Props events**: prefix with `on` (`onEmailChange`).
- **Styled components**: prefix with `Styled` (`StyledButton`).
- **Optional props**: do not pass the default value explicitly.

## Testing

- **Jest**: for utility functions and hooks. Not for components.
- **Storybook**: for isolated component behavior and the design system.

```bash
npx nx run twenty-front:storybook:serve:dev   # Start Storybook
npx nx run twenty-front:storybook:test        # Run tests against it
```

Online Storybook: https://storybook.twenty.com

## Translations (Lingui)

```tsx
import { t } from '@lingui/core/macro';

const label = t`Hello World`;
```

After adding new strings:
```bash
npx nx run twenty-front:lingui:extract
npx nx run twenty-front:lingui:compile
```

## twenty-ui Package

Shared UI components live in `packages/twenty-ui/`. Import from subpaths:

```tsx
import { Button, IconButton } from 'twenty-ui/input';
import { Avatar, IconComponent } from 'twenty-ui/display';
import { useTheme, ThemeColor } from 'twenty-ui/theme';
import { themeCssVariables } from 'twenty-ui/theme-constants';
import { MenuItem } from 'twenty-ui/navigation';
import { Tooltip } from 'twenty-ui/feedback';
```

## Zod Schema Validation

Use Zod for untyped object validation:

```ts
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type Form = z.infer<typeof schema>;
```

## Execution Pattern

1. Determine impacted module under `src/modules` or `src/pages`.
2. Follow module conventions: components, graphql, hooks, states, utils.
3. Use Jotai atoms for shared state; event handlers for local logic.
4. Regenerate GraphQL types when schema/queries changed.
5. Run diff lint + typecheck; run tests closest to touched area.
6. Report changed files and commands run.

## Guardrails

- Preserve existing module boundaries and folder conventions.
- Avoid `any`; prefer explicit types.
- Prefer event-driven updates over avoidable `useEffect` state coupling.
- Do not broad-refactor unrelated frontend modules.
- Do not use `React.memo`, `useRef` for state, or excessive `useCallback`/`useMemo`.
- No type-only imports (`import type { ... }`) — Oxlint enforces this.
- Use `type` instead of `interface`; string literals instead of enums.
- UI components must not import business logic from other modules.
- Remove `console.log` statements before committing.
- Always pass components as uninstantiated props (PascalCase) when possible.
- Use `??` not `||`; use `?.` not manual null checks.
- Keep styling theme-driven — no raw colors or px values.
- Perform thorough manual testing — test coverage is not yet comprehensive.
