# Node & Npm

<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Node](#node)
  - [Install Mode & Manage Versions](#install-mode--manage-versions)
  - [Using Environment Variables](#using-environment-variables)
  - [Convert PAT (Personal Access Token) to Base64](#convert-pat-personal-access-token-to-base64)
- [NPM](#npm)
  - [Skip SSL Checks](#skip-ssl-checks)
  - [Configurations](#configurations)
  - [Checking if a package does have type definitions](#checking-if-a-package-does-have-type-definitions)
  - [NPM Licence Report](#npm-licence-report)
    - [Setup](#setup)
    - [Configuration](#configuration)
  - [Passing Parameters](#passing-parameters)
    - [Command Line (2 Variations)](#command-line-2-variations)
    - [Between NPM Scripts](#between-npm-scripts)
      - [First approach (static value)](#first-approach-static-value)
      - [Second Approach (value over commandline + like above)](#second-approach-value-over-commandline--like-above)
    - [Attention Windows](#attention-windows)
  - [NPM Audit Examples](#npm-audit-examples)
  - [`.npmrc` Config Manager](#npmrc-config-manager)

<!-- /code_chunk_output -->

## Node

### Install Mode & Manage Versions

```shell
brew install node
npm i -g n
n latest    # Install the latest version
n lts       # Long Time Support
n prune     # Remove cached except current
n --help    # Help
```

### Using Environment Variables

```shell
# e.g. within index.js or index.ts (Server Side)
process.env.EXAMPLE_URI;

# e.g. within npm scripts or shell commands
EXAMPLE_URI=mongodb://localhost:27107/foo node index.js
```

### Convert PAT (Personal Access Token) to Base64

```shell
node -e "require('readline') .createInterface({input:process.stdin,output:process.stdout,historySize:0}) .question('PAT> ',p => { b64=Buffer.from(p.trim()).toString('base64');console.log(b64);process.exit(); })"
```

## NPM

```shell
npm list -g --depth=0   # List global packages  (depth=0)
```

### Skip SSL Checks

```shell
# Set Strict SSL to false
npm config set strict-ssl false

# or use --insecure flag with npm install like
npm install --insecure
```

### Configurations

```shell
# List all configurations
npm config list -l

# Get the prefix
npm config get prefix

# Get the userconfig (if e.g. .npmrc does not exist)
npm config get userconfig

# Set the registry to the default
npm config set registry https://registry.npmjs.org/
```

### Checking if a package does have type definitions

```bash
npm view <package-name> types
# e.g.
npm view jsqr types  # returns ./dist/index.d.ts

```

### NPM Licence Report

#### Setup

1. Install the package globally by running `npm install -g license-report`
2. Run `license-report` in the root of your project `license-report --output=markdown > tmp/licences.md`

#### Configuration

You can create a configuration file to customize the behavior of license-report. This file allows you to exclude certain packages, change the output format, and make other adjustments.
The configuration file should be in JSON format and can be named `.license-report.json`. Place this file in the root directory of your project.

Here is an example configuration file:

```json
{
  "fields": ["name", "licenseType", "installedVersion"],
  "output": "markdown",
  "package": "./package.json"
}
```

To run `license-report` using the configuration file, use the following command in your npm scripts:

```json
{
  "scripts": {
   "check:licenses": "echo \"\nDon't forget ton install license-port globally: npm i -g license-report\" && npx license-report --only=prod --config ./.license-report.json > tmp/license-report.md && echo \"Check ./tmp/license-report.md\n\"",
  }
}
```

### Passing Parameters

#### Command Line (2 Variations)

```shell
npm run start -- --port=3000          # Variation 1
npm run someScript --myParam=Hello    # Variation 2
```

V2: Reading is different for Windows & Unix e.g. within the npm script:

Windows:

```plaintext
"someScript": "echo \"The value of --myParam is '%npm_config_myParam%'\""
```

Linux

```plaintext
"someScript": "echo \"The value of --myParam is '${npm_config_myParam}'\""
```

#### Between NPM Scripts

##### First approach (static value)

Notice `--` here:

```json
"scripts": {
    "start": "ts-node src/server.ts",
    "start:differentPort": "npm start -- 4000",
    "start:somethingElse": "npm start -- ${npm_package_config_port}"
},
"config": {
    "port" : "3000"
}
```

##### Second Approach (value over commandline + like above)

Run with: `npm run i1 --dockerVersion="1.2.3"`

```json
"scripts": {
  "docker:tag": "docker tag",
  "i1": "npm run docker:tag -- ${npm_package_config_i1_name}:${npm_package_config_i1_version} ${npm_package_config_i1_name}:${npm_config_dockerVersion}"
},
"config": {
  "i1": {
    "name": "my-image",
    "version": "latest"
  }
},
```

#### Attention Windows

On Windows: `%npm_package_config_port%` instead of `$npm_package_config_port`

```json
"scripts": {
    "start": "ts-node src/server.ts $npm_package_config_port"
},
"config": {
    "port" : "3000"
}
```

### NPM Audit Examples

```shell

# Show
npm audit
npm audit --json
npm audit --parseable
npm audit --parseable | awk -F $'\t' '{print $1,$4}'
npm audit --audit-level=moderate

# Fix
npm audit fix
npm audit fix --package-lock-only
npm audit fix --only=prod

# Force
npm audit fix --force
npm audit fix --dry-run --json

```

### `.npmrc` Config Manager

E.g. Switch between different registries or configurations

```shell
npm install -g npmrc
npmrc --help        # See all options
````

Calling npmrc without arguments creates an `~/.npmrcs/` directory if it doesn't exist, and copies your current `~/.npmrc` as the `'default'` `.npmrc` profile.

```shell
npmrc               # List all configurations
npmrc -c home       # Create and activate the new profile 'home'
npmrc -l            # List all configurations
```

If you have created a new profile and it is the active profile, you can set the standard npm registry with the following command:

```shell
npm config set registry https://registry.npmjs.org/
```

## Trouble Shooting

### MacOS

#### Brew Unlink (npm shadowing)

Manage ZSH Config (changing Versions)

```shell
export PATH="$N_PREFIX/bin:$PATH" # add this in ~/.zshrc
# if you get the following error after changing the version by running `n doctor`:
There is an active version of npm shadowing the version installed by n. Check order of entries in PATH.
   installed : /usr/local/bin/npm
      active : /opt/homebrew/bin/npm
# then unlink the via brew installed version like:
brew unlink node
  Unlinking /opt/homebrew/Cellar/node/20.5.1... 5 symlinks removed.
```

### Windows

#### Install Build Tools

```shell
# Windows Build Tools
npm install --global --production windows-build-tools
```

#### Install Python 2.7

```shell
# Install Pyhton 2.7 necessary on windows for npm builds (not 3.x)
# https://www.python.org/downloads/release/python-2716/
```

##### Set python 2.7 Path

```shell
npm config set python C:\Python27\python.exe
```

#### Checks Build Tools & Python

```shell
# Check if python is set
npm config get python

# Check if build tools are installed
npm config get msvs_version
```

### Build From Resource (Some gyp & co related errors)

    npm install --build-from-resource

#### Installing directly from GitHub

    npm install https://github.com/repo/npm_module.git --save

### Brew node / npm Problem: Error: Cannot find module ‘semver’

```shell
sudo rm -rf /usr/local/lib/node_modules
sudo rm -rf ~/.npm
brew uninstall –force node
brew install node
```
