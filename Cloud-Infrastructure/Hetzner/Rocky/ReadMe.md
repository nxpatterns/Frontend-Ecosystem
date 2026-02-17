# Rocky

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Rocky](#rocky)
  - [Create Server](#create-server)
  - [Login](#login)
  - [Install Packages 📦](#install-packages-)
    - [Add additional Repositories](#add-additional-repositories)
    - [List Repositories](#list-repositories)
    - [List Packages](#list-packages)

<!-- /code_chunk_output -->

## Create Server

Via Hetzner Cloud Console and

create & upload your 🔑 SSH key:

```shell
ssh-keygen -t rsa -b 4096 -C "my@email.domain" -f ~/.ssh/path key-name
pbcopy < ~/.ssh/path/key-name.pub
```

&#128204; Add **no** `server init config` first.

## Login

```shell
ssh -i ~/.ssh/key root@<IP>
```

## Install Packages 📦

### Add additional Repositories

⚠️ Add at the beginning **only the EPEL repository**. The other repositories (Remi or RPM) will be added if needed.

```shell
dnf install epel-release
```

### List Repositories

```shell
dnf repolist
```

### List Packages

```shell
dnf list # All
dnf list installed # Installed
```
