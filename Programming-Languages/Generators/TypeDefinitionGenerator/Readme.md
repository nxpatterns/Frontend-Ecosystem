# Type Definition Generator

> with `ts-morph`

<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Install ts-morph](#install-ts-morph)
- [Generator Code](#generator-code)

<!-- /code_chunk_output -->

## Install ts-morph

```shell
npm install -g ts-morph  # or as dev-dependecy in the current workspace
npm i -D ts-morph
```

## Generator Code

```typescript
import { Project } from 'ts-morph';
import { writeFileSync } from 'fs';
import { execSync } from 'child_process';
function generateTypeDefs(inputPath: string, outputPath: string) {
  const project = new Project();
  const sourceFile = project.addSourceFileAtPath(inputPath);
  const classes = sourceFile.getClasses();
  let typeDefs = '';

  /**
   * If we create Type Definitions for a Class/Component/WhatEver we
   * want to include their imported types as well, but only those,
   * which are imported globally.
   *
   * E.g. we want to include:
   *
   * ->  import { SomeGlobalType } from '@apps-globals/types';
   *
   * but not:
   *
   * -> import { Component } from '@angular/core';
   */


  const importDeclarations = sourceFile.getImportDeclarations();

  /**
   * Filter the import declarations to keep only the ones
   * that e.g. start with '@apps'. That could be a convention
   * to identify the global imports.
   */


  const globalImports = importDeclarations.filter((declaration) =>
    declaration.getModuleSpecifierValue().startsWith('@apps-'),
  );

  /**
  * Now we can iterate over the global imports and add them to the type definitions.
  */


  for (const importDeclaration of globalImports) {
    typeDefs += importDeclaration.getText() + '\n';
  }

  for (const cls of classes) {
    typeDefs += `export interface ${cls.getName()}Type {`;
    for (const prop of cls.getProperties()) {
      typeDefs += `  ${prop.getName()}: ${prop.getType().getText()};`;
    }
    for (const method of cls.getMethods()) {
      typeDefs += `  ${method.getName()}(${method
        .getParameters()
        .map((param) => `${param.getName()}: ${param.getType().getText()}`)
        .join(',')}): ${method.getReturnType().getText()};`;
    }
    typeDefs += '}';
  }

  console.log('Type definitions:', typeDefs);

  try {

    /**
     * Write the type definitions to a file and
     * format it with prettier.
     */

    writeFileSync(outputPath, typeDefs);
    execSync(`npx prettier --write ${outputPath}`);
  } catch (error) {
    console.error('Error writing to file:', error);
  }
}
generateTypeDefs(process.argv[2], process.argv[3]);

```
