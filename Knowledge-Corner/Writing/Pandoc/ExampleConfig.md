---
title: "Example Markdown Configuration for Pandoc"
output:
  pdf_document:
    toc: true
    highlight: kate
    keep_tex: true
    pdf_engine: xelatex
    number_sections: true
pandoc_args:
  - "--pdf-engine=lualatex"
  - "--highlight-style=tango"
  - "--number-sections"
  - "--listings"
  - "--shift-heading-level-by=-1"
geometry:
  - a4paper
  - left=2cm
  - top=1.7cm
  - right=1.5cm
  - bottom=1.7cm
header-includes:
  - |
    ```{=latex}
    \usepackage{xcolor}
    \usepackage{fontspec}
    \usepackage{enumitem}
    \usepackage{fvextra}
    \usepackage{caption}
    \usepackage{longtable}
    \usepackage{fancyvrb}
    \usepackage{upquote}
    \usepackage{twemojis}
    \setmonofont{JetBrains Mono}
    \definecolor{codecolor}{HTML}{0d6ea4}
    \DefineVerbatimEnvironment{Highlighting}{Verbatim}{
        commandchars=\\\{\},
        breaklines=true,
        breakanywhere=true,
        numbers=left,
        numbersep=5pt,
        frame=none,
        xleftmargin=2em,
        formatcom=\color{codecolor}
    }
    \renewcommand{\theFancyVerbLine}{\textcolor{gray}{\tiny\arabic{FancyVerbLine}}}
    \usepackage{hyperref}
    \definecolor{linkcolor}{HTML}{0d6ea4}
    \hypersetup{
        colorlinks=true,
        linkcolor=linkcolor,
        filecolor=linkcolor,
        urlcolor=linkcolor,
        citecolor=linkcolor
    }
    \let\oldhref\href
    \renewcommand{\href}[2]{\oldhref{#1}{\textcolor{linkcolor}{\textbf{#2}}}}
    \usepackage{listings}
    \usepackage{zref-abspage}
    \usepackage{mdframed}
    \definecolor{lightbackground}{HTML}{edf6ff}
    \definecolor{darkbackground}{HTML}{189cff}
    \newenvironment{myquote}{%
      \vspace{16pt}%
      \begin{mdframed}[backgroundcolor=lightbackground,leftmargin=0.5cm,linewidth=4pt,leftline=true,rightline=false,topline=false,bottomline=false,linecolor=darkbackground]%
      \bfseries}
    {\end{mdframed}\vspace{16pt}}
    \renewenvironment{quote}{\begin{myquote}}{\end{myquote}}
    \usepackage{parskip}
    \makeatletter
    \renewcommand\paragraph{\@startsection{paragraph}{4}{\z@}%
      {-3.25ex\@plus -1ex \@minus -.2ex}%
      {1.5ex \@plus .2ex}%
      {\normalfont\normalsize\bfseries}}
    \renewcommand\subparagraph{\@startsection{subparagraph}{5}{\z@}%
      {-3.25ex\@plus -1ex \@minus -.2ex}%
      {1.5ex \@plus .2ex}%
      {\normalfont\normalsize\bfseries}}
    \makeatother
    \usepackage[bottom]{footmisc}
    \setlength{\footnotesep}{20pt}
    \addtolength{\skip\footins}{10pt}
    \newcommand{\alert}{\twemoji{1f6a8}\space}
    \newcommand{\alerttext}{\texttwemoji{1f6a8}\space}
    \newcommand{\alertbig}{\twemoji[height=2em]{1f6a8}\space}
    \directlua{luaotfload.add_fallback
      ("emojifallback",
        {
          "NotoColorEmoji:mode=harf;"
        }
      )}

    \setmainfont{Latin Modern Roman}[
      RawFeature={fallback=emojifallback}
    ]

    \makeatletter
    \renewcommand{\labelitemi}{---}
    \AtBeginDocument{
        \setlist[itemize,enumerate]{
            topsep=0.5em,
        }
    }
    \renewcommand{\tightlist}{
      \setlength{\itemsep}{0.25em}
      \setlength{\parskip}{0.25em}
    }
    \makeatother

    ```
---

# Example Configuration for Pandoc

> See the *source code of this Markdown file* to see the configuration settings. **Die Reihenfolge im YAML-Block ist sehr wichtig!**

\clearpage

## Introduction

This is an example Markdown configuration file with colored links and highlighted code using JetBrains Mono font[^longnote].

[^longnote]: You have to open this file in a text editor to see the configuration settings.
  BTW: This is a long footnote.

The configuration settings are placed in a so called YAML front matter block at the beginning of the file. The settings are used by the Pandoc document converter to create a PDF file from this Markdown file.

## PDF Generation

If you use assets folder, then better change to the directory, where the markdown file is located and run the following command:

```bash
pandoc ExampleConfig.md \
  --pdf-engine=lualatex \
  --pdf-engine-opt=-shell-escape \
  --lua-filter=graphviz-svg.lua \
  --toc=true \
  --toc-depth=5 \
  --highlight=kate \
  --number-sections \
  -f markdown+emoji+pipe_tables+raw_html \
  --shift-heading-level-by=-1 \
  -s -o ExampleConfig.pdf
```

## Emojis

💣 👀 😇 🤭 💡 ✅ 🏆 💥 ⚠️ 🧨 🎯 🚫 🔑 🔥

- `\alertbig`: \alertbig
- `\texttwemoji{smile}`: \texttwemoji{smile}

You can create custom commands for emojis like this, see [Pandoc/Offical-Documentations/twemojis.pdf](Offical-Documentations/twemojis.pdf).

```yaml
  % Light bulb (idea) - 1f4a1
  \newcommand{\idea}{\twemoji{1f4a1}\space}
  \newcommand{\ideatext}{\texttwemoji{1f4a1}\space}
  \newcommand{\ideabig}{\twemoji[height=2em]{1f4a1}\space}
```

## Highlighted Code

```yaml
highlight:
  - tango       # Current
  - pygments    # Python-style
  - kate        # KDE editor style
  - monochrome  # Black and white
  - espresso    # Dark theme
  - zenburn     # Low contrast dark
  - haddock     # Haskell docs style
  - breezedark  # KDE Breeze dark
  - vs          # Visual Studio style
  - github      # GitHub style
  - monokai     # Sublime Text default
  - dracula     # Dark theme popular in VS Code
```

## Links

Here's a [blue link to Google](https://www.google.com).

## Lists

### Unordered List

- Item 1
  - Subitem 1
    - Subsubitem 1
      - Subsubsubitem 1
      - Subsubsubitem 2
- Item 2
  - Subitem 1
  - Subitem 2
    - Subsubitem 1
- Item 3
  - Subitem 1

### Ordered List

1. Item 1
   1. Subitem 1
      1. Subsubitem 1
         1. Subsubsubitem 1
         2. Subsubsubitem 2
2. Item 2
    1. Subitem 1
    2. Subitem 2
        1. Subsubitem 1
3. Item 3
    1. Subitem 1

### Configuration

```yaml
  \makeatletter
  \renewcommand{\labelitemi}{---}
  \AtBeginDocument{
      \setlist[itemize,enumerate]{
          topsep=0.5em,    % Space before and after the list
      }
  }
  \renewcommand{\tightlist}{
    \setlength{\itemsep}{0.25em}   % Space between items
    \setlength{\parskip}{0.25em}   % Paragraph spacing within items
  }
  \makeatother
```

## Graphviz

```graphviz
digraph {
  rankdir=LR;
  nodesep=0.5;
  edge [dir=none];

  subgraph MyGraph {
    node [shape=circle, style=filled width=0.2 label=""]


    subgraph cluster_0 {
      label="Some &rarr; Text"
      labelloc="b"
      style=filled
      bgcolor="#c9dbd7"
      color="#c9dbd7"
      node [shape=box fillcolor="white" label="Some\nDescription"] E;
      node [shape=circle fillcolor="#bcc7d3" label=""] p1 p2 p3
    }

    subgraph cluster_1 {
      label="Level 1"
      labelloc="b"
      style=filled
      bgcolor="#bcc7d3"
      color="#bcc7d3"
      node [fillcolor="#e8ddcc"] r1 r2 r3;
    }

    subgraph cluster_2 {
      label="Level 2"
      labelloc="b"
      style=filled
      bgcolor="#e8ddcc"
      color="#e8ddcc"
      node [fillcolor="#ffdbd0"] s1 s2 s3;
    }

    subgraph cluster_3 {
      label="Level 3"
      labelloc="b"
      style=filled
      bgcolor="#eddbd0"
      color="#eddbd0"
      node [fillcolor="#c9dbd7"] t1 t2 t3;
    }

    E -> { p1 p2 p3}
    p3 -> {r1 r2 r3}
    r1 -> {s1 s2 s3}
    s3 -> {t1 t2 t3}
  }
}

```

## Block Quotes

Here's a block quote:

> This is a block quote.

## Code Highlighting

### Within single backticks

Here's an example `inline code` in JetBrains Mono.

### Python Code

Here's an example of Python code with syntax highlighting in JetBrains Mono:

```python
def greet(name):
```

### TypeScript Code

Here's an example of TypeScript code with syntax highlighting in JetBrains Mono:

```typescript
function greet(name: string): void {
  console.log(`Hello, ${name}!`);
}
```

### Bash & Shell

And here's some bash code:

```bash
# bash code
echo "Hello, World!"
for i in {1..5}
do
   echo "Count: $i"
done
```

## Nested Headings

### Third Level

Some third level text.

#### Fourth Level

Some fourth level text.

##### Fifth Level

Some fifth level text.

## Ditaa

[https://github.com/stathissideris/ditaa](https://github.com/stathissideris/ditaa)

```ditaa {kroki=true}
+--------+   +-------+    +--------+
|        +---+ ditaa +--->*        |
|  Text  |   +-------+    |diagram |
|Document|   |!magic!|    |        |
|     {d}|   |       |    |        |
+-+-+----+   +-------+    +------+-+
  |  :                         ^ |
  |  |       Lots of work      | |
  |  +-------------------------+ |
  \------------------------------/

+---------+  /--------\   +-------+
| cBLU    +--+cAAA    +---+Version|
|         |  |  Data  |   |   V3  |
|    +----+  |  Base  |   |cRED{d}|
|    |cPNK|  |     {s}|   +-------+
|    |    |  \---+----/
+----+----+

/--+
|  |
+--/

+-----+ +-----+ +-----+ +-----+ +-----*-----+
|{d}  | |{s}  | |{io} | |{o}  | |{c}        |
|     | |     | |     | |     | *   yes/no  *
|     | |     | |     | |     | |           |
+-----+ +-----+ +-----+ +-----+ +-----*-----+

*----*
|    |      /--*
*    *      |
|    |  -*--+
*----*

/-----------------\
| Things to do    |
| cGRE            |
| - Cut the grass |
| - Buy jam       |
| - Fix car       |
| - Make website  |
\-----------------/





```

## TODOs

### Experiment with Fontsizes

```yaml
\usepackage{anyfontsize}
\fontsize{13pt}{15.6pt}\selectfont
```
