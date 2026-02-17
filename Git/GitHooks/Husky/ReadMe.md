# Husky in a NxMonoRepo

<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Introduction](#introduction)
  - [Why Husky?](#why-husky)
  - [Why GitHooks?](#why-githooks)
- [In a NxMonoRepo](#in-a-nxmonorepo)
- [Installation & Initialisation (Husky & Lint-Staged)](#installation--initialisation-husky--lint-staged)
- [`pre-commit` Hook](#pre-commit-hook)
  - [Configure Lint-Staged](#configure-lint-staged)

<!-- /code_chunk_output -->

## Introduction
### Why Husky?

Husky is a tool that makes it easy to create Git hooks. Git hooks are scripts that run automatically every time a particular event occurs in a Git repository. They let you customize Git’s internal behavior and trigger customizable actions at key points in the development life cycle.

### Why GitHooks?

Git hooks are a great way to enforce code quality standards and prevent bad code from being committed to your repository. They can also be used to automate repetitive tasks and improve your team’s productivity.

## In a NxMonoRepo

Add the following to `package.json`:

```json
{
 "scripts": {
    "lint:all": "nx run-many --target=lint --all",
  }
}
```

## Installation & Initialisation (Husky & Lint-Staged)

```shell
npx husky-init && npm install --legacy-peer-deps
npm install --save-dev lint-staged
```

## `pre-commit` Hook

Edit `.husky/pre-commit`:

```shell
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx lint-staged && npm run lint:all

```

### Configure Lint-Staged

Create `.lintstagedrc.json` and:

```json
{
  "*.{js,jsx,ts,tsx}": "eslint --fix",
  "*.{json,md,css,scss,html}": "prettier --write"
}
```
