import { DoCheck, OnChanges, SimpleChanges, EventEmitter, OnDestroy, ElementRef, NgZone } from '@angular/core';
import { FormGroup, FormArray, FormGroupDirective } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from './formly.field.config';
import { FormlyFormBuilder } from '../services/formly.form.builder';
import { FormlyConfig } from '../services/formly.config';
import * as ɵngcc0 from '@angular/core';
export declare class FormlyForm implements DoCheck, OnChanges, OnDestroy {
    private formlyBuilder;
    private formlyConfig;
    private ngZone;
    private parentFormGroup;
    form: FormGroup | FormArray;
    model: any;
    fields: FormlyFieldConfig[];
    options: FormlyFormOptions;
    modelChange: EventEmitter<any>;
    content: ElementRef<HTMLElement>;
    private immutable;
    private _model;
    private _modelChangeValue;
    private _fields;
    private _options;
    private modelChangeSubs;
    private modelChange$;
    private modelChangeSub;
    constructor(formlyBuilder: FormlyFormBuilder, formlyConfig: FormlyConfig, ngZone: NgZone, immutable: any, parentFormGroup: FormGroupDirective);
    ngDoCheck(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    changeModel({ key, value, field }: {
        key: string;
        value: any;
        field: FormlyFieldConfig;
    }): void;
    setOptions(): void;
    private checkExpressionChange;
    private trackModelChanges;
    private clearModelSubscriptions;
    private readonly field;
    static ɵfac: ɵngcc0.ɵɵFactoryDeclaration<FormlyForm, [null, null, null, { attribute: "immutable"; }, { optional: true; }]>;
    static ɵcmp: ɵngcc0.ɵɵComponentDeclaration<FormlyForm, "formly-form", never, { "model": "model"; "fields": "fields"; "options": "options"; "form": "form"; }, { "modelChange": "modelChange"; }, never, ["*"]>;
}

//# sourceMappingURL=formly.form.d.ts.map