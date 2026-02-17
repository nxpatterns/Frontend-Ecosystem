# Angular.json (Workspace Configuration/Optimization)

> [See Raw-Details here](./Raw-Details.md)

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Angular.json (Workspace Configuration/Optimization)](#angularjson-workspace-configurationoptimization)
  - [Basic Structure](#basic-structure)
    - [Important Details](#important-details)
  - [`projects.project.architect` or `projects.project.targets`](#projectsprojectarchitect-or-projectsprojecttargets)
    - [build](#build)
      - [builder](#builder)
      - [options](#options)
        - [allowedCommonJsDependencies](#allowedcommonjsdependencies)
        - [aot](#aot)
        - [assets](#assets)
          - [assetPattern](#assetpattern)
          - [Example](#example)
        - [baseHref](#basehref)
        - [budgets](#budgets)
          - [definitions/budget](#definitionsbudget)
        - [buildOptimizer](#buildoptimizer)
        - [commonChunk](#commonchunk)
        - [crossOrigin](#crossorigin)
        - [deleteOutputPath](#deleteoutputpath)
        - [deployUrl](#deployurl)
        - [extractLicenses](#extractlicenses)
        - [fileReplacements](#filereplacements)
          - [definitions/fileReplacement](#definitionsfilereplacement)
          - [Example](#example-1)
        - [i18nMissingTranslation](#i18nmissingtranslation)
        - [index](#index)
        - [inlineStyleLanguage](#inlinestylelanguage)
        - [localize](#localize)
        - [main](#main)
        - [namedChunks](#namedchunks)
        - [ngswConfigPath](#ngswconfigpath)
        - [optimization](#optimization)
        - [outputHashing](#outputhashing)
        - [outputPath](#outputpath)
        - [poll](#poll)
        - [polyfills](#polyfills)
        - [preserveSymlinks](#preservesymlinks)
        - [progress](#progress)
        - [resourcesOutputPath](#resourcesoutputpath)
        - [scripts](#scripts)
          - [definitions/extraEntryPoint](#definitionsextraentrypoint)
        - [serviceWorker](#serviceworker)
        - [showCircularDependencies](#showcirculardependencies)
        - [sourceMap](#sourcemap)
        - [statsJson](#statsjson)
        - [stylePreprocessorOptions](#stylepreprocessoroptions)
        - [styles](#styles)
        - [subresourceIntegrity](#subresourceintegrity)
        - [tsConfig](#tsconfig)
        - [vendorChunk](#vendorchunk)
        - [verbose](#verbose)
        - [watch](#watch)
        - [webWorkerTsConfig](#webworkertsconfig)
      - [configurations](#configurations)
      - [defaultConfiguration](#defaultconfiguration)
    - [serve](#serve)
      - [builder](#builder-1)
      - [options](#options-1)
        - [allowedHosts](#allowedhosts)
        - [aot](#aot-1)
        - [baseHref](#basehref-1)
        - [browserTarget](#browsertarget)
        - [commonChunk](#commonchunk-1)
        - [deployUrl](#deployurl-1)
        - [disableHostCheck](#disablehostcheck)
        - [headers](#headers)
        - [hmr](#hmr)
        - [host](#host)
        - [liveReload](#livereload)
        - [open](#open)
        - [optimization](#optimization-1)
        - [poll](#poll-1)
        - [port](#port)
        - [progress](#progress-1)
        - [proxyConfig](#proxyconfig)
        - [publicHost](#publichost)
        - [servePath](#servepath)
        - [sourceMap](#sourcemap-1)
        - [ssl](#ssl)
        - [sslCert](#sslcert)
        - [sslKey](#sslkey)
        - [vendorChunk](#vendorchunk-1)
        - [verbose](#verbose-1)
        - [watch](#watch-1)
      - [configurations](#configurations-1)
  - [cli](#cli)
  - [schematics](#schematics)
    - [Example](#example-2)

<!-- /code_chunk_output -->

## Basic Structure

```json
{
  "version": 1,
  "projects": {
    "p1": {
      // project
      "projectType": "application", // or "library"
      "root": "apps/p1",
      "sourceRoot": "apps/p1/src",
      "prefix": "my",
      "architect": {
        "build": {
          "builder": "@angular-devkit/build-angular:browser",
          "options": {
            /**
            'allowedCommonJsDependencies',
            'aot',
            'assets',
            'baseHref',
            'budgets',
            'buildOptimizer',
            'commonChunk',
            'crossOrigin',
            'deleteOutputPath',
            'deployUrl',
            'extractLicenses',
            'fileReplacements',
            'i18nMissingTranslation',
            'index',
            'inlineStyleLanguage',
            'localize',
            'main',
            'namedChunks',
            'ngswConfigPath',
            'optimization',
            'outputHashing',
            'outputPath',
            'poll',
            'polyfills',
            'preserveSymlinks',
            'progress',
            'resourcesOutputPath',
            'scripts',
            'serviceWorker',
            'showCircularDependencies',
            'sourceMap',
            'statsJson',
            'stylePreprocessorOptions',
            'styles',
            'subresourceIntegrity',
            'tsConfig',
            'vendorChunk',
            'verbose',
            'watch',
            'webWorkerTsConfig' 
            **/
          },
          "configurations": {
            "my-build-config1": {},
            "my-build-config2": {},
            "hmr": {
              "fileReplacements": [
                {
                  "replace": "apps/p1/src/environments/environment.ts",
                  "with": "apps/p1/src/environments/environment.hmr.ts"
                }
              ],
              "optimization": false,
              "outputHashing": "none",
              "sourceMap": true,
              "namedChunks": true,
              "extractLicenses": false,
              "vendorChunk": false,
              "buildOptimizer": false
            }
          },
          "outputs": ["{options.outputPath}"],
          "defaultConfiguration": "my-config1"
        },
        "serve": {
          "builder": "@angular-devkit/build-angular:dev-server",
          "options": {
            /**
            'allowedHosts',
            'aot',
            'baseHref',
            'browserTarget',
            'commonChunk',
            'deployUrl',
            'disableHostCheck',
            'headers',
            'hmr',
            'host',
            'liveReload',
            'open',
            'optimization',
            'poll',
            'port',
            'progress',
            'proxyConfig',
            'publicHost',
            'servePath',
            'sourceMap',
            'ssl',
            'sslCert',
            'sslKey',
            'vendorChunk',
            'verbose',
            'watch' 
            **/
          },
          "configurations": {
            "hmr": {
              "hmr": true,
              "browserTarget": "p1:build:hmr"
            },
            "my-serve-config1": {},
            "my-serve-config2": {}
          }
        },
        "extract-i18n": {
          "builder": "@angular-devkit/build-angular:extract-i18n",
          "options": {
            "browserTarget": "p1:build"
          }
        },
        "lint": {
          "builder": "@nrwl/linter:eslint",
          "options": {
            "lintFilePatterns": [
              "apps/p1/src/main.ts",
              "apps/p1/src/polyfills.ts",
              "apps/p1/**/*.spec.ts",
              "apps/p1/**/*.d.ts",
              "apps/p1/src/test-setup.ts"
            ]
          }
        },
        "test": {
          "builder": "@nrwl/jest:jest",
          "options": {
            "jestConfig": "apps/p1/jest.config.js",
            "passWithNoTests": true
          },
          "outputs": ["coverage/apps/p1"]
        }
      },
      "schematics": {}, // see details above
      // others
      "cli": {
        "analytics": "", // boolean | string
        "analyticsSharing": {
          "tracking": "", // string: ^GA-\\d+-\\d+$"
          "uuid": "" // string
        },
        "defaultCollection": "", // string
        "packageManager": "npm", // "enum": ["npm", "cnpm", "yarn", "pnpm"]
        "warnings": {
          "versionMismatch": false
        }
      },
      "i18n": {} // see details above
    }
  },

  "defaultProject": "p1",
  "newProjectRoot": "/here" // if you want to change defaults
}
```

### Important Details

At the first level `version` property is required.

For **project** is required: either `architect` or `targets` but not both.

The definition for both is same: `'#/definitions/project/definitions/target'`. [See Raw-Details here](./Raw-Details.md)

## `projects.project.architect` or `projects.project.targets`

### build

#### builder

```json
{
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
  }
}
```

#### options

```json
{
  "options": { "type": "object" }
}
```

##### allowedCommonJsDependencies

```json
{
  "description": "A list of CommonJS packages that are allowed to be used without a build time warning.",
  "type": "array",
  "items": { "type": "string" },
  "default": []
}
```

##### aot

```json
{
  "type": "boolean",
  "description": "Build using Ahead of Time compilation.",
  "x-user-analytics": 13,
  "default": true
}
```

##### assets

```json
{
  "type": "array",
  "description": "List of static application assets.",
  "default": [],
  "items": { "$ref": "#/definitions/assetPattern" }
}
```

###### assetPattern

```json
{
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
          "items": { "type": "string" }
        },
        "output": {
          "type": "string",
          "description": "Absolute path within the output."
        }
      },
      "additionalProperties": false,
      "required": ["glob", "input", "output"]
    },
    { "type": "string" }
  ]
}
```

###### Example

```json
{
  "assets": [
    "apps/p1/src/favicon.ico",
    "apps/p1/src/assets",
    "apps/p1/src/some.json",
    {
      "glob": "**/*",
      "input": "node_modules/some-lib/styles/fonts",
      "output": "assets/fonts/"
    }
  ]
}
```

##### baseHref

```json
{
  "type": "string",
  "description": "Base url for the application being built."
}
```

##### budgets

```json
{
  "description": "Budget thresholds to ensure parts of your application stay within boundaries which you set.",
  "type": "array",
  "items": { "$ref": "#/definitions/budget" },
  "default": []
}
```

###### definitions/budget

```json
{
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
```

##### buildOptimizer

```json
{
  "type": "boolean",
  "description": "Enables '@angular-devkit/build-optimizer' optimizations when using the 'aot' option.",
  "default": true
}
```

##### commonChunk

```json
{
  "type": "boolean",
  "description": "Generate a seperate bundle containing code used across multiple bundles.",
  "default": true
}
```

##### crossOrigin

```json
{
  "type": "string",
  "description": "Define the crossorigin attribute setting of elements that provide CORS support.",
  "default": "none",
  "enum": ["none", "anonymous", "use-credentials"]
}
```

##### deleteOutputPath

```json
{
  "type": "boolean",
  "description": "Delete the output path before building.",
  "default": true
}
```

##### deployUrl

```json
{
  "type": "string",
  "description": "URL where files will be deployed.",
  "x-deprecated": "Use \"baseHref\" option, \"APP_BASE_HREF\" DI token or a combination of both instead. For more information, see https://angular.io/guide/deployment#the-deploy-url."
}
```

##### extractLicenses

```json
{
  "type": "boolean",
  "description": "Extract all licenses in a separate file.",
  "default": true
}
```

##### fileReplacements

```json
{
  "description": "Replace compilation source files with other compilation source files in the build.",
  "type": "array",
  "items": { "$ref": "#/definitions/fileReplacement" },
  "default": []
}
```

###### definitions/fileReplacement

```json
{
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
```

###### Example

```json
{
  "fileReplacements": [
    {
      "replace": "apps/p1/src/environments/environment.ts",
      "with": "apps/p1/src/environments/environment.hmr.ts"
    }
  ]
}
```

##### i18nMissingTranslation

```json
{
  "type": "string",
  "description": "How to handle missing translations for i18n.",
  "enum": ["warning", "error", "ignore"],
  "default": "warning"
}
```

##### index

```json
{
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
}
```

##### inlineStyleLanguage

```json
{
  "description": "The stylesheet language to use for the application's inline component styles.",
  "type": "string",
  "default": "css",
  "enum": ["css", "less", "sass", "scss"]
}
```

##### localize

```json
{
  "description": "Translate the bundles in one or more locales.",
  "oneOf": [
    { "type": "boolean", "description": "Translate all locales." },
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
}
```

##### main

```json
{
  "type": "string",
  "description": "The full path for the main entry point to the app, relative to the current workspace."
}
```

##### namedChunks

```json
{
  "type": "boolean",
  "description": "Use file name for lazy loaded chunks.",
  "default": false
}
```

##### ngswConfigPath

```json

```

##### optimization

```json
{ "type": "string", "description": "Path to ngsw-config.json." }
```

##### outputHashing

```json
{
  "type": "string",
  "description": "Define the output filename cache-busting hashing mode.",
  "default": "none",
  "enum": ["none", "all", "media", "bundles"]
}
```

##### outputPath

```json
{
  "type": "string",
  "description": "The full path for the new output directory, relative to the current workspace.\n\nBy default, writes output to a folder named dist/ in the current project."
}
```

##### poll

```json
{
  "type": "number",
  "description": "Enable and define the file watching poll time period in milliseconds."
}
```

##### polyfills

```json
{
  "type": "string",
  "description": "The full path for the polyfills file, relative to the current workspace."
}
```

##### preserveSymlinks

```json
{
  "type": "boolean",
  "description": "Do not use the real path when resolving modules. If unset then will default to `true` if NodeJS option --preserve-symlinks is set."
}
```

##### progress

```json
{
  "type": "boolean",
  "description": "Log progress to the console while building.",
  "default": true
}
```

##### resourcesOutputPath

```json
{
  "type": "string",
  "description": "The path where style resources will be placed, relative to outputPath.",
  "default": ""
}
```

##### scripts

```json
{
  "description": "Global scripts to be included in the build.",
  "type": "array",
  "default": [],
  "items": { "$ref": "#/definitions/extraEntryPoint" }
}
```

###### definitions/extraEntryPoint

```json
{
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
    { "type": "string", "description": "The file to include." }
  ]
}
```

##### serviceWorker

```json
{
  "type": "boolean",
  "description": "Generates a service worker config for production builds.",
  "default": false
}
```

##### showCircularDependencies

```json
{
  "type": "boolean",
  "description": "Show circular dependency warnings on builds.",
  "default": false,
  "x-deprecated": "The recommended method to detect circular dependencies in project code is to use either a lint rule or other external tooling."
}
```

##### sourceMap

```json
{
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
    { "type": "boolean" }
  ]
}
```

##### statsJson

```json
{
  "type": "boolean",
  "description": "Generates a 'stats.json' file which can be analyzed using tools such as 'webpack-bundle-analyzer'.",
  "default": false
}
```

##### stylePreprocessorOptions

```json
{
  "description": "Options to pass to style preprocessors.",
  "type": "object",
  "properties": {
    "includePaths": {
      "description": "Paths to include. Paths will be resolved to workspace root.",
      "type": "array",
      "items": { "type": "string" },
      "default": []
    }
  },
  "additionalProperties": false
}
```

##### styles

```json
{
  "description": "Global styles to be included in the build.",
  "type": "array",
  "default": [],
  "items": { "$ref": "#/definitions/extraEntryPoint" } // see scripts above
}
```

##### subresourceIntegrity

```json
{
  "type": "boolean",
  "description": "Enables the use of subresource integrity validation.",
  "default": false
}
```

##### tsConfig

```json
{
  "type": "string",
  "description": "The full path for the TypeScript configuration file, relative to the current workspace."
}
```

##### vendorChunk

```json
{
  "type": "boolean",
  "description": "Generate a seperate bundle containing only vendor libraries. This option should only used for development.",
  "default": false
}
```

##### verbose

```json
{
  "type": "boolean",
  "description": "Adds more details to output logging.",
  "default": false
}
```

##### watch

```json
{
  "type": "boolean",
  "description": "Run build when files change.",
  "default": false
}
```

##### webWorkerTsConfig

```json
{
  "type": "string",
  "description": "TypeScript configuration for Web Worker modules."
}
```

#### configurations

```json
{
  "configurations": {
    "type": "object",
    "description": "A map of alternative target options.",
    "additionalProperties": { "type": "object" }
  }
}
```

#### defaultConfiguration

```json
{
  "defaultConfiguration": {
    "type": "string",
    "description": "A default named configuration to use when a target configuration is not provided."
  }
}
```

### serve

See `build`section above (here differences or deprecation information).

#### builder

#### options

##### allowedHosts

```json
{
  "type": "array",
  "description": "List of hosts that are allowed to access the dev server.",
  "default": [],
  "items": { "type": "string" }
}
```

##### aot

```json
{
  "type": "boolean",
  "description": "Build using Ahead of Time compilation.",
  "x-user-analytics": 13,
  "x-deprecated": "Use the \"aot\" option in the browser builder instead."
}
```

##### baseHref

```json
{
  "type": "string",
  "description": "Base url for the application being built.",
  "x-deprecated": "Use the \"baseHref\" option in the browser builder instead."
}
```

##### browserTarget

```json
{
  "type": "string",
  "description": "A browser builder target to serve in the format of `project:target[:configuration]`. You can also pass in more than one configuration name as a comma-separated list. Example: `project:target:production,staging`.",
  "pattern": "^[^:\\s]+:[^:\\s]+(:[^\\s]+)?$"
}
```

##### commonChunk

```json
{
  "type": "boolean",
  "description": "Generate a seperate bundle containing code used across multiple bundles.",
  "x-deprecated": "Use the \"commonChunk\" option in the browser builder instead."
}
```

##### deployUrl

```json
{
  "type": "string",
  "description": "URL where files will be deployed.",
  "x-deprecated": "Use the \"deployUrl\" option in the browser builder instead."
}
```

##### disableHostCheck

```json
{
  "type": "boolean",
  "description": "Don't verify connected clients are part of allowed hosts.",
  "default": false
}
```

##### headers

```json
{
  "type": "object",
  "description": "Custom HTTP headers to be added to all responses.",
  "propertyNames": { "pattern": "^[-_A-Za-z0-9]+$" },
  "additionalProperties": { "type": "string" }
}
```

##### hmr

```json
{
  "type": "boolean",
  "description": "Enable hot module replacement.",
  "default": false
}
```

##### host

```json
{
  "type": "string",
  "description": "Host to listen on.",
  "default": "localhost"
}
```

##### liveReload

```json
{
  "type": "boolean",
  "description": "Whether to reload the page on change, using live-reload.",
  "default": true
}
```

##### open

```json
{
  "type": "boolean",
  "description": "Opens the url in default browser.",
  "default": false,
  "alias": "o"
}
```

##### optimization

```json
{
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
    { "type": "boolean" }
  ],
  "x-deprecated": "Use the \"optimization\" option in the browser builder instead."
}
```

##### poll

```json
{
  "type": "number",
  "description": "Enable and define the file watching poll time period in milliseconds."
}
```

##### port

```json
{
  "type": "number",
  "description": "Port to listen on.",
  "default": 4200
}
```

##### progress

```json
{
  "type": "boolean",
  "description": "Log progress to the console while building.",
  "x-deprecated": "Use the \"progress\" option in the browser builder instead."
}
```

##### proxyConfig

```json
{
  "type": "string",
  "description": "Proxy configuration file. For more information, see https://angular.io/guide/build#proxying-to-a-backend-server."
}
```

##### publicHost

```json
{
  "type": "string",
  "description": "The URL that the browser client (or live-reload client, if enabled) should use to connect to the development server. Use for a complex dev server setup, such as one with reverse proxies."
}
```

##### servePath

```json
{
  "type": "string",
  "description": "The pathname where the app will be served."
}
```

##### sourceMap

```json
{
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
    { "type": "boolean" }
  ],
  "x-deprecated": "Use the \"sourceMap\" option in the browser builder instead."
}
```

##### ssl

```json
{
  "type": "boolean",
  "description": "Serve using HTTPS.",
  "default": false
}
```

##### sslCert

```json
{
  "type": "string",
  "description": "SSL certificate to use for serving HTTPS."
}
```

##### sslKey

```json
{
  "type": "string",
  "description": "SSL key to use for serving HTTPS."
}
```

##### vendorChunk

```json

```

##### verbose

```json
{
  "type": "boolean",
  "description": "Generate a seperate bundle containing only vendor libraries. This option should only used for development.",
  "x-deprecated": "Use the \"vendorChunk\" option in the browser builder instead."
}
```

##### watch

```json
{
  "type": "boolean",
  "description": "Rebuild on change.",
  "default": true
}
```

#### configurations

```json

```

## cli

```json
{
  "type": "object",
  "properties": {
    "defaultCollection": {
      "description": "The default schematics collection to use.",
      "type": "string"
    },
    "packageManager": {
      "description": "Specify which package manager tool to use.",
      "type": "string",
      "enum": ["npm", "cnpm", "yarn", "pnpm"]
    },
    "warnings": {
      "description": "Control CLI specific console warnings",
      "type": "object",
      "properties": {
        "versionMismatch": {
          "description": "Show a warning when the global version is newer than the local one.",
          "type": "boolean"
        }
      }
    },
    "analytics": {
      "type": ["boolean", "string"],
      "description": "Share anonymous usage data with the Angular Team at Google."
    },
    "analyticsSharing": {
      "type": "object",
      "properties": {
        "tracking": {
          "description": "Analytics sharing info tracking ID.",
          "type": "string",
          "pattern": "^GA-\\d+-\\d+$"
        },
        "uuid": {
          "description": "Analytics sharing info universally unique identifier.",
          "type": "string"
        }
      }
    }
  },
  "additionalProperties": false
}
```

## schematics

```json
{
  "type": "object",
  "properties": {
    "@schematics/angular:application": {
      "$ref": "../../../../schematics/angular/application/schema.json"
    },
    "@schematics/angular:class": {
      "$ref": "../../../../schematics/angular/class/schema.json"
    },
    "@schematics/angular:component": {
      "$ref": "../../../../schematics/angular/component/schema.json"
    },
    "@schematics/angular:directive": {
      "$ref": "../../../../schematics/angular/directive/schema.json"
    },
    "@schematics/angular:enum": {
      "$ref": "../../../../schematics/angular/enum/schema.json"
    },
    "@schematics/angular:guard": {
      "$ref": "../../../../schematics/angular/guard/schema.json"
    },
    "@schematics/angular:interceptor": {
      "$ref": "../../../../schematics/angular/interceptor/schema.json"
    },
    "@schematics/angular:interface": {
      "$ref": "../../../../schematics/angular/interface/schema.json"
    },
    "@schematics/angular:library": {
      "$ref": "../../../../schematics/angular/library/schema.json"
    },
    "@schematics/angular:pipe": {
      "$ref": "../../../../schematics/angular/pipe/schema.json"
    },
    "@schematics/angular:ng-new": {
      "$ref": "../../../../schematics/angular/ng-new/schema.json"
    },
    "@schematics/angular:resolver": {
      "$ref": "../../../../schematics/angular/resolver/schema.json"
    },
    "@schematics/angular:service": {
      "$ref": "../../../../schematics/angular/service/schema.json"
    },
    "@schematics/angular:web-worker": {
      "$ref": "../../../../schematics/angular/web-worker/schema.json"
    }
  },
  "additionalProperties": { "type": "object" }
}
```

### Example

```json
{
  "schematics": {
    "@nrwl/workspace": {
      "library": {
        "linter": "tslint"
      }
    },
    "@nrwl/cypress": {
      "cypress-project": {
        "linter": "tslint"
      }
    },
    "@nrwl/node": {
      "application": {
        "linter": "tslint"
      },
      "library": {
        "linter": "tslint"
      }
    },
    "@nrwl/nest": {
      "application": {
        "linter": "tslint"
      },
      "library": {
        "linter": "tslint"
      }
    },

    "@nrwl/angular:application": {
      "style": "scss",
      "linter": "eslint",
      "unitTestRunner": "jest",
      "e2eTestRunner": "cypress"
    },
    "@nrwl/angular:library": {
      "style": "scss",
      "linter": "eslint",
      "unitTestRunner": "jest",
      "strict": true
    }
  }
}
```
