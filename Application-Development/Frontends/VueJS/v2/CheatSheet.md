# VueJS Code Snippets & Cheat Sheet

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [VueJS Code Snippets & Cheat Sheet](#vuejs-code-snippets-cheat-sheet)
  - [Basics](#basics)
  - [Lifecycle Hooks](#lifecycle-hooks)
  - [Events](#events)
    - [Keyboard Support](#keyboard-support)
      - [System Modifier Keys](#system-modifier-keys)
    - [Mouse Button Modifiers](#mouse-button-modifiers)
  - [Templates](#templates)
    - [Interpolations](#interpolations)
    - [Expressions](#expressions)
    - [Directives, Arguments, Modifiers](#directives--arguments--modifiers)
  - [CSS Classes/Styles & Rendering](#css-classes-styles-rendering)
    - [Object Syntax](#object-syntax)
    - [Array Syntax](#array-syntax)
    - [Conditional or List Rendering](#conditional-or-list-rendering)
      - [List Rendering of Components](#list-rendering-of-components)
    - [Change Detection](#change-detection)
    - [Filtering/Sorting](#filtering-sorting)
  - [Forms](#forms)
    - [Modifiers (.lazy, .number, .trim,..)](#modifiers-lazy--number--trim)
  - [Components](#components)
    - [Parent/Child Communication](#parent-child-communication)
    - [Child/Parent Communication](#child-parent-communication)

<!-- /code_chunk_output -->

## Basics

```jsx
// VanillaSyntax
var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!'
  }
})

// CLI Syntax
// main.js
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');

// within component
export default {
  name: 'What ever',
  props: {
    message: String,
  },
  // data in ES6 Syntax (Arrow Functions)
  // Return value is an object {}
  data: () => ({
    message: 'Hello',
    myFoo: [],
  }),

  // is the same above in ES5 Syntax
  data() {
    return {
      message: 'Hello',
      firstName: 'Michael',
      lastName: 'Jackson'
      myFoo: [],
    };
  },

  methods: {
    login:    function () { .. },
  },

  computed: {
    // Don’t use arrow functions because of `this`
    reversedMessage: function () {
      // `this` points to the vm instance
      // using of it simple {{ reversedMessage }} within template
      return this.message.split('').reverse().join('')
    },
    // computed properties may have getters and setters
    fullName: {
      get: function () {
        return this.firstName + ' ' + this.lastName
      },
      set: function (newValue) {
        var names = newValue.split(' ')
        this.firstName = names[0]
        this.lastName = names[names.length - 1]
      }
    },
  },

  watch: {
    message: function (oldVal,newVal) {
      // do something
    }
  },

  // Don’t use arrow functions because of `this`
  created:    function () {..},
};
```

## Lifecycle Hooks
```jsx
  beforeCreate:  function () {console.log('beforeCreate!');},
  created:       function () {console.log('created!');},
  beforeMount:   function () {console.log('beforeMount!');},
  mounted:       function () {console.log('mounted!');},
  beforeUpdate:  function () {console.log('beforeUpdate!');},
  updated:       function () {console.log('updated!');},
  beforeDestroy: function () {console.log('beforeDestroy!');},
  destroyed:     function () {console.log('destroyed!');},
```



## Events

Order matters when using modifiers because the relevant code is generated in the same order. Therefore using `v-on:click.prevent.self` will prevent all clicks while `v-on:click.self.prevent` will only prevent clicks on the element itself.

Don’t use `.passive` and `.prevent` together, because .prevent will be ignored and your browser will probably show you a warning. Remember, .passive communicates to the browser that you don’t want to prevent the event’s default behavior.

```html
<button v-on="{ mousedown: doThis, mouseup: doThat }">
<div    v-on:click.capture="doThis">...</div> // capture = adding
<div    v-on:click.self="doThat">...</div>    // self, not from child 
<div    v-on:scroll.passive="onScroll">...</div> // better mobile performance
<button @click="doThis">
<button @click.once="doThis">
<button @click="doThat('hello', $event)">
<button @click.stop="doThis">
<button @click.prevent="doThis">
<button @click.stop.prevent="doThis">
<input  @keyup.enter="onEnter">
<input  @keyup.13="onEnter">
<input  @keyup.13="submit">
<form   @submit.prevent>..
<form   @submit.prevent="onSubmit">..
```

```jsx
// HTML Template
<button v-on:click="greet">Greet</button>
<button v-on:click="greet('myParam')">Greet</button>
<button v-on:click="greet('myParam', $event)">Greet</button>

// JS
methods: {
    greet: function (event) {},
    greet: function (myParam) {},
    greet: function (myParam,event) {},
  }
```

### Keyboard Support

```jsx
// full list of key modifier aliases
.enter, .tab, .delete (del & backspace), 
.esc, .space, .up, .down, .left, .right 

// custom key modifier aliases
// enable `v-on:keyup.f1`
Vue.config.keyCodes.f1 = 112

// You can also directly use any valid 
// key names exposed via KeyboardEvent.key 
// as modifiers by converting them to kebab-case:
<input @keyup.page-down="onPageDown">

// In the above example, the handler will only 
// be called if $event.key === 'PageDown'
```
#### System Modifier Keys

You can use the following modifiers to trigger mouse or keyboard event listeners only when the corresponding modifier key is pressed:

* .ctrl
* .alt
* .shift
* .meta

```html
<!-- Alt + C -->
<input @keyup.alt.67="clear">

<!-- Ctrl + Click -->
<div @click.ctrl="doSomething">Do something</div>

<!-- this will fire even if Alt or Shift is also pressed -->
<button @click.ctrl="onClick">A</button>

<!-- this will only fire when Ctrl and no other keys are pressed -->
<button @click.ctrl.exact="onCtrlClick">A</button>

<!-- this will only fire when no system modifiers are pressed -->
<button @click.exact="onClick">A</button>
```

### Mouse Button Modifiers

* .left
* .right
* .middle


## Templates

### Interpolations

```jsx
<span>Message: {{ msg }}</span>
<span   v-once>This will never change: {{ msg }}</span>
<span   v-html="rawHtml"></span>
<div    v-bind:id="dynamicId"></div>
<div    v-bind:id="'list-' + id"></div>
<button v-bind:disabled="isButtonDisabled">Button</button> 
```

### Expressions

Template expressions are sandboxed and only have access to a whitelist of globals such as Math and Date. You should not attempt to access user defined globals in template expressions.

```jsx
{{ number + 1 }}
{{ ok ? 'YES' : 'NO' }}
{{ message.split('').reverse().join('') }}
```

### Directives, Arguments, Modifiers 

```html
<p v-if="seen">Now you see me</p>
<a v-bind:href="url"> ... </a>
<a v-on:click="doSomething"> ... </a>
<form v-on:submit.prevent="onSubmit"> ... </form>
```

## CSS Classes/Styles & Rendering

When you use a CSS property that requires vendor prefixes in v-bind:style, for example transform, Vue will automatically detect and add appropriate prefixes to the applied styles.

### Object Syntax

```jsx
<div v-bind:class="{ dataProperty: cssClassName }"></div>
<div class="someClassName" // always set
     v-bind:class="{ active: isActive, 'text-danger': hasError }">
</div>  
```
The bound object doesn’t have to be inline:

```jsx
// HTML Template
<div v-bind:class="cssClassObject"></div>

// JS
data: () => ({
    classObject: {
      active: true,
      'text-danger': false
    },
  }),

// User better computed property (a powerful pattern)

data: () => ({
  isActive: true,
  error: null
}),
computed: {
  classObject: function () {
    return {
      active: this.isActive && !this.error,
      'text-danger': this.error && this.error.type === 'fatal'
    }
  }
}  

// Inline Styles

<div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
<div v-bind:style="styleObject"></div>

// Multiple Values v2.3.0+
<div v-bind:style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>
// This will only render the last value in the array 
// which the browser supports.

```
### Array Syntax

```jsx
// HTML Template
<div v-bind:class="[activeClass, errorClass]"></div>

// JS
data: () => ({
  activeClass: 'active',
  errorClass: 'text-danger'
}), 

// Other possibilities
<div v-bind:class="[isActive ? activeClass : '', errorClass]"></div>
<div v-bind:class="[{ active: isActive }, errorClass]"></div>

// Inline Styles
<div v-bind:style="[baseStyles, overridingStyles]"></div>

```
### Conditional or List Rendering

```jsx
v-if, v-else
v-if, v-else-if (1 to n), v-else
v-show // always rendered, display: none

// in Arrays (item, index) & in Objects (value, key, index)
v-for="(item, index) in items" key)
v-for="(item, index) of items" // also possible
```

#### List Rendering of Components

Note the `is="todo-item"` attribute. This is necessary in DOM templates, because only an `<li>` element is valid inside a `<ul>`. It does the same thing as <todo-item>, but works around a potential browser parsing error. See DOM [Template Parsing Caveats](https://vuejs.org/v2/guide/components.html#DOM-Template-Parsing-Caveats) to learn more.

```jsx
<div id="todo-list-example">
  <input
    v-model="newTodoText"
    v-on:keyup.enter="addNewTodo"
    placeholder="Add a todo"
  >
  <ul>
    <li
      is="todo-item"
      v-for="(todo, index) in todos"
      v-bind:key="todo.id"
      v-bind:title="todo.title"
      v-on:remove="todos.splice(index, 1)"
    ></li>
  </ul>
</div>
```

### Change Detection

```jsx
// Mutation methods for Arrays
push, pop, shift, unshift, splice, sort, reverse

// Non mutating methods for Arrays
filter, concat, slice

// Dynamically added object properties 
// are not reactive unless you use `Vue.set`
Vue.set(object, key, value)
```

### Filtering/Sorting

```jsx
<li v-for="n in evenNumbers">{{ n }}</li>
data: () => ({
  numbers: [ 1, 2, 3, 4, 5 ]
}),
computed: {
  evenNumbers: function () {
    return this.numbers.filter(function (number) {
      return number % 2 === 0
    })
  }
}
```

or 

```jsx
<li v-for="n in even(numbers)">{{ n }}</li>
data: () => ({
  numbers: [ 1, 2, 3, 4, 5 ]
}),
methods: {
  even: function (numbers) {
    return numbers.filter(function (number) {
      return number % 2 === 0
    })
  }
}
```

## Forms

Everything can be achieved with `v-model` for all form elements. 

### Modifiers (.lazy, .number, .trim,..)

```html
<!-- synced after "change" instead of "input" -->
<input v-model.lazy="msg" >

<input v-model.number="age" type="number">
<input v-model.trim="msg">
```
## Components

Always use `kebab-case` for event names.
### Parent/Child Communication

Via props.
### Child/Parent Communication

Via `$emit` method.

```jsx
// Somewhere in the child template
<button v-on:click="$emit('bigger-font')">..
<button v-on:click="$emit('bigger-font', 0.1)">..


// Parent component
<myParentComponent v-on:bigger-font="myFontSize += 0.1" />
<myParentComponent v-on:bigger-font="myFontSize += $event" />
// or 
<myParentComponent v-on:bigger-font="onBiggerFont" /> 
methods: {
  onBiggerFont: function (value) {
    this.myFontSize += value
  }
}

```
