<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

  - [@angular/core/testing](#angularcoretesting)
    - [async](#async)
    - [ComponentFixture](#componentfixture)
    - [ComponentFixtureAutoDetect](#componentfixtureautodetect)
    - [ComponentFixtureNoNgZone](#componentfixturenongzone)
    - [discardPeriodicTasks](#discardperiodictasks)
    - [fakeAsync](#fakeasync)
    - [flush](#flush)
    - [flushMicrotasks](#flushmicrotasks)
    - [getTestBed](#gettestbed)
    - [inject](#inject)
    - [InjectSetupWrapper](#injectsetupwrapper)
    - [MetadataOverride](#metadataoverride)
    - [resetFakeAsyncZone](#resetfakeasynczone)
    - [TestBed](#testbed)
    - [TestComponentRenderer](#testcomponentrenderer)
    - [TestModuleMetadata](#testmodulemetadata)
    - [tick](#tick)
    - [withModule](#withmodule)
  - [@angular/common/testing](#angularcommontesting)
    - [MockLocationStrategy](#mocklocationstrategy)
    - [SpyLocation](#spylocation)
  - [@angular/common/http/testing](#angularcommonhttptesting)
    - [HttpClientTestingModule](#httpclienttestingmodule)
    - [HttpTestingController](#httptestingcontroller)
    - [RequestMatch](#requestmatch)
    - [TestRequest](#testrequest)
  - [@angular/http/testing](#angularhttptesting)
    - [MockBackend](#mockbackend)
    - [MockConnection](#mockconnection)
  - [@angular/router/testing](#angularroutertesting)
    - [RouterTestingModule](#routertestingmodule)
    - [setupTestingRouter](#setuptestingrouter)
    - [SpyNgModuleFactoryLoader](#spyngmodulefactoryloader)
  - [@angular/platform-browser](#angularplatform-browser)
  - [@angular/platform-browser/testing](#angularplatform-browsertesting)
    - [BrowserTestingModule](#browsertestingmodule)
    - [platformBrowserTesting](#platformbrowsertesting)
  - [@angular/platform-browser-dynamic/testing](#angularplatform-browser-dynamictesting)
    - [BrowserDynamicTestingModule](#browserdynamictestingmodule)
    - [platformBrowserDynamicTesting](#platformbrowserdynamictesting)
  - [@angular/platform-server/testing](#angularplatform-servertesting)
    - [platformServerTesting](#platformservertesting)
    - [ServerTestingModule](#servertestingmodule)
  - [@angular/animations/browser/testing](#angularanimationsbrowsertesting)
    - [MockAnimationDriver](#mockanimationdriver)
    - [MockAnimationPlayer](#mockanimationplayer)
- [Code Examples](#code-examples)
  - [Angular CLI Default](#angular-cli-default)
  - [Basic Imports](#basic-imports)
  - [Differences between initial & generated](#differences-between-initial--generated)
    - [Testing Properties](#testing-properties)
    - [Testing Property and Class Bindings](#testing-property-and-class-bindings)
    - [Testing Event Bindings](#testing-event-bindings)
    - [Working with Dependencies](#working-with-dependencies)
    - [Stubs](#stubs)
      - [Testing Routes](#testing-routes)
      - [Working with Route Params](#working-with-route-params)
      - [Working with RouterOutlet](#working-with-routeroutlet)
  - [Shallow Component Tests](#shallow-component-tests)
  - [Testing Attribute Directives](#testing-attribute-directives)
  - [Working with asynchronous operations](#working-with-asynchronous-operations)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

#Angular Test API

[API Overview](https://angular.io/api)

## @angular/core/testing
### async  
### ComponentFixture  
### ComponentFixtureAutoDetect  
### ComponentFixtureNoNgZone  
### discardPeriodicTasks  
### fakeAsync  
### flush  
### flushMicrotasks  
### getTestBed  
### inject  
### InjectSetupWrapper  
### MetadataOverride  
### resetFakeAsyncZone  
### TestBed  
### TestComponentRenderer  
### TestModuleMetadata  
### tick  
### withModule

## @angular/common/testing
### MockLocationStrategy  
### SpyLocation

## @angular/common/http/testing
### HttpClientTestingModule  
### HttpTestingController  
### RequestMatch  
### TestRequest

## @angular/http/testing
### MockBackend  
### MockConnection

## @angular/router/testing
### RouterTestingModule  
### setupTestingRouter  
### SpyNgModuleFactoryLoader

## @angular/platform-browser


## @angular/platform-browser/testing
### BrowserTestingModule  
### platformBrowserTesting

## @angular/platform-browser-dynamic/testing
### BrowserDynamicTestingModule  
### platformBrowserDynamicTesting

## @angular/platform-server/testing
### platformServerTesting  
### ServerTestingModule

## @angular/animations/browser/testing
### MockAnimationDriver  
### MockAnimationPlayer

# Code Examples
## Angular CLI Default 

```javascript
import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule
            ],
            declarations: [
                AppComponent
            ],
        }).compileComponents();
    }));
    it('should create the app', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));
    it(`should have as title 'app'`, async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app.title).toEqual('app');
    }));
    it('should render title in a h1 tag', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('h1').textContent).toContain('Welcome to app!');
    }));
});
```

## Basic Imports
Following Imports are used in many of Tests, but notice Angular CLI does not have all.

```
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
```

## Differences between initial & generated

### Testing Properties

**Angular CLI Initial AppComponent**

```javascript
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
describe('AppComponent', () => {

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));
  
  it('spec description', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    // the two lines above are repetead in every it()
    // the following expects are in 2 different it()-blocks
    expect(app).toBeTruthy();
    expect(app.title).toEqual('app');
  }));
```

**Generated WhateverComponent**

If we use Angular CLI and Webpack there is no need to `compileComponents()`.

```javascript
describe('WhateverComponent', () => {
  let component: WhateverComponent;
  let fixture: ComponentFixture<WhateverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhateverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhateverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
```

We could **simplify** that above and use only one `beforeEach()`

```javascript
describe('WhateverComponent', () => {
  let component: WhateverComponent;
  let fixture: ComponentFixture<WhateverComponent>;

  beforeEach(() => {
	  TestBed.configureTestingModule({
      declarations: [ WhateverComponent ]
    })
    fixture = TestBed.createComponent(WhateverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
```


### Testing Property and Class Bindings

Angular CLI uses a different approach in its initial AppComponent:

```javascript
it('should render title in a h1 tag', async(() => {
    
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges(); // detectChanges is only here
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent)
    .toContain('Welcome to app!');
    
}));
``` 

In a - by ng later - generated component there are 2 Variables in the `describe()`-Block:

```javascript
let component: WhateverComponent;
let fixture: ComponentFixture<WhateverComponent>;
```
and `fixture.detectChanges()` is located in `beforeEach()` Block:

```javascript
fixture = TestBed.createComponent(WhateverComponent);
component = fixture.componentInstance;
fixture.detectChanges();
```

There are also other possibilities to access DOM & Co as used in initial AppComponent.

First Step is importing `By`:

```javascript
import { By } from '@angular/platform-browser';
```

then use it

```javascript
let debugElement = fixture.debugElement.query(By.css('some-class'));
let element: HTMLElement = de.nativeElement;

expect(element.innerText).toContain(1);
```

Compare it with the Angular CLI's initial approach:

```javascript
const fixture = TestBed.createComponent(AppComponent);
fixture.detectChanges(); 
const compiled = fixture.debugElement.nativeElement;
expect(compiled.querySelector('h1').textContent)
    .toContain('Welcome to app!');
```

**First Approach: Set nativeElement and query**

```javascript
const compiled = fixture.debugElement.nativeElement;
compiled.querySelector('some-selector').textContent
```

**Second Approach: Query and set nativeElement**

```javascript
let debugElement = fixture.debugElement.query(By.css('some-class'));
let element: HTMLElement = de.nativeElement;
expect(element.innerText).toContain(1);
```

**Todo**: What is faster ? 

**Notice**: `textContent` is not a standard

**Notice**: If some properties are modified in the test suite, run `fixture.detectChanges()`

**Another Approach is accessing attributes or classes directly:**

```javascript
let debugElement = fixture.debugElement.query(By.css('some-class'));

expect(debugElement.attributes['some-attr']).toBeTruthy 
// or
expect(debugElement.classes['some-class']).toBeTruthy
// or 
expect(debugElement.styles['some-style']).toBeTruthy
```

### Testing Event Bindings

Click on a button and test if the related property gets the correct value. 

```javascript
it ('spec description', () => {
	let button = fixture.debugElement.query(By.css('menu-icon'));
	// equivalent to component.someMethod();
	button.triggerEventHandler('click',null);
	expect(component.someProperty).toBe(someValue)
});
```

### Working with Dependencies

To testing a component, which contains service dependencies, you need first to import it and to add provider to your TestBed.configureTestingModule. The same applies to services like `Http`:

```javascript
import { HttpModule } from 'angular/http';
import { SomeService } from './some.service';
```

Here is the configuration:

```javascript
beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
	      SomeService
      ]
    }).compileComponents();
  }));
```

Now we will change the Behavior of this `SomeService`, first we import necessary Libraries:

```javascript
import { Observable } from 'rxjs';
```

and 

```javascript
it ('should do something with SomeService', () => {
	
	let someArray = [1,2,3];
	
	// let service = fixture.debugElement.injector.get(SomeService);
	let service = TestBed.get(SomeService); 
	spyOn(service, 'nameOfTheMethod').and.returnValue (Obervable.from(someArray));
	fixture.detectChanges();
	expect(components.someProperty.length).toBe(3);
	
});
```

### Stubs

A typical example would be a Router, first import the real Router:

```javascript
import ( Router, ActivatedRoute ) from '@angular/router';
import ( Observable ) from 'rxjs';
```


Define a class out of the describe block, example:

```javascript
class RouterStub {
	navigate(params){}
}

class ActivatedRouteStub {
	params: Obervable<any> = Observable.empty();
}

```

than overwrite original router in the configuration section in beforeEach():

```javascript
	TestBed.configureTestingModule (
	  declarations: [WhatEverComponent],
	  providers: [
		  { provide: Router, useClass: RouterStub },
		  { provide: ActivatedRoute, useClass: ActivatedRouteStub },
	  ]
	);
```

than the test:

```javascript
it ('should go to a route', () => {
	let router = TestBed.get(Router);
	let spy = spyOn (router, 'navigate')
	
	component.changingRouteMethode();
	
	expect(spy).toHaveBeenCalledWith(['someRoute']);
});
```

#### Testing Routes

If you want to be sure, that the given route exists, you can specify also a test for the routes in app.routes.spec.ts:

```javascript
import (routes) from './app.routes';
import (SomeComponent) from './whatEver/some.component';

describe ('Routes are existing', () => {
  expect(routes).toContain(
	  {path: 'someRoute', component: SomeComponent }
  );
});
```

#### Working with Route Params

Some additional libraries like `Subject`:

```javascript

import ( Observable, Subject ) from 'rxjs';

class ActivatedRouteStub {
  private subject = new Subject();
  push(value) {
	  this.subject.next(value)
  };
  
  get params() {
   return this.subject.asObservable();
  }
  
	// params: Obervable<any> = Observable.empty();
}
```

Then the spec part:

```javascript
it ('should go to a initial route, given as route param', () => {
	let router = TestBed.get(Router);
	let spy = spyOn (router, 'navigate')
	let route: ActivatedRouteStub = TestBed.get(ActivatedRoute);
	
	route.push({id: 0});
	
	expect(spy).toHaveBeenCalledWith(['someDefaultRoute']);
});
```

#### Working with RouterOutlet

Import the RouterOutlet, RouterLinkWithHref and RouterTestingModule

```javascript
import ( RouterOutlet, RouterLinkWithHref ) from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
```

change the configuration:

```javascript
TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([])
      ],
      //...
```

then the spec part:

```javascript
it ('should contain a router-outlet', () => {
	let de = fixture.debugElement.query(By.directive(RouterOutlet));
	
	expect(de).not.toBeNull();
});


it ('should have a certain link', () => {
	let debugElements = fixture.debugElement.queryAll(By.directive(RouterLinkWithHref));
	
	// <a href ="/certainLink"> my certain link </a>
	
	let index = debugElements.findIndex(de => de.properties['href'] === '/certainLink');
	
	expect(index).toBeGreaterThen(-1);
});

```

## Shallow Component Tests

When something is not a known element, you can ignore this in your configuration `schemas: [ NO_ERRORS_SCHEMA ]`, first you need to import it:

`import { DebugElement } from '@angular/core';`

then use it:

```javascript
TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([])
      ],
      declarations: [..],
      schemas: [ NO_ERRORS_SCHEMA ]
      //...
```

## Testing Attribute Directives

**New:** `injector.get(SomeDirective)`

Do not forget to import and declare `DirectiveHostComponent` and the testing WhateverDirective in `beforeEach` section.

```javascript
fixture = TestBed.createComponent(DirectiveHostComponent);
fixture.detectChanges();
```

then the spec:

```javascript
it ('should color first paragraph lite-gray', () => {
  // e.g. first parapraph
	let de = fixture.debugElement.queryAll(By.css('p'))[0];
	let el:HTMLElement = de.nativeElement;
  expect(el.style.backgroundColor).toBe('#EBEBEB');	
});

it ('should color second paragraph with default color', () => {
  // e.g. first parapraph
	let de = fixture.debugElement.queryAll(By.css('p'))[1];
	let directive = de.injector.get(SomeDirective)
  expect(el.style.backgroundColor).toBe(directive.defaultColor);	
});
```

## Working with asynchronous operations

**First Method**

```javascript
it ('should do something async', async (() => {
		let service = TestBed.get(SomeService);
		spyOn (service, 'someMethod').and
			.returnValue(Promise.resolve([3,4]));
		fixture.detectChanges();
		fixture.whenStable().then(() => {
			expect (component.someProperty.length).toBe (2);
		});	
}));
```

**Second Method**

Import necessary stuf first:

```javascript
import { TestBed, async, fakeAsync, tick, ComponentFixture } 
from '@angular/core/testing';
```

then the spec:

```javascript
it ('should do something async', async (() => {
		let service = TestBed.get(SomeService);
		spyOn (service, 'someMethod').and
			.returnValue(Promise.resolve([3,4]));
		fixture.detectChanges();
		tick();
		expect (component.someProperty.length).toBe (2);	
		
}));
```

