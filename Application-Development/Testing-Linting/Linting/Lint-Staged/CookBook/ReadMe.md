# When Symlinks Become the Plot Twist: Navigating Linting in a Multi-Project Nx Workspace

In a **multi-project**, **multi-environment** **Nx workspace** (MacOS/Linux/Windows/...), you should normally try to avoid symbolic links.

Although they are common practice, they can lead to unexpected problems on different operating systems, especially if you work with other nerds who tend to compile their own kernels.

Sooner or later, as an architect, you'll realize the need to find a solution that works everywhere without any issues. And you wouldn't want to do without symlinks either. (Why should you? They're so useful!)

One use case might be creating **a symbolic link from `tsconfig.json` to `tsconfig.base.json`** at the root of the workspace.

If you frequently use generators to automate tasks (e.g., generating environment files that need the local IP of your machine, which you have to remove before pushing your code to a repository), you don't want to set a tsconfig.json configuration file for every single script or module each time.

Instead, you create a single tsconfig.json file at the root of the workspace, containing properly planned configurations for all common cases.

But what if you work in an NxMonoRepo, which generates a `tsconfig.base.json` file instead of a `tsconfig.json` file? And some of your third-party libraries expect a `tsconfig.json` file at the root folder? Then, you create a symbolic link from `tsconfig.json` to `tsconfig.base.json`:

```shell
ln -s tsconfig.base.json tsconfig.json
```

And **that's when problems begin**.

## Git Hooks: Husky says Mayday, Mayday!

If you use Git hooks, such as Husky, and have a pre-commit hook that runs linting:

```shell
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx lint-staged && nx run-many --target=lint --all
```

And you've created a symbolic link and want to commit it to the repository, you might encounter an error message like this:

```shell
$ git commit -m "Create a symlink at projectroot folder"
✔ Preparing lint-staged...
⚠ Running tasks for staged files...
  ❯ .lintstagedrc.json — 3 files
    ❯ *.{js,jsx,ts,tsx} — 2 files
      ✖ eslint --fix --no-error-on-unmatched-pattern
    ❯ *.{json,md,css,scss,html} — 1 file
      ✔ eslint --fix --no-error-on-unmatched-pattern
      ✖ prettier --write [FAILED]
↓ Skipped because of errors from tasks.
✔ Reverting to original state because of errors...
✔ Cleaning up temporary files...

✖ prettier --write:
[error] Explicitly specified pattern "tsconfig.json" is a symbolic link.
husky - pre-commit script failed (code 1)
```

And you think, *a single symbolic link can't cause a terrible mess*. But it can. Now you begin to analyze your configuration files.

### Step One: Checking .eslintignore

You add a line to your .eslintignore file:

```shell
tsconfig.json
```

and try again to commit your changes. But you get the same error message.

### Step Two: Checking .prettierignore

This time, you have stronger convictions. You add 2 lines to your .prettierignore file:

```shell
tsconfig.json
./tsconfig.json
```

And try again to commit your changes. But you receive the same error message.

### Step Three: Checking .lintstagedrc.json

Ok, even if your lint-stage uses eslint and prettier in the background, lint-staged within Nx can successfully ignore their configuration files. So you need to configure it in your `.lintstagedrc.json` file:

```json
{
  "*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"],
  "*.{json,md,css,scss,html}": ["eslint --fix", "prettier --write"],
}
```

and you modify it to:

```json
{
  "*.json": [
    "eslint --fix --no-error-on-unmatched-pattern",
    "tsx path-to-your/prettier-exclude-symlinks.ts"
  ],
  "*.{js,jsx,ts,tsx}": [
    "eslint --fix --no-error-on-unmatched-pattern",
    "prettier --write"
  ],
  "*.{md,css,scss,html}": [
    "eslint --fix --no-error-on-unmatched-pattern",
    "prettier --write"
  ]
}

```

Now you need to create this script file.

### Step Four: Symlink Exclusion Script

Choose your desired path in your workspace `path-to-your/prettier-exclude-symlinks.ts` and create it:

```typescript
import { execSync } from 'child_process';
import { lstatSync } from 'fs';

const files = process.argv.slice(2);

files.forEach((file) => {
  try {
    if (!lstatSync(file).isSymbolicLink()) {
      execSync(`prettier --write "${file}"`, { stdio: 'inherit' });
    }
  } catch (error) {
    console.error(`Lint-Stage Configuration cannot handle ${file}:`, error);
    process.exit(1);
  }
});
```

Now, you should be able to commit your changes hopefully without any issues.
