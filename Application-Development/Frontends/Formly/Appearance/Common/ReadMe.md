# Field Appearance Changes (Common)

<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Field](#field)
- [Field Group](#field-group)
- [Field Array](#field-array)
- [Change the appearance of a field template](#change-the-appearance-of-a-field-template)
- [Field Expression](#field-expression)
- [Field Validation](#field-validation)
- [Field Wrapper](#field-wrapper)
- [Field Props (templateOptions)](#field-props-templateoptions)
- [Field Type](#field-type)
- [Field Type (globally)](#field-type-globally)
- [Field Type (globally, at once)](#field-type-globally-at-once)
- [Default Appearance (globally, at once)](#default-appearance-globally-at-once)

<!-- /code_chunk_output -->

## Field

```typescript
import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'formly-field-input',
  template: `
    <input
      type="text"
      [formControl]="formControl"
      [formlyAttributes]="field"
    />
  `,
})
export class FormlyFieldInput extends FieldType {}
```

## Field Group

```typescript
import { Component } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';

@Component({
  selector: 'formly-wrapper-panel',
  template: `
    <div class="panel panel-default">
      <div class="panel-body">
        <h4>{{ to.label }}</h4>
        <ng-container #fieldComponent></ng-container>
      </div>
    </div>
  `,
})
export class FormlyWrapperPanel extends FieldWrapper {}
```

## Field Array

```typescript
import { Component } from '@angular/core';
import { FieldArrayType } from '@ngx-formly/core';

@Component({
  selector: 'formly-array-type',
  template: `
    <div
      *ngFor="let field of field.fieldGroup; let i = index"
      class="row"
    >
      <formly-field class="col" [field]="field"></formly-field>
      <button
        type="button"
        class="btn btn-danger"
        (click)="remove(i)"
      >
        Remove
      </button>
    </div>
    <div style="margin:30px 0;">
      <button type="button" class="btn btn-primary" (click)="add()">
        Add
      </button>
    </div>
  `,
})
export class FormlyFieldArrayType extends FieldArrayType {}
```

## Change the appearance of a field template

```typescript
import { Component } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';

@Component({
  selector: 'formly-wrapper-horizontal',
  template: `
    <div class="form-group row">
      <label [attr.for]="id" class="col-sm-2 col-form-label">{{
        to.label
      }}</label>
      <div class="col-sm-10">
        <ng-container #fieldComponent></ng-container>
      </div>
    </div>
  `,
})
export class FormlyWrapperHorizontal extends FieldWrapper {}
```

## Field Expression

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'formly-expression',
  template: `
    <div class="alert alert-warning">
      <strong>Warning!</strong> {{ to.message }}
    </div>
  `,
})
export class FormlyExpression {}
```

## Field Validation

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'formly-validation-message',
  template: `
    <div class="alert alert-danger">
      <strong>Warning!</strong> {{ to.message }}
    </div>
  `,
})
export class FormlyValidationMessage {}
```

## Field Wrapper

```typescript
import { Component } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';

@Component({
  selector: 'formly-wrapper-validation-messages',
  template: `
    <ng-container #fieldComponent></ng-container>
    <div *ngIf="showError" class="invalid-feedback d-block">
      <formly-validation-message
        [field]="field"
      ></formly-validation-message>
    </div>
  `,
})
export class FormlyWrapperValidationMessages extends FieldWrapper {
  get showError() {
    return (
      this.field.formControl &&
      this.field.formControl.invalid &&
      this.field.formControl.touched
    );
  }
}
```

## Field Props (templateOptions)

```typescript
import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'formly-field-input',
  template: `
    <input
      type="text"
      [formControl]="formControl"
      [formlyAttributes]="field"
    />
  `,
})
export class FormlyFieldInput extends FieldType {}
```

## Field Type

```typescript
import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'formly-field-input',
  template: `
    <input
      type="text"
      [formControl]="formControl"
      [formlyAttributes]="field"
    />
  `,
})
export class FormlyFieldInput extends FieldType {}
```

## Field Type (globally)

```typescript
import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'formly-field-input',
  template: `
    <input
      type="text"
      [formControl]="formControl"
      [formlyAttributes]="field"
    />
  `,
})
export class FormlyFieldInput extends FieldType {}
```

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';

import { AppComponent } from './app.component';
import { FormlyFieldInput } from './formly-field-input';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormlyBootstrapModule,
    FormlyModule.forRoot({
      types: [{ name: 'input', component: FormlyFieldInput }],
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

## Field Type (globally, at once)

```typescript
import { FormlyConfig } from '@ngx-formly/core';

constructor(private formlyConfig: FormlyConfig) {
  this.formlyConfig.setType({
    name: 'input',
    defaultOptions: {
      templateOptions: {
        appearance: 'outline',
      },
    },
  });
}
```

## Default Appearance (globally, at once)

```typescript
import { FormlyConfig } from '@ngx-formly/core';

constructor(private formlyConfig: FormlyConfig) {
  this.formlyConfig.setDefaultOptions({
    templateOptions: {
      appearance: 'outline',
    },
  });
}
```

Additionally, you can use the `setWrapper` method of the FormlyConfig service to set default options for all wrappers, or use the `setExtension` method to set default options for all extensions.
