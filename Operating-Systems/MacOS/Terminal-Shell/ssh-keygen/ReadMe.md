# ssh-keygen

## Generate a new SSH key

```shell
ssh-keygen -t rsa -b 4096 -C "<comment>"
ssh-keygen -t ed25519 -C "<comment>" # modern
```

## Copy the file content in the clipboard

```shell
pbcopy < ~/.ssh/id_ed25519.pub
```
