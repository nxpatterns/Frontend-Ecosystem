# Some Npm Packages

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Some Npm Packages](#some-npm-packages)
  - [Using Shell Commands in JS-Projects or in Scripts in package.json](#using-shell-commands-in-js-projects-or-in-scripts-in-packagejson)
    - [ShellJS](#shelljs)
    - [Shx](#shx)
    - [Difference Between ShellJS and shx](#difference-between-shelljs-and-shx)
  - [Time Measurement with Gnomon](#time-measurement-with-gnomon)

<!-- /code_chunk_output -->

## Using Shell Commands in JS-Projects or in Scripts in package.json

### ShellJS

ShellJS is a portable (Windows/Linux/OS X) implementation of Unix shell commands on top of the Node.js API. You can use it to eliminate your shell script’s dependency on Unix while still keeping its familiar and powerful commands. You can also install it globally so you can run it from outside Node projects – say goodbye to those gnarly Bash scripts!

    $ npm install [-g] shelljs

### Shx

shx is a wrapper around [ShellJS](https://github.com/shelljs/shelljs) Unix commands, providing an easy solution for simple Unix-like, cross-platform commands in npm package scripts.

npm install shx --save-dev

### Difference Between ShellJS and shx

- **ShellJS**: Good for writing long scripts, all in JS, running via NodeJS (e.g. node myScript.js).
- **shx**: Good for writing one-off commands in npm package scripts (e.g. `"clean": "shx rm -rf out/"`).

## Time Measurement with Gnomon

A command line utility, a bit like moreutils’s ts, to prepend timestamp information to the standard output of another command. Useful for long-running processes where you’d like a historical record of what’s taking so long.

[Gnomon - Npm](https://www.npmjs.com/package/gnomon)
