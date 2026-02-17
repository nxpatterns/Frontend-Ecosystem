# Clearing up after CLI 

## .git ignore

Add miserable lock files during development into the `.gitignore` file:

```jsx
# Miserable Lock Files
package-lock.json
yarn.lock
```

## Correct testing structure for HelloWorld

Something like that is better as the initial one:

```jsx
import { shallowMount, mount, Wrapper } from '@vue/test-utils';
import HelloWorld from '@/components/HelloWorld.vue';

describe ('HelloWorld.vue', () => {

  const wrapper = mount(HelloWorld);
  const vm = wrapper.vm;

  afterEach(() => {
    vm.$destroy();
    jest.clearAllMocks();
  });

  describe('Props Message', () => {
    it('renders props.msg when passed', () => {
      const msg = 'new message';
      wrapper.setProps({ msg });
      expect(wrapper.text()).toMatch(msg);
    });
  });
});
```

## Don't forget `/` for new routes

Name is optional but good for debugging purposes (TODO: details --> later)

```jsx
import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
  ],
});
```
