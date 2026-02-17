# Testing Angular Applications with Jest

<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=true} -->

<!-- code_chunk_output -->

1. [Changing to Jest for an existing Project - &ge; v11](#changing-to-jest-for-an-existing-project-ge-v11)
   1. [Simple Method to replace Karma/Jasmine](#simple-method-to-replace-karmajasmine)
   2. [Optionally: Install Globally](#optionally-install-globally)
   3. [Issues](#issues)
   4. [Explanation of Modifications](#explanation-of-modifications)
      1. [`angular.json` will be modified](#angularjson-will-be-modified)
      2. [`jest.config.ts` will be created](#jestconfigts-will-be-created)
      3. [`karma.conf.js` will be deleted](#karmaconfjs-will-be-deleted)
      4. [`setup-jest.ts` will be created](#setup-jestts-will-be-created)
      5. [`test-config.helper.ts` will be created](#test-confighelperts-will-be-created)
      6. [`tsconfig.spec.json` will be modified](#tsconfigspecjson-will-be-modified)
      7. [`test.js` will be deleted](#testjs-will-be-deleted)
2. [Creating an empty Angular Project with Nx](#creating-an-empty-angular-project-with-nx)
   1. [Install Nx](#install-nx)
   2. [Create an Angular Project](#create-an-angular-project)
   3. [Initialize git and Initial Commit](#initialize-git-and-initial-commit)
   4. [Install Material UI](#install-material-ui)
   5. [Serving Project](#serving-project)
      1. [Existing Tests](#existing-tests)
      2. [Installing Jest-CLI globally](#installing-jest-cli-globally)
      3. [Code Coverage](#code-coverage)
         1. [Coverage Reporter](#coverage-reporter)
         2. [Watch Coverage](#watch-coverage)
   6. [Cypress](#cypress)
   7. [Google Puppeteer (does not work within Nx yet)](#google-puppeteer-does-not-work-within-nx-yet)
      1. [Installing](#installing)
      2. [Config](#config)

<!-- /code_chunk_output -->

## Changing to Jest for an existing Project - &ge; v11

### Simple Method to replace Karma/Jasmine

To replace Karma/Jasmine with Jest, just use:

```shell
ng add @briebug/jest-schematic
```

### Optionally: Install Globally

```shell
npm install -g @briebug/jest-schematic
```

Then in an Angular CLI project run

```shell
ng g @briebug/jest-schematic:add
```

### Issues

> Excerpt from: https://github.com/briebug/jest-schematic

If you're experiencing issues when trying to run your tests with Jest, please view the documentation for the [builder](https://github.com/just-jeb/angular-builders/tree/master/packages/jest) which uses [jest-preset-angular](https://github.com/thymikee/jest-preset-angular#troubleshooting).

A common issues involves library dependencies. For example if your app depends on NgRx you'll need to tell Jest to compile the sources [explicitly](https://github.com/thymikee/jest-preset-angular#adjust-your-transformignorepatterns-whitelist) by appending it to the transformIgnorePatterns property in the jest.config.js file.

```js
module.exports = {
  transformIgnorePatterns: ['node_modules/(?!(jest-test|@ngrx))'],
};
```

Issues with this schematic can be filed [here](https://github.com/briebug/jest-schematic/issues/new/choose).

### Explanation of Modifications

#### `angular.json` will be modified

```diff
"test": {
- "builder": "@angular-devkit/build-angular:karma",
+ "builder": "@angular-builders/jest:run",
  "options": {
-   "main": "src/test.ts",
    "polyfills": "src/polyfills.ts",
    "tsConfig": "tsconfig.spec.json",
-   "karmaConfig": "karma.conf.js",
    "assets": [
      "src/favicon.ico",
      "src/assets"
    ],
    "styles": [
      "src/styles.scss"
    ],
    "scripts": []
  }
},
```

#### `jest.config.ts` will be created

```typescript
module.exports = {
  moduleNameMapper: {
    '@core/(.*)': '<rootDir>/src/app/core/$1',
  },
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
};
```

#### `karma.conf.js` will be deleted

#### `setup-jest.ts` will be created

```typescript
import 'jest-preset-angular';

/* global mocks for jsdom */
const mock = () => {
  let storage: { [key: string]: string } = {};
  return {
    getItem: (key: string) => (key in storage ? storage[key] : null),
    setItem: (key: string, value: string) =>
      (storage[key] = value || ''),
    removeItem: (key: string) => delete storage[key],
    clear: () => (storage = {}),
  };
};

Object.defineProperty(window, 'localStorage', { value: mock() });
Object.defineProperty(window, 'sessionStorage', { value: mock() });
Object.defineProperty(window, 'getComputedStyle', {
  value: () => ['-webkit-appearance'],
});

Object.defineProperty(document.body.style, 'transform', {
  value: () => {
    return {
      enumerable: true,
      configurable: true,
    };
  },
});

/* output shorter and more meaningful Zone error stack traces */
// Error.stackTraceLimit = 2;
```

#### `test-config.helper.ts` will be created

```typescript
import { TestBed } from '@angular/core/testing';

type CompilerOptions = Partial<{
  providers: any[];
  useJit: boolean;
  preserveWhitespaces: boolean;
}>;
export type ConfigureFn = (testBed: typeof TestBed) => void;

export const configureTests = (
  configure: ConfigureFn,
  compilerOptions: CompilerOptions = {},
) => {
  const compilerConfig: CompilerOptions = {
    preserveWhitespaces: false,
    ...compilerOptions,
  };

  const configuredTestBed = TestBed.configureCompiler(compilerConfig);

  configure(configuredTestBed);

  return configuredTestBed
    .compileComponents()
    .then(() => configuredTestBed);
};
```

#### `tsconfig.spec.json` will be modified

To learn more about this file see: <https://angular.io/config/tsconfig>.

```diff
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./out-tsc/spec",
    "types": [
-     "jasmine"
+     "jest"
    ]
+   "module": "commonjs",
+   "emitDecoratorMetadata": true,
+   "allowJs": true
  },
  "files": [
-   "src/test.ts",
    "src/polyfills.ts"
  ],
  "include": [
    "src/**/*.spec.ts",
    "src/**/*.d.ts"
  ]
}
```

#### `test.js` will be deleted

## Creating an empty Angular Project with Nx

Cookbook:

### Install Nx

```shell
npm install -g @nrwl/cli
```

### Create an Angular Project

```shell
npx create-nx-workspace@latest <app-name>
```

> See Nx Editor Plugins -> <https://nx.dev/latest/angular/getting-started/console>

### Initialize git and Initial Commit

```shell
cd <app-name>
git init
git add .
git commit -m "Initial Commit"

```

### Install Material UI

```shell
ng add @ngx-formly/schematics --ui-theme=material
```

> Angular 12+ Issue: <https://github.com/just-jeb/angular-builders/issues/972>

```shell
# eventually delete package-lock.json before
npm install --legacy-peer-deps
```

### Serving Project

```shell
# See angular.json for details, e.g. main project etc
nx serve
```

#### Existing Tests

```shell
nx test
nx e2e
```

Watch mode:

```shell
# better add it to package.json
nx test -- --watch
```

#### Installing Jest-CLI globally

```shell
npm i -g jest
jest # or watch mode
jest --watch
```

#### Code Coverage

```shell
jest --collect-coverage
# see now /coverage folder
```

##### Coverage Reporter

```js
// jest.config.js
module.exports = {
  projects: ['<rootDir>/apps/t1'],
  coverageReporters: ['html'],
};
```

##### Watch Coverage

```shell
jest --collect-coverage --watch
# /coverage -> lite-server
```

### Cypress

Nx has already installed and configured Cypress, just type:

```shell
nx e2e
```

### Google Puppeteer (does not work within Nx yet)

Additional "Executer" necessary, please follow these links:

- [Nx Creating Custom Executers](https://nx.dev/latest/react/executors/creating-custom-builders)
- [Nx Cypress.io Executer](https://github.com/nrwl/nx/blob/master/packages/cypress/src/executors/cypress/cypress.impl.ts)

Short Introduction:

[Puppeteer/React](https://egghead.io/courses/end-to-end-testing-with-google-s-puppeteer-and-jest)

#### Installing

```shell
npm install -D puppeteer @types/puppeteer
npm install -D jest-puppeteer
npm install -D @types/jest-environment-puppeteer
npm install -D @types/expect-puppeteer
```

#### Config

```shell
# jest.config.js excerpt
module.exports = {
  preset: 'jest-puppeteer',
}

```

```shell
# tsconfig.json excerpt
  "compilerOptions": {
    # ...
    "types": [
      "puppeteer",
      "jest-environment-puppeteer",
      "expect-puppeteer"
    ]
  },
```
