# Angular Minimal Installation - OPINIONATED

This list is for me to not forget an important step in repetitive installations.

## 1) Install `@angular/cli`

```bash
npm i -g @angular/cli@latest
```

## 2) Generate an Angular Project

```bash
ng new projectName
```

You can also set the prefix during the installation:

```bash
ng new projectName --prefix=myPrefix
```

My Own Approach

```bash
 ng new ebia -f -s --minimal --prefix=ebia --routing --skip-install --skip-tests --strict --style=scss
```

### During the installation

Routing &rarr; YES

Stylesheet Format &rarr; SCSS

### 2.1) Overwrite some standard settings

#### 2.1.1) Change `prefix` in angular.json

```
projects.projectName.prefix: myPrefix
```

#### 2.1.2) Set Basic Styles

..solves many future problems with certain UI-Libs:

```css
html,
body {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
}
```

#### 2.1.3 Clean up app.component.html

Delete everything except `<router-outlet></router-outlet>`

### 3) Generate a new component and use it as root

Own approach:

```bash
ng g c components/dashboard -is --skipTests
```

Edit `app-routing.module.ts` and set the root-route:

```ts
const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
];
```

### Installing Useful Libraries

#### 4.1) Install `@angular/layout`

Details: https://github.com/angular/flex-layout

**Important:** Use an angular compatible version (major versions must be compatible, e.g. 9 &rarr; 9 etc.)

```bash
npm i -s @angular/flex-layout@9.0.0-beta.31 @angular/cdk
```

Then edit `app.module.ts`

```ts
import { FlexLayoutModule } from '@angular/flex-layout';
...

@NgModule({
    ...
    imports: [ FlexLayoutModule ],
    ...
});
```

### Lodash (Use `lodash-es`)

Original `lodash` is not tree shakeable, therefore use [`lodash-es`](https://www.npmjs.com/package/lodash-es), it is the same functionality, just exported as ES modules:

```bash
npm i -S lodash-es
npm i -D @types/lodash-es
```

Use it like:

```
import debounce from 'lodash-es/debounce'
```
