# Formly -  Getting Started


<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Installation](#installation)
  - [`app.module.ts` After Installation](#appmodulets-after-installation)
- [First Simple Example Before Deep Diving](#first-simple-example-before-deep-diving)
- [Concepts](#concepts)
  - [Inputs Outputs](#inputs-outputs)
    - [Inputs](#inputs)
    - [Outputs](#outputs)
  - [Fields (`interface FormlyFieldConfig`)](#fields-interface-formlyfieldconfig)
    - [Read Only](#read-only)
    - [Others](#others)
    - [Examples or Interfaces](#examples-or-interfaces)
      - [hooks](#hooks)
      - [modelOptions](#modeloptions)
      - [optionTypes](#optiontypes)
      - [validation](#validation)
  - [Options](#options)
    - [`formState`](#formstate)
    - [`fieldTransform`](#fieldtransform)
- [API (Excerpt)](#api-excerpt)
  - [ExpressionPropertyCache](#expressionpropertycache)
  - [FormlyFieldConfigCache](#formlyfieldconfigcache)
  - [FormlyFieldConfig](#formlyfieldconfig)
  - [FormlyFormOptions](#formlyformoptions)
  - [FormlyAttributeEvent](#formlyattributeevent)
  - [FormlyTemplateOptions](#formlytemplateoptions)
  - [Type Files](#type-files)

<!-- /code_chunk_output -->


## Installation

```shell
ng add @ngx-formly/schematics --ui-theme=material
```

`ui-theme` is optional flag which allows choosing the UI theme to install along with the core package, choose one of the following themes (at thime of writing):

- bootstrap
- material
- ionic
- primeng
- kendo
- nativescript


### `app.module.ts` After Installation

```diff
  import { NgModule } from '@angular/core';
  import { BrowserModule } from '@angular/platform-browser';

  import { AppComponent } from './app.component';
  import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
+ import { ReactiveFormsModule } from '@angular/forms';
+ import { FormlyModule } from '@ngx-formly/core';
+ import { FormlyMaterialModule } from '@ngx-formly/material';  

  @NgModule({
  declarations: [AppComponent],
  imports: [
      BrowserModule,
      BrowserAnimationsModule,
      ReactiveFormsModule,
+     FormlyModule.forRoot({ extras: { lazyRender: true } }),
+     FormlyMaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  })
  export class AppModule {}
```

## First Simple Example Before Deep Diving

Without explanation: 

```ts
import {Component} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormlyFieldConfig} from '@ngx-formly/core';

@Component({
  selector: 'app',
  template: `
```
```html  
    <form [formGroup]="form" (ngSubmit)="onSubmit(model)">
      <formly-form [form]="form" [fields]="fields" [model]="model"></formly-form>
      <button type="submit" class="btn btn-default">Submit</button>
    </form>
```
```ts
  `,
})
export class AppComponent {
  form = new FormGroup({});
  model = { email: 'email@gmail.com' };
  fields: FormlyFieldConfig[] = [
    {
      key: 'email',
      type: 'input',
      templateOptions: {
        label: 'Email address',
        placeholder: 'Enter email',
        required: true,
      }
    }
  ];

  onSubmit() {
    console.log(this.model);
  }
}
```

## Concepts

### Inputs Outputs

Everything starts with the formly-form. General use of it will look something like this:

```html
<formly-form
  [form]="form"
  [fields]="fields"
  [model]="model">
</formly-form>
```

#### Inputs

|Name |	Type|	Default |	Required|	Description |
| -- |	-- | -- | -- | -- |
| form | FormGroup or FormArray | new FormGroup({}) | no |
| fields |	FormlyFieldConfig[] | - | yes |
|model|any| - |yes|
|options|FormlyFormOptions| - |no|

#### Outputs

| Name | Description |
| -- | -- |
| (modelChange)	| Fired on model value change |

### Fields (`interface FormlyFieldConfig`)

#### Read Only 

```ts
readonly model?:   any;
readonly parent?:  FormlyFieldConfig;
readonly options?: FormlyFormOptions;
readonly form?:    FormGroup;
```
#### Others

```shell
asyncValidators?:       any (like above)
className?:             string
defaultValue ?:         any
expressionProperties?:  boolean | string | function
fieldArray?:            FormlyFieldConfig 
fieldGroup?:            FormlyFieldConfig[]  # ? Stimmt das so ?
fieldGroupClassName?:   string
focus?:                 boolean
formControl?:           AbstractControl
hide?:                  boolean
hideExpression?:        boolean | string | function
hooks?:                 FormlyLifeCycleOptions<FormlyHookFn>;
id?:                    string
key?:                   string
modelOptions            object (some useful properties like: debounce, updateOn)
name?:                  string
optionsTypes?:          string[];
parsers?:               function[]
template ?:             string (It is expected to be the name of the wrappers)
templateOptions?:       object (FormlyTemplateOptions)
type?:                  string
validation?:            object (some useful properties like: messages, show)
validators?:            any (Object of key-value-pairs)
wrappers?:              string[]
```

#### Examples or Interfaces

##### hooks

```ts
export interface FormlyLifeCycleOptions<T = FormlyLifeCycleFn> {
    onInit?: T;
    onChanges?: T;
    afterContentInit?: T;
    afterViewInit?: T;
    onDestroy?: T;
    [additionalProperties: string]: any;
    /** @deprecated */
    doCheck?: T;
    /** @deprecated */
    afterContentChecked?: T;
    /** @deprecated */
    afterViewChecked?: T;
}
```

##### modelOptions

```ts
modelOptions?: {
    debounce?: {
        default: number;
    };
    /**
     * @see https://angular.io/api/forms/AbstractControl#updateOn
     */
    updateOn?: 'change' | 'blur' | 'submit';
};
```

##### optionTypes

```ts
optionsTypes?: string[];
```

An object with a few useful properties
- `validation.messages`: A map of message names that will be displayed when the field has errors.
- `validation.show`: A boolean you as the developer can set to force displaying errors whatever the state of field. This is useful when you're trying to call the user's attention to some fields for some reason.

##### validation

```ts

export interface ValidationMessageOption {
    name: string;
    message: string 
    | ((error: any, field: FormlyFieldConfig) => string 
    | Observable<string>);
}

validation?: {
    messages?: {
        [messageProperties: string]: ValidationMessageOption['message'];
    };
    show?: boolean;
    [additionalProperties: string]: any;
};
```

### Options


#### `formState`             
a mechanism for communicating between fields
- `resetModel`
- `updateInitialValue`
#### `fieldTransform`        
Allows you to modify/convert the fields before Formly handles them or validates them


## API (Excerpt)

### ExpressionPropertyCache

```ts
export interface ExpressionPropertyCache {
    expression: (model: any, formState: any, field: FormlyFieldConfigCache) 
     => boolean;
    expressionValue?: any;
}
```

### FormlyFieldConfigCache

```ts
export interface FormlyFieldConfigCache extends FormlyFieldConfig {
    parent?: FormlyFieldConfigCache;
    options?: FormlyFormOptionsCache;
    _expressionProperties?: {
        [property: string]: ExpressionPropertyCache;
    };
    resetOnHide?: boolean;
    _hide?: boolean;
    _validators?: ValidatorFn[];
    _asyncValidators?: AsyncValidatorFn[];
    _componentRefs?: ComponentRef<FieldType>[];
    _keyPath?: {
        key: FormlyFieldConfig['key'];
        path: string[];
    };
```

### FormlyFieldConfig



```ts  
export interface FormlyFieldConfig {
    /**
     * The model that stores all the data, where the model[key] is the value of the field
     */
    readonly model?: any;
    /**
     * The parent field.
     */
    readonly parent?: FormlyFieldConfig;
    readonly options?: FormlyFormOptions;
    readonly form?: FormGroup;
    /**
     * The key that relates to the model. This will link the field value to the model
     */
    key?: string | number | string[];
    /**
     * This allows you to specify the `id` of your field. Note, the `id` is generated if not set.
     */
    id?: string;
    /**
     * If you wish, you can specify a specific `name` for your field. This is useful if you're posting the form to a server using techniques of yester-year.
     */
    name?: string;
    /**
     * This is reserved for the templates. Any template-specific options go in here. Look at your specific template implementation to know the options required for this.
     */
    templateOptions?: FormlyTemplateOptions;
    optionsTypes?: string[];
    /**
     * An object with a few useful properties
     * - `validation.messages`: A map of message names that will be displayed when the field has errors.
     * - `validation.show`: A boolean you as the developer can set to force displaying errors whatever the state of field. This is useful when you're trying to call the user's attention to some fields for some reason.
     */
    validation?: {
        messages?: {
            [messageProperties: string]: ValidationMessageOption['message'];
        };
        show?: boolean;
        [additionalProperties: string]: any;
    };
    /**
     * Used to set validation rules for a particular field.
     * Should be an object of key - value pairs. The value can either be an expression to evaluate or a function to run.
     * Each should return a boolean value, returning true when the field is valid. See Validation for more information.
     *
     * {
     *   validation?: (string | ValidatorFn)[];
     *   [key: string]: ((control: AbstractControl, field: FormlyFieldConfig) => boolean) | ({ expression: (control: AbstractControl, field: FormlyFieldConfig) => boolean, message: ValidationMessageOption['message'] });
     * }
     */
    validators?: any;
    /**
     * Use this one for anything that needs to validate asynchronously.
     * Pretty much exactly the same as the validators api, except it must be a function that returns a promise.
     *
     * {
     *   validation?: (string | AsyncValidatorFn)[];
     *   [key: string]: ((control: AbstractControl, field: FormlyFieldConfig) => Promise<boolean> | Observable<boolean>) | ({ expression: (control: AbstractControl, field: FormlyFieldConfig) => Promise<boolean>, message: string });
     * }
     */
    asyncValidators?: any;
    /**
     * Can be set instead of `type` to render custom html content.
     */
    template?: string;
    /**
     *  It is expected to be the name of the wrappers.
     *  The formly field template will be wrapped by the first wrapper, then the second, then the third, etc.
     *  You can also specify these as part of a type (which is the recommended approach).
     */
    wrappers?: string[];
    /**
     * Whether to hide the field. Defaults to false. If you wish this to be conditional use `hideExpression`
     */
    hide?: boolean;
    /**
     * Conditionally hiding Field based on values from other Fields
     */
    hideExpression?: boolean | string | ((model: any, formState: any, field?: FormlyFieldConfig) => boolean);
    /**
     * An object where the key is a property to be set on the main field config and the value is an expression used to assign that property.
     */
    expressionProperties?: {
        [property: string]: string | ((model: any, formState: any, field?: FormlyFieldConfig) => any) | Observable<any>;
    };
    /**
     * This is the [FormControl](https://angular.io/api/forms/FormControl) for the field.
     * It provides you more control like running validators, calculating status, and resetting state.
     */
    formControl?: AbstractControl;
    /**
     * You can specify your own class that will be applied to the `formly-field` component.
     */
    className?: string;
    /**
     * Specify your own class that will be applied to the `formly-group` component.
     */
    fieldGroupClassName?: string;
    /**
     * A field group is a way to group fields together, making advanced layout very simple.
     * It can also be used to group fields that are associated with the same model (useful if it's different than the model for the rest of the fields).
     */
    fieldGroup?: FormlyFieldConfig[];
    fieldArray?: FormlyFieldConfig;
    /**
     * This should be a formly-field type added either by you or a plugin. More information over at Creating Formly Fields.
     */
    type?: string;
    /**
     * Whether to focus or blur the element field. Defaults to false. If you wish this to be conditional use `expressionProperties`
     */
    focus?: boolean;
    /**
     * An object with a few useful properties to control the model changes
     * - `debounce`: integer value which contains the debounce model update value in milliseconds. A value of 0 triggers an immediate update.
     * - `updateOn`: string event value that instructs when the control should be updated
     */
    modelOptions?: {
        debounce?: {
            default: number;
        };
        /**
         * @see https://angular.io/api/forms/AbstractControl#updateOn
         */
        updateOn?: 'change' | 'blur' | 'submit';
    };
    hooks?: FormlyLifeCycleOptions<FormlyHookFn>;
    /**
     * @deprecated use `hooks` instead
     */
    lifecycle?: FormlyLifeCycleOptions;
    /**
     * Use `defaultValue` to initialize it the model. If this is provided and the value of the model at compile-time is undefined, then the value of the model will be assigned to `defaultValue`.
     */
    defaultValue?: any;
    /**
     * Array of functions to execute, as a pipeline, whenever the model updates, usually via user input.
     */
    parsers?: ((value: any) => {})[];
}

```

### FormlyFormOptions

```ts
export interface FormlyFormOptions {
    updateInitialValue?: () => void;
    resetModel?: (model?: any) => void;
    formState?: any;
    fieldChanges?: Subject<FormlyValueChangeEvent>;
    fieldTransform?: (
      fields: FormlyFieldConfig[], 
      model: any, 
      form: FormGroup | FormArray, 
      options: FormlyFormOptions) => FormlyFieldConfig[];
    showError?: (field: FieldType) => boolean;
    parentForm?: FormGroupDirective | null;
}
```
### FormlyAttributeEvent

```ts
export declare type FormlyAttributeEvent 
  = (field: FormlyFieldConfig, event?: any) => void;
```

###  FormlyTemplateOptions

```ts
export interface FormlyTemplateOptions {
    type?: string;
    label?: string;
    placeholder?: string;
    disabled?: boolean;
    options?: any[] | Observable<any[]>;
    rows?: number;
    cols?: number;
    description?: string;
    hidden?: boolean;
    max?: number;
    min?: number;
    minLength?: number;
    maxLength?: number;
    pattern?: string | RegExp;
    required?: boolean;
    tabindex?: number;
    readonly?: boolean;
    attributes?: {
        [key: string]: string | number;
    };
    step?: number;
    focus?: FormlyAttributeEvent;
    blur?: FormlyAttributeEvent;
    keyup?: FormlyAttributeEvent;
    keydown?: FormlyAttributeEvent;
    click?: FormlyAttributeEvent;
    change?: FormlyAttributeEvent;
    keypress?: FormlyAttributeEvent;
    templateManipulators?: TemplateManipulators;
    [additionalProperties: string]: any;
}
```



### Type Files

- [field-array.type.d.ts](../formly-types/field-array.type.d.ts)
- [field-template.type.d.ts](../formly-types/field-template.type.d.ts)
- [field.type.d.ts](../formly-types/field.type.d.ts)
- [field.wrapper.d.ts](../formly-types/field.wrapper.d.ts)
- [formly.attributes.d.ts](../formly-types/formly.attributes.d.ts)
- [formly.config.d.ts](../formly-types/formly.config.d.ts)
- [formly.field.config.d.ts](../formly-types/formly.field.config.d.ts)
- [formly.field.d.ts](../formly-types/formly.field.d.ts)
- [formly.form.builder.d.ts](../formly-types/formly.form.builder.d.ts)
- [formly.form.d.ts](../formly-types/formly.form.d.ts)
- [formly.group.d.ts](../formly-types/formly.group.d.ts)
- [formly.validation-message.d.ts](../formly-types/formly.validation-message.d.ts)