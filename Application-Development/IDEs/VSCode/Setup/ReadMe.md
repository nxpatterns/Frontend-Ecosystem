# VSCode Setup

<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Themes & Fonts](#themes--fonts)
  - [Font](#font)
  - [Color Theme - VSCode Standard Dark Modern](#color-theme---vscode-standard-dark-modern)
  - [Icon Theme &rarr; Material Icon Theme](#icon-theme-rarr-material-icon-theme)
  - [Production Theme &rarr; fluent-icons](#production-theme-rarr-fluent-icons)
- [Extensions](#extensions)
  - [Basis Extensions](#basis-extensions)
  - [Angular + Mono Repo](#angular--mono-repo)
  - [TypeScript](#typescript)
  - [Useful Extensions (Coding, Tasks, etc.)](#useful-extensions-coding-tasks-etc)
    - [Time Saver + Design (Color etc)](#time-saver--design-color-etc)
    - [SQL](#sql)
    - [Debugger](#debugger)
    - [Markdown, Pandoc, PDF etc](#markdown-pandoc-pdf-etc)
    - [Design, Color, Img](#design-color-img)
    - [Docker](#docker)
    - [JSON](#json)
    - [MS Playwright](#ms-playwright)
    - [Sometimes very important](#sometimes-very-important)
    - [Nice to have](#nice-to-have)
- [Git](#git)
  - [Profile Webia1](#profile-webia1)
- [Settings](#settings)
  - [Editor, Inline Suggestions, Minimap & Co](#editor-inline-suggestions-minimap--co)
  - [Terminal & Co](#terminal--co)
  - [TypeScript](#typescript-1)
  - [Local Web Development](#local-web-development)
  - [SCSS](#scss)
  - [Default Formatter](#default-formatter)
    - [Prettier Details](#prettier-details)
      - [Prose Wrap](#prose-wrap)
  - [Workbench](#workbench)
  - [Workbench Color Customizations - V1](#workbench-color-customizations---v1)
  - [Workbench Color Customizations - V1.1](#workbench-color-customizations---v11)
  - [Last but not least](#last-but-not-least)

<!-- /code_chunk_output -->

## Themes & Fonts

### Font

```shell
    "editor.fontFamily": "JetBrains Mono",
    "editor.fontLigatures": true,
    "editor.codeLensFontFamily": "Jetbrains Mono",
```

### Color Theme - VSCode Standard Dark Modern

> See **Workbench** further below

```json
 "workbench.colorTheme": "Gitkraken Dark",
```

1) [editor.semanticTokenColorCustomizations](./editor.semanticTokenColorCustomizations.json)
1) [editor.tokenColorCustomizations](./editor.tokenColorCustomizations.json)

### Icon Theme &rarr; Material Icon Theme

**Attention:** Not Material Theme Icon &rarr; **Material Icon Theme**

<https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme>

### Production Theme &rarr; fluent-icons

<https://marketplace.visualstudio.com/items?itemName=miguelsolorio.fluent-icons>

## Extensions

### Basis Extensions

```shell
dbaeumer.vscode-eslint          # ESLint
esbenp.prettier-vscode          # ESLint Prettier
EditorConfig.EditorConfig       # EditorConfig
firsttris.vscode-jest-runner    # Jest Runner
miguelsolorio.fluent-icons      # Production Icons
PKief.material-icon-theme       # Icon Theme

DavidAnson.vscode-markdownlint  # Markdown Linter
redhat.vscode-xml               # XML Linter
redhat.vscode-yaml              # YAML
steoates.autoimport             # TypeScript Import Extension 1
q.typescript-mono-repo-import-helper # TypeScript Import Extension 2
```

### Angular + Mono Repo

```shell
Angular.ng-template             # Angular Language Service
cyrilletuzi.angular-schematics  # Angular Schematics
obenjiro.arrr                   # Refactoring Angular (Create Templates..)
tomwhite007.rename-angular-component  # Rename Angular Components
johnpapa.Angular2               # John Papa Snippets
nrwl.angular-console            # Nx Console
```

### TypeScript

```shell
q.typescript-mono-repo-import-helper    # OK (NECESSARY)
qcz.restart-ts-server-button            # Check if really necessary
rbbit.typescript-hero                   # OK (even deprecated)
steoates.autoimport                     # OK (NECESSARY)
```

### Useful Extensions (Coding, Tasks, etc.)

#### Time Saver + Design (Color etc)

> See Config Options below

```shell
Andreabbondanza.ignoregit       # Git Ignore
formulahendry.auto-close-tag    # Auto Close Tag
formulahendry.auto-rename-tag   # Auto Rename Tag
chouzz.vscode-better-align      # Better align
yo1dog.cursor-align             # Cursor Align (is better ? ReCheck)
in4margaret.compareit           # Compare it
jock.svg                        # Minify function is great
pdconsec.vscode-print           # Printing Code
ryu1kn.partial-diff             # Compare Code parts with each other
ryu1kn.text-marker              # Text Marker
rebornix.toggle                 # Toggle Configs (see keybindings below)
thiagocordeirooo.generate-translation # I18N Key Generator (Re-Check)
hwencc.html-tag-wrapper         # Wrap HTML tags via shortcuts
```

[>> See KeyBindings](./keybindings_MASTER.json)

```json
"auto-close-tag.disableOnLanguage": ["typescript"],
```

#### SQL

```shell
inferrinizzard.prettier-sql-vscode  # SQL Formatter (inkl. PostgreSQL)
ms-ossdata.vscode-postgresql
mtxr.sqltools
```

#### Debugger

```shell
effectful.debugger              # OK (rewind back possibility)
kakumei.ts-debug
```

#### Markdown, Pandoc, PDF etc

```shell
shd101wyy.markdown-preview-enhanced   # Great!
tomoki1207.pdf                        # PDF Viewer
kzvi.pandoc-markdown-preview
ChrisChinchilla.vscode-pandoc
```

#### Design, Color, Img

```shell
bierner.color-info              # Colors in CSS Files (not in SCSS)
mrmlnc.vscode-scss              # OK
naumovs.color-highlight         # OK
pranaygp.vscode-css-peek        # Check if really necessary
vscode-infra.image-viewer       # Check if really necessary
Zignd.html-css-class-completion # Check if really necessary
```

#### Docker

```shell
ms-azuretools.vscode-docker
ms-vscode-remote.remote-containers
```

#### JSON

```shell
nidu.copy-json-path             # Copy JSON Path
oliversturm.fix-json            # Fix JSON
quicktype.quicktype             # Paste JSON as Code (TypeDef Generator)
```

#### MS Playwright

```shell
ms-playwright.playwright
mskelton.playwright-test-snippets
ortoni.ortoni
```

#### Sometimes very important

```shell
ArturoDent.custom-language-syntax       # Custom Language Syntax
paulomenezes.duplicated-code            # Duplicate Code Finder
ukoloff.win-ca                          # CRT Converter
adamrybak.vscode-nonprinting-characters # Non-Printing Characters

```

#### Nice to have

```shell
actboy168.tasks                   # VSCode Tasks
anteprimorac.html-end-tag-labels  # End Tag labels
be5invis.vscode-custom-css        # Custom CSS
DotJoshJohnson.xml                # Useful XML Tools
fabianlauer.vs-code-xml-format    # XML Formatter
leodevbro.blockman                # Block Visualisations
rvest.vs-code-prettier-eslint     # Re-check if necessary
VisualStudioExptTeam.intellicode-api-usage-examples # Re-check if necessary
VisualStudioExptTeam.vscodeintellicode # Re-check if necessary
yo1dog.cursor-trim                # Trim, Re-check if necessary
```

## Git

> See Config Options below:

```shell
eamodio.gitlens                   # Git Lens
mhutchie.git-graph                # Git Graph
donjayamanne.githistory           # Git History

Andreabbondanza.ignoregit         # Git Ignore
```

```json
"git.autofetch": true,
"git.confirmSync": false,
"git.openRepositoryInParentFolders": "never",
"gitlens.views.branches.branches.layout": "list",
```

### Profile Webia1

```shell
hwencc.html-tag-wrapper (HTML Tag Wrapper)
thiagocordeirooo.generate-translation (I18N)
```

## Settings

### Editor, Inline Suggestions, Minimap & Co

```json
  "editor.codeActionsOnSave": {
    "source.sort.json": "always"
  },
  "editor.codeLensFontFamily": "Jetbrains Mono",
  "editor.fontFamily": "JetBrains Mono",
  "editor.fontLigatures": true,
  "editor.fontSize": 13.3,
  "editor.inlineSuggest.enabled": true,
  "editor.inlineSuggest.showToolbar": "always",
  "editor.minimap.enabled": false,
  "editor.stickyScroll.enabled": false,
  "editor.tabSize": 2,
```

### Terminal & Co

> **Terminal ANSI Colors**
> See workbench.colorCustomizations further below

```json
"terminal.integrated.fontFamily": "Jetbrains Mono",
"terminal.integrated.fontSize": 13.7,
"terminal.integrated.gpuAcceleration": "off",
"terminal.integrated.inheritEnv": false,
"terminal.integrated.localEchoStyle": "dim",
"terminal.integrated.scrollback": 10000,
"terminal.integrated.sendKeybindingsToShell": true,
"terminal.integrated.smoothScrolling": true,
```

### TypeScript

```json
"typescript.updateImportsOnFileMove.enabled": "always",
```

### Local Web Development

```json
"http.systemCertificates": false,
```

### SCSS

```json
"scss.lint.duplicateProperties": "warning",
"scss.lint.emptyRules": "ignore",
"scss.lint.float": "warning",
```

### Default Formatter

```json
  "[html]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[jsonc]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[markdown]": {
    "editor.defaultFormatter": "DavidAnson.vscode-markdownlint"
  },
  "[svg]": {
    "editor.defaultFormatter": "redhat.vscode-xml"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[xml]": {
    "editor.defaultFormatter": "redhat.vscode-xml"
  },
```

#### Prettier Details

##### Prose Wrap

```json
 "prettier.proseWrap": "never",
```

Source: <https://prettier.io/docs/en/options.html>

By default, Prettier will not change wrapping in markdown text since some services use a linebreak-sensitive renderer, e.g. GitHub comments and BitBucket. To have Prettier wrap prose to the print width, change this option to "always". If you want Prettier to force all prose blocks to be on a single line and rely on editor/viewer soft wrapping instead, you can use `"never"`.

Valid options:

- `"always"` - Wrap prose if it exceeds the print width.
- `"never"` - Un-wrap each block of prose into one line.
- `"preserve"` - Do nothing, leave prose as-is. _First available in v1.9.0_

| Default | CLI Override | API Override |
| --- | --- | --- |
| `"preserve"` | `--prose-wrap <always|never|preserve>` | `proseWrap: "<always|never|preserve>"` |

### Workbench

```json
"workbench.startupEditor": "welcomePage",
"workbench.colorTheme": "Gitkraken Dark",
"workbench.fontAliasing": "default",
"workbench.iconTheme": "material-icon-theme",
"workbench.productIconTheme": "fluent-icons",
"workbench.startupEditor": "welcomePage"
```

### Workbench Color Customizations - V1

```json
"workbench.colorCustomizations": {
  "editor.background": "#202026",
  "editor.selectionBackground": "#007bff",
  "editorUnnecessaryCode.border": "#fd7403dc",
  "tab.activeBackground": "#614a00",
  "tab.activeBorder": "#ffc4006a",
  "tab.activeBorderTop": "#ffc400",
  "tab.activeForeground": "#ffffff",
  "tab.border": "#ffc4006a",
  "tab.inactiveForeground": "#01d9f5f2",
  "tab.unfocusedInactiveForeground": "#01d9f5f2",
  "terminal.ansiBlue": "#1a3563",
  "terminal.ansiBrightGreen": "#6fff00",
  "terminal.ansiBrightWhite": "#ffffff",
  "terminal.ansiGreen": "#2b6d02",
  "terminal.ansiRed": "#cd053e",
  "terminal.ansiWhite": "#d1f7fd",
  "terminal.ansiYellow": "#ffe600",
  "terminal.background": "#131212",
  "terminal.foreground": "#bcf487d7",
  "titleBar.activeBackground": "#ffc4002a",
  "titleBar.activeForeground": "#ffffff",
  "titleBar.inactiveForeground": "#15202b99"
},
```

### Workbench Color Customizations - V1.1

```json
 "workbench.colorCustomizations": {
    "editor.background": "#202026",
    "editorUnnecessaryCode.border": "#fd7403dc",
    "panel.border": "#711173",
    "panelTitle.activeBorder": "#ffc400",
    "panelTitle.activeForeground": "#ffc400",
    "sideBar.border": "#711173",
    "tab.activeBackground": "#614a00",
    "tab.activeBorder": "#ffc4006a",
    "tab.activeBorderTop": "#ffc400",
    "tab.activeForeground": "#ffffff",
    "tab.border": "#ffc4006a",
    "tab.inactiveForeground": "#01d9f5f2",
    "tab.unfocusedInactiveForeground": "#01d9f5f2",
    "terminal.ansiBlue": "#1a3563",
    "terminal.ansiBrightGreen": "#6fff00",
    "terminal.ansiBrightWhite": "#ffffff",
    "terminal.ansiGreen": "#2b6d02",
    "terminal.ansiRed": "#cd053e",
    "terminal.ansiWhite": "#d1f7fd",
    "terminal.ansiYellow": "#ffe600",
    "terminal.background": "#131212",
    "terminal.foreground": "#bcf487d7",
    "titleBar.activeBackground": "#ffc4002a",
    "titleBar.activeForeground": "#ffffff",
    "titleBar.inactiveForeground": "#15202b99"
  },
```

### Last but not least

```json
"json.sortOnSave.enable": true, # deprecated (see editor actions)
"redhat.telemetry.enabled": false,
"editor.formatOnSave": true,
"explorer.confirmDelete": false,
"printcode.fontSize": 11,
"printcode.printFilePath": "relative",
```
