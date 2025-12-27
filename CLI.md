# Shak Hooks CLI (copy source into your app)

If you prefer a **shadcn/ui-style** workflow (copy code into your project so you can edit it), use `@shak-hooks/cli`.

This copies hook source files + shared `core/` utilities into a standard folder in your repo.

## Quick start

```bash
pnpm dlx @shak-hooks/cli@latest init
pnpm dlx @shak-hooks/cli@latest add useCopyToClipboard
```

## Folder layout (defaults)

- React/Vue: `src/shak-hooks/`
- Angular: `src/app/shak-hooks/`

Generated structure:

- `core/` (shared utilities)
- `useXxx.ts` (the hook implementation)
- `index.ts` (barrel export, if enabled)

## Commands

### `init`

Creates `shak-hooks.json` in your project root.

```bash
pnpm dlx @shak-hooks/cli@latest init
pnpm dlx @shak-hooks/cli@latest init --framework react
pnpm dlx @shak-hooks/cli@latest init --framework vue
pnpm dlx @shak-hooks/cli@latest init --framework angular
```

### `add`

Copies hook source into your project.

```bash
pnpm dlx @shak-hooks/cli@latest add useCounter
pnpm dlx @shak-hooks/cli@latest add useCounter useDebounce
pnpm dlx @shak-hooks/cli@latest add all
```

Options:

- `-f, --framework <react|vue|angular>`: override framework
- `-d, --out-dir <path>`: override output folder
- `-y, --yes`: overwrite existing files
- `--no-barrel`: don’t create/update `index.ts`

### `list`

Shows all hook names:

```bash
pnpm dlx @shak-hooks/cli@latest list
```

## Using the copied hooks

After adding a hook, import it from your local folder:

```ts
import { useCopyToClipboard } from "./shak-hooks/useCopyToClipboard";
```

If you keep the barrel file (`index.ts`), you can import from:

```ts
import { useCopyToClipboard } from "./shak-hooks";
```

