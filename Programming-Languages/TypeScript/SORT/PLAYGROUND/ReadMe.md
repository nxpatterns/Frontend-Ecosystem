# TS Playground - Lessons Learned

<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=true} -->

<!-- code_chunk_output -->

1. [Assertions](#assertions)
   1. [Equal](#equal)

<!-- /code_chunk_output -->

## Assertions

> [>> Details here](https://nodejs.org/api/assert.html)

### Equal

- ~~`assert.equal()`~~ deprecated, use `strictEqual`
- ~~`assert.deepEqual()`~~ deprecated, use `deepStrictEqual`
- ~~`assert.notDeepEqual()`~~ deprecated, use `notDeepStrictEqual`
- ~~`assert.notEqual()`~~ deprecated, use `notStrictEqual`

```typescript
import { strict as assert } from 'assert';

//
```
