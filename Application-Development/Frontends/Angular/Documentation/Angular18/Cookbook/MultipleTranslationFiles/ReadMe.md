# NgxTranslateMultiHttpLoader

## Setup

### Install the package

```shell
npm install ngx-translate-multi-http-loader
```

### Add Configuration in app.config.ts

```ts
import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideTranslateLoader } from '@ngx-translate/core';
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';
import { HttpClient } from '@angular/common/http';

export function HttpLoaderFactory(http: HttpClient) {
  return new MultiTranslateHttpLoader(http, [
    { prefix: './assets/locales/global/', suffix: '.json' },
    { prefix: './assets/locales/local/', suffix: '.json' }
  ]);
}

export const appConfig: ApplicationConfig = {
  providers: [
    // ...
    provideHttpClient(),
    provideTranslateLoader(HttpLoaderFactory)
    // ...
  ]
};

```

### Use in your component

```ts
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `<h1>{{ 'HELLO' | translate }}</h1>`,
})
export class AppComponent {
  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('de');
    this.translate.use('de');
  }
}
```
