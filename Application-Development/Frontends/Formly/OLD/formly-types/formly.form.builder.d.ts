import { ComponentFactoryResolver, Injector } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { FormlyConfig } from './formly.config';
import { FormlyFieldConfig, FormlyFormOptions } from '../components/formly.field.config';
import * as ɵngcc0 from '@angular/core';
export declare class FormlyFormBuilder {
    private formlyConfig;
    private componentFactoryResolver;
    private injector;
    constructor(formlyConfig: FormlyConfig, componentFactoryResolver: ComponentFactoryResolver, injector: Injector);
    buildForm(formControl: FormGroup | FormArray, fieldGroup: FormlyFieldConfig[], model: any, options: FormlyFormOptions): void;
    private _buildForm;
    private getExtensions;
    private _setOptions;
    static ɵfac: ɵngcc0.ɵɵFactoryDeclaration<FormlyFormBuilder, never>;
    static ɵprov: ɵngcc0.ɵɵInjectableDeclaration<FormlyFormBuilder>;
}

//# sourceMappingURL=formly.form.builder.d.ts.map