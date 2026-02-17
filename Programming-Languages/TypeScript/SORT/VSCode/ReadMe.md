# Installing and Debugging TypeScript in VSCode

## Setup

### Install TypeScript

```bash {cmd=true}
npm i typescript -g
tsc -v // Version 3.0.3
```

### Transpile & watch

```javascript
tsc index.ts
tsc --outFile file.js file.ts
tsc @args.txt // Insert command line options and files from a file
tsc -w --out bundle.js index.ts // out DEPRECATED. Use --outFile instead
tsc -w --outFile bundle.js index.ts
```

### ts-node watch witch nodemon

1. package.json

```js
{
  "name": "ts-node-watch-with-nodemon",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "ts-node index.ts",
    "watch": "nodemon --inspect",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "typescript": "^3.8.3"
  },
  "devDependencies": {
    "nodemon": "^2.0.2",
    "ts-node": "^8.8.2"
  }
}
```

2. nodemon.json

```js
{
  "watch": ["src/**/*.ts", "nodemon.json", "package.json"],
  "ignore": ["src/**/*.spec.ts"],
  "exec": "ts-node src/index.ts",
  "verbose": "true",
  "ext": "ts"
}

```

#### tsc --lib

```javascript
 'es5' 'es6' 'es2015' 'es7' 'es2016' 'es2017'
 'es2018' 'esnext' 'dom' 'dom.iterable' 'webworker'
 'scripthost' 'es2015.core' 'es2015.collection'
 'es2015.generator' 'es2015.iterable' 'es2015.promise'
 'es2015.proxy' 'es2015.reflect' 'es2015.symbol'
 'es2015.symbol.wellknown' 'es2016.array.include'
 'es2017.object' 'es2017.sharedmemory' 'es2017.string'
 'es2017.intl' 'es2017.typedarrays' 'es2018.intl'
 'es2018.promise' 'es2018.regexp' 'esnext.array'
 'esnext.asynciterable'
```

### Create tsconfig.json

```javascript
tsc --init
```

## Debugging TypeScript in Visual Studio Code

### Install Typescript & ts-node locally

```
npm init -y
npm install typescript --save // dependency
npm install ts-node --save-dev // dev-dependency
```

### Edit `.vscode/launch.json`

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Launch current file w/ ts-node",
      "protocol": "inspector",
      "args": ["${relativeFile}"],
      "cwd": "${workspaceRoot}",
      "runtimeArgs": ["-r", "ts-node/register"],
      "internalConsoleOptions": "openOnSessionStart"
    }
  ]
}
```

## New Approach: Using [`gts`](https://www.npmjs.com/package/gts)

### 1) Automatically

    npm install -g npx // on windows potentially  with admin rights
    npx gts init

### 2) Manually: Prepare TypeScript for Browser

#### package.json

```json
{
  "name": "ts-examples",
  "version": "0.0.0",
  "description": "",
  "main": "build/src/index.js",
  "types": "build/src/index.d.ts",
  "files": ["build/src"],
  "license": "Apache-2.0",
  "keywords": [],
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "check": "gts check",
    "clean": "gts clean",
    "build": "tsc -p .", // better build than compile
    "fix": "gts fix",
    "prepare": "npm run build",
    "pretest": "npm run build",
    "posttest": "npm run check"
  },
  "devDependencies": {
    "gts": "^1.1.0",
    "typescript": "~3.5.0",
    "@types/node": "^10.0.3"
  }
}
```

#### tsconfig.json

```
{
  "extends": "./node_modules/gts/tsconfig-google.json",
  "compilerOptions": {
    "experimentalDecorators": true,
    "rootDir": ".",
    "outDir": "build"
  },
  "include": ["src/**/*.ts", "test/**/*.ts"]
}
```

## Linting TypeScript with ESLint (new Approach)

### .eslintignore

```js
node_modules;
dist;
coverage;
```

### .eslintrc

```js
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      // jsx: true
    },
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
  ],
  env: {
    browser: true,
    amd: true,
    node: true,
  },
  rules: {
    // e.g. "@typescript-eslint/explicit-function-return-type": "off",
  },
};
```

### .prettierrc.js

```js
module.exports = {
  semi: true,
  trailingComma: 'all',
  singleQuote: true,
  printWidth: 120,
  tabWidth: 2,
};
```

### package.json (excerpt)

```json
 "scripts": {
    "lint": "eslint . --ext .js,.ts"
  },
    "devDependencies": {
    "@typescript-eslint/eslint-plugin": "^2.33.0",
    "@typescript-eslint/parser": "^2.33.0",
    "eslint": "^7.0.0",
    "eslint-config-prettier": "^6.11.0",
    "eslint-plugin-prettier": "^3.1.3",
    "prettier": "^2.0.5"
  },
  "dependencies": {
    "ts-node": "^8.10.1"
  }
```

## Migrate from TSLint to ESLint (2021+)

See the Documentation here: https://code.visualstudio.com/api/advanced-topics/tslint-eslint-migration

> Excerpt from an answer at [SO](https://stackoverflow.com/a/65288426/3025289) by [GG](https://stackoverflow.com/users/7629107/gaurav-gupta)

**Steps:**

1.  `npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin` (Install ESlint and TSLint)
2.  `npx tslint-to-eslint-config` (This will install utility tool and make configuration easier. Post install a new **.eslintrc.js** will be created. There will be changes to **.vscode/settings.json** as well.)
3.  Disable/Uninstall TS lint from your VS Code.
4.  You can then, place a script in your **package.json** file as - `"lint": "eslint -c .eslintrc.js --ext .ts <mySrcFolder>"`. (This will tell ESLint to look for TSLint)
