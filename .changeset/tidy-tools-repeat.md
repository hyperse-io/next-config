---
'@hyperse/next-config': patch
---

chore: 🔧 upgrade dependencies and tooling

- Upgrade Zod to v4.6.7 and pin TypeScript to 6.x
- Upgrade Yarn to v4.18.1 and refresh devDependencies (Next 16, ESLint 10, Vitest 5, tsup 9)
- Pass `YARN_NPM_AUTH_TOKEN` in the release workflow so Yarn Berry can authenticate against npm when publishing
