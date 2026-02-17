import { FormArray } from '@angular/forms';
import { FieldType } from './field.type';
import { FormlyFormBuilder } from '../services/formly.form.builder';
import { FormlyFieldConfig } from '../components/formly.field.config';
import { FormlyExtension } from '../services/formly.config';
import * as ɵngcc0 from '@angular/core';
export declare abstract class FieldArrayType<F extends FormlyFieldConfig = FormlyFieldConfig> extends FieldType<F> implements FormlyExtension {
    readonly formControl: FormArray;
    defaultOptions: any;
    constructor(builder?: FormlyFormBuilder);
    onPopulate(field: FormlyFieldConfig): void;
    add(i?: number, initialModel?: any, { markAsDirty }?: {
        markAsDirty: boolean;
    }): void;
    remove(i: number, { markAsDirty }?: {
        markAsDirty: boolean;
    }): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDeclaration<FieldArrayType<any>, [{ optional: true; }]>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDeclaration<FieldArrayType<any>, "[\u0275fieldArray]", never, {}, {}, never>;
}

//# sourceMappingURL=field-array.type.d.ts.map