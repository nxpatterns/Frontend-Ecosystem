# Cypress Cookbok

<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [`info`](#info)
- [`run --browser`](#run-browser)
- [Check a certain checkbox](#check-a-certain-checkbox)

<!-- /code_chunk_output -->

## `info`

```shell
cypress info
```

## `run --browser`

```shell
- cypress run --browser chrome
- cypress run --browser firefox:dev
- cypress run --browser edge
```

## Check a certain checkbox

```ts
cy.contains('Pay electric bill')
  .parent()
  .find('input[type=checkbox]')
  .check();
```
