# NgZone

```ts
import { Component, NgZone } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private ngZone: NgZone) {}

  setFormValues() {
    this.ngZone.run(() => {
      // your code to set reactive form values here
    });
  }
}
```
