# Cypress

<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Installation & Starting](#installation-starting)
  - [Switching Browsers](#switching-browsers)
- [CLI](#cli)
  - [General](#general)
  - [`run`](#run)
- [Default Tests](#default-tests)
  - [Prepared Files](#prepared-files)
    - [Fixtures](#fixtures)
    - [Plugins](#plugins)
    - [Support](#support)
      - [Commands](#commands)
      - [Index](#index)
  - [Getting Started](#getting-started)
  - [Advanced Examples](#advanced-examples)
    - [Actions](#actions)
    - [Aliasing](#aliasing)
    - [Assertions](#assertions)
    - [Connectors](#connectors)
    - [Cookies](#cookies)
    - [Cypress API](#cypress-api)
    - [Files](#files)
    - [Local Storage](#local-storage)
    - [Location](#location)
    - [Misc](#misc)
    - [Navigation](#navigation)
    - [Network Requests](#network-requests)
    - [Querying](#querying)
    - [Spies, Stubs & Clocks](#spies-stubs-clocks)
    - [Traversal](#traversal)
    - [Utilities](#utilities)
    - [Viewport](#viewport)
    - [Waiting](#waiting)
    - [Window](#window)

<!-- /code_chunk_output -->

## Installation & Starting

```shell
# INSTALLING
npm install --save-dev cypress

# STARTING
npx cypress open # or
./node_modules/.bin/cypress open # or
$(npm bin)/cypress open

```

### Switching Browsers

Install Cypress globally and then, e.g.:

```shell
cypress run --browser chrome
```

## CLI

### General

```shell

npx cypress --help

Usage: cypress <command> [options]

Options:
  -v, --version      prints Cypress version
  -h, --help         display help for command

Commands:
  help               Shows CLI help and exits
  version            prints Cypress version
  open [options]     Opens Cypress in the interactive GUI.
  run [options]      Runs Cypress tests from the CLI without the GUI
  open-ct [options]  Opens Cypress component testing interactive mode.
  run-ct [options]   Runs all Cypress Component Testing suites
  install [options]  Installs the Cypress executable matching this package's version
  verify [options]   Verifies that Cypress is installed correctly and executable
  cache [options]    Manages the Cypress binary cache
  info [options]     Prints Cypress and system information
```

### `run`

```shell
npx cypress run --help

Usage: cypress run [options]

Runs Cypress tests from the CLI without the GUI

Options:
  -b, --browser <browser-name-or-path>       runs Cypress in the browser with the given name. if a filesystem path is supplied, Cypress will attempt to use the browser at that path.
  --ci-build-id <id>                         the unique identifier for a run on your CI provider. typically a "BUILD_ID" env var. this value is automatically detected for most CI providers
  -c, --config <config>                      sets configuration values. separate multiple values with a comma. overrides any value in cypress.json.
  -C, --config-file <config-file>            path to JSON file where configuration values are set. defaults to "cypress.json". pass "false" to disable.
  -e, --env <env>                            sets environment variables. separate multiple values with a comma. overrides any value in cypress.json or cypress.env.json
  --group <name>                             a named group for recorded runs in the Cypress Dashboard
  -k, --key <record-key>                     your secret Record Key. you can omit this if you set a CYPRESS_RECORD_KEY environment variable.
  --headed                                   displays the browser instead of running headlessly
  --headless                                 hide the browser instead of running headed (default for cypress run)
  --no-exit                                  keep the browser open after tests finish
  --parallel                                 enables concurrent runs and automatic load balancing of specs across multiple machines or processes
  -p, --port <port>                          runs Cypress on a specific port. overrides any value in cypress.json.
  -P, --project <project-path>               path to the project
  -q, --quiet                                run quietly, using only the configured reporter
  --record [bool]                            records the run. sends test results, screenshots and videos to your Cypress Dashboard.
  -r, --reporter <reporter>                  runs a specific mocha reporter. pass a path to use a custom reporter. defaults to "spec"
  -o, --reporter-options <reporter-options>  options for the mocha reporter. defaults to "null"
  -s, --spec <spec>                          runs specific spec file(s). defaults to "all"
  -t, --tag <tag>                            named tag(s) for recorded runs in the Cypress Dashboard
  --dev                                      runs cypress in development and bypasses binary check
  -h, --help                                 display help for command

```

## Default Tests

### Prepared Files

#### Fixtures

```jsonc
// fixtures/example.json

{
  "name": "Using fixtures to represent data",
  "email": "hello@cypress.io",
  "body": "Fixtures are a great way to mock data for responses to routes"
}
```

#### Plugins

```js
// plugins/index.js
/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
};
```

#### Support

##### Commands

```js
// support/command.js

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
```

##### Index

```js
// support/index,js

// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';

// Alternatively you can use CommonJS syntax:
// require('./commands')
```

### Getting Started

```js
/// <reference types="cypress" />

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe('example to-do app', () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit('https://example.cypress.io/todo');
  });

  it('displays two todo items by default', () => {
    // We use the `cy.get()` command to get all elements that match the selector.
    // Then, we use `should` to assert that there are two matched items,
    // which are the two default items.
    cy.get('.todo-list li').should('have.length', 2);

    // We can go even further and check that the default todos each contain
    // the correct text. We use the `first` and `last` functions
    // to get just the first and last matched elements individually,
    // and then perform an assertion with `should`.
    cy.get('.todo-list li')
      .first()
      .should('have.text', 'Pay electric bill');
    cy.get('.todo-list li')
      .last()
      .should('have.text', 'Walk the dog');
  });

  it('can add new todo items', () => {
    // We'll store our item text in a variable so we can reuse it
    const newItem = 'Feed the cat';

    // Let's get the input element and use the `type` command to
    // input our new list item. After typing the content of our item,
    // we need to type the enter key as well in order to submit the input.
    // This input has a data-test attribute so we'll use that to select the
    // element in accordance with best practices:
    // https://on.cypress.io/selecting-elements
    cy.get('[data-test=new-todo]').type(`${newItem}{enter}`);

    // Now that we've typed our new item, let's check that it actually was added to the list.
    // Since it's the newest item, it should exist as the last element in the list.
    // In addition, with the two default items, we should have a total of 3 elements in the list.
    // Since assertions yield the element that was asserted on,
    // we can chain both of these assertions together into a single statement.
    cy.get('.todo-list li')
      .should('have.length', 3)
      .last()
      .should('have.text', newItem);
  });

  it('can check off an item as completed', () => {
    // In addition to using the `get` command to get an element by selector,
    // we can also use the `contains` command to get an element by its contents.
    // However, this will yield the <label>, which is lowest-level element that contains the text.
    // In order to check the item, we'll find the <input> element for this <label>
    // by traversing up the dom to the parent element. From there, we can `find`
    // the child checkbox <input> element and use the `check` command to check it.
    cy.contains('Pay electric bill')
      .parent()
      .find('input[type=checkbox]')
      .check();

    // Now that we've checked the button, we can go ahead and make sure
    // that the list element is now marked as completed.
    // Again we'll use `contains` to find the <label> element and then use the `parents` command
    // to traverse multiple levels up the dom until we find the corresponding <li> element.
    // Once we get that element, we can assert that it has the completed class.
    cy.contains('Pay electric bill')
      .parents('li')
      .should('have.class', 'completed');
  });

  context('with a checked task', () => {
    beforeEach(() => {
      // We'll take the command we used above to check off an element
      // Since we want to perform multiple tests that start with checking
      // one element, we put it in the beforeEach hook
      // so that it runs at the start of every test.
      cy.contains('Pay electric bill')
        .parent()
        .find('input[type=checkbox]')
        .check();
    });

    it('can filter for uncompleted tasks', () => {
      // We'll click on the "active" button in order to
      // display only incomplete items
      cy.contains('Active').click();

      // After filtering, we can assert that there is only the one
      // incomplete item in the list.
      cy.get('.todo-list li')
        .should('have.length', 1)
        .first()
        .should('have.text', 'Walk the dog');

      // For good measure, let's also assert that the task we checked off
      // does not exist on the page.
      cy.contains('Pay electric bill').should('not.exist');
    });

    it('can filter for completed tasks', () => {
      // We can perform similar steps as the test above to ensure
      // that only completed tasks are shown
      cy.contains('Completed').click();

      cy.get('.todo-list li')
        .should('have.length', 1)
        .first()
        .should('have.text', 'Pay electric bill');

      cy.contains('Walk the dog').should('not.exist');
    });

    it('can delete all completed tasks', () => {
      // First, let's click the "Clear completed" button
      // `contains` is actually serving two purposes here.
      // First, it's ensuring that the button exists within the dom.
      // This button only appears when at least one task is checked
      // so this command is implicitly verifying that it does exist.
      // Second, it selects the button so we can click it.
      cy.contains('Clear completed').click();

      // Then we can make sure that there is only one element
      // in the list and our element does not exist
      cy.get('.todo-list li')
        .should('have.length', 1)
        .should('not.have.text', 'Pay electric bill');

      // Finally, make sure that the clear button no longer exists.
      cy.contains('Clear completed').should('not.exist');
    });
  });
});
```

### Advanced Examples

#### Actions

```js
/// <reference types="cypress" />

context('Actions', () => {
  beforeEach(() => {
    cy.visit('https://example.cypress.io/commands/actions');
  });

  // https://on.cypress.io/interacting-with-elements

  it('.type() - type into a DOM element', () => {
    // https://on.cypress.io/type
    cy.get('.action-email')
      .type('fake@email.com')
      .should('have.value', 'fake@email.com')

      // .type() with special character sequences
      .type('{leftarrow}{rightarrow}{uparrow}{downarrow}')
      .type('{del}{selectall}{backspace}')

      // .type() with key modifiers
      .type('{alt}{option}') //these are equivalent
      .type('{ctrl}{control}') //these are equivalent
      .type('{meta}{command}{cmd}') //these are equivalent
      .type('{shift}')

      // Delay each keypress by 0.1 sec
      .type('slow.typing@email.com', { delay: 100 })
      .should('have.value', 'slow.typing@email.com');

    cy.get('.action-disabled')
      // Ignore error checking prior to type
      // like whether the input is visible or disabled
      .type('disabled error checking', { force: true })
      .should('have.value', 'disabled error checking');
  });

  it('.focus() - focus on a DOM element', () => {
    // https://on.cypress.io/focus
    cy.get('.action-focus')
      .focus()
      .should('have.class', 'focus')
      .prev()
      .should('have.attr', 'style', 'color: orange;');
  });

  it('.blur() - blur off a DOM element', () => {
    // https://on.cypress.io/blur
    cy.get('.action-blur')
      .type('About to blur')
      .blur()
      .should('have.class', 'error')
      .prev()
      .should('have.attr', 'style', 'color: red;');
  });

  it('.clear() - clears an input or textarea element', () => {
    // https://on.cypress.io/clear
    cy.get('.action-clear')
      .type('Clear this text')
      .should('have.value', 'Clear this text')
      .clear()
      .should('have.value', '');
  });

  it('.submit() - submit a form', () => {
    // https://on.cypress.io/submit
    cy.get('.action-form').find('[type="text"]').type('HALFOFF');

    cy.get('.action-form')
      .submit()
      .next()
      .should('contain', 'Your form has been submitted!');
  });

  it('.click() - click on a DOM element', () => {
    // https://on.cypress.io/click
    cy.get('.action-btn').click();

    // You can click on 9 specific positions of an element:
    //  -----------------------------------
    // | topLeft        top       topRight |
    // |                                   |
    // |                                   |
    // |                                   |
    // | left          center        right |
    // |                                   |
    // |                                   |
    // |                                   |
    // | bottomLeft   bottom   bottomRight |
    //  -----------------------------------

    // clicking in the center of the element is the default
    cy.get('#action-canvas').click();

    cy.get('#action-canvas').click('topLeft');
    cy.get('#action-canvas').click('top');
    cy.get('#action-canvas').click('topRight');
    cy.get('#action-canvas').click('left');
    cy.get('#action-canvas').click('right');
    cy.get('#action-canvas').click('bottomLeft');
    cy.get('#action-canvas').click('bottom');
    cy.get('#action-canvas').click('bottomRight');

    // .click() accepts an x and y coordinate
    // that controls where the click occurs :)

    cy.get('#action-canvas')
      .click(80, 75) // click 80px on x coord and 75px on y coord
      .click(170, 75)
      .click(80, 165)
      .click(100, 185)
      .click(125, 190)
      .click(150, 185)
      .click(170, 165);

    // click multiple elements by passing multiple: true
    cy.get('.action-labels>.label').click({ multiple: true });

    // Ignore error checking prior to clicking
    cy.get('.action-opacity>.btn').click({ force: true });
  });

  it('.dblclick() - double click on a DOM element', () => {
    // https://on.cypress.io/dblclick

    // Our app has a listener on 'dblclick' event in our 'scripts.js'
    // that hides the div and shows an input on double click
    cy.get('.action-div').dblclick().should('not.be.visible');
    cy.get('.action-input-hidden').should('be.visible');
  });

  it('.rightclick() - right click on a DOM element', () => {
    // https://on.cypress.io/rightclick

    // Our app has a listener on 'contextmenu' event in our 'scripts.js'
    // that hides the div and shows an input on right click
    cy.get('.rightclick-action-div')
      .rightclick()
      .should('not.be.visible');
    cy.get('.rightclick-action-input-hidden').should('be.visible');
  });

  it('.check() - check a checkbox or radio element', () => {
    // https://on.cypress.io/check

    // By default, .check() will check all
    // matching checkbox or radio elements in succession, one after another
    cy.get('.action-checkboxes [type="checkbox"]')
      .not('[disabled]')
      .check()
      .should('be.checked');

    cy.get('.action-radios [type="radio"]')
      .not('[disabled]')
      .check()
      .should('be.checked');

    // .check() accepts a value argument
    cy.get('.action-radios [type="radio"]')
      .check('radio1')
      .should('be.checked');

    // .check() accepts an array of values
    cy.get('.action-multiple-checkboxes [type="checkbox"]')
      .check(['checkbox1', 'checkbox2'])
      .should('be.checked');

    // Ignore error checking prior to checking
    cy.get('.action-checkboxes [disabled]')
      .check({ force: true })
      .should('be.checked');

    cy.get('.action-radios [type="radio"]')
      .check('radio3', { force: true })
      .should('be.checked');
  });

  it('.uncheck() - uncheck a checkbox element', () => {
    // https://on.cypress.io/uncheck

    // By default, .uncheck() will uncheck all matching
    // checkbox elements in succession, one after another
    cy.get('.action-check [type="checkbox"]')
      .not('[disabled]')
      .uncheck()
      .should('not.be.checked');

    // .uncheck() accepts a value argument
    cy.get('.action-check [type="checkbox"]')
      .check('checkbox1')
      .uncheck('checkbox1')
      .should('not.be.checked');

    // .uncheck() accepts an array of values
    cy.get('.action-check [type="checkbox"]')
      .check(['checkbox1', 'checkbox3'])
      .uncheck(['checkbox1', 'checkbox3'])
      .should('not.be.checked');

    // Ignore error checking prior to unchecking
    cy.get('.action-check [disabled]')
      .uncheck({ force: true })
      .should('not.be.checked');
  });

  it('.select() - select an option in a <select> element', () => {
    // https://on.cypress.io/select

    // at first, no option should be selected
    cy.get('.action-select').should(
      'have.value',
      '--Select a fruit--',
    );

    // Select option(s) with matching text content
    cy.get('.action-select').select('apples');
    // confirm the apples were selected
    // note that each value starts with "fr-" in our HTML
    cy.get('.action-select').should('have.value', 'fr-apples');

    cy.get('.action-select-multiple')
      .select(['apples', 'oranges', 'bananas'])
      // when getting multiple values, invoke "val" method first
      .invoke('val')
      .should('deep.equal', [
        'fr-apples',
        'fr-oranges',
        'fr-bananas',
      ]);

    // Select option(s) with matching value
    cy.get('.action-select')
      .select('fr-bananas')
      // can attach an assertion right away to the element
      .should('have.value', 'fr-bananas');

    cy.get('.action-select-multiple')
      .select(['fr-apples', 'fr-oranges', 'fr-bananas'])
      .invoke('val')
      .should('deep.equal', [
        'fr-apples',
        'fr-oranges',
        'fr-bananas',
      ]);

    // assert the selected values include oranges
    cy.get('.action-select-multiple')
      .invoke('val')
      .should('include', 'fr-oranges');
  });

  it('.scrollIntoView() - scroll an element into view', () => {
    // https://on.cypress.io/scrollintoview

    // normally all of these buttons are hidden,
    // because they're not within
    // the viewable area of their parent
    // (we need to scroll to see them)
    cy.get('#scroll-horizontal button').should('not.be.visible');

    // scroll the button into view, as if the user had scrolled
    cy.get('#scroll-horizontal button')
      .scrollIntoView()
      .should('be.visible');

    cy.get('#scroll-vertical button').should('not.be.visible');

    // Cypress handles the scroll direction needed
    cy.get('#scroll-vertical button')
      .scrollIntoView()
      .should('be.visible');

    cy.get('#scroll-both button').should('not.be.visible');

    // Cypress knows to scroll to the right and down
    cy.get('#scroll-both button')
      .scrollIntoView()
      .should('be.visible');
  });

  it('.trigger() - trigger an event on a DOM element', () => {
    // https://on.cypress.io/trigger

    // To interact with a range input (slider)
    // we need to set its value & trigger the
    // event to signal it changed

    // Here, we invoke jQuery's val() method to set
    // the value and trigger the 'change' event
    cy.get('.trigger-input-range')
      .invoke('val', 25)
      .trigger('change')
      .get('input[type=range]')
      .siblings('p')
      .should('have.text', '25');
  });

  it('cy.scrollTo() - scroll the window or element to a position', () => {
    // https://on.cypress.io/scrollto

    // You can scroll to 9 specific positions of an element:
    //  -----------------------------------
    // | topLeft        top       topRight |
    // |                                   |
    // |                                   |
    // |                                   |
    // | left          center        right |
    // |                                   |
    // |                                   |
    // |                                   |
    // | bottomLeft   bottom   bottomRight |
    //  -----------------------------------

    // if you chain .scrollTo() off of cy, we will
    // scroll the entire window
    cy.scrollTo('bottom');

    cy.get('#scrollable-horizontal').scrollTo('right');

    // or you can scroll to a specific coordinate:
    // (x axis, y axis) in pixels
    cy.get('#scrollable-vertical').scrollTo(250, 250);

    // or you can scroll to a specific percentage
    // of the (width, height) of the element
    cy.get('#scrollable-both').scrollTo('75%', '25%');

    // control the easing of the scroll (default is 'swing')
    cy.get('#scrollable-vertical').scrollTo('center', {
      easing: 'linear',
    });

    // control the duration of the scroll (in ms)
    cy.get('#scrollable-both').scrollTo('center', { duration: 2000 });
  });
});
```

#### Aliasing

```js
/// <reference types="cypress" />

context('Aliasing', () => {
  beforeEach(() => {
    cy.visit('https://example.cypress.io/commands/aliasing');
  });

  it('.as() - alias a DOM element for later use', () => {
    // https://on.cypress.io/as

    // Alias a DOM element for use later
    // We don't have to traverse to the element
    // later in our code, we reference it with @

    cy.get('.as-table')
      .find('tbody>tr')
      .first()
      .find('td')
      .first()
      .find('button')
      .as('firstBtn');

    // when we reference the alias, we place an
    // @ in front of its name
    cy.get('@firstBtn').click();

    cy.get('@firstBtn')
      .should('have.class', 'btn-success')
      .and('contain', 'Changed');
  });

  it('.as() - alias a route for later use', () => {
    // Alias the route to wait for its response
    cy.intercept('GET', '**/comments/*').as('getComment');

    // we have code that gets a comment when
    // the button is clicked in scripts.js
    cy.get('.network-btn').click();

    // https://on.cypress.io/wait
    cy.wait('@getComment')
      .its('response.statusCode')
      .should('eq', 200);
  });
});
```

#### Assertions

```js
/// <reference types="cypress" />

context('Assertions', () => {
  beforeEach(() => {
    cy.visit('https://example.cypress.io/commands/assertions');
  });

  describe('Implicit Assertions', () => {
    it('.should() - make an assertion about the current subject', () => {
      // https://on.cypress.io/should
      cy.get('.assertion-table')
        .find('tbody tr:last')
        .should('have.class', 'success')
        .find('td')
        .first()
        // checking the text of the <td> element in various ways
        .should('have.text', 'Column content')
        .should('contain', 'Column content')
        .should('have.html', 'Column content')
        // chai-jquery uses "is()" to check if element matches selector
        .should('match', 'td')
        // to match text content against a regular expression
        // first need to invoke jQuery method text()
        // and then match using regular expression
        .invoke('text')
        .should('match', /column content/i);

      // a better way to check element's text content against a regular expression
      // is to use "cy.contains"
      // https://on.cypress.io/contains
      cy.get('.assertion-table')
        .find('tbody tr:last')
        // finds first <td> element with text content matching regular expression
        .contains('td', /column content/i)
        .should('be.visible');

      // for more information about asserting element's text
      // see https://on.cypress.io/using-cypress-faq#How-do-I-get-an-element’s-text-contents
    });

    it('.and() - chain multiple assertions together', () => {
      // https://on.cypress.io/and
      cy.get('.assertions-link')
        .should('have.class', 'active')
        .and('have.attr', 'href')
        .and('include', 'cypress.io');
    });
  });

  describe('Explicit Assertions', () => {
    // https://on.cypress.io/assertions
    it('expect - make an assertion about a specified subject', () => {
      // We can use Chai's BDD style assertions
      expect(true).to.be.true;
      const o = { foo: 'bar' };

      expect(o).to.equal(o);
      expect(o).to.deep.equal({ foo: 'bar' });
      // matching text using regular expression
      expect('FooBar').to.match(/bar$/i);
    });

    it('pass your own callback function to should()', () => {
      // Pass a function to should that can have any number
      // of explicit assertions within it.
      // The ".should(cb)" function will be retried
      // automatically until it passes all your explicit assertions or times out.
      cy.get('.assertions-p')
        .find('p')
        .should(($p) => {
          // https://on.cypress.io/$
          // return an array of texts from all of the p's
          // @ts-ignore TS6133 unused variable
          const texts = $p.map((i, el) => Cypress.$(el).text());

          // jquery map returns jquery object
          // and .get() convert this to simple array
          const paragraphs = texts.get();

          // array should have length of 3
          expect(paragraphs, 'has 3 paragraphs').to.have.length(3);

          // use second argument to expect(...) to provide clear
          // message with each assertion
          expect(
            paragraphs,
            'has expected text in each paragraph',
          ).to.deep.eq([
            'Some text from first p',
            'More text from second p',
            'And even more text from third p',
          ]);
        });
    });

    it('finds element by class name regex', () => {
      cy.get('.docs-header')
        .find('div')
        // .should(cb) callback function will be retried
        .should(($div) => {
          expect($div).to.have.length(1);

          const className = $div[0].className;

          expect(className).to.match(/heading-/);
        })
        // .then(cb) callback is not retried,
        // it either passes or fails
        .then(($div) => {
          expect($div, 'text content').to.have.text('Introduction');
        });
    });

    it('can throw any error', () => {
      cy.get('.docs-header')
        .find('div')
        .should(($div) => {
          if ($div.length !== 1) {
            // you can throw your own errors
            throw new Error('Did not find 1 element');
          }

          const className = $div[0].className;

          if (!className.match(/heading-/)) {
            throw new Error(
              `Could not find class "heading-" in ${className}`,
            );
          }
        });
    });

    it('matches unknown text between two elements', () => {
      /**
       * Text from the first element.
       * @type {string}
       */
      let text;

      /**
       * Normalizes passed text,
       * useful before comparing text with spaces and different capitalization.
       * @param {string} s Text to normalize
       */
      const normalizeText = (s) => s.replace(/\s/g, '').toLowerCase();

      cy.get('.two-elements')
        .find('.first')
        .then(($first) => {
          // save text from the first element
          text = normalizeText($first.text());
        });

      cy.get('.two-elements')
        .find('.second')
        .should(($div) => {
          // we can massage text before comparing
          const secondText = normalizeText($div.text());

          expect(secondText, 'second text').to.equal(text);
        });
    });

    it('assert - assert shape of an object', () => {
      const person = {
        name: 'Joe',
        age: 20,
      };

      assert.isObject(person, 'value is object');
    });

    it('retries the should callback until assertions pass', () => {
      cy.get('#random-number').should(($div) => {
        const n = parseFloat($div.text());

        expect(n).to.be.gte(1).and.be.lte(10);
      });
    });
  });
});
```

#### Connectors

```js
/// <reference types="cypress" />

context('Connectors', () => {
  beforeEach(() => {
    cy.visit('https://example.cypress.io/commands/connectors');
  });

  it('.each() - iterate over an array of elements', () => {
    // https://on.cypress.io/each
    cy.get('.connectors-each-ul>li').each(($el, index, $list) => {
      console.log($el, index, $list);
    });
  });

  it('.its() - get properties on the current subject', () => {
    // https://on.cypress.io/its
    cy.get('.connectors-its-ul>li')
      // calls the 'length' property yielding that value
      .its('length')
      .should('be.gt', 2);
  });

  it('.invoke() - invoke a function on the current subject', () => {
    // our div is hidden in our script.js
    // $('.connectors-div').hide()

    // https://on.cypress.io/invoke
    cy.get('.connectors-div')
      .should('be.hidden')
      // call the jquery method 'show' on the 'div.container'
      .invoke('show')
      .should('be.visible');
  });

  it('.spread() - spread an array as individual args to callback function', () => {
    // https://on.cypress.io/spread
    const arr = ['foo', 'bar', 'baz'];

    cy.wrap(arr).spread((foo, bar, baz) => {
      expect(foo).to.eq('foo');
      expect(bar).to.eq('bar');
      expect(baz).to.eq('baz');
    });
  });

  describe('.then()', () => {
    it('invokes a callback function with the current subject', () => {
      // https://on.cypress.io/then
      cy.get('.connectors-list > li').then(($lis) => {
        expect($lis, '3 items').to.have.length(3);
        expect($lis.eq(0), 'first item').to.contain('Walk the dog');
        expect($lis.eq(1), 'second item').to.contain('Feed the cat');
        expect($lis.eq(2), 'third item').to.contain(
          'Write JavaScript',
        );
      });
    });

    it('yields the returned value to the next command', () => {
      cy.wrap(1)
        .then((num) => {
          expect(num).to.equal(1);

          return 2;
        })
        .then((num) => {
          expect(num).to.equal(2);
        });
    });

    it('yields the original subject without return', () => {
      cy.wrap(1)
        .then((num) => {
          expect(num).to.equal(1);
          // note that nothing is returned from this callback
        })
        .then((num) => {
          // this callback receives the original unchanged value 1
          expect(num).to.equal(1);
        });
    });

    it('yields the value yielded by the last Cypress command inside', () => {
      cy.wrap(1)
        .then((num) => {
          expect(num).to.equal(1);
          // note how we run a Cypress command
          // the result yielded by this Cypress command
          // will be passed to the second ".then"
          cy.wrap(2);
        })
        .then((num) => {
          // this callback receives the value yielded by "cy.wrap(2)"
          expect(num).to.equal(2);
        });
    });
  });
});
```

#### Cookies

```js
/// <reference types="cypress" />

context('Cookies', () => {
  beforeEach(() => {
    Cypress.Cookies.debug(true);

    cy.visit('https://example.cypress.io/commands/cookies');

    // clear cookies again after visiting to remove
    // any 3rd party cookies picked up such as cloudflare
    cy.clearCookies();
  });

  it('cy.getCookie() - get a browser cookie', () => {
    // https://on.cypress.io/getcookie
    cy.get('#getCookie .set-a-cookie').click();

    // cy.getCookie() yields a cookie object
    cy.getCookie('token').should('have.property', 'value', '123ABC');
  });

  it('cy.getCookies() - get browser cookies', () => {
    // https://on.cypress.io/getcookies
    cy.getCookies().should('be.empty');

    cy.get('#getCookies .set-a-cookie').click();

    // cy.getCookies() yields an array of cookies
    cy.getCookies()
      .should('have.length', 1)
      .should((cookies) => {
        // each cookie has these properties
        expect(cookies[0]).to.have.property('name', 'token');
        expect(cookies[0]).to.have.property('value', '123ABC');
        expect(cookies[0]).to.have.property('httpOnly', false);
        expect(cookies[0]).to.have.property('secure', false);
        expect(cookies[0]).to.have.property('domain');
        expect(cookies[0]).to.have.property('path');
      });
  });

  it('cy.setCookie() - set a browser cookie', () => {
    // https://on.cypress.io/setcookie
    cy.getCookies().should('be.empty');

    cy.setCookie('foo', 'bar');

    // cy.getCookie() yields a cookie object
    cy.getCookie('foo').should('have.property', 'value', 'bar');
  });

  it('cy.clearCookie() - clear a browser cookie', () => {
    // https://on.cypress.io/clearcookie
    cy.getCookie('token').should('be.null');

    cy.get('#clearCookie .set-a-cookie').click();

    cy.getCookie('token').should('have.property', 'value', '123ABC');

    // cy.clearCookies() yields null
    cy.clearCookie('token').should('be.null');

    cy.getCookie('token').should('be.null');
  });

  it('cy.clearCookies() - clear browser cookies', () => {
    // https://on.cypress.io/clearcookies
    cy.getCookies().should('be.empty');

    cy.get('#clearCookies .set-a-cookie').click();

    cy.getCookies().should('have.length', 1);

    // cy.clearCookies() yields null
    cy.clearCookies();

    cy.getCookies().should('be.empty');
  });
});
```

#### Cypress API

```js
/// <reference types="cypress" />

context('Cypress.Commands', () => {
  beforeEach(() => {
    cy.visit('https://example.cypress.io/cypress-api');
  });

  // https://on.cypress.io/custom-commands

  it('.add() - create a custom command', () => {
    Cypress.Commands.add(
      'console',
      {
        prevSubject: true,
      },
      (subject, method) => {
        // the previous subject is automatically received
        // and the commands arguments are shifted

        // allow us to change the console method used
        method = method || 'log';

        // log the subject to the console
        // @ts-ignore TS7017
        console[method]('The subject is', subject);

        // whatever we return becomes the new subject
        // we don't want to change the subject so
        // we return whatever was passed in
        return subject;
      },
    );

    // @ts-ignore TS2339
    cy.get('button')
      .console('info')
      .then(($button) => {
        // subject is still $button
      });
  });
});

context('Cypress.Cookies', () => {
  beforeEach(() => {
    cy.visit('https://example.cypress.io/cypress-api');
  });

  // https://on.cypress.io/cookies
  it('.debug() - enable or disable debugging', () => {
    Cypress.Cookies.debug(true);

    // Cypress will now log in the console when
    // cookies are set or cleared
    cy.setCookie('fakeCookie', '123ABC');
    cy.clearCookie('fakeCookie');
    cy.setCookie('fakeCookie', '123ABC');
    cy.clearCookie('fakeCookie');
    cy.setCookie('fakeCookie', '123ABC');
  });

  it('.preserveOnce() - preserve cookies by key', () => {
    // normally cookies are reset after each test
    cy.getCookie('fakeCookie').should('not.be.ok');

    // preserving a cookie will not clear it when
    // the next test starts
    cy.setCookie('lastCookie', '789XYZ');
    Cypress.Cookies.preserveOnce('lastCookie');
  });

  it('.defaults() - set defaults for all cookies', () => {
    // now any cookie with the name 'session_id' will
    // not be cleared before each new test runs
    Cypress.Cookies.defaults({
      preserve: 'session_id',
    });
  });
});

context('Cypress.arch', () => {
  beforeEach(() => {
    cy.visit('https://example.cypress.io/cypress-api');
  });

  it('Get CPU architecture name of underlying OS', () => {
    // https://on.cypress.io/arch
    expect(Cypress.arch).to.exist;
  });
});

context('Cypress.config()', () => {
  beforeEach(() => {
    cy.visit('https://example.cypress.io/cypress-api');
  });

  it('Get and set configuration options', () => {
    // https://on.cypress.io/config
    let myConfig = Cypress.config();

    expect(myConfig).to.have.property(
      'animationDistanceThreshold',
      5,
    );
    expect(myConfig).to.have.property('baseUrl', null);
    expect(myConfig).to.have.property('defaultCommandTimeout', 4000);
    expect(myConfig).to.have.property('requestTimeout', 5000);
    expect(myConfig).to.have.property('responseTimeout', 30000);
    expect(myConfig).to.have.property('viewportHeight', 660);
    expect(myConfig).to.have.property('viewportWidth', 1000);
    expect(myConfig).to.have.property('pageLoadTimeout', 60000);
    expect(myConfig).to.have.property('waitForAnimations', true);

    expect(Cypress.config('pageLoadTimeout')).to.eq(60000);

    // this will change the config for the rest of your tests!
    Cypress.config('pageLoadTimeout', 20000);

    expect(Cypress.config('pageLoadTimeout')).to.eq(20000);

    Cypress.config('pageLoadTimeout', 60000);
  });
});

context('Cypress.dom', () => {
  beforeEach(() => {
    cy.visit('https://example.cypress.io/cypress-api');
  });

  // https://on.cypress.io/dom
  it('.isHidden() - determine if a DOM element is hidden', () => {
    let hiddenP = Cypress.$('.dom-p p.hidden').get(0);
    let visibleP = Cypress.$('.dom-p p.visible').get(0);

    // our first paragraph has css class 'hidden'
    expect(Cypress.dom.isHidden(hiddenP)).to.be.true;
    expect(Cypress.dom.isHidden(visibleP)).to.be.false;
  });
});

context('Cypress.env()', () => {
  beforeEach(() => {
    cy.visit('https://example.cypress.io/cypress-api');
  });

  // We can set environment variables for highly dynamic values

  // https://on.cypress.io/environment-variables
  it('Get environment variables', () => {
    // https://on.cypress.io/env
    // set multiple environment variables
    Cypress.env({
      host: 'veronica.dev.local',
      api_server: 'http://localhost:8888/v1/',
    });

    // get environment variable
    expect(Cypress.env('host')).to.eq('veronica.dev.local');

    // set environment variable
    Cypress.env('api_server', 'http://localhost:8888/v2/');
    expect(Cypress.env('api_server')).to.eq(
      'http://localhost:8888/v2/',
    );

    // get all environment variable
    expect(Cypress.env()).to.have.property(
      'host',
      'veronica.dev.local',
    );
    expect(Cypress.env()).to.have.property(
      'api_server',
      'http://localhost:8888/v2/',
    );
  });
});

context('Cypress.log', () => {
  beforeEach(() => {
    cy.visit('https://example.cypress.io/cypress-api');
  });

  it('Control what is printed to the Command Log', () => {
    // https://on.cypress.io/cypress-log
  });
});

context('Cypress.platform', () => {
  beforeEach(() => {
    cy.visit('https://example.cypress.io/cypress-api');
  });

  it('Get underlying OS name', () => {
    // https://on.cypress.io/platform
    expect(Cypress.platform).to.be.exist;
  });
});

context('Cypress.version', () => {
  beforeEach(() => {
    cy.visit('https://example.cypress.io/cypress-api');
  });

  it('Get current version of Cypress being run', () => {
    // https://on.cypress.io/version
    expect(Cypress.version).to.be.exist;
  });
});

context('Cypress.spec', () => {
  beforeEach(() => {
    cy.visit('https://example.cypress.io/cypress-api');
  });

  it('Get current spec information', () => {
    // https://on.cypress.io/spec
    // wrap the object so we can inspect it easily by clicking in the command log
    cy.wrap(Cypress.spec).should('include.keys', [
      'name',
      'relative',
      'absolute',
    ]);
  });
});
```

#### Files

```js
/// <reference types="cypress" />

/// JSON fixture file can be loaded directly using
// the built-in JavaScript bundler
// @ts-ignore
const requiredExample = require('../../fixtures/example');

context('Files', () => {
  beforeEach(() => {
    cy.visit('https://example.cypress.io/commands/files');
  });

  beforeEach(() => {
    // load example.json fixture file and store
    // in the test context object
    cy.fixture('example.json').as('example');
  });

  it('cy.fixture() - load a fixture', () => {
    // https://on.cypress.io/fixture

    // Instead of writing a response inline you can
    // use a fixture file's content.

    // when application makes an Ajax request matching "GET **/comments/*"
    // Cypress will intercept it and reply with the object in `example.json` fixture
    cy.intercept('GET', '**/comments/*', {
      fixture: 'example.json',
    }).as('getComment');

    // we have code that gets a comment when
    // the button is clicked in scripts.js
    cy.get('.fixture-btn').click();

    cy.wait('@getComment')
      .its('response.body')
      .should('have.property', 'name')
      .and('include', 'Using fixtures to represent data');
  });

  it('cy.fixture() or require - load a fixture', function () {
    // we are inside the "function () { ... }"
    // callback and can use test context object "this"
    // "this.example" was loaded in "beforeEach" function callback
    expect(this.example, 'fixture in the test context').to.deep.equal(
      requiredExample,
    );

    // or use "cy.wrap" and "should('deep.equal', ...)" assertion
    cy.wrap(this.example).should('deep.equal', requiredExample);
  });

  it('cy.readFile() - read file contents', () => {
    // https://on.cypress.io/readfile

    // You can read a file and yield its contents
    // The filePath is relative to your project's root.
    cy.readFile('cypress.json').then((json) => {
      expect(json).to.be.an('object');
    });
  });

  it('cy.writeFile() - write to a file', () => {
    // https://on.cypress.io/writefile

    // You can write to a file

    // Use a response from a request to automatically
    // generate a fixture file for use later
    cy.request('https://jsonplaceholder.cypress.io/users').then(
      (response) => {
        cy.writeFile('cypress/fixtures/users.json', response.body);
      },
    );

    cy.fixture('users').should((users) => {
      expect(users[0].name).to.exist;
    });

    // JavaScript arrays and objects are stringified
    // and formatted into text.
    cy.writeFile('cypress/fixtures/profile.json', {
      id: 8739,
      name: 'Jane',
      email: 'jane@example.com',
    });

    cy.fixture('profile').should((profile) => {
      expect(profile.name).to.eq('Jane');
    });
  });
});
```

#### Local Storage

```js
/// <reference types="cypress" />

context('Local Storage', () => {
  beforeEach(() => {
    cy.visit('https://example.cypress.io/commands/local-storage');
  });
  // Although local storage is automatically cleared
  // in between tests to maintain a clean state
  // sometimes we need to clear the local storage manually

  it('cy.clearLocalStorage() - clear all data in local storage', () => {
    // https://on.cypress.io/clearlocalstorage
    cy.get('.ls-btn')
      .click()
      .should(() => {
        expect(localStorage.getItem('prop1')).to.eq('red');
        expect(localStorage.getItem('prop2')).to.eq('blue');
        expect(localStorage.getItem('prop3')).to.eq('magenta');
      });

    // clearLocalStorage() yields the localStorage object
    cy.clearLocalStorage().should((ls) => {
      expect(ls.getItem('prop1')).to.be.null;
      expect(ls.getItem('prop2')).to.be.null;
      expect(ls.getItem('prop3')).to.be.null;
    });

    cy.get('.ls-btn')
      .click()
      .should(() => {
        expect(localStorage.getItem('prop1')).to.eq('red');
        expect(localStorage.getItem('prop2')).to.eq('blue');
        expect(localStorage.getItem('prop3')).to.eq('magenta');
      });

    // Clear key matching string in Local Storage
    cy.clearLocalStorage('prop1').should((ls) => {
      expect(ls.getItem('prop1')).to.be.null;
      expect(ls.getItem('prop2')).to.eq('blue');
      expect(ls.getItem('prop3')).to.eq('magenta');
    });

    cy.get('.ls-btn')
      .click()
      .should(() => {
        expect(localStorage.getItem('prop1')).to.eq('red');
        expect(localStorage.getItem('prop2')).to.eq('blue');
        expect(localStorage.getItem('prop3')).to.eq('magenta');
      });

    // Clear keys matching regex in Local Storage
    cy.clearLocalStorage(/prop1|2/).should((ls) => {
      expect(ls.getItem('prop1')).to.be.null;
      expect(ls.getItem('prop2')).to.be.null;
      expect(ls.getItem('prop3')).to.eq('magenta');
    });
  });
});
```

#### Location

```js
/// <reference types="cypress" />

context('Location', () => {
  beforeEach(() => {
    cy.visit('https://example.cypress.io/commands/location');
  });

  it('cy.hash() - get the current URL hash', () => {
    // https://on.cypress.io/hash
    cy.hash().should('be.empty');
  });

  it('cy.location() - get window.location', () => {
    // https://on.cypress.io/location
    cy.location().should((location) => {
      expect(location.hash).to.be.empty;
      expect(location.href).to.eq(
        'https://example.cypress.io/commands/location',
      );
      expect(location.host).to.eq('example.cypress.io');
      expect(location.hostname).to.eq('example.cypress.io');
      expect(location.origin).to.eq('https://example.cypress.io');
      expect(location.pathname).to.eq('/commands/location');
      expect(location.port).to.eq('');
      expect(location.protocol).to.eq('https:');
      expect(location.search).to.be.empty;
    });
  });

  it('cy.url() - get the current URL', () => {
    // https://on.cypress.io/url
    cy.url().should(
      'eq',
      'https://example.cypress.io/commands/location',
    );
  });
});
```

#### Misc

```js
/// <reference types="cypress" />

context('Misc', () => {
  beforeEach(() => {
    cy.visit('https://example.cypress.io/commands/misc');
  });

  it('.end() - end the command chain', () => {
    // https://on.cypress.io/end

    // cy.end is useful when you want to end a chain of commands
    // and force Cypress to re-query from the root element
    cy.get('.misc-table').within(() => {
      // ends the current chain and yields null
      cy.contains('Cheryl').click().end();

      // queries the entire table again
      cy.contains('Charles').click();
    });
  });

  it('cy.exec() - execute a system command', () => {
    // execute a system command.
    // so you can take actions necessary for
    // your test outside the scope of Cypress.
    // https://on.cypress.io/exec

    // we can use Cypress.platform string to
    // select appropriate command
    // https://on.cypress/io/platform
    cy.log(
      `Platform ${Cypress.platform} architecture ${Cypress.arch}`,
    );

    // on CircleCI Windows build machines we have a failure to run bash shell
    // https://github.com/cypress-io/cypress/issues/5169
    // so skip some of the tests by passing flag "--env circle=true"
    const isCircleOnWindows =
      Cypress.platform === 'win32' && Cypress.env('circle');

    if (isCircleOnWindows) {
      cy.log('Skipping test on CircleCI');

      return;
    }

    // cy.exec problem on Shippable CI
    // https://github.com/cypress-io/cypress/issues/6718
    const isShippable =
      Cypress.platform === 'linux' && Cypress.env('shippable');

    if (isShippable) {
      cy.log('Skipping test on ShippableCI');

      return;
    }

    cy.exec('echo Jane Lane')
      .its('stdout')
      .should('contain', 'Jane Lane');

    if (Cypress.platform === 'win32') {
      cy.exec('print cypress.json').its('stderr').should('be.empty');
    } else {
      cy.exec('cat cypress.json').its('stderr').should('be.empty');

      cy.exec('pwd').its('code').should('eq', 0);
    }
  });

  it('cy.focused() - get the DOM element that has focus', () => {
    // https://on.cypress.io/focused
    cy.get('.misc-form').find('#name').click();
    cy.focused().should('have.id', 'name');

    cy.get('.misc-form').find('#description').click();
    cy.focused().should('have.id', 'description');
  });

  context('Cypress.Screenshot', function () {
    it('cy.screenshot() - take a screenshot', () => {
      // https://on.cypress.io/screenshot
      cy.screenshot('my-image');
    });

    it('Cypress.Screenshot.defaults() - change default config of screenshots', function () {
      Cypress.Screenshot.defaults({
        blackout: ['.foo'],
        capture: 'viewport',
        clip: { x: 0, y: 0, width: 200, height: 200 },
        scale: false,
        disableTimersAndAnimations: true,
        screenshotOnRunFailure: true,
        onBeforeScreenshot() {},
        onAfterScreenshot() {},
      });
    });
  });

  it('cy.wrap() - wrap an object', () => {
    // https://on.cypress.io/wrap
    cy.wrap({ foo: 'bar' })
      .should('have.property', 'foo')
      .and('include', 'bar');
  });
});
```

#### Navigation

```js
/// <reference types="cypress" />

context('Navigation', () => {
  beforeEach(() => {
    cy.visit('https://example.cypress.io');
    cy.get('.navbar-nav').contains('Commands').click();
    cy.get('.dropdown-menu').contains('Navigation').click();
  });

  it("cy.go() - go back or forward in the browser's history", () => {
    // https://on.cypress.io/go

    cy.location('pathname').should('include', 'navigation');

    cy.go('back');
    cy.location('pathname').should('not.include', 'navigation');

    cy.go('forward');
    cy.location('pathname').should('include', 'navigation');

    // clicking back
    cy.go(-1);
    cy.location('pathname').should('not.include', 'navigation');

    // clicking forward
    cy.go(1);
    cy.location('pathname').should('include', 'navigation');
  });

  it('cy.reload() - reload the page', () => {
    // https://on.cypress.io/reload
    cy.reload();

    // reload the page without using the cache
    cy.reload(true);
  });

  it('cy.visit() - visit a remote url', () => {
    // https://on.cypress.io/visit

    // Visit any sub-domain of your current domain

    // Pass options to the visit
    cy.visit('https://example.cypress.io/commands/navigation', {
      timeout: 50000, // increase total time for the visit to resolve
      onBeforeLoad(contentWindow) {
        // contentWindow is the remote page's window object
        expect(typeof contentWindow === 'object').to.be.true;
      },
      onLoad(contentWindow) {
        // contentWindow is the remote page's window object
        expect(typeof contentWindow === 'object').to.be.true;
      },
    });
  });
});
```

#### Network Requests

```js
/// <reference types="cypress" />

context('Network Requests', () => {
  beforeEach(() => {
    cy.visit('https://example.cypress.io/commands/network-requests');
  });

  // Manage HTTP requests in your app

  it('cy.request() - make an XHR request', () => {
    // https://on.cypress.io/request
    cy.request('https://jsonplaceholder.cypress.io/comments').should(
      (response) => {
        expect(response.status).to.eq(200);
        // the server sometimes gets an extra comment posted from another machine
        // which gets returned as 1 extra object
        expect(response.body)
          .to.have.property('length')
          .and.be.oneOf([500, 501]);
        expect(response).to.have.property('headers');
        expect(response).to.have.property('duration');
      },
    );
  });

  it('cy.request() - verify response using BDD syntax', () => {
    cy.request('https://jsonplaceholder.cypress.io/comments').then(
      (response) => {
        // https://on.cypress.io/assertions
        expect(response).property('status').to.equal(200);
        expect(response)
          .property('body')
          .to.have.property('length')
          .and.be.oneOf([500, 501]);
        expect(response).to.include.keys('headers', 'duration');
      },
    );
  });

  it('cy.request() with query parameters', () => {
    // will execute request
    // https://jsonplaceholder.cypress.io/comments?postId=1&id=3
    cy.request({
      url: 'https://jsonplaceholder.cypress.io/comments',
      qs: {
        postId: 1,
        id: 3,
      },
    })
      .its('body')
      .should('be.an', 'array')
      .and('have.length', 1)
      .its('0') // yields first element of the array
      .should('contain', {
        postId: 1,
        id: 3,
      });
  });

  it('cy.request() - pass result to the second request', () => {
    // first, let's find out the userId of the first user we have
    cy.request('https://jsonplaceholder.cypress.io/users?_limit=1')
      .its('body') // yields the response object
      .its('0') // yields the first element of the returned list
      // the above two commands its('body').its('0')
      // can be written as its('body.0')
      // if you do not care about TypeScript checks
      .then((user) => {
        expect(user).property('id').to.be.a('number');
        // make a new post on behalf of the user
        cy.request(
          'POST',
          'https://jsonplaceholder.cypress.io/posts',
          {
            userId: user.id,
            title: 'Cypress Test Runner',
            body: 'Fast, easy and reliable testing for anything that runs in a browser.',
          },
        );
      })
      // note that the value here is the returned value of the 2nd request
      // which is the new post object
      .then((response) => {
        expect(response).property('status').to.equal(201); // new entity created
        expect(response).property('body').to.contain({
          title: 'Cypress Test Runner',
        });

        // we don't know the exact post id - only that it will be > 100
        // since JSONPlaceholder has built-in 100 posts
        expect(response.body)
          .property('id')
          .to.be.a('number')
          .and.to.be.gt(100);

        // we don't know the user id here - since it was in above closure
        // so in this test just confirm that the property is there
        expect(response.body).property('userId').to.be.a('number');
      });
  });

  it('cy.request() - save response in the shared test context', () => {
    // https://on.cypress.io/variables-and-aliases
    cy.request('https://jsonplaceholder.cypress.io/users?_limit=1')
      .its('body')
      .its('0') // yields the first element of the returned list
      .as('user') // saves the object in the test context
      .then(function () {
        // NOTE 👀
        //  By the time this callback runs the "as('user')" command
        //  has saved the user object in the test context.
        //  To access the test context we need to use
        //  the "function () { ... }" callback form,
        //  otherwise "this" points at a wrong or undefined object!
        cy.request(
          'POST',
          'https://jsonplaceholder.cypress.io/posts',
          {
            userId: this.user.id,
            title: 'Cypress Test Runner',
            body: 'Fast, easy and reliable testing for anything that runs in a browser.',
          },
        )
          .its('body')
          .as('post'); // save the new post from the response
      })
      .then(function () {
        // When this callback runs, both "cy.request" API commands have finished
        // and the test context has "user" and "post" objects set.
        // Let's verify them.
        expect(this.post, 'post has the right user id')
          .property('userId')
          .to.equal(this.user.id);
      });
  });

  it('cy.intercept() - route responses to matching requests', () => {
    // https://on.cypress.io/intercept

    let message = 'whoa, this comment does not exist';

    // Listen to GET to comments/1
    cy.intercept('GET', '**/comments/*').as('getComment');

    // we have code that gets a comment when
    // the button is clicked in scripts.js
    cy.get('.network-btn').click();

    // https://on.cypress.io/wait
    cy.wait('@getComment')
      .its('response.statusCode')
      .should('be.oneOf', [200, 304]);

    // Listen to POST to comments
    cy.intercept('POST', '**/comments').as('postComment');

    // we have code that posts a comment when
    // the button is clicked in scripts.js
    cy.get('.network-post').click();
    cy.wait('@postComment').should(({ request, response }) => {
      expect(request.body).to.include('email');
      expect(request.headers).to.have.property('content-type');
      expect(response && response.body).to.have.property(
        'name',
        'Using POST in cy.intercept()',
      );
    });

    // Stub a response to PUT comments/ ****
    cy.intercept(
      {
        method: 'PUT',
        url: '**/comments/*',
      },
      {
        statusCode: 404,
        body: { error: message },
        headers: { 'access-control-allow-origin': '*' },
        delayMs: 500,
      },
    ).as('putComment');

    // we have code that puts a comment when
    // the button is clicked in scripts.js
    cy.get('.network-put').click();

    cy.wait('@putComment');

    // our 404 statusCode logic in scripts.js executed
    cy.get('.network-put-comment').should('contain', message);
  });
});
```

#### Querying

```js
/// <reference types="cypress" />

context('Querying', () => {
  beforeEach(() => {
    cy.visit('https://example.cypress.io/commands/querying');
  });

  // The most commonly used query is 'cy.get()', you can
  // think of this like the '$' in jQuery

  it('cy.get() - query DOM elements', () => {
    // https://on.cypress.io/get

    cy.get('#query-btn').should('contain', 'Button');

    cy.get('.query-btn').should('contain', 'Button');

    cy.get('#querying .well>button:first').should(
      'contain',
      'Button',
    );
    //              ↲
    // Use CSS selectors just like jQuery

    cy.get('[data-test-id="test-example"]').should(
      'have.class',
      'example',
    );

    // 'cy.get()' yields jQuery object, you can get its attribute
    // by invoking `.attr()` method
    cy.get('[data-test-id="test-example"]')
      .invoke('attr', 'data-test-id')
      .should('equal', 'test-example');

    // or you can get element's CSS property
    cy.get('[data-test-id="test-example"]')
      .invoke('css', 'position')
      .should('equal', 'static');

    // or use assertions directly during 'cy.get()'
    // https://on.cypress.io/assertions
    cy.get('[data-test-id="test-example"]')
      .should('have.attr', 'data-test-id', 'test-example')
      .and('have.css', 'position', 'static');
  });

  it('cy.contains() - query DOM elements with matching content', () => {
    // https://on.cypress.io/contains
    cy.get('.query-list')
      .contains('bananas')
      .should('have.class', 'third');

    // we can pass a regexp to `.contains()`
    cy.get('.query-list')
      .contains(/^b\w+/)
      .should('have.class', 'third');

    cy.get('.query-list')
      .contains('apples')
      .should('have.class', 'first');

    // passing a selector to contains will
    // yield the selector containing the text
    cy.get('#querying')
      .contains('ul', 'oranges')
      .should('have.class', 'query-list');

    cy.get('.query-button')
      .contains('Save Form')
      .should('have.class', 'btn');
  });

  it('.within() - query DOM elements within a specific element', () => {
    // https://on.cypress.io/within
    cy.get('.query-form').within(() => {
      cy.get('input:first').should(
        'have.attr',
        'placeholder',
        'Email',
      );
      cy.get('input:last').should(
        'have.attr',
        'placeholder',
        'Password',
      );
    });
  });

  it('cy.root() - query the root DOM element', () => {
    // https://on.cypress.io/root

    // By default, root is the document
    cy.root().should('match', 'html');

    cy.get('.query-ul').within(() => {
      // In this within, the root is now the ul DOM element
      cy.root().should('have.class', 'query-ul');
    });
  });

  it('best practices - selecting elements', () => {
    // https://on.cypress.io/best-practices#Selecting-Elements
    cy.get('[data-cy=best-practices-selecting-elements]').within(
      () => {
        // Worst - too generic, no context
        cy.get('button').click();

        // Bad. Coupled to styling. Highly subject to change.
        cy.get('.btn.btn-large').click();

        // Average. Coupled to the `name` attribute which has HTML semantics.
        cy.get('[name=submission]').click();

        // Better. But still coupled to styling or JS event listeners.
        cy.get('#main').click();

        // Slightly better. Uses an ID but also ensures the element
        // has an ARIA role attribute
        cy.get('#main[role=button]').click();

        // Much better. But still coupled to text content that may change.
        cy.contains('Submit').click();

        // Best. Insulated from all changes.
        cy.get('[data-cy=submit]').click();
      },
    );
  });
});
```

#### Spies, Stubs & Clocks

```js
/// <reference types="cypress" />
// remove no check once Cypress.sinon is typed
// https://github.com/cypress-io/cypress/issues/6720

context('Spies, Stubs, and Clock', () => {
  it('cy.spy() - wrap a method in a spy', () => {
    // https://on.cypress.io/spy
    cy.visit(
      'https://example.cypress.io/commands/spies-stubs-clocks',
    );

    const obj = {
      foo() {},
    };

    const spy = cy.spy(obj, 'foo').as('anyArgs');

    obj.foo();

    expect(spy).to.be.called;
  });

  it('cy.spy() retries until assertions pass', () => {
    cy.visit(
      'https://example.cypress.io/commands/spies-stubs-clocks',
    );

    const obj = {
      /**
       * Prints the argument passed
       * @param x {any}
       */
      foo(x) {
        console.log('obj.foo called with', x);
      },
    };

    cy.spy(obj, 'foo').as('foo');

    setTimeout(() => {
      obj.foo('first');
    }, 500);

    setTimeout(() => {
      obj.foo('second');
    }, 2500);

    cy.get('@foo').should('have.been.calledTwice');
  });

  it('cy.stub() - create a stub and/or replace a function with stub', () => {
    // https://on.cypress.io/stub
    cy.visit(
      'https://example.cypress.io/commands/spies-stubs-clocks',
    );

    const obj = {
      /**
       * prints both arguments to the console
       * @param a {string}
       * @param b {string}
       */
      foo(a, b) {
        console.log('a', a, 'b', b);
      },
    };

    const stub = cy.stub(obj, 'foo').as('foo');

    obj.foo('foo', 'bar');

    expect(stub).to.be.called;
  });

  it('cy.clock() - control time in the browser', () => {
    // https://on.cypress.io/clock

    // create the date in UTC so its always the same
    // no matter what local timezone the browser is running in
    const now = new Date(Date.UTC(2017, 2, 14)).getTime();

    cy.clock(now);
    cy.visit(
      'https://example.cypress.io/commands/spies-stubs-clocks',
    );
    cy.get('#clock-div').click().should('have.text', '1489449600');
  });

  it('cy.tick() - move time in the browser', () => {
    // https://on.cypress.io/tick

    // create the date in UTC so its always the same
    // no matter what local timezone the browser is running in
    const now = new Date(Date.UTC(2017, 2, 14)).getTime();

    cy.clock(now);
    cy.visit(
      'https://example.cypress.io/commands/spies-stubs-clocks',
    );
    cy.get('#tick-div').click().should('have.text', '1489449600');

    cy.tick(10000); // 10 seconds passed
    cy.get('#tick-div').click().should('have.text', '1489449610');
  });

  it('cy.stub() matches depending on arguments', () => {
    // see all possible matchers at
    // https://sinonjs.org/releases/latest/matchers/
    const greeter = {
      /**
       * Greets a person
       * @param {string} name
       */
      greet(name) {
        return `Hello, ${name}!`;
      },
    };

    cy.stub(greeter, 'greet')
      .callThrough() // if you want non-matched calls to call the real method
      .withArgs(Cypress.sinon.match.string)
      .returns('Hi')
      .withArgs(Cypress.sinon.match.number)
      .throws(new Error('Invalid name'));

    expect(greeter.greet('World')).to.equal('Hi');
    // @ts-ignore
    expect(() => greeter.greet(42)).to.throw('Invalid name');
    expect(greeter.greet).to.have.been.calledTwice;

    // non-matched calls goes the actual method
    // @ts-ignore
    expect(greeter.greet()).to.equal('Hello, undefined!');
  });

  it('matches call arguments using Sinon matchers', () => {
    // see all possible matchers at
    // https://sinonjs.org/releases/latest/matchers/
    const calculator = {
      /**
       * returns the sum of two arguments
       * @param a {number}
       * @param b {number}
       */
      add(a, b) {
        return a + b;
      },
    };

    const spy = cy.spy(calculator, 'add').as('add');

    expect(calculator.add(2, 3)).to.equal(5);

    // if we want to assert the exact values used during the call
    expect(spy).to.be.calledWith(2, 3);

    // let's confirm "add" method was called with two numbers
    expect(spy).to.be.calledWith(
      Cypress.sinon.match.number,
      Cypress.sinon.match.number,
    );

    // alternatively, provide the value to match
    expect(spy).to.be.calledWith(
      Cypress.sinon.match(2),
      Cypress.sinon.match(3),
    );

    // match any value
    expect(spy).to.be.calledWith(Cypress.sinon.match.any, 3);

    // match any value from a list
    expect(spy).to.be.calledWith(
      Cypress.sinon.match.in([1, 2, 3]),
      3,
    );

    /**
     * Returns true if the given number is event
     * @param {number} x
     */
    const isEven = (x) => x % 2 === 0;

    // expect the value to pass a custom predicate function
    // the second argument to "sinon.match(predicate, message)" is
    // shown if the predicate does not pass and assertion fails
    expect(spy).to.be.calledWith(
      Cypress.sinon.match(isEven, 'isEven'),
      3,
    );

    /**
     * Returns a function that checks if a given number is larger than the limit
     * @param {number} limit
     * @returns {(x: number) => boolean}
     */
    const isGreaterThan = (limit) => (x) => x > limit;

    /**
     * Returns a function that checks if a given number is less than the limit
     * @param {number} limit
     * @returns {(x: number) => boolean}
     */
    const isLessThan = (limit) => (x) => x < limit;

    // you can combine several matchers using "and", "or"
    expect(spy).to.be.calledWith(
      Cypress.sinon.match.number,
      Cypress.sinon
        .match(isGreaterThan(2), '> 2')
        .and(Cypress.sinon.match(isLessThan(4), '< 4')),
    );

    expect(spy).to.be.calledWith(
      Cypress.sinon.match.number,
      Cypress.sinon
        .match(isGreaterThan(200), '> 200')
        .or(Cypress.sinon.match(3)),
    );

    // matchers can be used from BDD assertions
    cy.get('@add').should(
      'have.been.calledWith',
      Cypress.sinon.match.number,
      Cypress.sinon.match(3),
    );

    // you can alias matchers for shorter test code
    const { match: M } = Cypress.sinon;

    cy.get('@add').should('have.been.calledWith', M.number, M(3));
  });
});
```

#### Traversal

```js
/// <reference types="cypress" />

context('Traversal', () => {
  beforeEach(() => {
    cy.visit('https://example.cypress.io/commands/traversal');
  });

  it('.children() - get child DOM elements', () => {
    // https://on.cypress.io/children
    cy.get('.traversal-breadcrumb')
      .children('.active')
      .should('contain', 'Data');
  });

  it('.closest() - get closest ancestor DOM element', () => {
    // https://on.cypress.io/closest
    cy.get('.traversal-badge')
      .closest('ul')
      .should('have.class', 'list-group');
  });

  it('.eq() - get a DOM element at a specific index', () => {
    // https://on.cypress.io/eq
    cy.get('.traversal-list>li').eq(1).should('contain', 'siamese');
  });

  it('.filter() - get DOM elements that match the selector', () => {
    // https://on.cypress.io/filter
    cy.get('.traversal-nav>li')
      .filter('.active')
      .should('contain', 'About');
  });

  it('.find() - get descendant DOM elements of the selector', () => {
    // https://on.cypress.io/find
    cy.get('.traversal-pagination')
      .find('li')
      .find('a')
      .should('have.length', 7);
  });

  it('.first() - get first DOM element', () => {
    // https://on.cypress.io/first
    cy.get('.traversal-table td').first().should('contain', '1');
  });

  it('.last() - get last DOM element', () => {
    // https://on.cypress.io/last
    cy.get('.traversal-buttons .btn')
      .last()
      .should('contain', 'Submit');
  });

  it('.next() - get next sibling DOM element', () => {
    // https://on.cypress.io/next
    cy.get('.traversal-ul')
      .contains('apples')
      .next()
      .should('contain', 'oranges');
  });

  it('.nextAll() - get all next sibling DOM elements', () => {
    // https://on.cypress.io/nextall
    cy.get('.traversal-next-all')
      .contains('oranges')
      .nextAll()
      .should('have.length', 3);
  });

  it('.nextUntil() - get next sibling DOM elements until next el', () => {
    // https://on.cypress.io/nextuntil
    cy.get('#veggies').nextUntil('#nuts').should('have.length', 3);
  });

  it('.not() - remove DOM elements from set of DOM elements', () => {
    // https://on.cypress.io/not
    cy.get('.traversal-disabled .btn')
      .not('[disabled]')
      .should('not.contain', 'Disabled');
  });

  it('.parent() - get parent DOM element from DOM elements', () => {
    // https://on.cypress.io/parent
    cy.get('.traversal-mark')
      .parent()
      .should('contain', 'Morbi leo risus');
  });

  it('.parents() - get parent DOM elements from DOM elements', () => {
    // https://on.cypress.io/parents
    cy.get('.traversal-cite').parents().should('match', 'blockquote');
  });

  it('.parentsUntil() - get parent DOM elements from DOM elements until el', () => {
    // https://on.cypress.io/parentsuntil
    cy.get('.clothes-nav')
      .find('.active')
      .parentsUntil('.clothes-nav')
      .should('have.length', 2);
  });

  it('.prev() - get previous sibling DOM element', () => {
    // https://on.cypress.io/prev
    cy.get('.birds')
      .find('.active')
      .prev()
      .should('contain', 'Lorikeets');
  });

  it('.prevAll() - get all previous sibling DOM elements', () => {
    // https://on.cypress.io/prevall
    cy.get('.fruits-list')
      .find('.third')
      .prevAll()
      .should('have.length', 2);
  });

  it('.prevUntil() - get all previous sibling DOM elements until el', () => {
    // https://on.cypress.io/prevuntil
    cy.get('.foods-list')
      .find('#nuts')
      .prevUntil('#veggies')
      .should('have.length', 3);
  });

  it('.siblings() - get all sibling DOM elements', () => {
    // https://on.cypress.io/siblings
    cy.get('.traversal-pills .active')
      .siblings()
      .should('have.length', 2);
  });
});
```

#### Utilities

```js
/// <reference types="cypress" />

context('Utilities', () => {
  beforeEach(() => {
    cy.visit('https://example.cypress.io/utilities');
  });

  it('Cypress._ - call a lodash method', () => {
    // https://on.cypress.io/_
    cy.request('https://jsonplaceholder.cypress.io/users').then(
      (response) => {
        let ids = Cypress._.chain(response.body)
          .map('id')
          .take(3)
          .value();

        expect(ids).to.deep.eq([1, 2, 3]);
      },
    );
  });

  it('Cypress.$ - call a jQuery method', () => {
    // https://on.cypress.io/$
    let $li = Cypress.$('.utility-jquery li:first');

    cy.wrap($li)
      .should('not.have.class', 'active')
      .click()
      .should('have.class', 'active');
  });

  it('Cypress.Blob - blob utilities and base64 string conversion', () => {
    // https://on.cypress.io/blob
    cy.get('.utility-blob').then(($div) => {
      // https://github.com/nolanlawson/blob-util#imgSrcToDataURL
      // get the dataUrl string for the javascript-logo
      return Cypress.Blob.imgSrcToDataURL(
        'https://example.cypress.io/assets/img/javascript-logo.png',
        undefined,
        'anonymous',
      ).then((dataUrl) => {
        // create an <img> element and set its src to the dataUrl
        let img = Cypress.$('<img />', { src: dataUrl });

        // need to explicitly return cy here since we are initially returning
        // the Cypress.Blob.imgSrcToDataURL promise to our test
        // append the image
        $div.append(img);

        cy.get('.utility-blob img')
          .click()
          .should('have.attr', 'src', dataUrl);
      });
    });
  });

  it('Cypress.minimatch - test out glob patterns against strings', () => {
    // https://on.cypress.io/minimatch
    let matching = Cypress.minimatch(
      '/users/1/comments',
      '/users/*/comments',
      {
        matchBase: true,
      },
    );

    expect(matching, 'matching wildcard').to.be.true;

    matching = Cypress.minimatch(
      '/users/1/comments/2',
      '/users/*/comments',
      {
        matchBase: true,
      },
    );

    expect(matching, 'comments').to.be.false;

    // ** matches against all downstream path segments
    matching = Cypress.minimatch(
      '/foo/bar/baz/123/quux?a=b&c=2',
      '/foo/**',
      {
        matchBase: true,
      },
    );

    expect(matching, 'comments').to.be.true;

    // whereas * matches only the next path segment

    matching = Cypress.minimatch(
      '/foo/bar/baz/123/quux?a=b&c=2',
      '/foo/*',
      {
        matchBase: false,
      },
    );

    expect(matching, 'comments').to.be.false;
  });

  it('Cypress.Promise - instantiate a bluebird promise', () => {
    // https://on.cypress.io/promise
    let waited = false;

    /**
     * @return Bluebird<string>
     */
    function waitOneSecond() {
      // return a promise that resolves after 1 second
      // @ts-ignore TS2351 (new Cypress.Promise)
      return new Cypress.Promise((resolve, reject) => {
        setTimeout(() => {
          // set waited to true
          waited = true;

          // resolve with 'foo' string
          resolve('foo');
        }, 1000);
      });
    }

    cy.then(() => {
      // return a promise to cy.then() that
      // is awaited until it resolves
      // @ts-ignore TS7006
      return waitOneSecond().then((str) => {
        expect(str).to.eq('foo');
        expect(waited).to.be.true;
      });
    });
  });
});
```

#### Viewport

```js
/// <reference types="cypress" />

context('Viewport', () => {
  beforeEach(() => {
    cy.visit('https://example.cypress.io/commands/viewport');
  });

  it('cy.viewport() - set the viewport size and dimension', () => {
    // https://on.cypress.io/viewport

    cy.get('#navbar').should('be.visible');
    cy.viewport(320, 480);

    // the navbar should have collapse since our screen is smaller
    cy.get('#navbar').should('not.be.visible');
    cy.get('.navbar-toggle').should('be.visible').click();
    cy.get('.nav').find('a').should('be.visible');

    // lets see what our app looks like on a super large screen
    cy.viewport(2999, 2999);

    // cy.viewport() accepts a set of preset sizes
    // to easily set the screen to a device's width and height

    // We added a cy.wait() between each viewport change so you can see
    // the change otherwise it is a little too fast to see :)

    cy.viewport('macbook-15');
    cy.wait(200);
    cy.viewport('macbook-13');
    cy.wait(200);
    cy.viewport('macbook-11');
    cy.wait(200);
    cy.viewport('ipad-2');
    cy.wait(200);
    cy.viewport('ipad-mini');
    cy.wait(200);
    cy.viewport('iphone-6+');
    cy.wait(200);
    cy.viewport('iphone-6');
    cy.wait(200);
    cy.viewport('iphone-5');
    cy.wait(200);
    cy.viewport('iphone-4');
    cy.wait(200);
    cy.viewport('iphone-3');
    cy.wait(200);

    // cy.viewport() accepts an orientation for all presets
    // the default orientation is 'portrait'
    cy.viewport('ipad-2', 'portrait');
    cy.wait(200);
    cy.viewport('iphone-4', 'landscape');
    cy.wait(200);

    // The viewport will be reset back to the default dimensions
    // in between tests (the  default can be set in cypress.json)
  });
});
```

#### Waiting

```js
/// <reference types="cypress" />

context('Waiting', () => {
  beforeEach(() => {
    cy.visit('https://example.cypress.io/commands/waiting');
  });
  // BE CAREFUL of adding unnecessary wait times.
  // https://on.cypress.io/best-practices#Unnecessary-Waiting

  // https://on.cypress.io/wait
  it('cy.wait() - wait for a specific amount of time', () => {
    cy.get('.wait-input1').type('Wait 1000ms after typing');
    cy.wait(1000);
    cy.get('.wait-input2').type('Wait 1000ms after typing');
    cy.wait(1000);
    cy.get('.wait-input3').type('Wait 1000ms after typing');
    cy.wait(1000);
  });

  it('cy.wait() - wait for a specific route', () => {
    // Listen to GET to comments/1
    cy.intercept('GET', '**/comments/*').as('getComment');

    // we have code that gets a comment when
    // the button is clicked in scripts.js
    cy.get('.network-btn').click();

    // wait for GET comments/1
    cy.wait('@getComment')
      .its('response.statusCode')
      .should('be.oneOf', [200, 304]);
  });
});
```

#### Window

```js
/// <reference types="cypress" />

context('Window', () => {
  beforeEach(() => {
    cy.visit('https://example.cypress.io/commands/window');
  });

  it('cy.window() - get the global window object', () => {
    // https://on.cypress.io/window
    cy.window().should('have.property', 'top');
  });

  it('cy.document() - get the document object', () => {
    // https://on.cypress.io/document
    cy.document()
      .should('have.property', 'charset')
      .and('eq', 'UTF-8');
  });

  it('cy.title() - get the title', () => {
    // https://on.cypress.io/title
    cy.title().should('include', 'Kitchen Sink');
  });
});
```
