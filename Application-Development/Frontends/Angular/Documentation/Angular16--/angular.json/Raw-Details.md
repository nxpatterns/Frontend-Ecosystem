# Nx generated "angular.json"

> Last Update: September 2021

> Similar Content: <https://nitayneeman.com/posts/understanding-the-angular-cli-workspace-file/>

> See original files here: <https://github.com/angular/angular-cli/tree/master/packages/angular_devkit/build_angular/src/builders>

<!-- prettier-ignore-start -->

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Nx generated "angular.json"](#nx-generated-angularjson)
  - [JSON Angular Workspace Schema](#json-angular-workspace-schema)
    - [First Level - Overview](#first-level-overview)
      - [$schema](#schema)
      - [$id](#id)
      - [title](#title)
      - [type](#type)
      - [additionalProperties](#additionalproperties)
      - [required](#required)
      - [properties](#properties)
        - [properties -> `$schema`](#properties-schema)
        - [properties -> `version`](#properties-version)
        - [properties -> `cli`](#properties-cli)
        - [properties -> `schematics`](#properties-schematics)
        - [properties -> `newProjectRoot`](#properties-newprojectroot)
        - [properties -> `defaultProject`](#properties-defaultproject)
        - [properties -> `projects`](#properties-projects)
      - [definitions](#definitions)
        - [definitions.cliOptions](#definitionsclioptions)
        - [definitions.schematicOptions](#definitionsschematicoptions)
        - [definitions.fileVersion](#definitionsfileversion)
        - [definitions.project](#definitionsproject)
          - [definitions.project.type](#definitionsprojecttype)
          - [definitions.project.properties -> Important Details](#definitionsprojectproperties-important-details)
          - [definitions.project.required](#definitionsprojectrequired)
          - [definitions.project.anyOf](#definitionsprojectanyof)
          - [definitions.project.additionalProperties](#definitionsprojectadditionalproperties)
          - [definitions.project.patternProperties](#definitionsprojectpatternproperties)
          - [definitions.project.definitions -> Important Details](#definitionsprojectdefinitions-important-details)
        - [definitions.global](#definitionsglobal)
  - [Important Details](#important-details)
    - [definitions.project.properties](#definitionsprojectproperties)
      - [definitions.project.properties -> `cli`](#definitionsprojectproperties-cli)
      - [definitions.project.properties -> `schematics`](#definitionsprojectproperties-schematics)
      - [definitions.project.properties -> `prefix`](#definitionsprojectproperties-prefix)
      - [definitions.project.properties -> `root`](#definitionsprojectproperties-root)
      - [definitions.project.properties -> `i18n`](#definitionsprojectproperties-i18n)
      - [definitions.project.properties -> `sourceRoot`](#definitionsprojectproperties-sourceroot)
      - [definitions.project.properties -> `projectType`](#definitionsprojectproperties-projecttype)
      - [definitions.project.properties -> `architect`](#definitionsprojectproperties-architect)
      - [definitions.project.properties -> `targets`](#definitionsprojectproperties-targets)
    - [definitions.project.definitions](#definitionsprojectdefinitions)
      - [definitions.project.definitions -> `i18n`](#definitionsprojectdefinitions-i18n)
        - [description](#description)
        - [type](#type-1)
        - [properties](#properties-1)
          - [sourceLocale](#sourcelocale)
          - [locales](#locales)
        - [additionalProperties](#additionalproperties-1)
      - [definitions.project.definitions -> `target`](#definitionsprojectdefinitions-target)
  - [Details Analysis of definitions.project.definitions -> `target.oneOf`](#details-analysis-of-definitionsprojectdefinitions-targetoneof)
    - [oneOf[0]](#oneof0)
      - [keys](#keys)
      - [values](#values)
    - [oneOf[1]](#oneof1)
      - [keys](#keys-1)
      - [values](#values-1)
    - [oneOf[2]](#oneof2)
      - [keys](#keys-2)
      - [values](#values-2)
    - [oneOf[3]](#oneof3)
      - [keys](#keys-3)
      - [values](#values-3)
    - [oneOf[4]](#oneof4)
      - [keys](#keys-4)
      - [values](#values-4)
    - [oneOf[5]](#oneof5)
      - [keys](#keys-5)
      - [values](#values-5)
    - [oneOf[6]](#oneof6)
      - [keys](#keys-6)
      - [values](#values-6)
    - [oneOf[7]](#oneof7)
      - [keys](#keys-7)
      - [values](#values-7)
    - [oneOf[8]](#oneof8)
      - [keys](#keys-8)
      - [values](#values-8)
  - [Result of analysis -> definitions.project.definitions.target.oneOf](#result-of-analysis-definitionsprojectdefinitionstargetoneof)
    - [definitions.project.definitions.target.oneOf.properties.keys](#definitionsprojectdefinitionstargetoneofpropertieskeys)
    - [definitions.project.definitions.target.oneOf.properties.builder](#definitionsprojectdefinitionstargetoneofpropertiesbuilder)
    - [definitions.project.definitions.target.oneOf.properties.defaultConfiguration](#definitionsprojectdefinitionstargetoneofpropertiesdefaultconfiguration)
    - [definitions.project.definitions.target.oneOf.properties.options](#definitionsprojectdefinitionstargetoneofpropertiesoptions)
    - [definitions.project.definitions.target.oneOf.configurations](#definitionsprojectdefinitionstargetoneofconfigurations)
  - [Angular Schemas - builders](#angular-schemas-builders)
    - [app-shell](#app-shell)
    - [browser](#browser)
    - [dev-server](#dev-server)
    - [extract-i18n](#extract-i18n)
    - [karma](#karma)
    - [protractor](#protractor)
    - [server](#server)
    - [ng-packagr](#ng-packagr)
  - [Nx Generated Structure of `angular.json` (under construction)](#nx-generated-structure-of-angularjson-under-construction)
    - [version](#version)
    - [cli](#cli)
      - [defaultCollection](#defaultcollection)
      - [packageManager](#packagemanager)
      - [warnings](#warnings)
        - [versionMismatch: true/false](#versionmismatch-truefalse)
      - [analytics: boolean/string](#analytics-booleanstring)
      - [analyticsSharing](#analyticssharing)
    - [schematics](#schematics)
    - [newProjectRoot](#newprojectroot)
    - [defaultProject](#defaultproject)
    - [projects](#projects)
  - [Projects](#projects-1)
    - [projectType](#projecttype)
    - [root](#root)
    - [sourceRoot](#sourceroot)
    - [prefix](#prefix)
    - [schematics](#schematics-1)
    - [architect](#architect)

<!-- /code_chunk_output -->

<!-- prettier-ignore-end -->

## JSON Angular Workspace Schema

### First Level - Overview

Based on JSON Angular Workspace Schema (at the time of writing):

```js
'$schema',
  '$id',
  'title',
  'type',
  'properties',
  'additionalProperties',
  'required',
  'definitions';
```

The following first-level properties have single line values:

```js
"$schema": "http://json-schema.org/draft-07/schema",
"$id": "ng-cli://config/schema.json",
"title": "Angular CLI Workspace Configuration",
"type": "object",
...
'additionalProperties': false,
 required: [ 'version' ]
```

The properties `properties` and `definitons` are little bit complicated.

#### $schema

```js
"$schema": "http://json-schema.org/draft-07/schema",
```

#### $id

```js
"$id": "ng-cli://config/schema.json",
```

#### title

```js
"title": "Angular CLI Workspace Configuration",
```

#### type

```js
"type": "object",
```

#### additionalProperties

```js
'additionalProperties': false,
```

#### required

```js
required: ['version'];
```

#### properties

```js
'$schema',
  'version',
  'cli',
  'schematics',
  'newProjectRoot',
  'defaultProject',
  'projects';
```

The following ones have single line values:

```js
  '$schema': { type: 'string' },
  'version': { '$ref': '#/definitions/fileVersion' },
  'cli': { '$ref': '#/definitions/cliOptions' },
  'schematics': { '$ref': '#/definitions/schematicOptions' },
  'newProjectRoot': { type: 'string' },
  'defaultProject': { type: 'string' },
```

##### properties -> `$schema`

```js
'$schema': { type: 'string' },
```

##### properties -> `version`

```js
'version': { '$ref': '#/definitions/fileVersion' },
```

##### properties -> `cli`

```js
'cli': { '$ref': '#/definitions/cliOptions' },
```

##### properties -> `schematics`

```js
'schematics': { '$ref': '#/definitions/schematicOptions' },
```

##### properties -> `newProjectRoot`

```js
'newProjectRoot': { type: 'string' },
```

##### properties -> `defaultProject`

```js
'defaultProject': { type: 'string' },
```

##### properties -> `projects`

And the `projects` has a reference to definitions:

```js
  'projects'
    type: 'object'
    patternProperties:
      '$ref': '#/definitions/project'
```

#### definitions

<!-- prettier-ignore-start -->
```js
'cliOptions', 
'schematicOptions', 
'fileVersion', 
'project', 
'global';
```
<!-- prettier-ignore-end -->

Each of them (except `fileVersion`) has a complicated structure.

The easiest one is `fileVersion`:

```js
'fileVersion': type: 'integer', minimum: 1,
```

##### definitions.cliOptions

```js
'cliOptions',
  defaultCollection:
  packageManager:
  warnings:
  analytics:
  analyticsSharing:
    tracking:
    uuid:
```

##### definitions.schematicOptions

The paths are simplified for reasons of clarity:

```js
'schematicOptions', -> @schematics/angular:
  'application': -> '$ref': '.../application/schema.json'
  'class': -> '$ref': '.../class/schema.json'
  'component': -> '$ref': '.../component/schema.json'
  'directive': -> '$ref': '.../directive/schema.json'
  'enum': -> '$ref': '.../enum/schema.json'
  'guard': -> '$ref': '.../guard/schema.json'
  'interceptor': -> '$ref': '.../interceptor/schema.json'
  'interface': -> '$ref': '.../interface/schema.json'
  'library': -> '$ref': '.../library/schema.json'
  'pipe': -> '$ref': '.../pipe/schema.json'
  'ng-new': -> '$ref': '.../ng-new/schema.json'
  'resolver': -> '$ref': '.../resolver/schema.json'
  'service': -> '$ref': '.../service/schema.json'
  'web-worker': -> '$ref': '.../web-worker/schema.json
```

##### definitions.fileVersion

```js
'fileVersion': type: 'integer', minimum: 1,
```

##### definitions.project

```js
'type',
  'properties',
  'required',
  'anyOf',
  'additionalProperties',
  'patternProperties',
  'definitions';
```

###### definitions.project.type

```js
type: string;
```

###### definitions.project.properties -> Important Details

See section below -> `Important Details`

###### definitions.project.required

```js
['root', 'projectType'];
```

###### definitions.project.anyOf

```js
 { required: [ 'architect' ], not: { required: [ 'targets' ] } },
 { required: [ 'targets' ], not: { required: [ 'architect' ] } },
 { not: { required: [ 'targets', 'architect' ] } }
```

###### definitions.project.additionalProperties

```js
additionalProperties: false,
```

###### definitions.project.patternProperties

```js
patternProperties: {
      '^[a-z]{1,3}-.*': {},
    },
```

###### definitions.project.definitions -> Important Details

See section below -> `Important Details`

##### definitions.global

```js
  'global'
    '$schema': { type: 'string', format: 'uri' }
    'version': { '$ref': '#/definitions/fileVersion' }
    'cli': { '$ref': '#/definitions/cliOptions' },
    'schematics': { '$ref': '#/definitions/schematicOptions' }
```

## Important Details

### definitions.project.properties

```js
'cli',
  'schematics',
  'prefix',
  'root',
  'i18n',
  'sourceRoot',
  'projectType',
  'architect',
  'targets';
```

#### definitions.project.properties -> `cli`

```js
cli: {
  $ref: '#/definitions/cliOptions',
}
```

#### definitions.project.properties -> `schematics`

```js
schematics: {
  $ref: '#/definitions/schematicOptions',
}
```

#### definitions.project.properties -> `prefix`

```js
prefix: {
  type: 'string',
  format: 'html-selector',
  description: 'The prefix to apply to generated selectors.',
}
```

#### definitions.project.properties -> `root`

```js
root: {
  type: 'string',
  description: 'Root of the project files.',
}
```

#### definitions.project.properties -> `i18n`

```js
i18n: {
  $ref: '#/definitions/project/definitions/i18n',
}
```

#### definitions.project.properties -> `sourceRoot`

```js
sourceRoot: {
  type: 'string',
  description:
    'The root of the source files, assets and index.html file structure.',
}
```

#### definitions.project.properties -> `projectType`

```js
projectType: {
  type: 'string',
  description: 'Project type.',
  enum: ['application', 'library'],
}
```

#### definitions.project.properties -> `architect`

```js
architect: {
  type: 'object',
  additionalProperties: {
    $ref: '#/definitions/project/definitions/target',
  },
}
```

#### definitions.project.properties -> `targets`

```js
targets: {
  type: 'object',
  additionalProperties: {
    $ref: '#/definitions/project/definitions/target',
  },
}
```

### definitions.project.definitions

<!-- prettier-ignore-start -->
```js
[ 
'i18n', 
'target' 
]
```
<!-- prettier-ignore-end -->

#### definitions.project.definitions -> `i18n`

<!-- prettier-ignore-start -->
```js
[ 
'description', 
'type', 
'properties', 
'additionalProperties' 
]
```
<!-- prettier-ignore-end -->

##### description

```js
description: 'Project i18n options';
```

##### type

```js
type: 'object';
```

##### properties

```js
['sourceLocale', 'locales'];
```

###### sourceLocale

```js
sourceLocale: {
  oneOf: [
    {
      type: 'string',
      description: 'Specifies the source locale of the application.',
      default: 'en-US',
      $comment: 'IETF BCP 47 language tag (simplified)',
      pattern:
        '^[a-zA-Z]{2,3}(-[a-zA-Z]{4})?(-([a-zA-Z]{2}|[0-9]{3}))?(-[a-zA-Z]{5,8})?(-x(-[a-zA-Z0-9]{1,8})+)?$',
    },
    {
      type: 'object',
      description:
        'Localization options to use for the source locale',
      properties: {
        code: {
          type: 'string',
          description:
            'Specifies the locale code of the source locale',
          pattern:
            '^[a-zA-Z]{2,3}(-[a-zA-Z]{4})?(-([a-zA-Z]{2}|[0-9]{3}))?(-[a-zA-Z]{5,8})?(-x(-[a-zA-Z0-9]{1,8})+)?$',
        },
        baseHref: {
          type: 'string',
          description:
            'HTML base HREF to use for the locale (defaults to the locale code)',
        },
      },
      additionalProperties: false,
    },
  ];
}
```

###### locales

```js
locales: {
  type: 'object',
  additionalProperties: false,
  patternProperties:
   { '^[a-zA-Z]{2,3}(-[a-zA-Z]{4})?(-([a-zA-Z]{2}|[0-9]{3}))?(-[a-zA-Z]{5,8})?(-x(-[a-zA-Z0-9]{1,8})+)?$':
      { oneOf:
         [
           { type: 'string',
             description: 'Localization file to use for i18n'
           },
           { type: 'array',
             description: 'Localization files to use for i18n',
             items: { type: 'string', uniqueItems: true }
           },
           { type: 'object',
             description: 'Localization options to use for the locale',
             properties: { translation: [Object], baseHref: [Object] },
             additionalProperties: false }
         ]
      }
   }
}
```

##### additionalProperties

```js
additionalProperties: false;
```

#### definitions.project.definitions -> `target`

```js
target: {
  oneOf: [
    {
      $comment: 'Extendable target with custom builder',
      type: 'object',
      properties: {
        builder: {
          type: 'string',
          description: 'The builder used for this package.',
          not: { enum: [Object] },
        },
        defaultConfiguration: {
          type: 'string',
          description:
            'A default named configuration to use when a target configuration is not provided.',
        },
        options: { type: 'object' },
        configurations: {
          type: 'object',
          description: 'A map of alternative target options.',
          additionalProperties: { type: 'object' },
        },
      },
      additionalProperties: false,
      required: ['builder'],
    },
    {
      type: 'object',
      additionalProperties: false,
      properties: {
        builder: { const: '@angular-devkit/build-angular:app-shell' },
        defaultConfiguration: {
          type: 'string',
          description:
            'A default named configuration to use when a target configuration is not provided.',
        },
        options: {
          $ref: '../../../../angular_devkit/build_angular/src/builders/app-shell/schema.json',
        },
        configurations: {
          type: 'object',
          additionalProperties: {
            $ref: '../../../../angular_devkit/build_angular/src/builders/app-shell/schema.json',
          },
        },
      },
    },
    {
      type: 'object',
      additionalProperties: false,
      properties: {
        builder: { const: '@angular-devkit/build-angular:browser' },
        defaultConfiguration: {
          type: 'string',
          description:
            'A default named configuration to use when a target configuration is not provided.',
        },
        options: {
          $ref: '../../../../angular_devkit/build_angular/src/builders/browser/schema.json',
        },
        configurations: {
          type: 'object',
          additionalProperties: {
            $ref: '../../../../angular_devkit/build_angular/src/builders/browser/schema.json',
          },
        },
      },
    },
    {
      type: 'object',
      additionalProperties: false,
      properties: {
        builder: {
          const: '@angular-devkit/build-angular:dev-server',
        },
        defaultConfiguration: {
          type: 'string',
          description:
            'A default named configuration to use when a target configuration is not provided.',
        },
        options: {
          $ref: '../../../../angular_devkit/build_angular/src/builders/dev-server/schema.json',
        },
        configurations: {
          type: 'object',
          additionalProperties: {
            $ref: '../../../../angular_devkit/build_angular/src/builders/dev-server/schema.json',
          },
        },
      },
    },
    {
      type: 'object',
      additionalProperties: false,
      properties: {
        builder: {
          const: '@angular-devkit/build-angular:extract-i18n',
        },
        defaultConfiguration: {
          type: 'string',
          description:
            'A default named configuration to use when a target configuration is not provided.',
        },
        options: {
          $ref: '../../../../angular_devkit/build_angular/src/builders/extract-i18n/schema.json',
        },
        configurations: {
          type: 'object',
          additionalProperties: {
            $ref: '../../../../angular_devkit/build_angular/src/builders/extract-i18n/schema.json',
          },
        },
      },
    },
    {
      type: 'object',
      additionalProperties: false,
      properties: {
        builder: { const: '@angular-devkit/build-angular:karma' },
        defaultConfiguration: {
          type: 'string',
          description:
            'A default named configuration to use when a target configuration is not provided.',
        },
        options: {
          $ref: '../../../../angular_devkit/build_angular/src/builders/karma/schema.json',
        },
        configurations: {
          type: 'object',
          additionalProperties: {
            $ref: '../../../../angular_devkit/build_angular/src/builders/karma/schema.json',
          },
        },
      },
    },
    {
      type: 'object',
      additionalProperties: false,
      properties: {
        builder: {
          const: '@angular-devkit/build-angular:protractor',
        },
        defaultConfiguration: {
          type: 'string',
          description:
            'A default named configuration to use when a target configuration is not provided.',
        },
        options: {
          $ref: '../../../../angular_devkit/build_angular/src/builders/protractor/schema.json',
        },
        configurations: {
          type: 'object',
          additionalProperties: {
            $ref: '../../../../angular_devkit/build_angular/src/builders/protractor/schema.json',
          },
        },
      },
    },
    {
      type: 'object',
      additionalProperties: false,
      properties: {
        builder: { const: '@angular-devkit/build-angular:server' },
        defaultConfiguration: {
          type: 'string',
          description:
            'A default named configuration to use when a target configuration is not provided.',
        },
        options: {
          $ref: '../../../../angular_devkit/build_angular/src/builders/server/schema.json',
        },
        configurations: {
          type: 'object',
          additionalProperties: {
            $ref: '../../../../angular_devkit/build_angular/src/builders/server/schema.json',
          },
        },
      },
    },
    {
      type: 'object',
      additionalProperties: false,
      properties: {
        builder: {
          const: '@angular-devkit/build-angular:ng-packagr',
        },
        defaultConfiguration: {
          type: 'string',
          description:
            'A default named configuration to use when a target configuration is not provided.',
        },
        options: {
          $ref: '../../../../angular_devkit/build_angular/src/builders/ng-packagr/schema.json',
        },
        configurations: {
          type: 'object',
          additionalProperties: {
            $ref: '../../../../angular_devkit/build_angular/src/builders/ng-packagr/schema.json',
          },
        },
      },
    },
  ];
}
```

## Details Analysis of definitions.project.definitions -> `target.oneOf`

There are currently 9 possible values of `definitions.project.definitions.target.oneOf` array.

### oneOf[0]

#### keys

<!-- prettier-ignore-start -->
```js
'$comment',
'type',
'properties',
'additionalProperties',
'required'
```
<!-- prettier-ignore-end -->

#### values

```json
{
  "$comment": "Extendable target with custom builder",
  "type": "object",
  "properties": {
    "builder": {
      "type": "string",
      "description": "The builder used for this package.",
      "not": {
        "enum": [
          "@angular-devkit/build-angular:app-shell",
          "@angular-devkit/build-angular:browser",
          "@angular-devkit/build-angular:dev-server",
          "@angular-devkit/build-angular:extract-i18n",
          "@angular-devkit/build-angular:karma",
          "@angular-devkit/build-angular:protractor",
          "@angular-devkit/build-angular:server",
          "@angular-devkit/build-angular:ng-packagr"
        ]
      }
    },
    "defaultConfiguration": {
      "type": "string",
      "description": "A default named configuration to use when a target configuration is not provided."
    },
    "options": { "type": "object" },
    "configurations": {
      "type": "object",
      "description": "A map of alternative target options.",
      "additionalProperties": { "type": "object" }
    }
  },
  "additionalProperties": false,
  "required": ["builder"]
}
```

### oneOf[1]

#### keys

<!-- prettier-ignore-start -->
```js
'type', 
'additionalProperties', 
'properties' 
```
<!-- prettier-ignore-end -->

#### values

```json
{
  "type": "object",
  "additionalProperties": false,
  "properties": {
    "builder": { "const": "@angular-devkit/build-angular:app-shell" },
    "defaultConfiguration": {
      "type": "string",
      "description": "A default named configuration to use when a target configuration is not provided."
    },
    "options": { "$ref": "...builders/app-shell/schema.json" },
    "configurations": {
      "type": "object",
      "additionalProperties": {
        "$ref": "...builders/app-shell/schema.json"
      }
    }
  }
}
```

### oneOf[2]

#### keys

<!-- prettier-ignore-start -->

```js
'type', 
'additionalProperties', 
'properties' 
```
<!-- prettier-ignore-end -->

#### values

```json
{
  "type": "object",
  "additionalProperties": false,
  "properties": {
    "builder": { "const": "@angular-devkit/build-angular:browser" },
    "defaultConfiguration": {
      "type": "string",
      "description": "A default named configuration to use when a target configuration is not provided."
    },
    "options": {
      "$ref": "...builders/browser/schema.json"
    },
    "configurations": {
      "type": "object",
      "additionalProperties": {
        "$ref": "...builders/browser/schema.json"
      }
    }
  }
}
```

### oneOf[3]

#### keys

<!-- prettier-ignore-start -->
```js
'type', 
'additionalProperties', 
'properties' 
```
<!-- prettier-ignore-end -->

#### values

```json
{
  "type": "object",
  "additionalProperties": false,
  "properties": {
    "builder": {
      "const": "@angular-devkit/build-angular:dev-server"
    },
    "defaultConfiguration": {
      "type": "string",
      "description": "A default named configuration to use when a target configuration is not provided."
    },
    "options": {
      "$ref": "...builders/dev-server/schema.json"
    },
    "configurations": {
      "type": "object",
      "additionalProperties": {
        "$ref": "...builders/dev-server/schema.json"
      }
    }
  }
}
```

### oneOf[4]

#### keys

<!-- prettier-ignore-start -->
```js
'type', 
'additionalProperties', 
'properties' 
```
<!-- prettier-ignore-end -->

#### values

```json
{
  "type": "object",
  "additionalProperties": false,
  "properties": {
    "builder": {
      "const": "@angular-devkit/build-angular:extract-i18n"
    },
    "defaultConfiguration": {
      "type": "string",
      "description": "A default named configuration to use when a target configuration is not provided."
    },
    "options": {
      "$ref": "...builders/extract-i18n/schema.json"
    },
    "configurations": {
      "type": "object",
      "additionalProperties": {
        "$ref": "...builders/extract-i18n/schema.json"
      }
    }
  }
}
```

### oneOf[5]

#### keys

<!-- prettier-ignore-start -->
```js
'type', 
'additionalProperties', 
'properties' 
```
<!-- prettier-ignore-end -->

#### values

```json
{
  "type": "object",
  "additionalProperties": false,
  "properties": {
    "builder": { "const": "@angular-devkit/build-angular:karma" },
    "defaultConfiguration": {
      "type": "string",
      "description": "A default named configuration to use when a target configuration is not provided."
    },
    "options": {
      "$ref": "...builders/karma/schema.json"
    },
    "configurations": {
      "type": "object",
      "additionalProperties": {
        "$ref": "...builders/karma/schema.json"
      }
    }
  }
}
```

### oneOf[6]

#### keys

<!-- prettier-ignore-start -->
```js
'type', 
'additionalProperties', 
'properties' 
```
<!-- prettier-ignore-end -->

#### values

```json
{
  "type": "object",
  "additionalProperties": false,
  "properties": {
    "builder": {
      "const": "@angular-devkit/build-angular:protractor"
    },
    "defaultConfiguration": {
      "type": "string",
      "description": "A default named configuration to use when a target configuration is not provided."
    },
    "options": {
      "$ref": "...builders/protractor/schema.json"
    },
    "configurations": {
      "type": "object",
      "additionalProperties": {
        "$ref": "...builders/protractor/schema.json"
      }
    }
  }
}
```

### oneOf[7]

#### keys

<!-- prettier-ignore-start -->
```js
'type', 
'additionalProperties', 
'properties' 
```
<!-- prettier-ignore-end -->

#### values

```json
{
  "type": "object",
  "additionalProperties": false,
  "properties": {
    "builder": { "const": "@angular-devkit/build-angular:server" },
    "defaultConfiguration": {
      "type": "string",
      "description": "A default named configuration to use when a target configuration is not provided."
    },
    "options": {
      "$ref": "...builders/server/schema.json"
    },
    "configurations": {
      "type": "object",
      "additionalProperties": {
        "$ref": "...builders/server/schema.json"
      }
    }
  }
}
```

### oneOf[8]

#### keys

<!-- prettier-ignore-start -->
```js
'type', 
'additionalProperties', 
'properties' 
```
<!-- prettier-ignore-end -->

#### values

```json
{
  "type": "object",
  "additionalProperties": false,
  "properties": {
    "builder": {
      "const": "@angular-devkit/build-angular:ng-packagr"
    },
    "defaultConfiguration": {
      "type": "string",
      "description": "A default named configuration to use when a target configuration is not provided."
    },
    "options": {
      "$ref": "../../../../angular_devkit/build_angular/src/builders/ng-packagr/schema.json"
    },
    "configurations": {
      "type": "object",
      "additionalProperties": {
        "$ref": "../../../../angular_devkit/build_angular/src/builders/ng-packagr/schema.json"
      }
    }
  }
}
```

## Result of analysis -> definitions.project.definitions.target.oneOf

Common Structure (not all of them are always present):

```json
["$comment", "type", "properties", "additionalProperties", "required"]
```

Only first one has a **$comment** property with value: 'Extendable target with custom builder'.
Only first one has a **required** property with value `[ 'builder' ]`.
Every **type** value is `'object'` and its type is string.
Every **additionalProperties** has value `false`.

### definitions.project.definitions.target.oneOf.properties.keys

- All of them has the same key due to defined schema

'builder', 'defaultConfiguration', 'options', 'configurations'.

### definitions.project.definitions.target.oneOf.properties.builder

```json
{
  "0": {
    "type": "string",
    "description": "The builder used for this package.",
    "not": {
      "enum": [
        "@angular-devkit/build-angular:app-shell",
        "@angular-devkit/build-angular:browser",
        "@angular-devkit/build-angular:dev-server",
        "@angular-devkit/build-angular:extract-i18n",
        "@angular-devkit/build-angular:karma",
        "@angular-devkit/build-angular:protractor",
        "@angular-devkit/build-angular:server",
        "@angular-devkit/build-angular:ng-packagr"
      ]
    }
  },
  "1": { "const": "@angular-devkit/build-angular:app-shell" },
  "2": { "const": "@angular-devkit/build-angular:browser" },
  "3": { "const": "@angular-devkit/build-angular:dev-server" },
  "4": { "const": "@angular-devkit/build-angular:extract-i18n" },
  "5": { "const": "@angular-devkit/build-angular:karma" },
  "6": { "const": "@angular-devkit/build-angular:protractor" },
  "7": { "const": "@angular-devkit/build-angular:server" },
  "8": { "const": "@angular-devkit/build-angular:ng-packagr" }
}
```

### definitions.project.definitions.target.oneOf.properties.defaultConfiguration

Same structure in each one:

```json
{
  "type": "string",
  "description": "A default named configuration to use when a target configuration is not provided."
}
```

### definitions.project.definitions.target.oneOf.properties.options

Paths simplified: `../../../../angular_devkit/build_angular/src/builders/...`

```json
{
  "0": { "type": "object" },
  "1": { "$ref": "...builders/app-shell/schema.json" },
  "2": { "$ref": "...builders/browser/schema.json" },
  "3": { "$ref": "...builders/dev-server/schema.json" },
  "4": { "$ref": "...builders/extract-i18n/schema.json" ,
  "5": { "$ref": "...builders/karma/schema.json" },
  "6": { "$ref": "...builders/protractor/schema.json" },
  "7": { "$ref": "...builders/server/schema.json" },
  "8": { "$ref": "...builders/ng-packagr/schema.json" }
}
```

### definitions.project.definitions.target.oneOf.configurations

Same like above, only three of them and so on,..

```json
{
  "0": {
    "type": "object",
    "description": "A map of alternative target options.",
    "additionalProperties": { "type": "object" }
  },
  "1": {
    "type": "object",
    "additionalProperties": {
      "$ref": "...builders/app-shell/schema.json"
    }
  },
  "2": {
    "type": "object",
    "additionalProperties": {
      "$ref": "...builders/browser/schema.json"
    }
  },
  "8": {
    "type": "object",
    "additionalProperties": {
      "$ref": "...builders/ng-packagr/schema.json"
    }
  }
}
```

## Angular Schemas - builders

### app-shell

```json
{
  "$schema": "http://json-schema.org/draft-07/schema",
  "title": "App Shell Target",
  "description": "App Shell target options for Build Facade.",
  "type": "object",
  "properties": {
    "browserTarget": {
      "type": "string",
      "description": "A browser builder target use for rendering the app shell in the format of `project:target[:configuration]`. You can also pass in more than one configuration name as a comma-separated list. Example: `project:target:production,staging`.",
      "pattern": "^[^:\\s]+:[^:\\s]+(:[^\\s]+)?$"
    },
    "serverTarget": {
      "type": "string",
      "description": "A server builder target use for rendering the app shell in the format of `project:target[:configuration]`. You can also pass in more than one configuration name as a comma-separated list. Example: `project:target:production,staging`.",
      "pattern": "^[^:\\s]+:[^:\\s]+(:[^\\s]+)?$"
    },
    "appModuleBundle": {
      "type": "string",
      "description": "Script that exports the Server AppModule to render. This should be the main JavaScript outputted by the server target. By default we will resolve the outputPath of the serverTarget and find a bundle named 'main' in it (whether or not there's a hash tag)."
    },
    "route": {
      "type": "string",
      "description": "The route to render.",
      "default": "/"
    },
    "inputIndexPath": {
      "type": "string",
      "description": "The input path for the index.html file. By default uses the output index.html of the browser target."
    },
    "outputIndexPath": {
      "type": "string",
      "description": "The output path of the index.html file. By default will overwrite the input file."
    }
  },
  "additionalProperties": false,
  "required": ["browserTarget", "serverTarget"]
}
```

### browser

```json
{
  "$schema": "http://json-schema.org/draft-07/schema",
  "title": "Webpack browser schema for Build Facade.",
  "description": "Browser target options",
  "type": "object",
  "properties": {
    "assets": {
      "type": "array",
      "description": "List of static application assets.",
      "default": [],
      "items": {
        "$ref": "#/definitions/assetPattern"
      }
    },
    "main": {
      "type": "string",
      "description": "The full path for the main entry point to the app, relative to the current workspace."
    },
    "polyfills": {
      "type": "string",
      "description": "The full path for the polyfills file, relative to the current workspace."
    },
    "tsConfig": {
      "type": "string",
      "description": "The full path for the TypeScript configuration file, relative to the current workspace."
    },
    "scripts": {
      "description": "Global scripts to be included in the build.",
      "type": "array",
      "default": [],
      "items": {
        "$ref": "#/definitions/extraEntryPoint"
      }
    },
    "styles": {
      "description": "Global styles to be included in the build.",
      "type": "array",
      "default": [],
      "items": {
        "$ref": "#/definitions/extraEntryPoint"
      }
    },
    "inlineStyleLanguage": {
      "description": "The stylesheet language to use for the application's inline component styles.",
      "type": "string",
      "default": "css",
      "enum": ["css", "less", "sass", "scss"]
    },
    "stylePreprocessorOptions": {
      "description": "Options to pass to style preprocessors.",
      "type": "object",
      "properties": {
        "includePaths": {
          "description": "Paths to include. Paths will be resolved to workspace root.",
          "type": "array",
          "items": {
            "type": "string"
          },
          "default": []
        }
      },
      "additionalProperties": false
    },
    "optimization": {
      "description": "Enables optimization of the build output. Including minification of scripts and styles, tree-shaking, dead-code elimination, inlining of critical CSS and fonts inlining. For more information, see https://angular.io/guide/workspace-config#optimization-configuration.",
      "x-user-analytics": 16,
      "default": true,
      "oneOf": [
        {
          "type": "object",
          "properties": {
            "scripts": {
              "type": "boolean",
              "description": "Enables optimization of the scripts output.",
              "default": true
            },
            "styles": {
              "description": "Enables optimization of the styles output.",
              "default": true,
              "oneOf": [
                {
                  "type": "object",
                  "properties": {
                    "minify": {
                      "type": "boolean",
                      "description": "Minify CSS definitions by removing extraneous whitespace and comments, merging identifiers and minimizing values.",
                      "default": true
                    },
                    "inlineCritical": {
                      "type": "boolean",
                      "description": "Extract and inline critical CSS definitions to improve first paint time.",
                      "default": true
                    }
                  },
                  "additionalProperties": false
                },
                {
                  "type": "boolean"
                }
              ]
            },
            "fonts": {
              "description": "Enables optimization for fonts. This option requires internet access. `HTTPS_PROXY` environment variable can be used to specify a proxy server.",
              "default": true,
              "oneOf": [
                {
                  "type": "object",
                  "properties": {
                    "inline": {
                      "type": "boolean",
                      "description": "Reduce render blocking requests by inlining external Google Fonts and Adobe Fonts CSS definitions in the application's HTML index file. This option requires internet access. `HTTPS_PROXY` environment variable can be used to specify a proxy server.",
                      "default": true
                    }
                  },
                  "additionalProperties": false
                },
                {
                  "type": "boolean"
                }
              ]
            }
          },
          "additionalProperties": false
        },
        {
          "type": "boolean"
        }
      ]
    },
    "fileReplacements": {
      "description": "Replace compilation source files with other compilation source files in the build.",
      "type": "array",
      "items": {
        "$ref": "#/definitions/fileReplacement"
      },
      "default": []
    },
    "outputPath": {
      "type": "string",
      "description": "The full path for the new output directory, relative to the current workspace.\n\nBy default, writes output to a folder named dist/ in the current project."
    },
    "resourcesOutputPath": {
      "type": "string",
      "description": "The path where style resources will be placed, relative to outputPath.",
      "default": ""
    },
    "aot": {
      "type": "boolean",
      "description": "Build using Ahead of Time compilation.",
      "x-user-analytics": 13,
      "default": true
    },
    "sourceMap": {
      "description": "Output source maps for scripts and styles. For more information, see https://angular.io/guide/workspace-config#source-map-configuration.",
      "default": false,
      "oneOf": [
        {
          "type": "object",
          "properties": {
            "scripts": {
              "type": "boolean",
              "description": "Output source maps for all scripts.",
              "default": true
            },
            "styles": {
              "type": "boolean",
              "description": "Output source maps for all styles.",
              "default": true
            },
            "hidden": {
              "type": "boolean",
              "description": "Output source maps used for error reporting tools.",
              "default": false
            },
            "vendor": {
              "type": "boolean",
              "description": "Resolve vendor packages source maps.",
              "default": false
            }
          },
          "additionalProperties": false
        },
        {
          "type": "boolean"
        }
      ]
    },
    "vendorChunk": {
      "type": "boolean",
      "description": "Generate a seperate bundle containing only vendor libraries. This option should only used for development.",
      "default": false
    },
    "commonChunk": {
      "type": "boolean",
      "description": "Generate a seperate bundle containing code used across multiple bundles.",
      "default": true
    },
    "baseHref": {
      "type": "string",
      "description": "Base url for the application being built."
    },
    "deployUrl": {
      "type": "string",
      "description": "URL where files will be deployed.",
      "x-deprecated": "Use \"baseHref\" option, \"APP_BASE_HREF\" DI token or a combination of both instead. For more information, see https://angular.io/guide/deployment#the-deploy-url."
    },
    "verbose": {
      "type": "boolean",
      "description": "Adds more details to output logging.",
      "default": false
    },
    "progress": {
      "type": "boolean",
      "description": "Log progress to the console while building.",
      "default": true
    },
    "i18nMissingTranslation": {
      "type": "string",
      "description": "How to handle missing translations for i18n.",
      "enum": ["warning", "error", "ignore"],
      "default": "warning"
    },
    "localize": {
      "description": "Translate the bundles in one or more locales.",
      "oneOf": [
        {
          "type": "boolean",
          "description": "Translate all locales."
        },
        {
          "type": "array",
          "description": "List of locales ID's to translate.",
          "minItems": 1,
          "items": {
            "type": "string",
            "pattern": "^[a-zA-Z]{2,3}(-[a-zA-Z]{4})?(-([a-zA-Z]{2}|[0-9]{3}))?(-[a-zA-Z]{5,8})?(-x(-[a-zA-Z0-9]{1,8})+)?$"
          }
        }
      ]
    },
    "watch": {
      "type": "boolean",
      "description": "Run build when files change.",
      "default": false
    },
    "outputHashing": {
      "type": "string",
      "description": "Define the output filename cache-busting hashing mode.",
      "default": "none",
      "enum": ["none", "all", "media", "bundles"]
    },
    "poll": {
      "type": "number",
      "description": "Enable and define the file watching poll time period in milliseconds."
    },
    "deleteOutputPath": {
      "type": "boolean",
      "description": "Delete the output path before building.",
      "default": true
    },
    "preserveSymlinks": {
      "type": "boolean",
      "description": "Do not use the real path when resolving modules. If unset then will default to `true` if NodeJS option --preserve-symlinks is set."
    },
    "extractLicenses": {
      "type": "boolean",
      "description": "Extract all licenses in a separate file.",
      "default": true
    },
    "showCircularDependencies": {
      "type": "boolean",
      "description": "Show circular dependency warnings on builds.",
      "default": false,
      "x-deprecated": "The recommended method to detect circular dependencies in project code is to use either a lint rule or other external tooling."
    },
    "buildOptimizer": {
      "type": "boolean",
      "description": "Enables '@angular-devkit/build-optimizer' optimizations when using the 'aot' option.",
      "default": true
    },
    "namedChunks": {
      "type": "boolean",
      "description": "Use file name for lazy loaded chunks.",
      "default": false
    },
    "subresourceIntegrity": {
      "type": "boolean",
      "description": "Enables the use of subresource integrity validation.",
      "default": false
    },
    "serviceWorker": {
      "type": "boolean",
      "description": "Generates a service worker config for production builds.",
      "default": false
    },
    "ngswConfigPath": {
      "type": "string",
      "description": "Path to ngsw-config.json."
    },
    "index": {
      "description": "Configures the generation of the application's HTML index.",
      "oneOf": [
        {
          "type": "string",
          "description": "The path of a file to use for the application's HTML index. The filename of the specified path will be used for the generated file and will be created in the root of the application's configured output path."
        },
        {
          "type": "object",
          "description": "",
          "properties": {
            "input": {
              "type": "string",
              "minLength": 1,
              "description": "The path of a file to use for the application's generated HTML index."
            },
            "output": {
              "type": "string",
              "minLength": 1,
              "default": "index.html",
              "description": "The output path of the application's generated HTML index file. The full provided path will be used and will be considered relative to the application's configured output path."
            }
          },
          "required": ["input"]
        }
      ]
    },
    "statsJson": {
      "type": "boolean",
      "description": "Generates a 'stats.json' file which can be analyzed using tools such as 'webpack-bundle-analyzer'.",
      "default": false
    },
    "budgets": {
      "description": "Budget thresholds to ensure parts of your application stay within boundaries which you set.",
      "type": "array",
      "items": {
        "$ref": "#/definitions/budget"
      },
      "default": []
    },
    "webWorkerTsConfig": {
      "type": "string",
      "description": "TypeScript configuration for Web Worker modules."
    },
    "crossOrigin": {
      "type": "string",
      "description": "Define the crossorigin attribute setting of elements that provide CORS support.",
      "default": "none",
      "enum": ["none", "anonymous", "use-credentials"]
    },
    "allowedCommonJsDependencies": {
      "description": "A list of CommonJS packages that are allowed to be used without a build time warning.",
      "type": "array",
      "items": {
        "type": "string"
      },
      "default": []
    }
  },
  "additionalProperties": false,
  "required": ["outputPath", "index", "main", "tsConfig"],
  "definitions": {
    "assetPattern": {
      "oneOf": [
        {
          "type": "object",
          "properties": {
            "followSymlinks": {
              "type": "boolean",
              "default": false,
              "description": "Allow glob patterns to follow symlink directories. This allows subdirectories of the symlink to be searched."
            },
            "glob": {
              "type": "string",
              "description": "The pattern to match."
            },
            "input": {
              "type": "string",
              "description": "The input directory path in which to apply 'glob'. Defaults to the project root."
            },
            "ignore": {
              "description": "An array of globs to ignore.",
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "output": {
              "type": "string",
              "description": "Absolute path within the output."
            }
          },
          "additionalProperties": false,
          "required": ["glob", "input", "output"]
        },
        {
          "type": "string"
        }
      ]
    },
    "fileReplacement": {
      "oneOf": [
        {
          "type": "object",
          "properties": {
            "src": {
              "type": "string",
              "pattern": "\\.(([cm]?j|t)sx?|json)$"
            },
            "replaceWith": {
              "type": "string",
              "pattern": "\\.(([cm]?j|t)sx?|json)$"
            }
          },
          "additionalProperties": false,
          "required": ["src", "replaceWith"]
        },
        {
          "type": "object",
          "properties": {
            "replace": {
              "type": "string",
              "pattern": "\\.(([cm]?j|t)sx?|json)$"
            },
            "with": {
              "type": "string",
              "pattern": "\\.(([cm]?j|t)sx?|json)$"
            }
          },
          "additionalProperties": false,
          "required": ["replace", "with"]
        }
      ]
    },
    "extraEntryPoint": {
      "oneOf": [
        {
          "type": "object",
          "properties": {
            "input": {
              "type": "string",
              "description": "The file to include."
            },
            "bundleName": {
              "type": "string",
              "pattern": "^[\\w\\-.]*$",
              "description": "The bundle name for this extra entry point."
            },
            "inject": {
              "type": "boolean",
              "description": "If the bundle will be referenced in the HTML file.",
              "default": true
            }
          },
          "additionalProperties": false,
          "required": ["input"]
        },
        {
          "type": "string",
          "description": "The file to include."
        }
      ]
    },
    "budget": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string",
          "description": "The type of budget.",
          "enum": [
            "all",
            "allScript",
            "any",
            "anyScript",
            "anyComponentStyle",
            "bundle",
            "initial"
          ]
        },
        "name": {
          "type": "string",
          "description": "The name of the bundle."
        },
        "baseline": {
          "type": "string",
          "description": "The baseline size for comparison."
        },
        "maximumWarning": {
          "type": "string",
          "description": "The maximum threshold for warning relative to the baseline."
        },
        "maximumError": {
          "type": "string",
          "description": "The maximum threshold for error relative to the baseline."
        },
        "minimumWarning": {
          "type": "string",
          "description": "The minimum threshold for warning relative to the baseline."
        },
        "minimumError": {
          "type": "string",
          "description": "The minimum threshold for error relative to the baseline."
        },
        "warning": {
          "type": "string",
          "description": "The threshold for warning relative to the baseline (min & max)."
        },
        "error": {
          "type": "string",
          "description": "The threshold for error relative to the baseline (min & max)."
        }
      },
      "additionalProperties": false,
      "required": ["type"]
    }
  }
}
```

### dev-server

```json
{
  "$schema": "http://json-schema.org/draft-07/schema",
  "title": "Dev Server Target",
  "description": "Dev Server target options for Build Facade.",
  "type": "object",
  "properties": {
    "browserTarget": {
      "type": "string",
      "description": "A browser builder target to serve in the format of `project:target[:configuration]`. You can also pass in more than one configuration name as a comma-separated list. Example: `project:target:production,staging`.",
      "pattern": "^[^:\\s]+:[^:\\s]+(:[^\\s]+)?$"
    },
    "port": {
      "type": "number",
      "description": "Port to listen on.",
      "default": 4200
    },
    "host": {
      "type": "string",
      "description": "Host to listen on.",
      "default": "localhost"
    },
    "proxyConfig": {
      "type": "string",
      "description": "Proxy configuration file. For more information, see https://angular.io/guide/build#proxying-to-a-backend-server."
    },
    "ssl": {
      "type": "boolean",
      "description": "Serve using HTTPS.",
      "default": false
    },
    "sslKey": {
      "type": "string",
      "description": "SSL key to use for serving HTTPS."
    },
    "sslCert": {
      "type": "string",
      "description": "SSL certificate to use for serving HTTPS."
    },
    "headers": {
      "type": "object",
      "description": "Custom HTTP headers to be added to all responses.",
      "propertyNames": {
        "pattern": "^[-_A-Za-z0-9]+$"
      },
      "additionalProperties": {
        "type": "string"
      }
    },
    "open": {
      "type": "boolean",
      "description": "Opens the url in default browser.",
      "default": false,
      "alias": "o"
    },
    "verbose": {
      "type": "boolean",
      "description": "Adds more details to output logging."
    },
    "liveReload": {
      "type": "boolean",
      "description": "Whether to reload the page on change, using live-reload.",
      "default": true
    },
    "publicHost": {
      "type": "string",
      "description": "The URL that the browser client (or live-reload client, if enabled) should use to connect to the development server. Use for a complex dev server setup, such as one with reverse proxies."
    },
    "allowedHosts": {
      "type": "array",
      "description": "List of hosts that are allowed to access the dev server.",
      "default": [],
      "items": {
        "type": "string"
      }
    },
    "servePath": {
      "type": "string",
      "description": "The pathname where the app will be served."
    },
    "disableHostCheck": {
      "type": "boolean",
      "description": "Don't verify connected clients are part of allowed hosts.",
      "default": false
    },
    "hmr": {
      "type": "boolean",
      "description": "Enable hot module replacement.",
      "default": false
    },
    "watch": {
      "type": "boolean",
      "description": "Rebuild on change.",
      "default": true
    },
    "optimization": {
      "description": "Enables optimization of the build output. Including minification of scripts and styles, tree-shaking, dead-code elimination, tree-shaking and fonts inlining. For more information, see https://angular.io/guide/workspace-config#optimization-configuration.",
      "x-user-analytics": 16,
      "oneOf": [
        {
          "type": "object",
          "properties": {
            "scripts": {
              "type": "boolean",
              "description": "Enables optimization of the scripts output.",
              "default": true
            },
            "styles": {
              "type": "boolean",
              "description": "Enables optimization of the styles output.",
              "default": true
            }
          },
          "additionalProperties": false
        },
        {
          "type": "boolean"
        }
      ],
      "x-deprecated": "Use the \"optimization\" option in the browser builder instead."
    },
    "aot": {
      "type": "boolean",
      "description": "Build using Ahead of Time compilation.",
      "x-user-analytics": 13,
      "x-deprecated": "Use the \"aot\" option in the browser builder instead."
    },
    "sourceMap": {
      "description": "Output source maps for scripts and styles. For more information, see https://angular.io/guide/workspace-config#source-map-configuration.",
      "oneOf": [
        {
          "type": "object",
          "properties": {
            "scripts": {
              "type": "boolean",
              "description": "Output source maps for all scripts.",
              "default": true
            },
            "styles": {
              "type": "boolean",
              "description": "Output source maps for all styles.",
              "default": true
            },
            "hidden": {
              "type": "boolean",
              "description": "Output source maps used for error reporting tools.",
              "default": false
            },
            "vendor": {
              "type": "boolean",
              "description": "Resolve vendor packages source maps.",
              "default": false
            }
          },
          "additionalProperties": false
        },
        {
          "type": "boolean"
        }
      ],
      "x-deprecated": "Use the \"sourceMap\" option in the browser builder instead."
    },
    "vendorChunk": {
      "type": "boolean",
      "description": "Generate a seperate bundle containing only vendor libraries. This option should only used for development.",
      "x-deprecated": "Use the \"vendorChunk\" option in the browser builder instead."
    },
    "commonChunk": {
      "type": "boolean",
      "description": "Generate a seperate bundle containing code used across multiple bundles.",
      "x-deprecated": "Use the \"commonChunk\" option in the browser builder instead."
    },
    "baseHref": {
      "type": "string",
      "description": "Base url for the application being built.",
      "x-deprecated": "Use the \"baseHref\" option in the browser builder instead."
    },
    "deployUrl": {
      "type": "string",
      "description": "URL where files will be deployed.",
      "x-deprecated": "Use the \"deployUrl\" option in the browser builder instead."
    },
    "progress": {
      "type": "boolean",
      "description": "Log progress to the console while building.",
      "x-deprecated": "Use the \"progress\" option in the browser builder instead."
    },
    "poll": {
      "type": "number",
      "description": "Enable and define the file watching poll time period in milliseconds."
    }
  },
  "additionalProperties": false,
  "required": ["browserTarget"]
}
```

### extract-i18n

```json
{
  "$schema": "http://json-schema.org/draft-07/schema",
  "title": "Extract i18n Target",
  "description": "Extract i18n target options for Build Facade.",
  "type": "object",
  "properties": {
    "browserTarget": {
      "type": "string",
      "description": "A browser builder target to extract i18n messages in the format of `project:target[:configuration]`. You can also pass in more than one configuration name as a comma-separated list. Example: `project:target:production,staging`.",
      "pattern": "^[^:\\s]+:[^:\\s]+(:[^\\s]+)?$"
    },
    "format": {
      "type": "string",
      "description": "Output format for the generated file.",
      "default": "xlf",
      "enum": [
        "xmb",
        "xlf",
        "xlif",
        "xliff",
        "xlf2",
        "xliff2",
        "json",
        "arb",
        "legacy-migrate"
      ]
    },
    "progress": {
      "type": "boolean",
      "description": "Log progress to the console.",
      "default": true
    },
    "outputPath": {
      "type": "string",
      "description": "Path where output will be placed."
    },
    "outFile": {
      "type": "string",
      "description": "Name of the file to output."
    }
  },
  "additionalProperties": false,
  "required": ["browserTarget"]
}
```

### karma

```json
{
  "$schema": "http://json-schema.org/draft-07/schema",
  "title": "Karma Target",
  "description": "Karma target options for Build Facade.",
  "type": "object",
  "properties": {
    "main": {
      "type": "string",
      "description": "The name of the main entry-point file."
    },
    "tsConfig": {
      "type": "string",
      "description": "The name of the TypeScript configuration file."
    },
    "karmaConfig": {
      "type": "string",
      "description": "The name of the Karma configuration file."
    },
    "polyfills": {
      "type": "string",
      "description": "The name of the polyfills file."
    },
    "assets": {
      "type": "array",
      "description": "List of static application assets.",
      "default": [],
      "items": {
        "$ref": "#/definitions/assetPattern"
      }
    },
    "scripts": {
      "description": "Global scripts to be included in the build.",
      "type": "array",
      "default": [],
      "items": {
        "$ref": "#/definitions/extraEntryPoint"
      }
    },
    "styles": {
      "description": "Global styles to be included in the build.",
      "type": "array",
      "default": [],
      "items": {
        "$ref": "#/definitions/extraEntryPoint"
      }
    },
    "inlineStyleLanguage": {
      "description": "The stylesheet language to use for the application's inline component styles.",
      "type": "string",
      "default": "css",
      "enum": ["css", "less", "sass", "scss"]
    },
    "stylePreprocessorOptions": {
      "description": "Options to pass to style preprocessors",
      "type": "object",
      "properties": {
        "includePaths": {
          "description": "Paths to include. Paths will be resolved to workspace root.",
          "type": "array",
          "items": {
            "type": "string"
          },
          "default": []
        }
      },
      "additionalProperties": false
    },
    "include": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "Globs of files to include, relative to workspace or project root. \nThere are 2 special cases:\n - when a path to directory is provided, all spec files ending \".spec.@(ts|tsx)\" will be included\n - when a path to a file is provided, and a matching spec file exists it will be included instead"
    },
    "sourceMap": {
      "description": "Output source maps for scripts and styles. For more information, see https://angular.io/guide/workspace-config#source-map-configuration.",
      "default": true,
      "oneOf": [
        {
          "type": "object",
          "properties": {
            "scripts": {
              "type": "boolean",
              "description": "Output source maps for all scripts.",
              "default": true
            },
            "styles": {
              "type": "boolean",
              "description": "Output source maps for all styles.",
              "default": true
            },
            "vendor": {
              "type": "boolean",
              "description": "Resolve vendor packages source maps.",
              "default": false
            }
          },
          "additionalProperties": false
        },
        {
          "type": "boolean"
        }
      ]
    },
    "progress": {
      "type": "boolean",
      "description": "Log progress to the console while building.",
      "default": true
    },
    "watch": {
      "type": "boolean",
      "description": "Run build when files change."
    },
    "poll": {
      "type": "number",
      "description": "Enable and define the file watching poll time period in milliseconds."
    },
    "preserveSymlinks": {
      "type": "boolean",
      "description": "Do not use the real path when resolving modules. If unset then will default to `true` if NodeJS option --preserve-symlinks is set."
    },
    "browsers": {
      "type": "string",
      "description": "Override which browsers tests are run against."
    },
    "codeCoverage": {
      "type": "boolean",
      "description": "Output a code coverage report.",
      "default": false
    },
    "codeCoverageExclude": {
      "type": "array",
      "description": "Globs to exclude from code coverage.",
      "items": {
        "type": "string"
      },
      "default": []
    },
    "fileReplacements": {
      "description": "Replace compilation source files with other compilation source files in the build.",
      "type": "array",
      "items": {
        "oneOf": [
          {
            "type": "object",
            "properties": {
              "src": {
                "type": "string"
              },
              "replaceWith": {
                "type": "string"
              }
            },
            "additionalProperties": false,
            "required": ["src", "replaceWith"]
          },
          {
            "type": "object",
            "properties": {
              "replace": {
                "type": "string"
              },
              "with": {
                "type": "string"
              }
            },
            "additionalProperties": false,
            "required": ["replace", "with"]
          }
        ]
      },
      "default": []
    },
    "reporters": {
      "type": "array",
      "description": "Karma reporters to use. Directly passed to the karma runner.",
      "items": {
        "type": "string"
      }
    },
    "webWorkerTsConfig": {
      "type": "string",
      "description": "TypeScript configuration for Web Worker modules."
    }
  },
  "additionalProperties": false,
  "required": ["main", "tsConfig", "karmaConfig"],
  "definitions": {
    "assetPattern": {
      "oneOf": [
        {
          "type": "object",
          "properties": {
            "glob": {
              "type": "string",
              "description": "The pattern to match."
            },
            "input": {
              "type": "string",
              "description": "The input directory path in which to apply 'glob'. Defaults to the project root."
            },
            "output": {
              "type": "string",
              "description": "Absolute path within the output."
            },
            "ignore": {
              "description": "An array of globs to ignore.",
              "type": "array",
              "items": {
                "type": "string"
              }
            }
          },
          "additionalProperties": false,
          "required": ["glob", "input", "output"]
        },
        {
          "type": "string"
        }
      ]
    },
    "extraEntryPoint": {
      "oneOf": [
        {
          "type": "object",
          "properties": {
            "input": {
              "type": "string",
              "description": "The file to include."
            },
            "bundleName": {
              "type": "string",
              "pattern": "^[\\w\\-.]*$",
              "description": "The bundle name for this extra entry point."
            },
            "inject": {
              "type": "boolean",
              "description": "If the bundle will be referenced in the HTML file.",
              "default": true
            }
          },
          "additionalProperties": false,
          "required": ["input"]
        },
        {
          "type": "string",
          "description": "The file to include."
        }
      ]
    }
  }
}
```

### protractor

```json
{
  "$schema": "http://json-schema.org/draft-07/schema",
  "title": "Protractor Target",
  "description": "Protractor target options for Build Facade.",
  "type": "object",
  "properties": {
    "protractorConfig": {
      "type": "string",
      "description": "The name of the Protractor configuration file."
    },
    "devServerTarget": {
      "type": "string",
      "description": "A dev-server builder target to run tests against in the format of `project:target[:configuration]`. You can also pass in more than one configuration name as a comma-separated list. Example: `project:target:production,staging`.",
      "pattern": "^([^:\\s]+:[^:\\s]+(:[^\\s]+)?)?$"
    },
    "grep": {
      "type": "string",
      "description": "Execute specs whose names match the pattern, which is internally compiled to a RegExp."
    },
    "invertGrep": {
      "type": "boolean",
      "description": "Invert the selection specified by the 'grep' option.",
      "default": false
    },
    "specs": {
      "type": "array",
      "description": "Override specs in the protractor config.",
      "default": [],
      "items": {
        "type": "string",
        "description": "Spec name."
      }
    },
    "suite": {
      "type": "string",
      "description": "Override suite in the protractor config."
    },
    "webdriverUpdate": {
      "type": "boolean",
      "description": "Try to update webdriver.",
      "default": true
    },
    "port": {
      "type": "number",
      "description": "The port to use to serve the application."
    },
    "host": {
      "type": "string",
      "description": "Host to listen on."
    },
    "baseUrl": {
      "type": "string",
      "description": "Base URL for protractor to connect to."
    }
  },
  "additionalProperties": false,
  "required": ["protractorConfig"]
}
```

### server

```json
{
  "$schema": "http://json-schema.org/draft-07/schema",
  "$id": "BuildAngularWebpackServerSchema",
  "title": "Universal Target",
  "type": "object",
  "properties": {
    "main": {
      "type": "string",
      "description": "The name of the main entry-point file."
    },
    "tsConfig": {
      "type": "string",
      "default": "tsconfig.app.json",
      "description": "The name of the TypeScript configuration file."
    },
    "inlineStyleLanguage": {
      "description": "The stylesheet language to use for the application's inline component styles.",
      "type": "string",
      "default": "css",
      "enum": ["css", "less", "sass", "scss"]
    },
    "stylePreprocessorOptions": {
      "description": "Options to pass to style preprocessors",
      "type": "object",
      "properties": {
        "includePaths": {
          "description": "Paths to include. Paths will be resolved to workspace root.",
          "type": "array",
          "items": {
            "type": "string"
          },
          "default": []
        }
      },
      "additionalProperties": false
    },
    "optimization": {
      "description": "Enables optimization of the build output. Including minification of scripts and styles, tree-shaking and dead-code elimination. For more information, see https://angular.io/guide/workspace-config#optimization-configuration.",
      "x-user-analytics": 16,
      "default": true,
      "oneOf": [
        {
          "type": "object",
          "properties": {
            "scripts": {
              "type": "boolean",
              "description": "Enables optimization of the scripts output.",
              "default": true
            },
            "styles": {
              "type": "boolean",
              "description": "Enables optimization of the styles output.",
              "default": true
            }
          },
          "additionalProperties": false
        },
        {
          "type": "boolean"
        }
      ]
    },
    "fileReplacements": {
      "description": "Replace compilation source files with other compilation source files in the build.",
      "type": "array",
      "items": {
        "$ref": "#/definitions/fileReplacement"
      },
      "default": []
    },
    "outputPath": {
      "type": "string",
      "description": "Path where output will be placed."
    },
    "resourcesOutputPath": {
      "type": "string",
      "description": "The path where style resources will be placed, relative to outputPath.",
      "default": ""
    },
    "sourceMap": {
      "description": "Output source maps for scripts and styles. For more information, see https://angular.io/guide/workspace-config#source-map-configuration.",
      "default": false,
      "oneOf": [
        {
          "type": "object",
          "properties": {
            "scripts": {
              "type": "boolean",
              "description": "Output source maps for all scripts.",
              "default": true
            },
            "styles": {
              "type": "boolean",
              "description": "Output source maps for all styles.",
              "default": true
            },
            "hidden": {
              "type": "boolean",
              "description": "Output source maps used for error reporting tools.",
              "default": false
            },
            "vendor": {
              "type": "boolean",
              "description": "Resolve vendor packages source maps.",
              "default": false
            }
          },
          "additionalProperties": false
        },
        {
          "type": "boolean"
        }
      ]
    },
    "deployUrl": {
      "type": "string",
      "description": "URL where files will be deployed.",
      "x-deprecated": "Use \"baseHref\" browser builder option, \"APP_BASE_HREF\" DI token or a combination of both instead. For more information, see https://angular.io/guide/deployment#the-deploy-url."
    },
    "verbose": {
      "type": "boolean",
      "description": "Adds more details to output logging.",
      "default": false
    },
    "progress": {
      "type": "boolean",
      "description": "Log progress to the console while building.",
      "default": true
    },
    "i18nMissingTranslation": {
      "type": "string",
      "description": "How to handle missing translations for i18n.",
      "enum": ["warning", "error", "ignore"],
      "default": "warning"
    },
    "localize": {
      "description": "Translate the bundles in one or more locales.",
      "oneOf": [
        {
          "type": "boolean",
          "description": "Translate all locales."
        },
        {
          "type": "array",
          "description": "List of locales ID's to translate.",
          "minItems": 1,
          "items": {
            "type": "string",
            "pattern": "^[a-zA-Z]{2,3}(-[a-zA-Z]{4})?(-([a-zA-Z]{2}|[0-9]{3}))?(-[a-zA-Z]{5,8})?(-x(-[a-zA-Z0-9]{1,8})+)?$"
          }
        }
      ]
    },
    "outputHashing": {
      "type": "string",
      "description": "Define the output filename cache-busting hashing mode.",
      "default": "none",
      "enum": ["none", "all", "media", "bundles"]
    },
    "deleteOutputPath": {
      "type": "boolean",
      "description": "Delete the output path before building.",
      "default": true
    },
    "preserveSymlinks": {
      "type": "boolean",
      "description": "Do not use the real path when resolving modules. If unset then will default to `true` if NodeJS option --preserve-symlinks is set."
    },
    "extractLicenses": {
      "type": "boolean",
      "description": "Extract all licenses in a separate file, in the case of production builds only.",
      "default": true
    },
    "showCircularDependencies": {
      "type": "boolean",
      "description": "Show circular dependency warnings on builds.",
      "default": false,
      "x-deprecated": "The recommended method to detect circular dependencies in project code is to use either a lint rule or other external tooling."
    },
    "namedChunks": {
      "type": "boolean",
      "description": "Use file name for lazy loaded chunks.",
      "default": false
    },
    "bundleDependencies": {
      "description": "Which external dependencies to bundle into the bundle. By default, all of node_modules will be bundled.",
      "default": true,
      "oneOf": [
        {
          "type": "boolean"
        },
        {
          "type": "string",
          "enum": ["none", "all"]
        }
      ]
    },
    "externalDependencies": {
      "description": "Exclude the listed external dependencies from being bundled into the bundle. Instead, the created bundle relies on these dependencies to be available during runtime.",
      "type": "array",
      "items": {
        "type": "string"
      },
      "default": []
    },
    "statsJson": {
      "type": "boolean",
      "description": "Generates a 'stats.json' file which can be analyzed using tools such as 'webpack-bundle-analyzer'.",
      "default": false
    },
    "watch": {
      "type": "boolean",
      "description": "Run build when files change.",
      "default": false
    },
    "poll": {
      "type": "number",
      "description": "Enable and define the file watching poll time period in milliseconds."
    }
  },
  "additionalProperties": false,
  "required": ["outputPath", "main", "tsConfig"],
  "definitions": {
    "fileReplacement": {
      "oneOf": [
        {
          "type": "object",
          "properties": {
            "src": {
              "type": "string",
              "pattern": "\\.(([cm]?j|t)sx?|json)$"
            },
            "replaceWith": {
              "type": "string",
              "pattern": "\\.(([cm]?j|t)sx?|json)$"
            }
          },
          "additionalProperties": false,
          "required": ["src", "replaceWith"]
        },
        {
          "type": "object",
          "properties": {
            "replace": {
              "type": "string",
              "pattern": "\\.(([cm]?j|t)sx?|json)$"
            },
            "with": {
              "type": "string",
              "pattern": "\\.(([cm]?j|t)sx?|json)$"
            }
          },
          "additionalProperties": false,
          "required": ["replace", "with"]
        }
      ]
    }
  }
}
```

### ng-packagr

```json
{
  "$schema": "http://json-schema.org/draft-07/schema",
  "title": "ng-packagr Target",
  "description": "ng-packagr target options for Build Architect. Use to build library projects.",
  "type": "object",
  "properties": {
    "project": {
      "type": "string",
      "description": "The file path for the ng-packagr configuration file, relative to the current workspace."
    },
    "tsConfig": {
      "type": "string",
      "description": "The full path for the TypeScript configuration file, relative to the current workspace."
    },
    "watch": {
      "type": "boolean",
      "description": "Run build when files change.",
      "default": false
    }
  },
  "additionalProperties": false,
  "required": ["project"]
}
```

## Nx Generated Structure of `angular.json` (under construction)

### version

The configuration-file version.

### cli

#### defaultCollection

Example: `"defaultCollection": "@nrwl/angular"`,

#### packageManager

`"enum": ["npm", "cnpm", "yarn", "pnpm"]`

#### warnings

##### versionMismatch: true/false

Show a warning when the global version is newer than the local one.

#### analytics: boolean/string

Share anonymous usage data with the Angular Team at Google.

#### analyticsSharing

### schematics

More Information online: <https://angular.io/guide/glossary#schematic>

A set of schematics that customize the `ng generate` sub-command option defaults for this workspace.

- `'@schematics/angular:application'`,
- `'@schematics/angular:class'`,
- `'@schematics/angular:component'`,
- `'@schematics/angular:directive'`,
- `'@schematics/angular:enum'`,
- `'@schematics/angular:guard'`,
- `'@schematics/angular:interceptor'`,
- `'@schematics/angular:interface'`,
- `'@schematics/angular:library'`,
- `'@schematics/angular:pipe'`,
- `'@schematics/angular:ng-new'`,
- `'@schematics/angular:resolver'`,
- `'@schematics/angular:service'`,
- `'@schematics/angular:web-worker`'

### newProjectRoot

Path where new projects are created. Absolute or relative to the workspace folder.

### defaultProject

Default project name to use in commands, where not provided as an argument. When you use ng new to create a new application in a new workspace, that application is the default project for the workspace until you change it here.

### projects

An Objects of objects:

```js
"projects": {
  "my_app_name": {
    ...
  }
  ...
}
```

## Projects

These are the all available project-properties (re-check) at time of writing (fished out from source files):

- 'projectType', &#10004;
- 'root', &#10004;
- 'sourceRoot', &#10004;
- 'prefix', &#10004;
- 'schematics', &#10004;
- 'architect', &#10004;

### projectType

One of "**application**" or "**library**". An application can run independently in a browser, while a library cannot.

**Example:** `"projectType": "application"`

### root

The root folder for this project's files, relative to the workspace folder. Empty for the initial app, which resides at the top level of the workspace.

**Example:** `"root": "apps/my-app"`

### sourceRoot

The root folder for this project's source files.

**Example:** `"sourceRoot": "apps/my-app-name/src"`

### prefix

A string that Angular prepends to generated selectors. Can be customized to identify an application or feature area.

**Example:** `"prefix": "app"`

### schematics

### architect
