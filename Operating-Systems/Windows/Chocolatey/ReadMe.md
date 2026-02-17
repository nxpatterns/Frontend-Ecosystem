# Chocolatey

Chocolatey is a package manager for Windows. It allows you to quickly install applications and tools using a decentralized framework. It is built on the NuGet infrastructure and uses PowerShell to deliver packages.

<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Install Chocolatey](#install-chocolatey)
- [Install a package](#install-a-package)
- [Uninstall a package](#uninstall-a-package)
- [Update a package](#update-a-package)
- [List installed packages](#list-installed-packages)
- [Search for a package](#search-for-a-package)
- [Show package information](#show-package-information)
- [Show package version](#show-package-version)
- [Show Chocolatey version](#show-chocolatey-version)
- [Show Chocolatey GUI](#show-chocolatey-gui)
- [Show Chocolatey GUI version](#show-chocolatey-gui-version)
- [Update Chocolatey](#update-chocolatey)
- [Uninstall Chocolatey](#uninstall-chocolatey)
- [Show Chocolatey Community Repository](#show-chocolatey-community-repository)
- [Show Chocolatey Documentation](#show-chocolatey-documentation)

<!-- /code_chunk_output -->

## Install Chocolatey

```powershell
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))
```

## Install a package

```powershell
choco install <package-name>
```

## Uninstall a package

```powershell
choco uninstall <package-name>
```

## Update a package

```powershell
choco upgrade <package-name>
```

## List installed packages

```powershell
choco list --local-only
```

## Search for a package

```powershell
choco search <package-name>
```

## Show package information

```powershell
choco info <package-name>
```

## Show package version

```powershell
choco list --local-only --exact <package-name>
```

## Show Chocolatey version

```powershell
choco -v
```

## Show Chocolatey GUI

```powershell
choco install chocolateygui
```

## Show Chocolatey GUI version

```powershell
choco list --local-only --exact chocolateygui
```

## Update Chocolatey

```powershell
choco upgrade chocolatey
```

## Uninstall Chocolatey

```powershell
choco uninstall chocolatey
```

## Show Chocolatey Community Repository

[Chocolatey Community Repository](https://chocolatey.org/packages)

## Show Chocolatey Documentation

[Chocolatey Documentation](https://chocolatey.org/docs)
