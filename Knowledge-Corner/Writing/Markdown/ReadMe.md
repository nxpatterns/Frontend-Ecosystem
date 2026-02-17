---
title: "Markdown"
output: pdf_document
toc: true
toc-depth: 6
number-sections: true
highlight-style: kate
---

# Markdown

E.g. **Markdown Preview Enhanced** is a powerful extension that enables you to preview markdown files, but also to export them in different formats, e.g. pdf, html, docx, etc.

> If you looking for pandoc go to pandoc section in this repo: `Pandoc/ReadMe.md`.

<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=4 orderedList=false} -->

<!-- code_chunk_output -->

- [Customize CSS](#customize-css)
- [Line Numbers in Code Blocks](#line-numbers-in-code-blocks)
- [Frontmatter](#frontmatter)
- [VSCode Extension](#vscode-extension)
  - [Markdown Preview Enhanced](#markdown-preview-enhanced)
  - [Ebooks & Calibre](#ebooks--calibre)
    - [Install Calibre on MacOS](#install-calibre-on-macos)
    - [Set SymLink to ebook-convert](#set-symlink-to-ebook-convert)
    - [Start writing eBook](#start-writing-ebookhttpsshd101wyygithubiomarkdown-preview-enhancedebookidstart-writing-ebook)

<!-- /code_chunk_output -->

## Customize CSS

F1 -> Markdown Preview Enhanced: Customize CSS

Please visit the URL below for more information: <https://shd101wyy.github.io/markdown-preview-enhanced/#/customize-css>

```css

.markdown-preview.markdown-preview {
  pre, code {
    white-space: pre-wrap;
  }
}
```

## Line Numbers in Code Blocks

See *source code of this markdown* file for more details.

```sh{.line-numbers}
# See white-space: pre-wrap; in the css above
$ for i in $(seq 1 10); do
    echo "The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog."
done
```

## Frontmatter

> See better pandoc documentation in this repo.

That's the so called frontmatter and it should be placed at the beginning of the markdown file. Following and more settings are possible:

```yaml
---
title: "Markdown"
output: pdf_document
toc: true
toc-depth: 6
number-sections: true
highlight-style: kate
---
```

## VSCode Extension

### Markdown Preview Enhanced

See [Markdown Preview Enhanced](https://shd101wyy.github.io/markdown-preview-enhanced/#/) for more details. It is a powerful extension that enables you to preview markdown files, but also to export them in different formats, e.g. pdf, html, docx, etc.

### Ebooks & Calibre

#### Install Calibre on MacOS

```shell
brew install --cask calibre
```

#### Set SymLink to ebook-convert

```shell
sudo ln -s /Applications/calibre.app/Contents/MacOS/ebook-convert /usr/local/bin
```

#### [Start writing eBook](https://shd101wyy.github.io/markdown-preview-enhanced/#/ebook?id=start-writing-ebook)

You can set up a ebook configuration by simply adding `ebook front-matter` into your markdown file.

```yaml
---
ebook:
  theme: github-light.css
  title: My eBook
  authors: shd101wyy
---
```
