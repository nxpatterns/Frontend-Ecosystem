# ES6 (=ES2015) Import & Exports

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [ES6 (=ES2015) Import & Exports](#es6-es2015-import-exports)
  _ [Imports](#imports)
  _ [Exports](#exports)
  _ [Using ES2015 with Node](#using-es2015-with-node)
  _ [Install Babel-CLI(v6+) or @Babel/CLI (v7+)](#install-babel-cliv6-or-babelcli-v7)
  _ [Install Babel Presets](#install-babel-presets)
  _ [Create .babelrc](#create-babelrc) \* [Use babel-node](#use-babel-node)

<!-- /code_chunk_output -->

## Imports

```javascript
import name from "module-name";
import * as name from "module-name";
import { member } from "module-name";
import { member as alias } from "module-name";
import { member1 , member2 } from "module-name";
import { member1 , member2 as alias2 , [...] } from "module-name";
import defaultMember, { member [ , [...] ] } from "module-name";
import defaultMember, * as alias from "module-name";
import defaultMember from "module-name";
import "module-name";
```

## Exports

```javascript
export { name1, name2, …, nameN };
export { variable1 as name1, variable2 as name2, …, nameN };
export let name1, name2, …, nameN; // oder: var
export let name1 = …, name2 = …, …, nameN; // oder: var, const

export default expression;
export default function (…) { … } // oder: class, function*
export default function name1(…) { … } // oder: class, function*
export { name1 as default, … };

export * from …;
export { name1, name2, …, nameN } from …;
export { import1 as name1, import2 as name2, …, nameN } from …;
```

## Using ES2015 with Node

### Update Feb 2019 --> Use 'babel-preset-env'

.babelrc

```json
{
 "plugins": ["@babel/plugin-syntax-export-default-from"],
 "presets": ["env"]
}
```

package.json

```json
"scripts": {
    "start": "npm run start:defaultExportsSupport",
    "start:defaultExportsSupport": "babel-node --plugins @babel/plugin-syntax-export-default-from index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  }, 
  
"devDependencies": {
    "@babel/plugin-syntax-export-default-from": "^7.2.0",
    "babel-preset-env": "^1.7.0", // Babel6
    "babel-preset-env": "^2.0.0-alpha.20", // Babel 7
    "babel-preset-es2015": "^6.24.1",
}
```

### Install Babel-CLI(v6+) or @Babel/CLI (v7+)

> Better approach would be to install locally!
> See details here: <https://babeljs.io/docs/en/babel-cli>

```shell
npm install -g babel-cli  // Babel 6+
npm install -g @babel/cli // Babel 7+
```

If you use Babel 7+ please consider: _@babel/core is required by @babel/cli_, you have to install it additionally:

```shell
npm install -g @babel/core
npm install -g @babel/node
```

### Install Babel Presets

```shell
npm install babel-preset-es2015 -D
```

### Create .babelrc

```json
{
  "presets": ["es2015"]
}
```

### Use babel-node

```shell
babel-node index.js
```
