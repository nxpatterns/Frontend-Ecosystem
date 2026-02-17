# Advanced Cypress Topics to Analyse

<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Basic Ingredients](#basic-ingredients)
- [Overwrite the `visit` command](#overwrite-the-visit-command)
- [List of Assertions](#list-of-assertions)
  - [Adding Custom Assertions](#adding-custom-assertions)
- [`.should()``](#should)
  - [`.should(callbackFn)`](#shouldcallbackfn)
- [Other Library Utilities](#other-library-utilities)
- [Add Custom Library to Cypress](#add-custom-library-to-cypress)
- [Cypress Examples Page](#cypress-examples-page)
- [Cypress API Documentation Page](#cypress-api-documentation-page)
- [Cypress.json](#cypressjson)
- [Store Keys/Tokens/.. to reuse](#store-keystokens-to-reuse)
- [Set a custom Header while intercepting](#set-a-custom-header-while-intercepting)
- [Screenshots (`fullPage` & `scale`)](#screenshots-fullpage-scale)
- [Location Check](#location-check)
- [Scroll](#scroll)
- [Type](#type)
- [Upload a File](#upload-a-file)
- [Sharing Context (~ Global Variables)](#sharing-context-~-global-variables)
- [Test an HTTPS site locally](#test-an-https-site-locally)
- [Conditional Testing](#conditional-testing)
- [Actions](#actions)
  - [`.trigger`](#trigger)
- [Querying](#querying)
  - [within()](#within)
  - [root()](#root)
- [Traversing DOM Elements](#traversing-dom-elements)
  - [`.children(), .closest(), .eq(), .filter(), .find()`](#children-closest-eq-filter-find)
  - [`.first(), .last(), .next(), .nextAll(), .nextUntil(), .not()`](#first-last-next-nextall-nextuntil-not)
  - [`.parent(), .parents(), .parentsUntil()`](#parent-parents-parentsuntil)
  - [`.prev(), .prevAll(), .prevUntil(), .siblings()`](#prev-prevall-prevuntil-siblings)

<!-- /code_chunk_output -->

## Basic Ingredients

<!-- prettier-ignore-start -->
Cypress bundles the popular [Chai](https://docs.cypress.io/guides/references/assertions#Chai) assertion library, as well as helpful extensions for [Sinon](https://docs.cypress.io/guides/references/assertions#Sinon-Chai) and jQuery, bringing you dozens of powerful assertions for free.

Notice: We use these assertions always with [.should()](https://docs.cypress.io/api/commands/should)

<!-- prettier-ignore-end -->

## Overwrite the `visit` command

Check if you can set custom request headers each time

```ts
// -- This will overwrite an existing command --
Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
```

## List of Assertions

Check it here:
<https://docs.cypress.io/guides/references/assertions#Chai>

### Adding Custom Assertions

Check it here: <https://www.chaijs.com/api/plugins/>

## `.should()``

```ts
.should(chainers)
.should(chainers, value)
.should(chainers, method, value)
.should(callbackFn)
```

### `.should(callbackFn)`

**Notice:** Within the function you use `expect`

Source: <https://docs.cypress.io/api/commands/should#Function>

```html
<div class="foo">
  <p class="text-primary">Hello World</p>
  <p class="text-danger">You have an error</p>
  <p class="text-default">Try again later</p>
</div>
```

```ts
cy.get('.foo p').should(($p) => {
  // should have found 3 elements
  expect($p).to.have.length(3);

  // make sure the first contains some text content
  expect($p.first()).to.contain('Hello World');

  // use jquery's map to grab all of their classes
  // jquery's map returns a new jquery object
  const classes = $p.map((i, el) => {
    return Cypress.$(el).attr('class');
  });

  // call classes.get() to make this a plain array
  expect(classes.get()).to.deep.eq([
    'text-primary',
    'text-danger',
    'text-default',
  ]);
});
```

## Other Library Utilities

Cypress also bundles the following tools on the Cypress object.
These can be used anywhere inside of your tests.

<!-- prettier-ignore-start -->

- [Cypress._ ](https://docs.cypress.io/api/utilities/_) (lodash)
- [Cypress.\$](https://docs.cypress.io/api/utilities/$) (jQuery)
- [Cypress.minimatch](Cypress.minimatch) (minimatch.js)
- [Cypress.Blob](https://docs.cypress.io/api/utilities/blob) (Blob utils)
- [Cypress.Promise](https://docs.cypress.io/api/utilities/promise) (Bluebird)

<!-- prettier-ignore-end -->

## Add Custom Library to Cypress

Check it here: <https://cypresstips.substack.com/p/cypressramda>

## Cypress Examples Page

Check it here: <https://example.cypress.io/>

## Cypress API Documentation Page

Check it here: <https://docs.cypress.io/api/table-of-contents>

## Cypress.json

```jsonc
// foo = what ever

{
  "projectId": "foo-id",
  "chromeWebSecurity": false,
  "experimentalSourceRewriting": true,
  "fileServerFolder": "apps/files",
  "fixturesFolder": "apps/foo/src/fixtures",
  "integrationFolder": "apps/foo/src/integration",
  "modifyObstructiveCode": false,
  "pluginsFile": "apps/foo/src/plugins/index.ts",
  "screenshotsFolder": "dist/cypress/apps/foo/screenshots",
  "supportFile": "apps/foo/src/support/index.ts",
  "video": true,
  "videoCompression": 16,
  "videosFolder": "dist/cypress/apps/foo/videos",
  "viewportHeight": 1920,
  "viewportWidth": 1080,
  "waitForAnimations": true
}
```

## Store Keys/Tokens/.. to reuse

```ts
let _fooLoginResponse: Foo;
cy.request('https://example.com/api/foo/login', {
  failOnStatusCode: false,
}).then((fooLoginResponse: Foo) => {
  _fooLoginResponse = fooLoginResponse;
});

cy.intercept('GET', 'api/foo/login', _fooLoginResponse)
  .as('fooLogin')
  .visit('http://localdevelopment.com:4200/dashboard');
```

## Set a custom Header while intercepting

```ts
cy.intercept('PUT', 'api/foo/*', (req) => {
  req.headers['Authorization'] = _some_token;
}).as('PUT: api/foo');
```

## Screenshots (`fullPage` & `scale`)

```ts
cy.viewport(576, 1280)
  .get('html')
  .screenshot({ capture: 'fullPage', scale: true });
```

## Location Check

```ts
cy.location('pathname', { timeout: 20000 }).should(
  'match',
  /\/info-page$/, // -> /info-page
);
```

## Scroll

```ts
cy.get('#myElementX').scrollIntoView({
  duration: 1000,
  easing: 'swing',
  offset: { top: -100, left: 0 },
});
```

## Type

```ts
cy.get('#myInputElementX').type('01.01.2022', {
  scrollBehavior: 'nearest',
});
```

## Upload a File

```ts
// --> /fixtures/foo.pdf
cy.fixture('foo.pdf', 'binary')
  .then(Cypress.Blob.binaryStringToBlob)
  .then((fileContent) => {
    console.log('FileContent: ', fileContent);
    cy.get('#myFileUploadInput').attachFile({
      fileContent,
      filePath: 'foo.pdf',
      fileName: 'foo.pdf',
    });
  });
```

## Sharing Context (~ Global Variables)

<!-- prettier-ignore-start -->
>**Notice: Arrow Functions**

>Accessing aliases as properties with `this.*` will not work if you use [arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) for your tests or hooks. This is why all of our examples use the regular `function () {}` syntax as opposed to the lambda "fat arrow" syntax `() => {}`.
<!-- prettier-ignore-end -->

```ts
beforeEach(() => {
  // alias the $btn.text() as 'text'
  cy.get('button').invoke('text').as('text');
});

it('has access to text', function () {
  this.text; // is now available
});
```

Instead of using the `this.*` syntax, there is another way to access aliases. The [`cy.get()`](/api/commands/get) command is capable of accessing aliases with a special syntax using the `@` character:

```ts
beforeEach(() => {
  // alias the users fixtures
  cy.fixture('users.json').as('users');
});

it('utilize users in some way', function () {
  // use the special '@' syntax to access aliases
  // which avoids the use of 'this'
  cy.get('@users').then((users) => {
    // access the users argument
    const user = users[0];

    // make sure the header contains the first
    // user's name
    cy.get('header').should('contain', user.name);
  });
});
```

_Usually_, replaying previous commands will return what you expect, but not always. It is recommended that you **alias elements as soon as possible** instead of further down a chain of commands.

- `cy.get('#nav header .user').as('user')` (good)
- `cy.get('#nav').find('header').find('.user').as('user')` (bad)

When in doubt, you can _always_ issue a regular [`cy.get()`](/api/commands/get) to query for the elements again.

See: <https://glebbahmutov.com/blog/fixtures-in-custom-commands/>

## Test an HTTPS site locally

Check it here: <https://glebbahmutov.com/blog/cypress-hosts-option/>

## Conditional Testing

Check it here: <https://docs.cypress.io/guides/core-concepts/conditional-testing#Definition>

## Actions

Examples: <https://example.cypress.io/commands/actions>

### `.trigger`

```ts
cy.get('.my-input-range')
  .invoke('val', 25)
  .trigger('change')
  .get('input[type=range]')
  .siblings('p')
  .should('have.text', '25');
```

## Querying

Examples: <https://example.cypress.io/commands/querying>

### within()

### root()

## Traversing DOM Elements

Examples here <https://example.cypress.io/commands/traversal>

### `.children(), .closest(), .eq(), .filter(), .find()`

### `.first(), .last(), .next(), .nextAll(), .nextUntil(), .not()`

### `.parent(), .parents(), .parentsUntil()`

### `.prev(), .prevAll(), .prevUntil(), .siblings()`
