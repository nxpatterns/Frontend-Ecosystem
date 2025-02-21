# Windows

<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Install Chocolatey](#install-chocolatey)
- [Linux look and feel environment for Windows](#linux-look-and-feel-environment-for-windows)
- [Kill Port Process](#kill-port-process)
- [Proxy Server With Credentials](#proxy-server-with-credentials)
- [Proxy Server - Without Credentials](#proxy-server---without-credentials)
  - [Tunneling through a socks proxy](#tunneling-through-a-socks-proxy)
- [Setting Environment Variables with Rapid Environment Editor](#setting-environment-variables-with-rapid-environment-editor)
- [Install Build Tools for NPM](#install-build-tools-for-npm)
- [Set Proxy for NPM](#set-proxy-for-npm)
- [Set Proxy for Git](#set-proxy-for-git)
- [Additional Recommended Programms](#additional-recommended-programms)
  - [Additional Software for Markdown Preview Enhanced](#additional-software-for-markdown-preview-enhanced)
    - [Install Pandoc](#install-pandoc)
  - [Screenshots with Greenshot](#screenshots-with-greenshot)

<!-- /code_chunk_output -->

## Install Chocolatey

```shell
# Run as admin from a directory (e.g. C:\Temp)
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

choco upgrade chocolatey
```

## Linux look and feel environment for Windows

```shell
choco install cygwin
```

## Kill Port Process

```bash
#1 find process id
netstat -ano | findstr :8081

# kill process
taskkill /pid 12345 /f
```

## Proxy Server With Credentials

Start Powershell with admin rights and:

    netsh winhttp import proxy source=ie
    $Wcl=New-Object System.Net.WebClient
    $Creds=Get-Credential
    $Wcl.Proxy.Credentials=$Creds

## Proxy Server - Without Credentials

Start Powershell with admin rights and:

    netsh winhttp set proxy <Proxyserver:Port>
    netsh winhttp import proxy source=ie
    netsh winhttp set proxy <Proxyserver:Port> bypass-list="*.mydomain.intern"
    netsh winhttp show proxy
    netsh winhttp reset proxy  // Remove all

### Tunneling through a socks proxy

    netsh winhttp set proxy proxy-server="socks=localhost:9090" bypass-list="localhost"

## Setting Environment Variables with Rapid Environment Editor

[https://www.rapidee.com/en/download](https://www.rapidee.com/en/download)

## Install Build Tools for NPM

    npm i -g --production windows-build-tools

## Set Proxy for NPM

    npm config set proxy http://---myproxy---:PORT
    npm config set https-proxy http(s)://---myproxy---:PORT

## Set Proxy for Git

    git config --global http.proxy http://---myproxy---:PORT

## Additional Recommended Programms

### Additional Software for Markdown Preview Enhanced

#### Install Pandoc

Download here: <https://github.com/jgm/pandoc/releases/>

### Screenshots with Greenshot

Donwload here: <https://getgreenshot.org/downloads/>
