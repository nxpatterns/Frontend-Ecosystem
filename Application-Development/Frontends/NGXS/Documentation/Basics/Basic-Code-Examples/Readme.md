# NGXS Cookbook

## Dispatching Actions

```ts
// e.g. animal.actions.ts
export class AddAnimal {
  static readonly type = '[Zoo] Add Animal';
  constructor(public name: string) {}
}
```

```ts
import { Store } from '@ngxs/store';
import { AddAnimal } from './animal.actions';

@Component({ ... })
export class ZooComponent {
  constructor(private store: Store) {}

  addAnimal(name: string) {
    this.store.dispatch(new AddAnimal(name));
  }
}
```

or:

```ts
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { withLatestFrom } from 'rxjs/operators';
import { AddAnimal } from './animal.actions';

@Component({ ... })
export class ZooComponent {

  // @Select
  @Select(state => state.animals) animals$: Observable<any>;

  constructor(private store: Store) {}

  addAnimal(name: string) {
    this.store
      .dispatch(new AddAnimal(name))
      .pipe(withLatestFrom(this.animals$))
      .subscribe(([_, animals]) => {
        // do something with animals
        this.form.reset();
      });
  }
}
```
