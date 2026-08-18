---
name: twenty-app-ai-skills-and-agents
description: "Design and implement AI skills and agents for Twenty apps using defineSkill/defineAgent with correct manifest fields, SDK validation expectations, and extension docs references."
---

# Twenty App AI Skills and Agents

## Use This Skill When

- You need to create or modify app-level AI capabilities in Twenty extension apps.
- The task involves `defineSkill()` or `defineAgent()` manifests.
- You need to enforce required fields and naming conventions before sync.

## Primary References

- `packages/twenty-docs/developers/extend/apps/logic/skills-and-agents.mdx`
- `packages/twenty-docs/developers/extend/apps/getting-started/concepts.mdx`
- `packages/twenty-sdk/src/sdk/define/skills/define-skill.ts`
- `packages/twenty-sdk/src/sdk/define/agents/define-agent.ts`
- `packages/twenty-sdk/src/sdk/define/index.ts`
- `packages/create-twenty-app/src/constants/template/AGENTS.md`

## Required Fields

From SDK validation behavior:

### `defineSkill`

Required:

- `universalIdentifier`
- `name`
- `label`
- `content`

### `defineAgent`

Required:

- `universalIdentifier`
- `name`
- `label`
- `prompt`

## Canonical Patterns

- Keep `name` stable and kebab-case.
- Use concise, action-oriented `content` for skills.
- Use behavior-defining `prompt` for agents.
- Use optional `description`, `icon`, and `modelId` where useful.

## Execution Pattern

1. Decide if capability belongs in reusable skill, autonomous agent, or both.
2. Scaffold via `yarn twenty dev:add skill` / `yarn twenty dev:add agent` where possible.
3. Implement with stable UUID v4 and deterministic naming.
4. Validate with `yarn twenty dev --once` and inspect sync output.
5. If runtime behavior is wrong, iterate skill content/prompt with smallest delta.

## Guardrails

- Do not leave required fields empty; SDK validation will fail.
- Keep skill/agent text specific to business workflow, not generic assistant fluff.
- Prefer multiple focused skills over one overly broad skill blob.
- Treat skills/agents as alpha features and keep changes easy to evolve.
