# Debug TS in VSCode

## Easiest Configuration

No other configuration is needed. As simple as it is:

### Create a special tsconfig.json for debugging, e.g. "tsconfig-debug.json"

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "importHelpers": true,
    "lib": ["ESNext", "DOM"],
    "paths": {
      "@some-app/configuration": ["apps-config/some-app/index.ts"]
    },
    "target": "ESNext",
    "types": ["node"]
  },

  "lib": ["ESNext"]
}
```

### Install the following packages

Install `ts-node` globally and "tsconfig-paths" as a dev dependency.

```bash
npm i -g ts-node
npm i -D tsconfig-paths
```

### Add a launch configuration to your `.vscode/launch.json`

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "TypeScript Debugging (ts-node)",
      "type": "node",
      "request": "launch",
      "args": [
        "-P",
        "tsconfig-debug.json",
        "-r",
        "tsconfig-paths/register",
        "${relativeFile}"
      ],
      "cwd": "${workspaceRoot}",
      "runtimeExecutable": "ts-node"
    }
  ]
}
```
