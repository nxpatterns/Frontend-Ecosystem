# MacOS Related

<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Install Brew](#install-brew)
- [Add Homebrew to PATH (zsh)](#add-homebrew-to-path-zsh)
- [Beatiful Zsh - OhMyZsh](#beatiful-zsh---ohmyzsh)
  - [Install Plugins](#install-plugins)
- [Change Default Shell (if an older apple machine)](#change-default-shell-if-an-older-apple-machine)
- [Command Line](#command-line)
  - [Show Start-Up Apps](#show-start-up-apps)
  - [Remove Start-Up Apps](#remove-start-up-apps)
- [Prevent Indexing External Hard Disks](#prevent-indexing-external-hard-disks)
  - [Delete Existing Spotlight Index](#delete-existing-spotlight-index)
  - [Disable Creating .ds_store Files on external drives](#disable-creating-ds_store-files-on-external-drives)
- [Replace Python 2 through Python 3](#replace-python-2-through-python-3)
- [Python & tcl-tk](#python--tcl-tk)
- [Turn Off Screen if connected to external monitors](#turn-off-screen-if-connected-to-external-monitors)
- [Show Hidden Files in Finder - Shortcut](#show-hidden-files-in-finder---shortcut)
- [Show Hidden Files in Finder](#show-hidden-files-in-finder)
- [Change Screenshots Folder](#change-screenshots-folder)
- [Show the Path in the Finder Title Bar](#show-the-path-in-the-finder-title-bar)
- [Install Calibre (eBook: epub, mobi,..)](#install-calibre-ebook-epub-mobi)
  - [Download and Install](#download-and-install)
  - [Create a SymLink For Markdown Preview Enhanced Exports](#create-a-symlink-for-markdown-preview-enhanced-exports)
- [icu4c](#icu4c)
- [zshrc](#zshrc)

<!-- /code_chunk_output -->

## Install Brew

    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

## Add Homebrew to PATH (zsh)

    echo 'eval $(/opt/homebrew/bin/brew shellenv)' >> /Users/user/.zprofile
    eval $(/opt/homebrew/bin/brew shellenv)

## Beatiful Zsh - OhMyZsh

shows then only ~ without user@machine and with Git-Info

    # INSTALL
    sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

    # SET THEME .zshrc
    ZSH_THEME="agnoster"

    # Comment prompt_context in
    # userdir/.oh-my-zsh/themes/agnoster.zsh-theme

    build_prompt() {
     RETVAL=$?
     prompt_status
     prompt_virtualenv
     prompt_aws
     # prompt_context    <----------- HERE
     prompt_dir
     prompt_git
     prompt_bzr
     prompt_hg
     prompt_end
    }

### Install Plugins

```shell
# .zshrc
plugins=(
  git
  zsh-autosuggestions
  sudo
  dirhistory
)
```

```shell
git clone https://github.com/zsh-users/zsh-autosuggestions ~/.oh-my-zsh/custom/plugins/zsh-autosuggestions

git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ~/.oh-my-zsh/custom/plugins/zsh-syntax-highlighting

source ~/.zshrc

```

## Change Default Shell (if an older apple machine)

New machines have all zsh already!.

    chsh -s /bin/zsh
    chsh -s /bin/bash
    ...

## Command Line

### Show Start-Up Apps

```shell
launchctl list # or
osascript -e 'tell application "System Events" to get every login item'
```

### Remove Start-Up Apps

```shell
launchctl remove com.apple.finder
osascript -e 'tell application "System Events" to delete login item "App Name"' # e.g.
tell application "System Events" to delete login item "FigmaAgent"
```

## Prevent Indexing External Hard Disks

      sudo mdutil -i off /Volumes/ExternalDriveName
      sudo touch /Volumes/EXTERNAL/.metadata_never_index

### Delete Existing Spotlight Index

    sudo mdutil -E /Volumes/ExternalDriveName # or
    sudo rm -rfv /.Spotlight-V100 # on the external drive

### Disable Creating .ds_store Files on external drives

    defaults write com.apple.desktopservices DSDontWriteNetworkStores -bool true
    defaults write com.apple.desktopservices DSDontWriteUSBStores -bool true

## Replace Python 2 through Python 3

    echo 'export PATH="/opt/homebrew/opt/python3/libexec/bin"' >> ~/.zshrc

## Python & tcl-tk

If you need to have tcl-tk first in your PATH, run:

    echo 'export PATH="/opt/homebrew/opt/tcl-tk/bin:$PATH"' >> ~/.zshrc

For compilers to find tcl-tk you may need to set:

    export LDFLAGS="-L/opt/homebrew/opt/tcl-tk/lib"
    export CPPFLAGS="-I/opt/homebrew/opt/tcl-tk/include"

## Turn Off Screen if connected to external monitors

    sudo nvram boot-args="iog=0x0"  // OFF
    sudo nvram -d boot-args         // ON AGAIN

## Show Hidden Files in Finder - Shortcut

    Command + Shift + dot

## Show Hidden Files in Finder

    defaults write com.apple.finder AppleShowAllFiles YES
    killall Finder

## Change Screenshots Folder

    mkdir ~/Documents/Screenshots
    defaults write com.apple.screencapture location ~/Documents/Screenshots
    killall SystemUIServer

## Show the Path in the Finder Title Bar

    defaults write com.apple.finder _FXShowPosixPathInTitle -bool true;
    killall Finder

## Install Calibre (eBook: epub, mobi,..)

### Download and Install

[Calibre Download for macOS](https://calibre-ebook.com/download_osx)

### Create a SymLink For Markdown Preview Enhanced Exports

    sudo ln -s /Applications/calibre.app/Contents/MacOS/ebook-convert /usr/local/bin

## icu4c

    icu4c is keg-only, which means it was not symlinked into
    /usr/local, because macOS provides libicucore.dylib
    (but nothing else).

    If you need to have icu4c first in your PATH run:
      echo 'export PATH="/usr/local/opt/icu4c/bin:$PATH"' >> ~/.zshrc
      echo 'export PATH="/usr/local/opt/icu4c/sbin:$PATH"' >> ~/.zshrc

    For compilers to find icu4c you may need to set:
      export LDFLAGS="-L/usr/local/opt/icu4c/lib"
      export CPPFLAGS="-I/usr/local/opt/icu4c/include"

## zshrc

    # redefine prompt_context for hiding user@hostname
    prompt_context () { }
