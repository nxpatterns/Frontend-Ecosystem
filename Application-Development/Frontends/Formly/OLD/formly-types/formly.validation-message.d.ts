import { OnChanges } from '@angular/core';
import { FormlyConfig } from '../services/formly.config';
import { FormlyFieldConfig } from '../components/formly.field.config';
import { Observable } from 'rxjs';
import * as ɵngcc0 from '@angular/core';
export declare class FormlyValidationMessage implements OnChanges {
    private formlyConfig;
    field: FormlyFieldConfig;
    errorMessage$: Observable<string>;
    constructor(formlyConfig: FormlyConfig);
    ngOnChanges(): void;
    readonly errorMessage: string | Observable<string>;
    static ɵfac: ɵngcc0.ɵɵFactoryDeclaration<FormlyValidationMessage, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDeclaration<FormlyValidationMessage, "formly-validation-message", never, { "field": "field"; }, {}, never, never>;
}

//# sourceMappingURL=formly.validation-message.d.ts.map