# n Package Manager Cookbook zShell

<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Version Change without Admin Rights](#version-change-without-admin-rights)
  - [Create a new directory for n's Node versions](#create-a-new-directory-for-ns-node-versions)
  - [Change the N_PREFIX environment variable](#change-the-n_prefix-environment-variable)
  - [Restart your shell session and reset the location hash](#restart-your-shell-session-and-reset-the-location-hash)
- [Installation without Admin Rights](#installation-without-admin-rights)
  - [New directory for global packages](#new-directory-for-global-packages)
  - [Configure npm to use this directory](#configure-npm-to-use-this-directory)
  - [Update your environment variable](#update-your-environment-variable)
  - [Save & Restart your shell session](#save--restart-your-shell-session)
- [Optional Homebrew Related Steps (if previously installed)](#optional-homebrew-related-steps-if-previously-installed)
  - [Show Existing Symlinks](#show-existing-symlinks)
  - [Remove Symlinks](#remove-symlinks)
  - [Remove Homebrew Node Modules](#remove-homebrew-node-modules)

<!-- /code_chunk_output -->

## Version Change without Admin Rights

If you're using n for Node version management and you're getting a permission error when trying to change the Node version, you can fix this by changing the location where n stores Node versions. Here are the steps to set this up:

### Create a new directory for n's Node versions

```shell
mkdir -p ~/.n
```

### Change the N_PREFIX environment variable
We need to change the N_PREFIX environment variable in your shell configuration file to point to the new directory. Since your shell is zsh, the configuration file is ~/.zshrc. Add the following lines to this file:

```shell
export N_PREFIX="$HOME/n"
export PATH="$N_PREFIX/bin:$PATH"
```

### Restart your shell session and reset the location hash

```shell
zsh -l
hash -r
```

## Installation without Admin Rights

To fix the issue with requiring admin rights when using n for Node version management and installing new npm packages, you can change the location where global packages are stored. This way, you won't need sudo to install global npm packages. Here are the steps to set this up:

### New directory for global packages

Create a new directory for global packages:

```shell
mkdir -p ~/.npm-global
```

### Configure npm to use this directory

Configure npm to use this directory for global packages:

```shell
npm config set prefix '~/.npm-global'
```

### Update your environment variable

Add the new path to your environment variable by opening your .bash_profile (or .zshrc if you're using zsh) and adding the following line:

```shell
export PATH=~/.npm-global/bin:$PATH
```

### Save & Restart your shell session

Save the changes and close the file.

Update your shell session:

```shell
zsh -l
```

After completing these steps, you should be able to install global npm packages without admin rights. Try installing a global package again to see if the issue is resolved:

```shell
npm i -g typescript
```

## Optional Homebrew Related Steps (if previously installed)

### Show Existing Symlinks

```shell
ls -l /opt/homebrew/bin | grep '../lib/node_modules'
```

### Remove Symlinks

```shell
find /opt/homebrew/bin -lname '../lib/node_modules/*' -delete
```

### Remove Homebrew Node Modules

```shell
rm -rf /opt/homebrew/lib/node_modules
```
