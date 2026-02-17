---
title: "Example Markdown Configuration for Pandoc"
output:
  pdf_document:
    toc: true
    highlight: tango
    keep_tex: true
    pdf_engine: xelatex
    number_sections: true
pandoc_args:
  - "--pdf-engine=xelatex"
  - "--highlight-style=tango"
  - "--number-sections"
  - "--listings"
geometry:
  - a4paper
  - left=2cm
  - top=1.7cm
  - right=1.5cm
  - bottom=1.2cm
header-includes:
  - |
    ```{=latex}
    \usepackage{xcolor}
    \usepackage{fontspec}
    \usepackage{fvextra}
    \usepackage{caption}
    \usepackage{longtable}
    \usepackage{fancyvrb}
    \usepackage{upquote}
    \setmonofont{JetBrains Mono}
    \DefineVerbatimEnvironment{Highlighting}{Verbatim}{commandchars=\\\{\},breaklines=true,breakanywhere=true,numbers=left,numbersep=5pt,frame=single}
    \renewcommand{\theFancyVerbLine}{\textcolor{gray}{\tiny\arabic{FancyVerbLine}}}
    \usepackage{hyperref}
    \definecolor{linkcolor}{RGB}{0,0,255}
    \hypersetup{
        colorlinks=true,
        linkcolor=linkcolor,
        filecolor=linkcolor,
        urlcolor=linkcolor,
        citecolor=linkcolor
    }
    \let\oldhref\href
    \renewcommand{\href}[2]{\oldhref{#1}{\textcolor{linkcolor}{#2}}}
    \usepackage{listings}
    ```
---

# Pandoc

See the *source code of this Markdown file* to see the configuration settings. **The order within YAML-Block is important!**

## Install Fonts

### Notos Color Emoji

```bash
# MacOS
brew tap homebrew/cask-fonts
brew install --cask font-noto-color-emoji
```

### JetBrains Mono

```bash
# MacOS
cd ~/Downloads
curl -LO https://download.jetbrains.com/fonts/JetBrainsMono-2.242.zip
unzip JetBrainsMono-2.242.zip
mv JetBrainsMono-2.242/variable_ttf/JetBrainsMono-*.ttf ~/Library/Fonts/
```

## Install Graphviz & Pandoc Filters

```bash
# Install Graphviz
brew install graphviz

# Install Pandoc Filters
pip install pandoc-fignos
pip install dot2tex
```

## Install Pandoc

```bash
# Install pandoc
brew install pandoc

# Install MacTeX Full Version
Download here: https://tug.org/mactex/

# Install tlmgr (TeX Live Manager if not already installed)
wget https://mirror.ctan.org/systems/texlive/tlnet/update-tlmgr-latest.sh
sudo sh ./update-tlmgr-latest.sh

# Update Registries
sudo tlmgr option repository ctan


# Update Everything
sudo tlmgr update --self
sudo tlmgr update --all # takes time for the first time

# Search for installed packages
tlmgr list --only-installed
tlmgr list --only-installed | grep emoji

# Search for available packages
tlmgr search --global emoji

# Install the missing packages
sudo tlmgr install xetex # for xelatex
sudo tlmgr install framed # for boxes
sudo tlmgr install soul # for highlighting
sudo tlmgr install fvextra # for fancyvrb
sudo tlmgr install emoji # for emojis
sudo tlmgr install mdframed
sudo tlmgr install zref
sudo tlmgr install needspace
sudo tlmgr install titlesec
sudo tlmgr install footnotebackref
sudo tlmgr install newunicodechar
sudo tlmgr install graphviz
sudo tlmgr install dot2texi
sudo tlmgr install moreverb




```

## Useful Commands

```bash

# List all available extensions
pandoc --list-extensions=markdown

# Check if the package is installed
kpsewhich twemoji-colr.sty

# Check the main directory of TeX
kpsewhich -var-value TEXMFMAIN

# Find installed files (e.g. twemoji)
find /usr/local/texlive/2024/texmf-dist -name "twemoji*"

# Find Documentation
texdoc twemojis

# Dot2Tex Check
dot2tex --version # Dot2tex version 2.11.3
dot -V # dot - graphviz version 12.2.0 (20241103.1931)
```

## Simple Table Format for Pandoc

**Prettier has still problems with markdown-linters in VSCode**. If you use prettier, it changes its formatting and table is broken. Therefore **use markdownlint** instead and change the settings for markdown in **VSCode settings** to:

```json
  "[markdown]": {
    "editor.defaultFormatter": "DavidAnson.vscode-markdownlint",
    "editor.formatOnSave": true,
  },
```

To be absolutely sure, that `prettier` ignores all markdown files, add the following to your `.prettierignore` file:

```bash
*.md
```

So finally, you can use this beautiful pandoc table format (You have to set **pandoc** as your **default markdown renderer** in `markdown-preview-enhanced`):

```json
"markdown-preview-enhanced.enableCriticMarkupSyntax": true,
"markdown-preview-enhanced.enableExtendedTableSyntax": true,
"markdown-preview-enhanced.usePandocParser": true,
```

----------------------------------------------------------------------
 Centered   Default                    Right Left
  Header    Aligned                  Aligned Aligned
----------- ---------------- --------------- -------------------------
   First    row              12.0            Example of a row that
                                             spans multiple lines.

  Second    row              5.0             Here's another one. Note
                                             the blank line between
                                             rows.
----------------------------------------------------------------------

**GitHub cannot render the table correctly.**

## Pandoc Lua Filters

Pandoc Lua Filters are a powerful way to extend Pandoc. They are written in Lua and can be used to modify the abstract syntax tree (AST) that Pandoc uses to represent the document being converted. This allows you to customize look and feel, add metadata, and perform many other functions. Lua filters can be used with all of Pandoc’s input formats (Markdown, reStructuredText, HTML, LaTeX, etc.), and can produce any of its output formats (including native Haskell formats).

...

See [Pandoc Lua Filters](https://pandoc.org/lua-filters.html) for more details.

## Shared Options

See  <https://shd101wyy.github.io/markdown-preview-enhanced/#/pandoc-word?id=shared-options>

If you want to specify a set of default options to be shared by multiple documents within a directory you can include a file named `_output.yaml` within the directory. Note that no YAML delimiters or enclosing output object are used in this file. For example:

**\_output.yaml**

```
word_document:
  highlight: zenburn
```

All documents located in the same directory as `_output.yaml` will inherit it’s options. Options defined explicitly within documents will override those specified in the shared options file.
