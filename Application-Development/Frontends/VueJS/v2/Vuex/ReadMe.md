---
ebook:
  title: Vuex
  pdf:
    paper-size: A4
    default-font-size: 14   
---

# Vuex

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

* [Vuex](#vuex)
	* [Introduction](#introduction)
	* [Installation](#installation)
		* [Using Dev Build](#using-dev-build)
		* [Example Module Structure](#example-module-structure)
			* [main.js](#mainjs)
			* [src/base/index.js](#srcbaseindexjs)
	* [Core Concepts](#core-concepts)
		* [State](#state)
			* [The mapState Helper](#the-mapstate-helper)
			* [Object Spread Operator](#object-spread-operator)
			* [Components Can Still Have Local State](#components-can-still-have-local-state)
		* [Getters](#getters)
		* [Mutations](#mutations)
		* [Actions](#actions)
		* [Modules](#modules)

<!-- /code_chunk_output -->

<img src="img/overview.png" width="480">

Vuex is a ***state management pattern + library*** for ==Vue.js applications==. It serves as a centralized store for all the components in an application, with rules ensuring that the state can only be mutated in a predictable fashion. It also integrates with [Vue's official devtools](https://github.com/vuejs/vue-devtools) extension to provide advanced features such as 
> zero-config time-travel debugging and
 
> state snapshot export / import.

## Introduction

Vuex is also a library implementation tailored specifically 
for Vue.js to take advantage of its ==granular 
reactivity system== for efficient updates.

==Vuex is different in that it knows it’s in a Vue app and 
contains advanced debugging helpers such as mutation logs, 
snapshots, and history re-rolls / time travel==.

**Common Problems**

> Multiple views may depend on the same piece of state.

> Actions from different views may need to mutate the same piece of state.

For ==problem one==, passing props can be tedious for deeply 
nested components, and simply doesn't work for sibling components. 

For ==problem two==, we often find ourselves resorting to solutions 
such as reaching for direct parent/child instance references or 
trying to mutate and synchronize multiple copies of the state via events. 
Both of these patterns are brittle and quickly lead to unmaintainable code.

It’s important to note that you should ==never replace== the 
original state object in your actions - the components and 
the store need to share reference to the same object 
in order for mutations to be observed.

There are two things that make a Vuex store different 
from a plain global object:

* Vuex stores are ==reactive==. When Vue components retrieve state from it, 
they will reactively and efficiently update if the store's state changes.

* You ==cannot directly mutate the store's state==. The only way to change 
a store's state is by explicitly ==committing mutations==. This ensures every 
state change leaves a track-able record, and enables tooling that 
helps us better understand our applications.

## Installation

```bash
npm install vuex --save
```
```jsx
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex) // e.g. in store.js
```

### Using Dev Build

```bash
git clone https://github.com/vuejs/vuex.git node_modules/vuex
cd node_modules/vuex
npm install
npm run build
```

### Example Module Structure

```jsx
├── src
    ├── App.vue
    ├── main.js
    ├── store
        ├── base // module base
        │   ├── actions.js
        │   ├── getters.js
        │   ├── index.js
        │   ├── mutations.js
        │   └── state.js
        └── store.js
```
#### main.js

By providing the store option to the root instance, the store will be injected into all child components of the root and will be available on them as `this.$store`

```jsx
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/store'; // IMPORT STATE
import './registerServiceWorker';

Vue.config.productionTip = false;
                        
new Vue({                        
  router,                        
  store,  // <------------ INJECT STORE 
  render: h => h(App)
}).$mount('#app');
```
#### src/base/index.js

```jsx
import state from './state';
import * as getters from './getters';
import * as mutations from './mutations';
import * as actions from './actions';

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
```

## Core Concepts
### State
#### The mapState Helper
#### Object Spread Operator
#### Components Can Still Have Local State
### Getters
### Mutations
### Actions
### Modules