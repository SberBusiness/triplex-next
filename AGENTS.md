# Triplex-Next — AI Agent Instructions

This file is an entry point. Canonical non-negotiable rules live in
`docs/ai/codestyle.md` and the linked detailed guides.

## Read before working with components

**Main context file:** `docs/ai/CONTEXT.md`
Contains: tech stack, component structure, naming conventions, design tokens,
prop addition workflow, invariants.

**Component-specific docs:** `src/components/{ComponentName}/{ComponentName}-ai.md`
Example: `src/components/Button/Button-ai.md`

Always use `docs/ai/CONTEXT.md` + `docs/ai/codestyle.md`.

If `{ComponentName}-ai.md` does not exist yet:
- inspect the component source, stories, and tests
- follow the local pattern of that component
- do not create a new `*-ai.md` file unless the task explicitly asks for it

**Template for new components:** `docs/ai/template-ai.md`

**AI-Ready progress tracker:** `docs/ai/ROADMAP.md`

---

## Development conventions

| Topic | File |
|---|---|
| Codestyle (TS, React, LESS, principles) | `docs/ai/codestyle.md` |
| Testing (unit, visual, e2e) | `docs/ai/tests.md` |
| Stories (structure, examples, checklist) | `docs/ai/stories-guide.md` |
| Commits, branches, PR workflow | `docs/ai/commits.md` |
| AI refactoring (rules for ROADMAP refactor column) | `docs/ai/ai-refactoring.md` |

---

## Typical task: add a prop to an existing component

1. Read `docs/ai/CONTEXT.md`
2. Read `docs/ai/codestyle.md` and the guide for the area you touch
3. If present, read `src/components/{ComponentName}/{ComponentName}-ai.md`
4. Read the component source code, stories, and tests
5. Make changes: TSX → LESS → story → tests
6. If `{ComponentName}-ai.md` exists, update the "История изменений" section

## Verification before finishing

- Do not finish after code edits without at least one verification step.
- For docs/config-only changes: self-check links, examples, commands and cross-file consistency.
- For component or logic changes: run lints/diagnostics for edited files and a focused unit test when the change affects public behavior.
- For story changes with visible UI impact: make sure the changed state is covered by an existing story or a new story/Visual tests story.
- For accessibility, focus-management, keyboard or overlay behavior changes: prefer adding or updating a focused automated test.
- If you could not run a relevant check, say so explicitly in the final response.

## Tech stack

React 18 + TypeScript strict + LESS Modules + Vite + Storybook 9

## Key constraints

- `forwardRef` is mandatory on all components — never remove it
- Public API (prop names, types, enum values) is a breaking change
- All barrel exports in `index.ts` must remain
- Use `clsx` for className merging, never string concatenation
- No hardcoded colors/sizes — use CSS variables from design tokens
- New or fully rewritten stories should follow `docs/ai/stories-guide.md` modern pattern
- Small changes in legacy stories/tests should preserve the local file pattern unless migration is part of the task
