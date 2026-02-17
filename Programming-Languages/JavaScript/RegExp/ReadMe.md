<style>

@media screen {
  body {
    background-color: #bbb !important;

  }
  a {
     color: rgb(0, 100, 143) !important;
  }
}

@media print, screen {
  pre[class*="language-"] {
    background-color: #EBEBEB;
    color: black;
    border: 1px dotted black;
    font-size: 18px !important;
    font-family: "JetBrains Mono";

  }

  .token.regex {
    background: yellow;
  }
  .token .regex-flags {
    font-weight: bold;
    font-size: 120%;
    color: red;
    border-bottom: 4px solid red;
  }

  .token .regex-delimiter {
    color: rgb(0, 100, 143) !important;
    font-size: 150%;
  }

  .token.function {
    color: #ff35cb;
  }

  html body blockquote  {
    border: 1px solid;
    border-left: 6px solid black;
    border-color: green;
    padding: 10px;
    color: black
    background-color: #ebebeb

  }

  strong {
    font-size: 120%;
    border-bottom: 2px solid red;
    padding: 1px 2px;
    background-color: yellow;
  }
  em {
    font-size: 120%;
    color: black;
    font-style: normal;
    font-weight: bold;
    border-top: 2px solid blue;
    padding: 1px 2px;
    background-color: yellow;
  }
}

</style>

# Regular Expressions in JavaScript

<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Besondere Zeichen](#besondere-zeichen)
- [Optional, Min, Max,..](#optional-min-max)
- [Zeichenklasse](#zeichenklasse)
- [Flags](#flags)
  - [Unicode](#unicode)
- [Methoden (test, exec,..)](#methoden-test-exec)
  - [`test` outputs true or false](#test-outputs-true-or-false)
  - [`exec` outputs a weird array or null if nothing found:](#exec-outputs-a-weird-array-or-null-if-nothing-found)
  - [`exec` outputs first index first](#exec-outputs-first-index-first)
  - [`exec` use sticky flag to set lastIndex manually](#exec-use-sticky-flag-to-set-lastindex-manually)
  - [`match` (do not forget to use `g` flag)](#match-do-not-forget-to-use-g-flag)
- [Beispiele](#beispiele)
  - [Zeichenklassen & Wiederholungen](#zeichenklassen--wiederholungen)
  - [Wordboundary](#wordboundary)
  - [UTF8/16/..](#utf816)
  - [Miscellaneous](#miscellaneous)
    - [Zeichenklassen](#zeichenklassen)
    - [Oder](#oder)
    - [Within single qutoes](#within-single-qutoes)
    - [n'te Gruppe (naive Annahme: Zwischen Quotes)](#nte-gruppe-naive-annahme-zwischen-quotes)
    - [n'te Gruppe (besser)](#nte-gruppe-besser)
    - [Benannte Gruppen `(?<name>X)` &centerdot;&centerdot;&centerdot; `\k<name>`](#benannte-gruppen-namex-centerdotcenterdotcenterdot-kname)
    - [Keine Gruppe trotz `(` `)` &rarr; `(?:` &centerdot;&centerdot;&centerdot; `)`](#keine-gruppe-trotz---rarr--centerdotcenterdotcenterdot-)
    - [Simple Gruppen (weitere Beispiele)](#simple-gruppen-weitere-beispiele)
      - [With `exec` 1](#with-exec-1)
      - [With `exec` 2 - while loop](#with-exec-2---while-loop)
      - [With `match` (Notice the changed order)](#with-match-notice-the-changed-order)
      - [With `match` ohne result](#with-match-ohne-result)
      - [With `match` mit result (am/pm optional)](#with-match-mit-result-ampm-optional)

<!-- /code_chunk_output -->

<div style="page-break-before:always"></div>

## Besondere Zeichen

    ^ $ . , - * + ? = ! : | ( ) [ ] { } \

    \f \n                 Seitenvorschub, Zeilenumbruch
    \r \t \v              Wagenrücklauf, H-Tabulator, V-Tabulator

    \d \D                 digit, non digit
    \s \S                 white space, non white space
    \w \W                 word, non word
    \b \B                 word boundary, non word boundary

    \cI                   horizontal tab
    \cH                   STRG + H
    \p{L}                 any kind of letter from any language

## Optional, Min, Max,..

X is a placeholder for any regular expression (own notation)

    X?                    optional
    X*                    0 oder mehr
    X+                    1 oder mehr
    X{n}                  n mal
    X{n,}                 mindestens n mal
    X{m,n}                mindestens m mal max n mal

## Zeichenklasse

    [abc]                 Zeichenklasse: eines davon
    [^abc]                Keines davon

<div style="page-break-before:always"></div>

## Flags

    i       ignoreCase
    m       multiline     ^ und $ &rarr; Anfang/Ende der Zeile
    s       dotAll        . steht nun auch für \n
    u       unicode
    g       global
    y       sticky        beginnt bei lastIndex

### Unicode

    L                     Buchstabe
    Lu                    Großbuchstabe
    Ll                    Kleinbuchstabe
    Nd                    Dezimalzahl
    P                     Satzzeichen
    S                     Symbol
    White_Space           identisch mit \s
    Emoji                 Emoji & Co.

## Methoden (test, exec,..)

### `test` outputs true or false

```js
const res = /[0-9]+/.test('Bond 007 is active!');

console.log(res); // true
```

### `exec` outputs a weird array or null if nothing found:

```js
const res = /[0-9]+/.exec('Bond 007 is active!');
```

```json
[
  '007',
  index: 5,
  input: 'Bond 007 is active!',
  groups: undefined
]
```

```js
console.log(res?.[0]); // 007
console.log(res?.index); // 5
console.log(res?.input); // Bond 007 is active!
console.log(res?.groups); // undefined
```

### `exec` outputs first index first

To find all results use `g` flag.

```js
const someRegExp = /[0-9]+/g;
const someText = 'Agents 007 and 009 active!';
let res: RegExpExecArray | null;
res = someRegExp.exec(someText);
console.log(res);
res = someRegExp.exec(someText);
console.log(res);
res = someRegExp.exec(someText);
console.log(res);
```

outputs:

```json
[
  '007',
  index: 7,
  input: 'Agents 007 and 009 active!',
  groups: undefined
]
[
  '009',
  index: 15,
  input: 'Agents 007 and 009 active!',
  groups: undefined
]
null
```

### `exec` use sticky flag to set lastIndex manually

```js
const someRegExp = /[0-9]+/y;
someRegExp.lastIndex = 15;
const someText = 'Agents 007 and 009 active!';
let res: RegExpExecArray | null;
res = someRegExp.exec(someText);
console.log(res);

/** outputs:
[
  '009',
  index: 15,
  input: 'Agents 007 and 009 active!',
  groups: undefined
]
*/
```

### `match` (do not forget to use `g` flag)

Without `g`-flag similar result like `exec`.

**Important:** The order is changed: `Text.match(regExp)`

```js
const someRegExp = /[0-9]+/g;
const someText = 'Agents 007 and 009 active!';
let res;
res = someText.match(someRegExp);
console.log(res);

/** outputs:
[ '007', '009' ]
*/
```

## Beispiele

### Zeichenklassen & Wiederholungen

```js
let a: RegExp;

a = /[^0-9]/; // Keine Ziffern
a = /[^0-9]+$/; // Am Ende keine Ziffern
a = /[0-9]{4,6}/; // Vier bis sechs Stellen
```

### Wordboundary

    e\b                   jedes e vor einem "Wordboundary".

> Schul**e** Haus Hos**e** Matratz**e**

### UTF8/16/..

    \u{1f310}

### Miscellaneous

#### Zeichenklassen

    [^0-9]+$            Keine Ziffern am Ende
    [1-9][0-9]*         Zahl ohne führende Null

#### Oder

    http|ftp            http oder ftp

#### Within single qutoes

    '([^']*)'

> Was heißt "hot", ist es **'heiß'** oder **'kalt'**?

#### n'te Gruppe (naive Annahme: Zwischen Quotes)

Alles zwischen double- or single quotes. Der Fehler: Text dazwischen wird auch ausgewählt:

    (['"]).*\1

> Was heißt **"hot"**, ist es **'heiß' oder 'kalt'**?

#### n'te Gruppe (besser)

Alles zwischen double- or single quotes. (Korrigierte Version des obigen Beispiels)

    (['"])[^'"]*\1

> Was heißt **"hot"**, ist es **'heiß'** oder **'kalt'**?

#### Benannte Gruppen `(?<name>X)` &centerdot;&centerdot;&centerdot; `\k<name>`

    (?<q>['"])[^'"]*\k<q>             Gruppe heißt q (same above)

> Was heißt **"hot"**, ist es **'heiß'** oder **'kalt'**?

#### Keine Gruppe trotz `(` `)` &rarr; `(?:` &centerdot;&centerdot;&centerdot; `)`

    /(?:http|ftp):\/\/(.*)/gm       // wurde maskiert mit \/\/

<!-- prettier-ignore-start -->
> **http://example.com**
> https://example.com
> **ftp://example.com**
> dns://something.wrong
<!-- prettier-ignore-end -->

#### Simple Gruppen (weitere Beispiele)

##### With `exec` 1

```js
const timeRegExp = /([1-9]|1[0-2]):([0-5][0-9])([ap]m)/;
let timeResult: RegExpExecArray | null;
timeResult = timeRegExp.exec('Lunch at 11:45am or 12:45pm?');
console.log(timeResult);

/**
 * outputs:
 [
  '11:45am',
  '11',
  '45',
  'am',
  index: 9,
  input: 'Lunch at 11:45am or 12:45pm?',
  groups: undefined
]
 */
```

##### With `exec` 2 - while loop

```js
const regex = /(?:http|ftp):\/\/(.*)/gm;

// Alternative syntax using RegExp constructor (no need to escape /)
// const regex = new RegExp('(?:http|ftp)://(.*)', 'gm')

const str = `http://example.com
https://example.com
ftp://example.com
dns://something.wrong`;
let m;
const result = [];

while ((m = regex.exec(str)) !== null) {
  // This is necessary to avoid infinite
  // loops with zero-width matches

  if (m.index === regex.lastIndex) {
    regex.lastIndex++;
  }

  result.push(m[0]);
}

console.log(result);

/** outputs
[ 'http://example.com ', 'ftp://example.com' ]
 */
```

##### With `match` (Notice the changed order)

```js
const timeRegExp = /([1-9]|1[0-2]):([0-5][0-9])([ap]m)/g;
let timeResult;
timeResult = 'Lunch at 11:45am or 12:45pm?'.match(timeRegExp);
console.log(timeResult);

/** outputs:
[ '11:45am', '12:45pm' ]
*/
```

##### With `match` ohne result

```js
const timeRegExp = /([1-9]|1[0-2]):([0-5][0-9])([ap]m)/g;
let timeResult;
timeResult = 'Lunch at 11:45 or 12:45?'.match(timeRegExp);
console.log(timeResult);

/** outputs:
null
*/
```

##### With `match` mit result (am/pm optional)

```js
const timeRegExp = /([1-9]|1[0-2]):([0-5][0-9])([ap]m)?/g;
let timeResult;
timeResult = 'Lunch at 11:45 or 12:45?'.match(timeRegExp);
console.log(timeResult);

/** outputs
[ '11:45', '12:45' ]
*/
```
