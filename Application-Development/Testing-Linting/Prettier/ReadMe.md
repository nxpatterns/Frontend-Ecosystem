# Coding Style Guides

> Under Construction!

<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Prettier](#prettier)
  - [Prettier Config File](#prettier-config-file)
  - [Ignoring some part of codes or files](#ignoring-some-part-of-codes-or-files)
    - [Markdown](#markdown)

<!-- /code_chunk_output -->

## Prettier

### Prettier Config File

`.prettierrc` (Root-folder)

```json
{
  "semi": true,
  "trailingComma": "all",
  "singleQuote": true,
  "printWidth": 70,
  "tabWidth": 2
}
```

### Ignoring some part of codes or files

[>> See here](https://prettier.io/docs/en/ignore.html)

#### Markdown

```md
<!-- prettier-ignore -->      # next line/block

<!-- prettier-ignore-start -->
Something between
<!-- prettier-ignore-end -->
```
