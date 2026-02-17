# Global Paths in Vanilla TypeScript

> See `tsx` version of this example further down.

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Global Paths in Vanilla TypeScript](#global-paths-in-vanilla-typescript)
  - [ts-node & tsconfig-paths](#ts-node--tsconfig-paths)
  - [Achieving the Same Goal with the `tsx` Compiler](#achieving-the-same-goal-with-the-tsx-compiler)
    - [Use Symlinks for a Cleaner Approach](#use-symlinks-for-a-cleaner-approach)

<!-- /code_chunk_output -->


## ts-node & tsconfig-paths

In TypeScript, defining **custom module paths**, such as `@some-lib/whatever`, greatly enhances the readability of import statements and avoids the complexity of dealing with relative paths. This is achieved by configuring the `baseUrl` and `paths` options in your `tsconfig.json` file.

This approach not only makes your codebase cleaner but also allows for more flexibility in file organization, as moving files around does not necessitate updating all related import statements. However, they are not natively understood by Node.js, will lead to module resolution errors during runtime.

> For users of **NxMonoRepo**, which manages apps and libs in a unified manner, configurations for custom paths are automatically handled by the nx-cli. Conversely, in a vanilla TypeScript project, you must manually manage these configurations.

To bridge this gap, the `tsconfig-paths` package can be utilized, enabling Node.js to comprehend custom module paths as defined in your `tsconfig.json`.

Consider the following most basic example project structure:

```shell
.
├── example
│   ├── src
│   │   └── folder
│   │       └── index.ts
│   └── tsconfig.json
├── lib
│   └── one
│       └── index.ts
└── tsconfig.base.json
```

Imagine, your `example/src/folder/index.ts` look like this:

```typescript
import { one } from "@lib/one";

console.log("Logging One:", one);
```

```json
{
  "compilerOptions": {
    // Your specific settings
  },
  "extends": "../tsconfig.base.json"
}
```

And a global tsconfig.base.json configured as follows (focus on baseUrl and paths):

```json
{
  "compilerOptions": {
    "baseUrl": ".", // This is crucial
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "module": "commonjs",
    "paths": {
      "@lib/*": ["./lib/*"] // and so is this
    },
    "skipLibCheck": true,
    "sourceMap": true,
    "strict": true,
    "target": "es2016"
  }
}
```

The goal is to ensure that `import { one } from "@lib/one";` compiles and functions as expected. However, Node.js will not understand this import statement out of the box. To resolve this, you can install `ts-node`  &`tsconfig-paths` packages

```shell
npm install --save-dev ts-node
npm install --save-dev tsconfig-paths
```

and update your `package.json` scripts as follows:

```json
{
  "scripts": {
    "start": "ts-node -P tsconfig.base.json -r tsconfig-paths/register example/src/folder/index.ts"
  }
}
```

This command:

```shell
npm start
```

executes your TypeScript code, resolving custom module paths according to your tsconfig.base.json, producing:

```shell
Logging One: 1
```

without any runtime errors.

An important point to note is that instead of using `tsconfig.json` as the global TypeScript configuration file, I opted for `tsconfig.base.json`. The rationale behind this choice was to explicitly specify this file for the project. Had I used `tsconfig.json`, there would have been no need to employ the `-P` project parameter.

## Achieving the Same Goal with the `tsx` Compiler

`tsx` is a CLI command (alternative to node) for seamlessly running TypeScript & ESM in both commonjs & module package types. It is a drop-in replacement for node, with the added benefit of supporting TypeScript and ESM out of the box.

With the project structure remaining unchanged, make the following adjustments:

- Remove the path configuration from `tsconfig.base.json`.
- Include the path configuration in `tsconfig.json`, by using relative paths as shown below:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@lib/one": ["../../../lib/one"]
    }
  },
  "extends": "../../../tsconfig.base.json"
}
```

- From the project root directory, execute the TypeScript code using the `tsx` compiler along with the `--tsconfig` flag:

```shell
tsx --tsconfig example/src/folder/tsconfig.json example/src/folder/index.ts
```

### Use Symlinks for a Cleaner Approach

Another simple yet effective solution could have been creating a symbolic link named `tsconfig.json` that points to `tsconfig.base.json`. This would allow tools that expect a `tsconfig.json` by default to work seamlessly:

```shell
ln -s tsconfig.base.json tsconfig.json
```
