# Nx

<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Getting Started](#getting-started)
- [Projects: Add, Rename, Remove](#projects-add-rename-remove)
- [Update & Upgrade](#update--upgrade)
- [Adding Nx to an Existing Repository](#adding-nx-to-an-existing-repository)
- [Create a shared library](#create-a-shared-library)
- [Miscellanous](#miscellanous)
  - [Every day's commands](#every-days-commands)
  - [Flat Config](#flat-config)
- [Workspace Packages (Excerpt)](#workspace-packages-excerpt)
- [Additional Libraries](#additional-libraries)
  - [Frontend/Middleware/UI (Angular/NestJS/..)](#frontendmiddlewareui-angularnestjs)
    - [Use HTML Snippets in OpenAPI Method Descriptions](#use-html-snippets-in-openapi-method-descriptions)
      - [html.d.ts](#htmldts)
      - [tsconfig.json](#tsconfigjson)
      - [tsconfig.app.json & tsconfig.spec.json](#tsconfigappjson--tsconfigspecjson)
      - [webpack.config.ts](#webpackconfigts)
- [Details](#details)
  - [Creating a Workspace](#creating-a-workspace)
- [Further Reading](#further-reading)

<!-- /code_chunk_output -->

## Getting Started

See all details: [Creating a Workspace](#creating-a-workspace) below. (November 2024)

```shell
# Install Nx CLI
npm i -g nx@latest

# Create a new workspace
npx create-nx-workspace@latest my-workspace

# Install packages you need (See online)
# E.g. Angular/Nest/..
npm i -D @nx/angular
npm i -D @nx/nest
```

Choose from the list (See online):

```plaintext
@nx/devkit            @nx/esbuild           @nx/eslint            @nx/eslint-plugin
@nx/jest              @nx/js                @nx/linter            @nx/nest
@nx/node              @nx/playwright        @nx/plugin            @nx/react
@nx/react-native      @nx/storybook         @nx/web               @nx/webpack
@nx/workspace
```

**Recommended:**

```shell
npm i -D @nx/eslint @nx/eslint-plugin @nx/linter
npm i -D @nx/node @nx/web
npm i -D @nx/jest @nx/playwright @nx/storybook
```

When you want to **add a project**, better use VSCode Nx Console. Create a new directory `apps` and click with the right mouse button on it. Choose `Nx: Generate (UI)` and see the list of available schematics.

Install other packages you need via the terminal. Differentiate between `dependencies` and `devDependencies`.

**Dev Dependencies:**

Important: If you copy `.eslintrc.json` and `.prettierrc.json` etc. from other projects, you may need remove old incompatible package configurations and install new ones.

```shell
# Important for Angular & ESLint
npm i -D @angular-eslint/eslint-plugin
npm i -D @angular-eslint/eslint-plugin-template
npm i -D @angular-eslint/template-parser
npm i -D eslint prettier eslint-config-prettier @typescript-eslint

# Important for Formly
npm i -D @ngx-formly/schematics
```

**Dependencies e.g.:**

```shell
npm i -S @ngx-formly/core @ngx-formly/material
npm i -S @angular/material @angular/cdk
npm i -S @angular/animations
npm i -S angular-three
```

**Initialisation** of a new project (e.g. Angular-Three):

```shell
npx nx g angular-three:init
```

## Projects: Add, Rename, Remove

```shell
# Add a project
nx g @nx/angular:app some-app

# Rename a project
nx g @nx/workspace:move --project old-app-name new-app-name

# Remove a project
nx g @nx/workspace:remove --project some-app
```

## Update & Upgrade

```shell

# Update Nx CLI to the latest version
npm i -g nx@latest

# Migrate Nx to the latest version
nx migrate latest

# if migration.json is created
nx migrate latest --run-migrations=migration.json

# Update Nx Workspace to the latest version
nx update @nx/workspace

# Update all packages to the latest version (optional)
# You might need `--legacy-peer-deps`
npx npm-check-updates -u
npm install
```

## Adding Nx to an Existing Repository

```shell
npx nx@latest init
```

## Create a shared library

E.g. @ngx-formly

```shell
nx generate @nx/angular:library apps-shared-libs/custom-formly --buildable
npm i -S @ngx-formly/core @ngx-formly/material
```

## Miscellanous

### Every day's commands

```shell
nx reset
nx g @nx/workspace:fix-configuration
nx dep-graph
```

### Flat Config

<https://nx.dev/recipes/tips-n-tricks/flat-config>

```shell
nx g @nx/linter:convert-to-flat-config
```

## Workspace Packages (Excerpt)

- @nx/devkit
  - Description: Developer toolkit for creating custom Nx plugins and extensions.

## Additional Libraries

### Frontend/Middleware/UI (Angular/NestJS/..)

```shell
# Angular
npm i -S @angular/cdk @angular/material @auth0/angular-jwt

# NestJS Dependencies
npm i -S @nestjs/common @nestjs/core
npm i -S @nestjs/jwt @nestjs/passport @nestjs/typeorm
npm i -S @nestjs/swagger cookie-parser express-session
npm i -S @nestjs/mongoose  @nestjs/platform-express
npm i -S bcrypt bcryptjs passport passport-jwt @nestjs/jwt
npm i -S colorette
npm i -S jsonwebtoken
npm i -S material-icons
npm i -S ngx-cookie-service ngx-toastr
npm i -S pg postgres typeorm
npm i -S @ngx-translate/core @ngx-translate/http-loader
# NestJS DevDependencies
npm i -D @nestjs/devtools-integration
npm i -D @nestjs/testing
npm i -D @nestjs/schematics
npm i -D @nestjs/mapped-types
npm i -D @types/bcrypt
npm i -D @types/passport
npm i -D cross-env # for cross environment variables
npm i -D ts-morph chroma-js # for generators
npm i -D ts-loader # Import HTML for OpenAPI Method Descriptions
npm i -D html-loader # Import HTML for OpenAPI Method Descriptions
```

#### Use HTML Snippets in OpenAPI Method Descriptions

##### html.d.ts

```ts
// html.d.ts
declare module '*.html' {
  const value: string;
  export default value;
}
```

##### tsconfig.json

```shell
npm i -D ts-loader
```

```json
{
  "compilerOptions": {
    "plugins": [
      {
        "name": "typescript-plugin-html",
        "tags": ["html"]
      }
    ]
  }
}
```

##### tsconfig.app.json & tsconfig.spec.json

```json
{
  "compilerOptions": {
    "emitDecoratorMetadata": true,
    "module": "commonjs",
    "outDir": "../../../dist/out-tsc",
    "target": "es2021"
  },
  "exclude": ["jest.config.ts", "src/**/*.spec.ts", "src/**/*.test.ts"],
  "extends": "./tsconfig.json",
  "include": ["src/**/*.ts", "html.d.ts"]
}
```

##### webpack.config.ts

```ts
import { composePlugins, withNx } from '@nx/webpack';

module.exports = composePlugins(withNx(), (config) => {
  config.module = {
    rules: [
      { test: /\.ts$/, use: [{ loader: require.resolve('ts-loader') }] },
      {
        test: /\.html$/,
        use: [
          {
            loader: require.resolve('html-loader'),
            options: { minimize: true, esModule: true },
          },
        ],
      },
    ],
  };
  config.resolve = {
    extensions: ['.ts', '.tsx', '.mjs', '.js', '.jsx', '.html'],
  };
  config.devtool = 'source-map';
  // console.log(config);
  return config;
});

```

## Details

### Creating a Workspace

```shell
create-nx-workspace [name] [options]

Create a new Nx workspace

Options:
      --help                  Show help  [boolean]
      --version               Show version  [boolean]
      --name                  Workspace name (e.g. org name).  [string]
      --preset                Customizes the initial content of your workspace. Default presets include: ["apps", "npm", "ts", "web-components", "angular-monorepo", "angular-standalone", "react-monorepo", "react-standalone", "vue-monorepo", "vue-standalone", "nuxt", "nuxt-standalone", "next", "nextjs-standalone", "remix-monorepo", "remix-standalone", "react-native", "expo", "nest", "express", "react", "vue", "angular", "node-standalone", "node-monorepo", "ts-standalone"]. To build your own see https://nx.dev/extending-nx/recipes/create-preset.  [string]
      --interactive           Enable interactive mode with presets.  [boolean] [default: true]
      --workspaceType         The type of workspace to create.  [string] [choices: "integrated", "package-based", "standalone"]
      --appName               The name of the app when using a monorepo with certain stacks.  [string]
      --style                 Stylesheet type to be used with certain stacks.  [string]
      --standaloneApi         Use Standalone Components if generating an Angular app.  [boolean] [default: true]
      --routing               Add a routing setup for an Angular app.  [boolean] [default: true]
      --bundler               Bundler to be used to build the app.  [string]
      --framework             Framework option to be used with certain stacks.  [string]
      --docker                Generate a Dockerfile for the Node API.  [boolean]
      --nextAppDir            Enable the App Router for Next.js.  [boolean]
      --nextSrcDir            Generate a 'src/' directory for Next.js.  [boolean]
      --e2eTestRunner         Test runner to use for end to end (E2E) tests.  [string] [choices: "playwright", "cypress", "none"]
      --ssr                   Enable Server-Side Rendering (SSR) and Static Site Generation (SSG/Prerendering) for the Angular application.  [boolean]
      --prefix                Prefix to use for Angular component and directive selectors.  [string]
      --defaultBase           Default base to use for new projects.  [string] [default: main]
  -g, --skipGit               Skip initializing a git repository.  [boolean] [default: false]
      --commit.name           Name of the committer.  [string]
      --commit.email          E-mail of the committer.  [string]
      --commit.message        Commit message.  [string] [default: "Initial commit"]
      --packageManager, --pm  Package manager to use.  [string] [choices: "bun", "npm", "pnpm", "yarn"] [default: npm]
  -a, --allPrompts            Show all prompts.  [boolean] [default: false]
      --useGitHub             Will you be using GitHub as your git hosting provider?  [boolean] [default: false]
      --nxCloud, --ci         Which CI provider would you like to use?  [string] [choices: "github", "gitlab", "azure", "bitbucket-pipelines", "circleci", "skip", "yes"]
```

## Further Reading

- Nx Api Angular
  - <https://nx.dev/nx-api/angular>
- Nx Angular Recipes
  - <https://nx.dev/recipes/angular>
    - Advanced Angular Micro Frontends with Dynamic Module Federation
      - <https://nx.dev/recipes/angular/dynamic-module-federation-with-angular>
- Nx Devkit
  - <https://nx.dev/nx-api/devkit>
- Extending Nx
  - <https://nx.dev/extending-nx/intro/getting-started>
