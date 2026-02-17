# Madge - Dependency Graph

## Basic Usage

```shell

# Install madge
npm -g install madge

# Install graphviz
brew install graphviz

# Angular Project
mkdir tmp
madge ./src/main.ts # lists all files to be processed (optional)
madge -i ./tmp/img.png  --ts-config ./tsconfig.json ./src/main.ts

```
