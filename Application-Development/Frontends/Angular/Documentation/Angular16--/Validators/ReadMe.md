# Angular Validators

## Getting Values From Store

```js
import { Store } from '@ngrx/store';
import { AbstractControl, ValidatorFn } from '@angular/forms';

export function maxValueValidator(store: Store<any>): ValidatorFn {
  return (
    control: AbstractControl,
  ): { [key: string]: any } | null => {
    const maxValue = store.select('maxValue');
    if (control.value > maxValue) {
      return { maxValueExceeded: true };
    }
    return null;
  };
}
```

### Better

```js
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { last } from 'rxjs/operators';
import { Store } from '@ngrx/store';

export function maxValueValidator(store: Store<any>): ValidatorFn {
  return (
    control: AbstractControl,
  ): { [key: string]: any } | null => {
    let maxValue: number;
    store
      .select('maxValue')
      .pipe(last())
      .subscribe((value) => {
        maxValue = value;
      });
    if (control.value > maxValue) {
      return { maxValueExceeded: true };
    }
    return null;
  };
}
```
