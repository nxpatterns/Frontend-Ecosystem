# CloudFoundry

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [CloudFoundry](#cloudfoundry)
  - [Cloud Foundry](#cloud-foundry)
    - [Login (MacOS/Zsh)](#login-macoszsh)
    - [Spaces](#spaces)
    - [Target](#target)
    - [Apps](#apps)
    - [Logs](#logs)

<!-- /code_chunk_output -->

## Cloud Foundry

### Login (MacOS/Zsh)

Better create an alias in zsh (within company network, you can use the key `--skip-ssl-validation`)

```shell
alias cfl2="cf login -a <SERVER> -u <USERNAME> \
  -p $(security find-generic-password -w -s \
  'CloudFoundry'  -a '<USERNAME>') --skip-ssl-validation"
```

You have to add your password to KeyChain before:

```shell
sudo security add-generic-password -s \
  'CloudFoundry'  -a '<USERNAME>' -w '<PASSWORD>'
```

### Spaces

```shell
cf spaces
cf t -s <egMYSPACE>          # changes the space (target set space <egMYSPACE>)
```

### Target

```shell
cf t                         # shows current target
```

### Apps

```shell
cf apps                      # shows the apps in the current space
cf delete <APPNAME>          # deletes the app
```

### Logs

```shell
cf logs <APPNAME>            # shows logs for <APPNAME>
cf logs <APPNAME> --recent   # shows recent logs for <APPNAME>
```
