# Angular Material Icons

<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Online Links](#online-links)
- [Setup](#setup)
  - [Install](#install)
  - [Import as Font](#import-as-font)
    - [Usage with Angular Material Button](#usage-with-angular-material-button)
  - [Register Addtional Custom SVG Icons](#register-addtional-custom-svg-icons)

<!-- /code_chunk_output -->

## Online Links

[>> Documentation](https://material.io/resources/icons/?style=baseline)
[>> Marella: Online Demo](https://marella.me/material-icons/demo/)

## Setup

### Install

```shell
npm install @angular/material @angular/cdk @angular/animations
npm install material-icons
```

### Import as Font

e.g. in `styles.scss`:

```scss
@import "~material-icons/iconfont/material-icons.css";
```

#### Usage with Angular Material Button

```html
<button
  class="some-class"
  mat-icon-button
  (click)="doSomething()"
>
  <mat-icon>home</mat-icon>
</button>
```

```scss
button.some-class {
  border-radius: 0.25rem !important;
  .mat-icon {
    font-size: 1rem;
  }
}
```

### Register Addtional Custom SVG Icons

  ```typescript
  import { MatIconModule } from '@angular/material/icon';
  import { MatIconRegistry } from '@angular/material/icon';
  import { DomSanitizer } from '@angular/platform-browser';

  @NgModule({
    imports: [
      MatIconModule,
    ],
    providers: [
      MatIconRegistry,
    ],
  })
  export class AppModule {
    constructor(
      private matIconRegistry: MatIconRegistry,
      private domSanitizer: DomSanitizer,
    ) {
      this.matIconRegistry.addSvgIcon(
        'icon-name',
        this.domSanitizer.bypassSecurityTrustResourceUrl('path/to/icon.svg'),
      );
    }
  }
  ```

```html
<mat-icon svgIcon="icon-name"></mat-icon>
```
