# Dynamic Translation Parameter

```ts
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-my-component',
  template: ` <p>{{ translatedMessage }}</p> `,
})
export class MyComponent {
  dynamicParams: any = {}; // declare an empty object for the dynamic parameters

  translatedMessage: string;

  constructor(private translateService: TranslateService) {}

  ngOnInit() {
    const placeHolder = 'totalSum'; // this is the dynamic parameter we want to translate
    if (this.isDynamicParameterValid(placeHolder)) {
      // if the dynamic parameter is valid, set it in the dynamicParams object
      this.dynamicParams[placeHolder] = 100; // replace this with the value obtained from the REST API call
      const messageKey =
        'Check these form elements: {{' + placeHolder + '}}'; // construct the message key
      this.translatedMessage = this.translateMessage(messageKey);
    } else {
      // if the dynamic parameter is not valid, handle the error
      console.error('Invalid dynamic parameter:', placeHolder);
      this.translatedMessage = 'Error: Invalid dynamic parameter';
    }
  }

  isDynamicParameterValid(placeHolder: string): boolean {
    // check if the dynamic parameter is in a list of valid parameters
    const validParameters = [
      'totalSum',
      'anotherParameter',
      'yetAnotherParameter',
    ];
    return validParameters.includes(placeHolder);
  }

  translateMessage(messageKey: string) {
    const params = {};
    const paramRegex = /{{([^}}]+)}}/g;
    let match;
    while ((match = paramRegex.exec(messageKey))) {
      const paramName = match[1].trim();
      params[paramName] = this.dynamicParams[paramName];
    }

    const message = this.translateService.instant(
      messageKey,
      params,
    );
    return message;
  }
}
```

In this example, we're first defining the placeHolder variable to contain the name of the dynamic parameter we want to translate. Then, we're checking if the dynamic parameter is valid by calling the isDynamicParameterValid method, which checks if the parameter is in a list of valid parameters.

If the dynamic parameter is valid, we're setting it in the dynamicParams object with a sample value of 100. Then, we're constructing the message key by concatenating the placeHolder variable with the rest of the message. Finally, we're calling the translateMessage method to translate the message.

If the dynamic parameter is not valid, we're handling the error by logging it to the console and setting the translatedMessage variable to an error message.
