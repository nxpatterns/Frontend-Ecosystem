# Angular & DOM

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Angular & DOM](#angular-dom)
  - [Handling DOM Manipulation](#handling-dom-manipulation)
    - [Event or Property Binding (Standard way)](#event-or-property-binding-standard-way)
    - [@HostListener and @HostBinding](#hostlistener-and-hostbinding)
    - [Renderer2](#renderer2)
      - [Example](#example)
      - [Abstract Class (Excerpt from original Documentation)](#abstract-class-excerpt-from-original-documentation)
    - [Template Reference Variable](#template-reference-variable)
    - [fromEvent() from rxjs](#fromevent-from-rxjs)

<!-- /code_chunk_output -->

## Handling DOM Manipulation

### Event or Property Binding (Standard way)

**HTML**

```html
<button
  (click)="changeBGColour()"
  [ngStyle]="{'background-color': buttonColor}"
>
  Change Background Color
</button>
```

**TS**

```typescript
buttonColor : string = 'yellow'
changeColour() {
    this.buttonColor = 'green'
}
```

### @HostListener and @HostBinding

@HostBinding and @HostListener are defined inside directive and these are very similar to event binding and property binding in Angular.

**HTML**

```html
<button class="cHighlight">Highlight</button>
```

**TS**

```typescript
@Directive({
  selector: '.cHighlight',
})
export class HostDirective {
  @HostBinding('style.backgroundColor') cColor = 'red';
  @HostListener('click') cOnclick() {
    this.cColor = 'purple';
  }
}
```

### Renderer2

Details here [online](https://angular.io/api/core/Renderer2)

This is basically a wrapper over the browser API for DOM Manipulation. Extend this base class to implement custom rendering. By default, Angular renders a template into DOM. You can use custom rendering to intercept rendering calls, or to render to something other than DOM.

#### Example

**HTML**

```html
<button (click)="onClick()" #whatEver>Do Something</button>
```

**TS**

```typescript
@ViewChild('whatEver')
private whatEver: ElementRef;
constructor(private renderer: Renderer2) {
}
onClick() {
    this.renderer.setStyle(this.whatEver.nativeElement, 'backgroundColor','green');
}
```

#### Abstract Class (Excerpt from original Documentation)

```javascript
abstract class Renderer2 {
  abstract data: {...}
  destroyNode: ((node: any) => void) | null
  abstract destroy(): void
  abstract createElement(name: string, namespace?: string): any
  abstract createComment(value: string): any
  abstract createText(value: string): any
  abstract appendChild(parent: any, newChild: any): void
  abstract insertBefore(parent: any, newChild: any, refChild: any, isMove?: boolean): void
  abstract removeChild(parent: any, oldChild: any, isHostElement?: boolean): void
  abstract selectRootElement(selectorOrNode: any, preserveContent?: boolean): any
  abstract parentNode(node: any): any
  abstract nextSibling(node: any): any
  abstract setAttribute(el: any, name: string, value: string, namespace?: string): void
  abstract removeAttribute(el: any, name: string, namespace?: string): void
  abstract addClass(el: any, name: string): void
  abstract removeClass(el: any, name: string): void
  abstract setStyle(el: any, style: string, value: any, flags?: RendererStyleFlags2): void
  abstract removeStyle(el: any, style: string, flags?: RendererStyleFlags2): void
  abstract setProperty(el: any, name: string, value: any): void
  abstract setValue(node: any, value: string): void
  abstract listen(target: any, eventName: string, callback: (event: any) => boolean | void): () => void
}
```

### Template Reference Variable

This requires in some circumstances creating an id (reference) for the element.

**HTML**

```html
<button (click)="changeColor()" id="idColorChangerButton">
  Change Color
</button>
```

**TS**

```typescript
changeColour() {
    const b = <HTMLElement>document.querySelector('#idColorChangerButton');
    b.style.backgroundColour = 'green'
}
```

### fromEvent() from rxjs

**HTML**

```html
<button id="idColorChangerButton">Change Color</button>
```

**TS**

```typescript
@ViewChild('idColorChangerButton')
private idColorChangerButton: ElementRef;
ngOnInit(){
  fromEvent(this.idColorChangerButton.nativeElement, 'click')
    .subscribe(res => this.idColorChangerButton.nativeElement.style.backgroundColor = 'purple');
}
```
