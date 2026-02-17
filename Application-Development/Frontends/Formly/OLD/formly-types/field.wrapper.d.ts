import { ViewContainerRef } from '@angular/core';
import { FieldType } from './field.type';
import { FormlyFieldConfig } from '../components/formly.field.config';
import * as ɵngcc0 from '@angular/core';
export declare abstract class FieldWrapper<F extends FormlyFieldConfig = FormlyFieldConfig> extends FieldType<F> {
    fieldComponent: ViewContainerRef;
    static ɵfac: ɵngcc0.ɵɵFactoryDeclaration<FieldWrapper<any>, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDeclaration<FieldWrapper<any>, never, never, {}, {}, never>;
}

//# sourceMappingURL=field.wrapper.d.ts.map