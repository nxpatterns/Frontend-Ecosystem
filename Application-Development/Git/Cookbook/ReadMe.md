# Git

<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [First Steps](#first-steps)
  - [Configuration, Name, Email, Default branch](#configuration-name-email-default-branch)
  - [`.gitignore`](#gitignore)
  - [Be case-sensitive](#be-case-sensitive)

<!-- /code_chunk_output -->


## First Steps

### Configuration, Name, Email, Default branch

```shell
git config --global --edit // OR The following below
git config --global user.name mmustermann
git config --global user.email "max.mustermann@example.com"
```

To configure the initial branch name to use in all of your new repositories call ( names commonly chosen instead of `master` are `main`, `trunk` and `development`):

```shell
git config --global init.defaultBranch <name>
```

The just-created branch can be renamed via this command:

```shell
git branch -m <name>
```

### `.gitignore`

```.gitignore
folder/file.txt
generated/
*.backup
!someException.bak
```

### Be case-sensitive

```shell
# one-line:

sudo git config --unset-all core.ignorecase &&
  git config --system core.ignorecase false
```
