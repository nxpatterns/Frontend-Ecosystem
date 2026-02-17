# PNPM for NPM-Users

PNPM (Performant NPM) is a fast, disk space-efficient package manager. It is an alternative to npm and yarn, and it uses a unique symlink strategy to save disk space and improve installation speed.

<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=5 orderedList=true} -->

<!-- code_chunk_output -->

1. [Key differences:](#key-differences)
    1. [Storage](#storage)
    2. [Lockfile](#lockfile)
    3. [node_modules structure](#node_modules-structure)
    4. [Commands](#commands)
    5. [Performance](#performance)
    6. [Workspace support](#workspace-support)
        1. [pnpm workspace features](#pnpm-workspace-features)
            1. [Dependency hoisting](#dependency-hoisting)
            2. [Cross-package dependencies](#cross-package-dependencies)
            3. [Filtered commands](#filtered-commands)
            4. [Key limitation](#key-limitation)
        2. [Why Nx?](#why-nx)
            1. [nx adds](#nx-adds)
            2. [Can you use both?](#can-you-use-both)
2. [Migration](#migration)
    1. [From NPM to PNPM](#from-npm-to-pnpm)
3. [Update pnpm](#update-pnpm)
4. [Version Management](#version-management)
    1. [n for Node on Linux/macOS](#n-for-node-on-linuxmacos)
    2. [npm config files management](#npm-config-files-management)

<!-- /code_chunk_output -->

## Key differences:

### Storage

Pnpm uses a global content-addressable store. Instead of duplicating packages across projects, it creates hard links to a single copy. This saves massive disk space.

### Lockfile

Pnpm uses `pnpm-lock.yaml` instead of `package-lock.json`. More deterministic and handles peer dependencies better.

### node_modules structure

Creates a flat structure with symlinks, preventing phantom dependencies (accessing packages not declared in package.json).

### Commands

Nearly identical to npm:

- `pnpm install` → `npm install`
- `pnpm add <pkg>` → `npm install <pkg>`
- `pnpm run <script>` → `npm run <script>`

### Performance
2-3x faster installs due to hard linking and better caching.

### Workspace support
Superior monorepo handling with `pnpm-workspace.yaml`. But: **Don't use "pnpm workspaces", use Nx.**

#### pnpm workspace features

```yaml
    # pnpm-workspace.yaml
    packages:
      - 'apps/*'
      - 'libs/*'
      - 'tools/*'
```

##### Dependency hoisting

Shared deps installed once at root

##### Cross-package dependencies

`pnpm add @myorg/shared-lib --workspace`

```yaml
    # pnpm-workspace.yaml
    packages:
      - 'apps/*'
      - 'libs/*'
      - 'tools/*'
```

##### Filtered commands

- **Dependency hoisting:** Shared deps installed once at root
- **Cross-package dependencies:** `pnpm add @myorg/shared-lib --workspace`
- **Filtered commands:** `pnpm --filter @myorg/frontend build`
- **Parallel execution:** `pnpm -r build` runs across all packages
- **Peer dependency resolution:** Handles complex dependency graphs better than npm/yarn

##### Key limitation

No intelligent build orchestration. Builds everything, even unchanged packages.

#### Why Nx?

```plaintext
pnpm workspaces = package management + basic task running
nx = sophisticated build system + task orchestration + caching
```

##### nx adds

- **Dependency graph analysis:** Only builds affected packages
- **Distributed caching:** Shares build artifacts across team/CI
- **Task pipelines:** Complex build ordering (test → lint → build → deploy)
- **Code generation:** Scaffolding with generators
- **Plugin ecosystem:** React, Angular, Node.js optimizations

##### Can you use both?

Yes. Many teams run:

- pnpm for package management
- nx for build orchestration

This gives you pnpm's superior dependency handling + nx's intelligent caching/building.

**Bottom line:** pnpm workspaces = better npm. nx = enterprise-grade build system. Use pnpm + nx together for best results.

## Migration

### From NPM to PNPM

1. `npm install -g pnpm`
2. Delete `node_modules` and `package-lock.json`
3. Run `pnpm install`

The main gotcha: some tools expect npm's node\_modules structure. Most modern tools handle pnpm fine, but legacy tools might break.

## Update pnpm

To update pnpm, run:

```bash
pnpm self-update
```

## Version Management

### n for Node on Linux/macOS

`n` is a Node.js version manager that allows you to easily switch between Node.js versions. (Details here: [github.com/tj/n](https://github.com/tj/n))

### npm config files management

Use npmrc to manage different `.npmrc` files for different environments (company, private, etc.) and switch between different .npmrc files with ease and grace.
See details here: [www.npmjs.com/package/npmrc](https://www.npmjs.com/package/npmrc)

```bash
npm install -g npmrc
npmrc --help        # See all options
```
