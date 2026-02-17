import { InjectionToken, ComponentRef } from '@angular/core';
import { ValidationErrors, AbstractControl } from '@angular/forms';
import { FieldType } from './../templates/field.type';
import { FormlyFieldConfig, FormlyFieldConfigCache } from '../components/formly.field.config';
import { Observable } from 'rxjs';
import * as ɵngcc0 from '@angular/core';
export declare const FORMLY_CONFIG: InjectionToken<FormlyConfig>;
/** @experimental */
export interface FormlyExtension {
    prePopulate?(field: FormlyFieldConfig): void;
    onPopulate?(field: FormlyFieldConfig): void;
    postPopulate?(field: FormlyFieldConfig): void;
}
/**
 * Maintains list of formly field directive types. This can be used to register new field templates.
 */
export declare class FormlyConfig {
    types: {
        [name: string]: TypeOption;
    };
    validators: {
        [name: string]: ValidatorOption;
    };
    wrappers: {
        [name: string]: WrapperOption;
    };
    messages: {
        [name: string]: ValidationMessageOption['message'];
    };
    templateManipulators: {
        preWrapper: ManipulatorWrapper[];
        postWrapper: ManipulatorWrapper[];
    };
    extras: ConfigOption['extras'];
    extensions: {
        [name: string]: FormlyExtension;
    };
    addConfig(config: ConfigOption): void;
    setType(options: TypeOption | TypeOption[]): void;
    getType(name: string): TypeOption;
    getMergedField(field?: FormlyFieldConfig): any;
    /** @internal */
    resolveFieldTypeRef(field?: FormlyFieldConfigCache): ComponentRef<FieldType>;
    setWrapper(options: WrapperOption): void;
    getWrapper(name: string): WrapperOption;
    setTypeWrapper(type: string, name: string): void;
    setValidator(options: ValidatorOption): void;
    getValidator(name: string): ValidatorOption;
    addValidatorMessage(name: string, message: ValidationMessageOption['message']): void;
    getValidatorMessage(name: string): string | ((error: any, field: FormlyFieldConfig) => string | Observable<string>);
    setManipulator(manipulator: ManipulatorOption): void;
    private mergeExtendedType;
    static ɵfac: ɵngcc0.ɵɵFactoryDeclaration<FormlyConfig, never>;
    static ɵprov: ɵngcc0.ɵɵInjectableDeclaration<FormlyConfig>;
}
export interface TypeOption {
    name: string;
    component?: any;
    wrappers?: string[];
    extends?: string;
    defaultOptions?: FormlyFieldConfig;
}
export interface WrapperOption {
    name: string;
    component: any;
    types?: string[];
}
export interface FieldValidatorFn {
    (c: AbstractControl, field: FormlyFieldConfig, options?: {
        [id: string]: any;
    }): ValidationErrors | null;
}
export interface ValidatorOption {
    name: string;
    validation: FieldValidatorFn;
    options?: {
        [id: string]: any;
    };
}
export interface ExtensionOption {
    name: string;
    extension: FormlyExtension;
}
export interface ValidationMessageOption {
    name: string;
    message: string | ((error: any, field: FormlyFieldConfig) => string | Observable<string>);
}
export interface ManipulatorOption {
    class?: {
        new (): any;
    };
    method?: string;
}
export interface ManipulatorWrapper {
    (f: FormlyFieldConfig): string;
}
export interface TemplateManipulators {
    preWrapper?: ManipulatorWrapper[];
    postWrapper?: ManipulatorWrapper[];
}
export interface ConfigOption {
    types?: TypeOption[];
    wrappers?: WrapperOption[];
    validators?: ValidatorOption[];
    extensions?: ExtensionOption[];
    validationMessages?: ValidationMessageOption[];
    /** @deprecated use `extensions` instead */
    manipulators?: ManipulatorOption[];
    extras?: {
        /** @deprecated use `extensions` instead */
        fieldTransform?: any;
        immutable?: boolean;
        showError?: (field: FieldType) => boolean;
        /**
         * Defines the option which formly rely on to check field expression properties.
         * - `modelChange`: perform a check when the value of the form control changes (Will be set by default in the next major version).
         * - `changeDetectionCheck`: triggers an immediate check when `ngDoCheck` is called.
         *
         * Defaults to `changeDetectionCheck`.
         */
        checkExpressionOn?: 'modelChange' | 'changeDetectionCheck';
        /**
         * Whether to lazily render field components or not when marked as hidden.
         * - `true`: lazily render field components (Will be set by default in the next major version).
         * - `false`: render field components and use CSS to control their visibility.
         *
         * Defaults to `false`.
         */
        lazyRender?: boolean;
        /**
         * When true, reset the value of hidden fields.
         *
         * Defaults to `false`.
         */
        resetFieldOnHide?: boolean;
    };
}

//# sourceMappingURL=formly.config.d.ts.map