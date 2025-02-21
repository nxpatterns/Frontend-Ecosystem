# Windows Setup

If you want to use Windows as your primary development environment, you can use Windows Subsystem for Linux (WSL) to run a Linux distribution on Windows. This will allow you to use the same tools and commands as you would on a Linux machine and everything will work the same way.

<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Install WSL](#install-wsl)
- [Install Basic Packages](#install-basic-packages)
  - [Install "Oh My Zsh"](#install-oh-my-zsh)
    - [Configure Zsh](#configure-zsh)
- [Configure Git in WSL Terminal](#configure-git-in-wsl-terminal)
- [Set Name Server](#set-name-server)
  - [Edit wsl.conf](#edit-wslconf)
  - [Edit resolv.conf](#edit-resolvconf)
  - [Restart Shell](#restart-shell)
- [Create a personal access token (Azure DevOps)](#create-a-personal-access-token-azure-devops)
- [Set VSCode as Standard Editor as Superuser in WSL Terminal](#set-vscode-as-standard-editor-as-superuser-in-wsl-terminal)
- [Install NVM](#install-nvm)
  - [Install and Activate Node.js](#install-and-activate-nodejs)
- [Install Rust Compiler (Needed for WebiaAI)](#install-rust-compiler-needed-for-webiaai)
- [Install Anaconda](#install-anaconda)
  - [Modified .zshrc](#modified-zshrc)
  - [Conda Create & Activate Environment](#conda-create--activate-environment)

<!-- /code_chunk_output -->

## Install WSL

```shell
wsl --install -d Debian # Same on the Server
```

You will need to set a new username and password for the new Linux distribution. This username and password are separate from your Windows username and password. You will need to install many packages, choose a memorable username and password.

## Install Basic Packages

```shell
sudo apt install zsh  # Install Zsh
sudo apt install curl # Install Curl
sudo apt install wget # Install Wget
sudo apt install git  # Install Git
```

### Install "Oh My Zsh"

Install and change the default shell to Zsh:

```shell
 sh -c "$(wget https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh -O -)"
```

#### Configure Zsh

```shell
code ~/.zshrc # That will install VSCode Server for WSL
```

And make the following changes:

```shell
export ZSH="$HOME/.oh-my-zsh"
ZSH_THEME="agnoster"
ENABLE_CORRECTION="true"
DISABLE_UNTRACKED_FILES_DIRTY="true"
HIST_STAMPS="yyyy/mm/dd"
COMPLETION_WAITING_DOTS="%F{yellow}waiting...%f"
plugins=(
    git
    zsh-syntax-highlighting
    zsh-autosuggestions
  )

source $ZSH/oh-my-zsh.sh
export LANG=en_US.UTF-8

if [[ -n $SSH_CONNECTION ]]; then
    export EDITOR='code'
else
    export EDITOR='code'
fi


```

and restart the terminal:

```shell
zsh -l
```

**You will get 2 errors:**

```shell
[oh-my-zsh] plugin 'zsh-syntax-highlighting' not found
[oh-my-zsh] plugin 'zsh-autosuggestions' not found
```

**Now we will add them:**

```shell
# Install zsh-syntax-highlighting
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting

# Install zsh-autosuggestions
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions

# Reload the terminal
zsh -l
```

You should see now a beautiful terminal.

## Configure Git in WSL Terminal

```shell
git config --global user.name "Your Name"
git config --global user.email "Your Email"
```

## Set Name Server

If you're working in Linux, it's useful to understand your environment, including the DNS server, since it's key for web applications. To use the same DNS server in WSL as on your Windows machine:

Open a normal Command Prompt in Windows (not WSL Terminal) and run the command:

```shell
ipconfig /all
```

In the "DNS Servers" section, you'll find the DNS server addresses for your current network device as used by your Windows machine. It appears as follows:

```shell
DNS Servers ...........: <IPv6 Address>
                         <IPv4 Address>

```

You can apply these values in WSL as well. Open a WSL terminal and proceed with the following steps.

### Edit wsl.conf

```shell
sudo nano /etc/wsl.conf
```

And add the following (so that WSL does not overwrite the resolv.conf file):

```shell
[network]
generateResolvConf = false
```

### Edit resolv.conf

```shell
sudo nano /etc/resolv.conf
```

In the previous step, you have seen the DNS servers that your Windows machine is using. You can use them in WSL. Add them in this manner:

```shell
nameserver some IPv6 Address # (e.g. fe80::1%lo)
nameserver some IPv4 Address # (e.g. 1.1.1.1)
```

### Restart Shell

```shell
zsh -l
```

## Create a personal access token (Azure DevOps)

Here (set full access to the token) via personal settings: <https://dev.azure.com/YourOrganization/_usersSettings/tokens>

Then in your WSL Terminal:

```shell
git config --global credential.helper store # Will store your token encrypted
```

Then you can add, commit and push normally. The first time you push, you will be asked for your password and you use your newly created "personal access token". After that, it will be stored.

```shell
git add .
git commit -m "Your Message"
git push # Will ask for your password, use your personal access token
```

## Set VSCode as Standard Editor as Superuser in WSL Terminal

Not recommended (Because of security risks and temporary write issues)! But if you want to set VSCode as the standard editor in WSL, you can do it as follows:

```shell
sudo apt install whereis
whereis code # Find the path to the code executable
sudo update-alternatives --install /usr/bin/editor editor "<path zu vscode>" 50
sudo update-alternatives --config editor
```

## Install NVM

```shell
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
```

```shell
=> If you wish to uninstall them at a later point (or re-install them under your
=> `nvm` Nodes), you can remove them from the system Node as follows:

     $ nvm use system
     $ npm uninstall -g a_module

=> Close and reopen your terminal to start using nvm or run the following to use it now:

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
```

and restart the terminal:

```shell
zsh -l
```

### Install and Activate Node.js

```shell
nvm install --lts
nvm use --lts

# Now using node v20.12.1 (npm v10.5.0)
```

## Install Rust Compiler (Needed for WebiaAI)

```shell
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
info: downloading installer

Welcome to Rust!

This will download and install the official compiler for the Rust
programming language, and its package manager, Cargo.

Rustup metadata and toolchains will be installed into the Rustup
home directory, located at:

  /home/webia2/.rustup

This can be modified with the RUSTUP_HOME environment variable.

The Cargo home directory is located at:

  /home/webia2/.cargo

This can be modified with the CARGO_HOME environment variable.

The cargo, rustc, rustup and other commands will be added to
Cargo's bin directory, located at:

  /home/webia2/.cargo/bin

This path will then be added to your PATH environment variable by
modifying the profile files located at:

  /home/webia2/.profile
  /home/webia2/.bashrc
  /home/webia2/.zshenv

You can uninstall at any time with rustup self uninstall and
these changes will be reverted.

Current installation options:


   default host triple: x86_64-unknown-linux-gnu
     default toolchain: stable (default)
               profile: default
  modify PATH variable: yes

1) Proceed with standard installation (default - just press enter)
2) Customize installation
3) Cancel installation

Rust is installed now. Great!

To get started you may need to restart your current shell.
This would reload your PATH environment variable to include
Cargo's bin directory ($HOME/.cargo/bin).

To configure your current shell, you need to source
the corresponding env file under $HOME/.cargo.

This is usually done by running one of the following (note the leading DOT):
. "$HOME/.cargo/env"            # For sh/bash/zsh/ash/dash/pdksh
source "$HOME/.cargo/env.fish"  # For fish

```

```shell
. "$HOME/.cargo/env"

```

executes the `env` script located in the `.cargo` directory within your home directory, in the current shell session. This script sets up environment variables so that Rust commands like `rustc`, `cargo`, and others that come with your Rust installation, are available directly in the shell. The dot (.) at the beginning is an alias for the source command in Bash and other Bourne-like shells, meaning it executes the script in the current shell environment without starting a new subshell.

This command is particularly useful for activating the Rust environment in your current terminal session, especially after installing Rust with rustup, or when opening a new terminal window and finding Rust commands are not available because the environment variables have not yet been set.

## Install Anaconda

Download here: <https://www.anaconda.com/download#downloads>

and copy it into `~/downloads` and install it:

```shell
bash Anaconda3-2024.02-1-Linux-x86_64.sh

Welcome to Anaconda3 2024.02-1

In order to continue the installation process, please review the license
agreement. Please, press ENTER to continue
...
...
Do you accept the license terms? [yes|no]

yes

Anaconda3 will now be installed into this location:
/home/<username>/anaconda3

  - Press ENTER to confirm the location
  - Press CTRL-C to abort the installation
  - Or specify a different location below

enter

[/home/webia2/anaconda3] >>>
PREFIX=/home/webia2/anaconda3
```

### Modified .zshrc

```shell
# >>> conda initialize >>>
# !! Contents within this block are managed by 'conda init' !!
__conda_setup="$('/home/<user>/anaconda3/bin/conda' 'shell.zsh' 'hook' 2> /dev/null)"
if [ $? -eq 0 ]; then
    eval "$__conda_setup"
else
    if [ -f "/home/<user>/anaconda3/etc/profile.d/conda.sh" ]; then
        . "/home/<user>/anaconda3/etc/profile.d/conda.sh"
    else
        export PATH="/home/<user>/anaconda3/bin:$PATH"
    fi
fi
unset __conda_setup
# <<< conda initialize <<<
```

### Conda Create & Activate Environment

```shell
conda create --name myenv python=3

conda activate myenv
```
