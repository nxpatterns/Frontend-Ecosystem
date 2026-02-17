# Playwright Cookbook

## Simple Checks

### Component Variables

```ts
import { test, expect, chromium } from '@playwright/test';

test('basic test', async ({ page }) => {
  const browser = await chromium.launch();
  await page.goto('http://localhost:4200/');
  await page.waitForLoadState('load'); // oder 'domcontentloaded', 'networkidle'

  const pageTitle = await page.title();
  await expect(pageTitle).toBe('basis-app');
  await browser.close();
});
```

### DOM Nodes

```ts
import { test, expect, chromium } from '@playwright/test';

test('basic test', async ({ page }) => {
  const browser = await chromium.launch();
  await page.goto('http://localhost:4200/');
  await page.waitForLoadState('domcontentloaded'); // oder 'domcontentloaded', 'networkidle'

  const expectingTextContent = 'LOGIN';
  const h1ExpectedTitle = await page.$(
    `h1:has-text('${expectingTextContent}')`,
  );

  expect(h1ExpectedTitle).toBeTruthy();
  await browser.close();
});
```
