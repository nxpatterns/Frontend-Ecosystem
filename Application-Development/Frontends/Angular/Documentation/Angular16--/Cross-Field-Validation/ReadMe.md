# Angular Validation Examples

<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Cross Field Validation](#-cross-field-validation)
- [Check Number of Digits (Group Validator) - I](#-check-number-of-digits-group-validator---i)
- [Check Number of Digits (Group Validator) - II](#-check-number-of-digits-group-validator---ii)

<!-- /code_chunk_output -->

## Cross Field Validation

> [Great Answer here (StackOverflow), old but still valid.](https://stackoverflow.com/questions/31788681/angular2-validator-which-relies-on-multiple-form-fields)
> Full Example: [https://embed.plnkr.co/ukwCXm/](https://embed.plnkr.co/ukwCXm/)

> [Another Example is here](https://dzone.com/articles/how-to-do-conditional-validation-on-valuechanges-m)

In order for Validators to take parameters, they need to return a function with either a FormGroup or FormControl as a parameter.
In this case, I'm validating a FormGroup.

```ts
function matchingPasswords(
  passwordKey: string,
  confirmPasswordKey: string,
) {
  return (group: FormGroup): { [key: string]: any } => {
    let password = group.controls[passwordKey];
    let confirmPassword = group.controls[confirmPasswordKey];

    if (password.value !== confirmPassword.value) {
      return {
        mismatchedPasswords: true,
      };
    }
  };
}
```

Dave's answer was very, very helpful. However, a slight modification might help some people.

In case you need to add errors to the Control fields, you can keep the actual construction of the form and validators:

```ts
// Example use of FormBuilder, ControlGroups, and Controls
this.registrationForm = fb.group(
  {
    dob: ['', Validators.required],
    email: [
      '',
      Validators.compose([Validators.required, emailValidator]),
    ],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
  },
  { validator: matchingPasswords('password', 'confirmPassword') },
);
```

Instead of setting an error on the ControlGroup, do so on the actual field as follows:

```js
function matchingPasswords(
  passwordKey: string,
  passwordConfirmationKey: string,
) {
  return (group: ControlGroup) => {
    let passwordInput = group.controls[passwordKey];
    let passwordConfirmationInput =
      group.controls[passwordConfirmationKey];
    if (passwordInput.value !== passwordConfirmationInput.value) {
      return passwordConfirmationInput.setErrors({
        notEquivalent: true,
      });
    }
  };
}
```

## Check Number of Digits (Group Validator) - I

```ts
this.form = this.formBuilder.group(
  {
    A: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
    B: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
    C: [
      '',
      [
        Validators.required,
        (control: FormControl) => {
          const num = control.value;
          return has14DigitsOrLess(num)
            ? null
            : { maxLengthExceeded: true };
        },
      ],
    ],
  },
  { validator: this.productValidator },
);

// .....

function has14DigitsOrLess(num: number, currency: string): boolean {
  const numStr = num.toLocaleString('en-' + currency, {
    useGrouping: false,
  });
  const decimalIndex = numStr.indexOf(
    currency === 'JPY' ? '' : '.',
  );

  if (decimalIndex !== -1) {
    // input has a decimal part, count only the digits in the integer part
    return decimalIndex <= 14;
  } else {
    // input has no decimal part, count all digits
    return numStr.length <= 14;
  }
}
```

## Check Number of Digits (Group Validator) - II

```ts

this.form = this.formBuilder.group({
  A: ['', [(control: AbstractControl) => this.maxProductValidator(control, 'A'), Validators.required, Validators.pattern(/^[0-9]*$/)]],
  B: ['', [(control: AbstractControl) => this.maxProductValidator(control, 'B'), Validators.required, Validators.pattern(/^[0-9]*$/)]],
  C: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]]
}, { validator: this.productValidator });



maxProductValidator(control: AbstractControl, inputName: string): ValidationErrors | null {
  const formGroup = control.parent;
  const a = formGroup?.get('A')?.value;
  const b = formGroup?.get('B')?.value;

  if (a !== null && b !== null && !isNaN(a) && !isNaN(b)) {
    const c = a * b;
    const cLength = c.toLocaleString('en-US', { useGrouping: false }).length;
    if (cLength > 14) {
      const error = { maxProductExceeded: { value: c, input: inputName } };
      return error;
    }
  }

  return null;
}

productValidator: ValidatorFn = (formGroup: FormGroup): ValidationErrors | null => {
  const a = formGroup.get('A')?.value;
  const b = formGroup.get('B')?.value;
  const c = formGroup.get('C')?.value;

  if (a !== null && b !== null && c !== null && !isNaN(a) && !isNaN(b) && !isNaN(c)) {
    if (c !== a * b) {
      return { productMismatch: true };
    }
  }

  return null;
}

```
