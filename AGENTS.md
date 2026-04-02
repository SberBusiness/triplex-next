# Triplex-Next — AI Agent Instructions

This file is an entry point. Canonical non-negotiable rules live in
`docs/ai/CODING_GUIDELINES.md` and the linked detailed guides.

## Read before working with components

**Main context file:** `docs/ai/CONTEXT.md`
Contains: tech stack, component structure, naming conventions, design tokens,
prop addition workflow, invariants.

**Component-specific docs:** `src/components/{ComponentName}/{ComponentName}-AI.md`
Example: `src/components/Button/Button-AI.md`

If `{ComponentName}-AI.md` does not exist yet:
- use `docs/ai/CONTEXT.md` + `docs/ai/CODING_GUIDELINES.md`
- inspect the component source, stories, and tests
- follow the local pattern of that component
- do not create a new `*-AI.md` file unless the task explicitly asks for it

**Template for new components:** `docs/ai/template-AI.md`

**AI-Ready progress tracker:** `docs/ai/ROADMAP.md`

---

## Development conventions

| Topic | File |
|---|---|
| Codestyle (TS, React, LESS, principles) | `docs/ai/codestyle.md` |
| Testing (unit, visual, e2e) | `docs/ai/tests.md` |
| Stories (structure, examples, checklist) | `docs/ai/stories-guide.md` |
| Commits, branches, PR workflow | `docs/ai/commits.md` |

---

## Typical task: add a prop to an existing component

1. Read `docs/ai/CONTEXT.md`
2. Read `docs/ai/CODING_GUIDELINES.md` and the guide for the area you touch
3. If present, read `src/components/{ComponentName}/{ComponentName}-AI.md`
4. Read the component source code, stories, and tests
5. Make changes: TSX → LESS → story → tests
6. If `{ComponentName}-AI.md` exists, update the "История изменений" section

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
