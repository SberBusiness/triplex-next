# Triplex-Next — AI Agent Instructions

## Read before working with components

**Main context file:** `docs/ai/CONTEXT.md`
Contains: tech stack, component structure, naming conventions, design tokens,
prop addition workflow, invariants.

**Component-specific docs:** `src/components/{ComponentName}/{ComponentName}-AI.md`
Example: `src/components/Button/Button-AI.md`

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
2. Read `src/components/{ComponentName}/{ComponentName}-AI.md`
3. Read the component source code
4. Make changes: TSX → LESS → story → tests
5. Update the "История изменений" section in `{ComponentName}-AI.md`

## Tech stack

React 18 + TypeScript strict + LESS Modules + Vite + Storybook 9

## Key constraints

- `forwardRef` is mandatory on all components — never remove it
- Public API (prop names, types, enum values) is a breaking change
- All barrel exports in `index.ts` must remain
- Use `clsx` for className merging, never string concatenation
- No hardcoded colors/sizes — use CSS variables from design tokens
