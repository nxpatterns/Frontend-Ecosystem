# Enterprise TypeScript (Experts only)

This document is aimed at professionals with solid TypeScript knowledge. The version at the time of writing this document is: **TypeScript v5.3.3**. Node must be installed on your system. I use Node v21.6.1 with Npm 10.4.0.

**Table of Contents**

<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Preface](#preface)
- [Introduction](#introduction)
  - [TypeScript's Type System](#typescripts-type-system)
    - [Compile Time vs. Runtime](#compile-time-vs-runtime)
- [Setup & tsconfig.json](#setup--tsconfigjson)
- [Types](#types)
  - [Type Guards](#type-guards)

<!-- /code_chunk_output -->

## Preface

In the realms of TypeScript and its arcane constructs, I've witnessed colleagues nearly pen dissertations on Types alone. My mission? To unveil the elegance of simplicity in coding practices that often seems shrouded in unnecessary complexity.

Time permitting, this tome shall expand its horizons. Your wisdom and contributions are not just welcome but eagerly awaited.

Dare to venture where no book has before. Here, we transcend traditional boundaries, offering insights you won't find elsewhere. This narrative isn't about glorifying TypeScript; it's an ode to the art of Enterprise Architecture and Development through the TypeScript lens. Framework agnostic, the principles herein gracefully dance across domains.

Targeting the connoisseurs of TypeScript, the title is a deliberate choice. Master the art of these opinionated guidelines, and you may just find yourself a coveted ally in our future endeavors.

Should you spot an error, do enlighten me. Alternatively, your insights might just enrich our collective intellect, sparing us the ordeal of starting from scratch on every project.

Though not my daily desire, laying a robust foundation is pivotal for any architectural masterpiece. A shaky start promises a tremulous future. My aspirations for precision might border on the ambitious, yet I believe in setting the bar high – the higher, the merrier.

In this AI-dominated epoch, where machines outperform humans in repetitive tasks, we pivot towards models that resonate with human intellect. It's a return to the basics, executed with unwavering precision.

Enter the TypeScript type system and beyond – our trusted companion in navigating the complexities of modern development paradigms. The deliberate choice of language style serves as a mystical barrier, warding off novices while granting true experts a stylistic euphoria upon reading.

## Introduction

Venture into the world of **TypeScript**, and you'll discover it's more than a mere coding language; it's a craftsman's toolset for sculpting enterprise-level applications.

Within these pages, I'll shine a light on the quintessential practices and instruments for harnessing the formidable capabilities of TypeScript in the realm of enterprise development.

While it's ambitious to encapsulate every nuance, our journey will navigate through the essential territories of Types, Decorators, Mixins, and Tools. For those hungering for more, [official TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html) awaits with its wealth of knowledge.

### TypeScript's Type System

At the heart of TypeScript's might lies its type system, a topic we'll dissect in its own dedicated chapter. For the moment, let us concentrate on its most pivotal facets.

#### Compile Time vs. Runtime

Here lies our primary bifurcation: the dichotomy between compile time and runtime.

TypeScript's type system is ostensibly a compile-time consort, yet it boldly traverses beyond. This very assertion might just ruffle the feathers of the self-anointed TypeScript cognoscenti. 😁

Indeed, types can traverse the boundary into runtime; Enums and Classes stand testament to this, serving as types beyond the compile-time curtain. Correctly harnessed, this phenomenon is not merely potent but revolutionary. Despite the chorus of caution against Enums, I stand on the side of dissent, with reasons I'll delve into shortly.

Decorators and Mixins, too, hold their ground in the runtime realm, fear not, I shan't advocate for their use as types—though, intriguingly, the possibility exists.

Yet, this doesn't equate to type information holding court at runtime. Rather, these constructs boast of tangible runtime embodiments—a distinction with a difference.

Such musings edge more into the philosophical than the strictly technical. The truth is, specific constructs can indeed don the mantle of types at runtime. These stalwarts of flexibility and backward compatibility have graced earlier versions, essential for reusability. (Illustrative examples are on the horizon.)

And thus, a common retort from the community unfolds:

While it's accurate that Enums, Classes, Decorators, and Mixins manifest within JavaScript's runtime fabric, to claim "types can indeed exist at runtime" may wander into the realms of ambiguity without further context. Enums and Classes, when wielded as types in TypeScript, do indeed have their counterparts in JavaScript's runtime. However, TypeScript's type lore—such as interface definitions—remains a compile-time relic.

Should I sense a TypeScript devotee teetering on the brink of apoplexy, I shall graciously retreat, for our mission is to enlighten, not to afflict. 😃

## Setup & tsconfig.json

When diving into a TypeScript-based adventure, whether it's navigating the Angular universe or setting up an Nx Monorepo, these frameworks kindly roll out the red carpet, automatically conjuring up all the necessary configuration spells. But, if you're embarking on a journey with Vanilla TypeScript, the wand is in your hand to cast the setup enchantments.

Fear not, for the TypeScript-tooling grimoire includes incantations to effortlessly summon a TypeScript environment:

```shell
# Install TypeScript globally if not already installed
npm i -g typescript

# Initialise a new TypeScript project
tsc --init

# Output:
Created a new tsconfig.json with:
  target: es2016
  module: commonjs
  strict: true
  esModuleInterop: true
  skipLibCheck: true
  forceConsistentCasingInFileNames: true

```

Upon invoking the above spells, a tsconfig.json scroll will materialize in your root directory. Our quest begins with a need for a modern and stringent configuration; thus, manual enchantments are required. ([Unveil all secrets online](https://www.typescriptlang.org/tsconfig)).

```json
{
  "compileOnSave": false,
  "compilerOptions": {
    "alwaysStrict": true,
    "baseUrl": ".",
    "declaration": true,
    "emitDecoratorMetadata": true,
    "esModuleInterop": true,
    "experimentalDecorators": true,
    "forceConsistentCasingInFileNames": true,
    "lib": ["ESNext", "DOM", "DOM.Iterable", "ScriptHost"],
    "module": "ESNext",
    "moduleResolution": "node",
    "noImplicitAny": true,
    "noImplicitThis": true,
    "outDir": "./dist",
    "paths": {
      "@app/*": ["src/*"] // e.g.: import { MyClass } from '@app/my-class';
    },
    "rootDir": ".",
    "skipDefaultLibCheck": true,
    "skipLibCheck": true,
    "sourceMap": true,
    "strict": true,
    "strictBindCallApply": true,
    "strictFunctionTypes": true,
    "strictNullChecks": true,
    "strictPropertyInitialization": true,
    "target": "es2016", // or "esnext"
  },

  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

Some useful commands:

```shell
tsc --showConfig
tsc --listFiles
```

## Types

### Type Guards

A very simple example of a Type Guard (TypeScript 3.7 or later) is as follows:

```typescript
// TypeScript version 3.7 or later
function isString(value: any): value is string {
  return typeof value === 'string';
}
```
