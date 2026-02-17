# Angular Cookbook

<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Install a certain Angular Version (without changing the existing angular/cli)](#install-a-certain-angular-version-without-changing-the-existing-angularcli)
- [Route/Routing Issues on Server (useHash)](#routerouting-issues-on-server-usehash)
- [Dividing a Form into multiple components](#dividing-a-form-into-multiple-components)
  - [PARENT](#parent)
    - [Passing nested FormGroup](#passing-nested-formgroup)
  - [CHILD](#child)
    - [TS](#ts)
    - [HTML](#html)
- [Customizing Angular-Flex-Layout Breakpoints](#customizing-angular-flex-layout-breakpoints)
- [Working with DateFns](#working-with-datefns)
  - [Installing (also pipes &rarr; ngx-date-fns)](#installing-also-pipes-rarr-ngx-date-fns)
  - [Format Dates with DateFns (date-fns)](#format-dates-with-datefns-date-fns)
  - [Time Distance with DateFns (date-fns)](#time-distance-with-datefns-date-fns)
- [Injecting Window Object](#injecting-window-object)
  - [Provide it](#provide-it)
  - [Create a Service](#create-a-service)
  - [Inject and use it in your Component](#inject-and-use-it-in-your-component)
  - [Or Inject it directly without Service](#or-inject-it-directly-without-service)
- [\*ngIfAnd with Observables in Templates](#ngifand-with-observables-in-templates)

<!-- /code_chunk_output -->

## Install a certain Angular Version (without changing the existing angular/cli)

There is no parameter to set the version. The used angular/cli version determines the Angular version. If you don't want to change your current angular/cli version, you can use npx to install a certain Angular version.

```shell
npx -p @angular/cli@15 ng new project-name # Angular 15
```

## Route/Routing Issues on Server (useHash)

Using hashes allows you to update query params manually without reloading the page.

```ts
RouterModule.forRoot(routes, {
      useHash: true,
}),
```

Details here:

https://angular.io/api/common/HashLocationStrategy
https://angular.io/api/common/upgrade/LocationUpgradeConfig

## Dividing a Form into multiple components

### PARENT

If this is the form and you want to pass `address` to a child component:

```typescript
ngOnInit() {
  this.myForm = this.fb.group({
    name: [''],
    address: this.fb.group({ // create nested formgroup to pass to child
      street: [''],
      zip: [''],
      city: ['']
    })
  })
}
```

#### Passing nested FormGroup

<address [address]="myForm.get('address')"></address>

### CHILD

#### TS

```typescript
@Input() address: FormGroup;
```

#### HTML

```html
<div [formGroup]="address">
  <input formControlName="street" />
  <input formControlName="zip" />
  <input formControlName="city" />
</div>
```

## Customizing Angular-Flex-Layout Breakpoints

[>> Modifying existing ones](https://stackblitz.com/edit/angular-fxlayout-custom-breakpoints?file=app%2Fcustom-breakpoints.ts)

[>> Adding new ones](https://github.com/angular/flex-layout/wiki/Breakpoints)

## Working with DateFns

[ >> Playground Stackblitz:](https://stackblitz.com/edit/angular-date-fns-examples?file=src%2Fapp%2Fapp.component.ts)

### Installing (also pipes &rarr; ngx-date-fns)

```bash
npm i -S date-fns
npm i -S ngx-date-fns
```

import { DateFnsModule } from 'ngx-date-fns';

```bash
@NgModule({
  imports: [
    // (...)
    DateFnsModule.forRoot()
  ]
})
```

### Format Dates with DateFns (date-fns)

Stickblitz playground: <https://stackblitz.com/edit/date-fns-playground-zeitzonen?file=index.ts>

Import necessary parts:

```ts
import { format, parseISO } from 'date-fns';
import { de } from 'date-fns/locale';
```

Define desired formats

```ts
const DATE_FORMATS = {
  SHORT: 'd .MMM yyyy',
  MIDDLE: 'd .MMM yyyy, HH:mm, E',
};
```

Use it in your component

```ts
// e.g. timestamp as "yyyy-MM-dd'T'HH:mm:ss.SSS";
let dayString = '2019-06-20 19:46:20.187';
let parsedDayString = parseISO(dayString);
let myLocalDate = format(parsedDayString, DATE_FORMATS.SHORT, {
  locale: de,
});

// that also helps:
// new Date(Date.parse("2019-06-15T00:00:00"));
```

### Time Distance with DateFns (date-fns)

```ts
// import necessary parts
import { formatDistanceToNow } from 'date-fns';
import { de } from 'date-fns/locale';

// then somewhere in your component

const startTime = Date.now();
// do something meanwhile and then

const itTook = formatDistanceToNow(startTime, {
  includeSeconds: true,
  locale: de,
});
```

## Injecting Window Object

### Provide it

```ts
// app.module.ts
providers: [
  { provide: 'MY_CLIENT_INFO', useFactory: getClientInfo },
],

// out of everything else
export declare const MY_CLIENT_INFO: InjectionToken<string>;
export function getClientInfo() {
  return window ? window : {};
}
```

### Create a Service

```ts
import { Injectable, Inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ClientInfoService {
  private clientWindow: any;

  constructor(@Inject('MY_CLIENT_INFO') ci: Window) {
    this.clientWindow = ci ? ci : {};
  }

  get(props?: any) {
    const len = props.length ? props.length : 0;
    let value: any;
    if (len > 0) {
      value = this.clientWindow[props[0]];
      for (let i = 1; i < len; i++) {
        if (value) {
          value = value[props[i]];
        } else {
          return null;
        }
      }
      return value;
    } else {
      return null;
    }
  }

  getCertainProp(p: any) {
    return this.clientWindow[p] ? this.clientWindow[p] : null;
  }
}
```

### Inject and use it in your Component

```ts
constructor(private cis: ClientInfoService) {}

  ngOnInit() {
    const screen = this.cis.get(['screen']) as Screen;
    const language = this.cis.get(['navigator', 'language']);

    console.log(screen);
    console.log(language);

    this.ci.Screen = screen;
    this.ci.Language = language;
  }
  ngAfterViewChecked(): void {
    this.ci.Screen = this.cis.get(['screen']) as Screen;
    this.ci.Language = this.cis.get(['navigator', 'language']);
  }
```

### Or Inject it directly without Service

```ts
import { DOCUMENT } from '@angular/common';
import {
  Component,
  OnInit,
  isDevMode,
  ChangeDetectorRef,
  HostListener,
  Inject,
  AfterViewChecked,
} from '@angular/core';
...
 constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject('WINDOW') private window: Window, ... // Attention it is a String!
```

## \*ngIfAnd with Observables in Templates

The solution:

1. `*ngIf` and and `async` pipe are in a wrapping `ng-container`
1. the condition is within this `ng-container`

```html
<ng-container *ngIf="myData$ | async as myData">
  <div *ngIf="myData.length > 0">{{ myData | json }}</div>
</ng-container>
```
