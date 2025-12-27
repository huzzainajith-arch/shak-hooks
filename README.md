# Shak Hooks Monorepo

A collection of utility hooks for Angular, React, and Vue.

## Documentation

See:
- [HOOKS.md](./HOOKS.md) for the complete hook list.
- [packages/react/README.md](./packages/react/README.md) for React hook docs.
- [packages/vue/README.md](./packages/vue/README.md) for Vue composable docs.
- [packages/angular/README.md](./packages/angular/README.md) for Angular Signals docs.

## Packages

| Package | Description | Version |
| :--- | :--- | :--- |
| [`@shak-hooks/core`](packages/core) | Framework-agnostic core logic | [![npm](https://img.shields.io/npm/v/@shak-hooks/core)](https://www.npmjs.com/package/@shak-hooks/core) |
| [`@shak-hooks/react`](packages/react) | React Hooks | [![npm](https://img.shields.io/npm/v/@shak-hooks/react)](https://www.npmjs.com/package/@shak-hooks/react) |
| [`@shak-hooks/vue`](packages/vue) | Vue Composables | [![npm](https://img.shields.io/npm/v/@shak-hooks/vue)](https://www.npmjs.com/package/@shak-hooks/vue) |
| [`@shak-hooks/angular`](packages/angular) | Angular Signals | [![npm](https://img.shields.io/npm/v/@shak-hooks/angular)](https://www.npmjs.com/package/@shak-hooks/angular) |
| [`@shak-hooks/usehooks`](packages/usehooks) | React convenience alias | [![npm](https://img.shields.io/npm/v/@shak-hooks/usehooks)](https://www.npmjs.com/package/@shak-hooks/usehooks) |
| [`@shak-hooks/usehooks-vue`](packages/usehooks-vue) | Vue convenience alias | [![npm](https://img.shields.io/npm/v/@shak-hooks/usehooks-vue)](https://www.npmjs.com/package/@shak-hooks/usehooks-vue) |
| [`@shak-hooks/usehooks-angular`](packages/usehooks-angular) | Angular convenience alias | [![npm](https://img.shields.io/npm/v/@shak-hooks/usehooks-angular)](https://www.npmjs.com/package/@shak-hooks/usehooks-angular) |

## Development

### Adding a new hook

1. Implement core logic in `packages/core`.
2. Implement adapters in `packages/{framework}`.
3. Add documentation in `apps/docs`.
4. Run `pnpm build` to verify.

### Versioning & Publishing

This project uses [Changesets](https://github.com/changesets/changesets) for versioning.

1. Create a changeset:
   ```bash
   pnpm changeset
   ```
2. Bump versions:
   ```bash
   pnpm version
   ```
3. Publish to npm:
   ```bash
   pnpm release
   ```

## License

MIT
