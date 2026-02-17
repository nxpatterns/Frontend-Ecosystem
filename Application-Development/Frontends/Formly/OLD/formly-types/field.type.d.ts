import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '../components/formly.field.config';
import * as ɵngcc0 from '@angular/core';
export declare abstract class FieldType<F extends FormlyFieldConfig = FormlyFieldConfig> {
    field: F;
    defaultOptions?: F;
    model: any;
    form: FormGroup;
    options: F['options'];
    readonly key: string | number | string[];
    readonly formControl: import("@angular/forms").AbstractControl;
    readonly to: import("../components/formly.field.config").FormlyTemplateOptions;
    readonly showError: boolean;
    readonly id: string;
    readonly formState: any;
    static ɵfac: ɵngcc0.ɵɵFactoryDeclaration<FieldType<any>, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDeclaration<FieldType<any>, never, never, { "model": "model"; "form": "form"; "options": "options"; "field": "field"; }, {}, never>;
}
/**
 * @deprecated use `FieldType` instead
 */
export declare abstract class Field extends FieldType {
    constructor();
}

//# sourceMappingURL=field.type.d.ts.map