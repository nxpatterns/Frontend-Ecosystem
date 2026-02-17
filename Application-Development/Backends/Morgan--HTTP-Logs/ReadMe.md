# Morgan

HTTP request logger middleware for node.js. See Details online <https://www.npmjs.com/package/morgan>

## Installation

```bash
npm install morgan
```

## Example

```javascript
var express = require('express');
var morgan = require('morgan');
var app = express();

/**
 * E.g.:
 * hostingstart.html -> default page for Azure,
 * should be located after the index.html
 */

var options = {
    index: ['index.html','hostingstart.html']
};

/**
 * Configure for development
 */

app.use(morgan('dev'));

app.use('/', express.static('/opt/startup', options));
var server = app.listen(process.env.PORT);
server.keepAliveTimeout = (65 * 1000);

/**
 * If you want to set the headersTimeout
 */

server.headersTimeout = (65 * 1000);

```
