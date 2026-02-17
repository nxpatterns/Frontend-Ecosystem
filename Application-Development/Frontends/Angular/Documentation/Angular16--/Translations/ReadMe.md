# Translations

## With Observable Params

To translate a string with ngx-translate when the translation parameters are observable, you can use the translate method provided by the TranslateService in ngx-translate.

```ts
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

// ...

constructor(private translate: TranslateService) {}

// ...

// Define an observable for the translation parameter
const translationParam$: Observable<string> = ...

// Translate the string with the observable parameter
this.translate.get('translation-string', {param: translationParam$})
  .subscribe(translation => {
    console.log(translation); // The translated string with the observable parameter interpolated
  });
```
