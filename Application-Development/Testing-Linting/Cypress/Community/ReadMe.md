# Cypress Community Ideas

<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Data `cy` Attributes](#data-cy-attributes)
- [Wait Until Angular is Stable](#wait-until-angular-is-stable)
  - [If stable never resolves](#if-stable-never-resolves)
- [If Detached](#if-detached)
  - [Wait for Window ready](#wait-for-window-ready)
  - [Check additionally for Location](#check-additionally-for-location)
  - [Get Settled](#get-settled)
  - [Further Assertions](#further-assertions)
  - [Get Attached](#get-attached)
  - [Force Click](#force-click)

<!-- /code_chunk_output -->

## Data `cy` Attributes

```ts
cy.get('[data-cy=acceptButton]').click();
```

## Wait Until Angular is Stable

```ts
Cypress.Commands.add('waitUntilAngularStable', () => {
  cy.window()
    .invoke('getAllAngularRootElements')
    .then((ngRootElements) => {
      cy.window()
        .invoke('getAngularTestability', ngRootElements[0])
        .then(
          (testability) =>
            new Cypress.Promise((resolve) => {
              testability.whenStable(() => {
                resolve();
              });
            }),
        );
    });
});

cy.waitUntilAngularStable();
```

### If stable never resolves

[Source: GitHub Cypress Issues](https://github.com/cypress-io/cypress/issues/7306#issuecomment-997378265)

```ts
/**
 * Little hint for someone how is also trying to debug
 * why whenStable is never resolving: You can add import
 * 'zone.js/plugins/task-tracking';
 * in your polyfills.ts and then you get a list of
 * pending stuff with
 * */

window
  .getAngularTestability(window.getAllAngularRootElements()[0])
  .getPendingTask();
```

## If Detached

See also here: https://www.cypress.io/blog/2020/07/22/do-not-get-too-detached/

[Source: GitHub Cypress Issues](https://github.com/cypress-io/cypress/issues/7306#issuecomment-723808720)

```ts
cy.get('.mat-option')
  .contains(selectedOpt.innerText)
  .then(($el) => Cypress.dom.isAttached($el))
  .click();

// OR

cy.get('.mat-option')
  .contains(selectedOpt.innerText)
  .should(($el) => Cypress.dom.isAttached($el))
  .click();

// OR

cy.get('my-select').select('some option');
cy.window().then((win) => {
  win.pageReady = true;
});
cy.window().should('have.property', 'pageReady', true);
cy.get('my-select').should('be.visible');
```

[Source: GitHub Cypress Issues](https://github.com/cypress-io/cypress/issues/7306#issuecomment-799628318)

```ts
cy.contains(item); // avoid element detached from the DOM
cy.get(element).click();
```

### Wait for Window ready

```ts
Cypress.Commands.add('awaitPageLoad', () => {
  cy.window().then((win) => {
    win.pageReady = true;
  });
  cy.window().should('have.property', 'pageReady', true);
});
```

### Check additionally for Location

```ts
cy.location('search').should('equal', 'home');
```

### Get Settled

[Source: GitHub Cypress Issues](https://github.com/cypress-io/cypress/issues/7306#issuecomment-850621378)

```ts
/**
 * recursively gets an element, returning only
 * after it's determined to be attached to the DOM for good
 */

Cypress.Commands.add('getSettled', (selector, opts = {}) => {
  const retries = opts.retries || 3;
  const delay = opts.delay || 100;

  const isAttached = (resolve, count = 0) => {
    const el = Cypress.$(selector);

    // is element attached to the DOM?
    count = Cypress.dom.isAttached(el) ? count + 1 : 0;

    // hit our base case, return the element
    if (count >= retries) {
      return resolve(el);
    }

    // retry after a bit of a delay
    setTimeout(() => isAttached(resolve, count), delay);
  };

  // wrap, so we can chain cypress commands off the result
  return cy.wrap(null).then(() => {
    return new Cypress.Promise((resolve) => {
      return isAttached(resolve, 0);
    }).then((el) => {
      return cy.wrap(el);
    });
  });
});

cy.getSettled(`button`).click();
cy.getSettled(`button`, { retries: 2, delay: 500 }).click();
```

### Further Assertions

[Source: GitHub Cypress Issues](https://github.com/cypress-io/cypress/issues/7306#issuecomment-669333500)

```ts
context('Navigation', () => {
  it('can navigate around the website', () => {
    cy.visit('http://localhost:3000');
    cy.get('[data-cy="header-link-about"]')
      .should('be.visible')
      .click();
    cy.location('pathname').should('match', /\/about$/);
    cy.contains('main h1', 'About').should('be.visible');
    cy.get('[data-cy="header-link-users"]').click();
    cy.location('pathname').should('match', /\/users$/);
    cy.contains('main h1', 'Users').should('be.visible');
  });
});
```

### Get Attached

```ts
Cypress.Commands.add('getAttached', (selector) => {
  const uniqueAlias = `element_${selector}`;

  return cy
    .waitUntil(
      () =>
        cy
          .get(selector)
          .as(uniqueAlias)
          .wait(1)
          .then(($el) => Cypress.dom.isAttached($el)),
      { timeout: 1000, interval: 10 },
    )
    .get(`@${uniqueAlias}`);
});

cy.getAttached(someSelector).type('some text');
```

### Force Click

```ts
cy.contains('a', /back to queries/i).click({ force: true });
cy.findByText(/cypress test query/i).click({ force: true });
cy.findByText(/edit & run query/i).should('exist');
```
