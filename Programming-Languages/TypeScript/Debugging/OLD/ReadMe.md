# Debugging TypeScript within VSCode

## launch.json

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "TypeScript Debugging (ts-node)",
      "type": "node",
      "request": "launch",
      "args": ["-P", "tsconfig-debug.json", "${relativeFile}"],
      "cwd": "${workspaceRoot}",
      "runtimeExecutable": "ts-node" // has to be installed globally
    },
        {
      "name": "TypeScript Debugging (tsx)",
      "type": "node",
      "request": "launch",
      "args": ["${relativeFile}"],
      "cwd": "${workspaceRoot}",
      "runtimeExecutable": "tsx", // has to be installed globally
      "runtimeArgs": ["--tsconfig=tsconfig-debug.json"],
      "outFiles": ["${workspaceFolder}/dist/**/*.js"],
      "sourceMaps": true
    }
  ]
}
```

## tsconfig-debug.json

```json
{
  "compilerOptions": {
    "target": "esnext",
    "lib": ["ESNext", "DOM"],
    "module": "esnext",
    "esModuleInterop": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipDefaultLibCheck": true,
    "skipLibCheck": true,
    "sourceMap": true
  },
  "ts-node": {
    "esm": true,
    "experimentalSpecifierResolution": "node"
  }
}
```

## package.json

```json
{
  "devDependencies": {
    "@types/node": "^18.0.3"
  }
}
```
