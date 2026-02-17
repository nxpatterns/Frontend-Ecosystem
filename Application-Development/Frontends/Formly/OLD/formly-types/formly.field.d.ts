import { EventEmitter, ViewContainerRef, SimpleChanges, ComponentFactoryResolver, OnInit, OnChanges, OnDestroy, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, Renderer2, ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyConfig } from '../services/formly.config';
import { FormlyFieldConfig, FormlyFormOptions } from './formly.field.config';
import * as ɵngcc0 from '@angular/core';
export declare class FormlyField implements OnInit, OnChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {
    private formlyConfig;
    private renderer;
    private resolver;
    private elementRef;
    field: FormlyFieldConfig;
    warnDeprecation: boolean;
    model: any;
    form: FormGroup;
    options: FormlyFormOptions;
    modelChange: EventEmitter<any>;
    containerRef: ViewContainerRef;
    private hostObservers;
    private componentRefs;
    private hooksObservers;
    constructor(formlyConfig: FormlyConfig, renderer: Renderer2, resolver: ComponentFactoryResolver, elementRef: ElementRef, hideDeprecation: any);
    ngAfterContentInit(): void;
    ngAfterContentChecked(): void;
    ngAfterViewInit(): void;
    ngAfterViewChecked(): void;
    ngDoCheck(): void;
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    private renderField;
    private triggerHook;
    private attachComponentRef;
    private render;
    private resetRefs;
    static ɵfac: ɵngcc0.ɵɵFactoryDeclaration<FormlyField, [null, null, null, null, { attribute: "hide-deprecation"; }]>;
    static ɵcmp: ɵngcc0.ɵɵComponentDeclaration<FormlyField, "formly-field", never, { "model": "model"; "form": "form"; "options": "options"; "field": "field"; }, { "modelChange": "modelChange"; }, never, never>;
}

//# sourceMappingURL=formly.field.d.ts.map