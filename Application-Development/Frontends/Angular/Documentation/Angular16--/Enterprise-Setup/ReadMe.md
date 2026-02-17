# Angular Enterprise Setup

<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Preconditions](#preconditions)
- [Steps](#steps)
  - [Create Nx workspace](#create-nx-workspace)
    - [Package based](#package-based)
    - [Integrated](#integrated)
  - [Install Angular Material](#install-angular-material)
  - [Translation (i18n)](#translation-i18n)
  - [Choose your Store Management](#choose-your-store-management)
    - [NGRX](#ngrx)
      - [Install NGRX Related Packages](#install-ngrx-related-packages)
    - [NGXS](#ngxs)
      - [Install NGXS Related Packages](#install-ngxs-related-packages)
  - [Install Formly](#install-formly)
  - [Install Translate](#install-translate)
  - [Install Prettier](#install-prettier)
  - [Install ESLint](#install-eslint)
  - [Install Jest](#install-jest)
  - [Install Cypress](#install-cypress)
  - [Install Storybook](#install-storybook)

<!-- /code_chunk_output -->

This document describes how to setup an Angular project for enterprise use. It is based on the Nx workspace and the Angular CLI.

## Preconditions

- Git installed
- GitHub account
- Node.js and npm installed
- VSCode installed
- Yarn installed
  `npm i -g yarn`
- Angular CLI installed
  `ng i -g @angular/cli`
- Nrwl & Nx CLI installed
  'ng i -g @nrwl/cli'
  `ng i -g nx`
  `ng i -g @nrwl/schematics`
- Install Zsh
  `brew install zsh`
- Install Oh My Zsh
  `sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"`

- Install Zsh Auto Suggestions
  [>> Online](https://github.com/zsh-users/zsh-autosuggestions/blob/master/INSTALL.md)

## Steps

### Create Nx workspace

#### Package based

Library & Standalone Application..

#### Integrated

`npx create-nx-workspace@latest`

```shell
✔ Where would you like to create your workspace? · <path/to/workspace>
✔ Which stack do you want to use? · angular
✔ Standalone project or integrated monorepo? · integrated
✔ Application name · <my-app1>
✔ Default stylesheet format · <scss>
✔ Would you like to use Standalone Components in your application? · <No>
✔ Would you like to add routing? · <Yes>
✔ Enable distributed caching to make your CI faster · <No>
```

```shell
cd <my-app1>

```

### Install Angular Material

- Install Angular Material

  Angular/CLI Only: `ng add @angular/material`
  Nx: `npm install @angular/material && nx g @angular/material:ng-add --project my-app1`

### Translation (i18n)

- `npm install @ngx-translate/core @ngx-translate/http-loader`

### Choose your Store Management

#### NGRX

```shell
nx add @ngrx/store
Using Nx to run Angular CLI commands is deprecated and will be removed in a future version.
To run Angular CLI commands, use \`ng\`.
Ng add is not natively supported by Nx
Instead, we recommend running `npm install @ngrx/store && npx nx g @ngrx/store:ng-add`
✔ Run this command? (y/N) · true
npm WARN EBADENGINE Unsupported engine {
npm WARN EBADENGINE   package: 'rollup@3.25.1',
npm WARN EBADENGINE   required: { node: '>=14.18.0', npm: '>=8.0.0' },
npm WARN EBADENGINE   current: { node: 'v19.9.0', npm: '7.24.0' }
npm WARN EBADENGINE }

added 1 package, and audited 1557 packages in 2s

201 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities

>  NX  Generating @ngrx/store:ng-add

✔ Packages installed successfully.
✔ Packages installed successfully.
✔ Which ESLint configuration would you like to use? · all-requiring-type-checking

      The NgRx ESLint Plugin is installed and configured with the 'all-requiring-type-checking' config.

      Take a look at the docs at https://ngrx.io/guide/eslint-plugin if you want to change the default configuration.

UPDATE apps/my-app1/src/app/app.module.ts
UPDATE package.json
UPDATE .eslintrc.json
```

##### Install NGRX Related Packages

```shell
yarn add @ngrx/effects
yarn add @ngrx/entity
yarn add @ngrx/router-store
yarn add @ngrx/store-devtools
```

#### NGXS

`ng add @ngxs/store`

##### Install NGXS Related Packages

```shell
yarn add @ngx-formly/core
yarn add @ngx-formly/material
yarn add @ngx-formly/schematics
yarn add @ngx-translate/core
yarn add @ngx-translate/http-loader
yarn add @ngxs-labs/dispatch-decorator
yarn add @ngxs-labs/immer-adapter
yarn add @ngxs-labs/select-snapshot
yarn add @ngxs/devtools-plugin
yarn add @ngxs/form-plugin
yarn add @ngxs/router-plugin
yarn add @ngxs/storage-plugin
yarn add @ngxs/store

```

### Install Formly

`ng add @ngx-formly/schematics`

### Install Translate

`ng add @ngx-translate/core`

### Install Prettier

`ng add @nrwl/workspace`

### Install ESLint

`ng add @nrwl/eslint`

### Install Jest

`ng add @nrwl/jest`

### Install Cypress

`ng add @nrwl/cypress`

### Install Storybook

`ng add @nrwl/storybook`
