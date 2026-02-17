# Intl

<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=5 orderedList=false} -->

<!-- code_chunk_output -->

- [Intl.getCanonicalLocales](#intlgetcanonicallocales)
- [Intl.supportedValuesOf](#intlsupportedvaluesof)
  - [Examples](#examples)
    - [calendar](#calendar)
    - [collation](#collation)
    - [currency](#currency)
    - [numberingSystem](#numberingsystem)
    - [timezone](#timezone)
    - [unit](#unit)
    - [PluralRules](#pluralrules)
    - [RelativeTimeFormat](#relativetimeformat)
    - [ListFormat](#listformat)
    - [Locale](#locale)
    - [DisplayNames](#displaynames)
    - [Segmenter](#segmenter)
- [Intl.DateTimeFormat](#intldatetimeformat)
- [Intl.NumberFormat](#intlnumberformat)
- [Intl.Collator](#intlcollator)
- [Intl.PluralRules](#intlpluralrules)
- [Intl.RelativeTimeFormat](#intlrelativetimeformat)
- [Intl.ListFormat](#intllistformat)
- [Intl.Locale](#intllocale)
- [Intl.DisplayNames](#intldisplaynames)
- [Intl.Segmenter](#intlsegmenter)
- [Examples](#examples-1)
  - [Intl.DateTimeFormat()](#intldatetimeformat-1)
  - [Intl.ListFormat](#intllistformat-1)
- [Backup](#backup)

<!-- /code_chunk_output -->

The `Intl` object is a built-in object in JavaScript that provides language-sensitive functions, including support for formatting dates, times, numbers, and currencies based on the user's locale and preferences.

### Intl.getCanonicalLocales

Returns an array of the canonicalized locale strings.

```js
const locales = ['EN-us', 'DE-DE', 'es-es', 'fR-fR'];
const canonicalLocales = Intl.getCanonicalLocales(locales);

console.log(canonicalLocales);
// output -> ['en-US', 'de-DE', 'es-ES', 'fr-FR']
```

### Intl.supportedValuesOf

Returns an array of supported values for a given `key` and `options`.

```js
console.log(
  Intl.supportedValuesOf('currency', { localeMatcher: 'best fit' }),
);
// Output: Array(150) [...]
```

#### Examples

##### calendar

The possible values for calendar are 'gregory' and 'japanese'. An example of using calendar with 'japanese' would be:

```js
const date = new Date('2022-01-01');
const options = {
  calendar: 'japanese',
  era: 'long',
  year: 'numeric',
};
const formatter = new Intl.DateTimeFormat(
  'ja-JP-u-ca-japanese',
  options,
);
console.log(formatter.format(date)); // 令和４年
```

##### collation

The possible values for collation depend on the implementation, but generally include values like 'default', 'phonebook', and 'traditional'. An example of using collation with 'phonebook' would be:

```js
const strings = ['apple', 'banana', 'cherry', 'date'];
const options = { sensitivity: 'base', collation: 'phonebook' };
console.log(strings.sort(Intl.Collator('en-US', options).compare)); // ['apple', 'banana', 'cherry', 'date']
```

##### currency

The possible values for currency are the ISO 4217 currency codes, such as 'USD', 'EUR', and 'JPY'. An example of using currency with 'USD' would be:

```js
const number = 1234.56;
const options = { style: 'currency', currency: 'USD' };
console.log(new Intl.NumberFormat('en-US', options).format(number)); // $1,234.56
```

##### numberingSystem

The possible values for numberingSystem are 'arab', 'arabext', 'bali', 'beng', 'deva', 'fullwide', 'gujr', 'guru', 'hanidec', 'khmr', 'knda', 'laoo', 'latn', 'limb', 'mlym', 'mong', 'mymr', 'orya', 'tamldec', 'telu', 'thai', 'tibt', 'latn' (the default), and others. An example of using numberingSystem with 'beng' would be:

```js
const number = 1234.56;
const options = { style: 'decimal', numberingSystem: 'beng' };
console.log(new Intl.NumberFormat('bn-BD', options).format(number)); // ১,২৩৪.৫৬
```

##### timezone

The possible values for timezone are the IANA time zone names, such as 'America/Los_Angeles', 'Europe/Berlin', and 'Asia/Tokyo'. An example of using timezone with 'America/Los_Angeles' would be:

```js
const date = new Date();
const options = {
  timeZone: 'America/Los_Angeles',
  timeStyle: 'medium',
  dateStyle: 'medium',
};
console.log(new Intl.DateTimeFormat('en-US', options).format(date)); // Apr 15, 2023, 9:21:05 AM PDT
```

##### unit

The possible values for unit are 'acre', 'bit', 'byte', 'celsius', `'centimeter

##### PluralRules

This object is used to determine the plural category of a given number based on the language and options provided.

```js
const pr = new Intl.PluralRules('en-US');
console.log(pr.select(0)); // Output: 'zero'
console.log(pr.select(1)); // Output: 'one'
console.log(pr.select(2)); // Output: 'other'
```

##### RelativeTimeFormat

This object is used to format relative time units (such as "in 5 minutes" or "3 days ago") based on the language and options provided.

```js
const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
console.log(rtf.format(-1, 'day')); // Output: '1 day ago'
console.log(rtf.format(2, 'hour')); // Output: 'in 2 hours'
```

##### ListFormat

This object is used to format lists (such as "apples, oranges, and bananas") based on the language and options provided.

```js
const lf = new Intl.ListFormat('en', {
  style: 'long',
  type: 'conjunction',
});
console.log(lf.format(['apples', 'oranges', 'bananas'])); // Output: 'apples, oranges, and bananas'
```

##### Locale

This object represents a language tag, which can be used to determine the language and locale-specific formatting options for various operations.
Example:

```js
const locale = new Intl.Locale('en-US');
console.log(locale.language); // Output: 'en'
console.log(locale.region); // Output: 'US'
console.log(locale.baseName); // Output: 'en-US'
```

##### DisplayNames

This object is used to format display names (such as language or region names) based on the language and options provided.

```js
const dn = new Intl.DisplayNames('en', { type: 'region' });
console.log(dn.of('US')); // Output: 'United States'
console.log(dn.of('DE')); // Output: 'Germany'
```

##### Segmenter

This object is used to tokenize strings based on the language and options provided.

```js
const segmenter = new Intl.Segmenter('en', { granularity: 'word' });
console.log(segmenter.segment('Hello, world!')); // Output: [ 'Hello', ',', ' ', 'world', '!' ]
```

### Intl.DateTimeFormat

Formats a `Date` object according to the specified options.

```js
console.log(
  new Intl.DateTimeFormat('en-US').format(new Date('2023-04-18')),
);
// Output: "4/18/2023"
```

### Intl.NumberFormat

Formats a number according to the specified options.

```js
console.log(
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(1000),
);
// Output: "$1,000.00"
```

### Intl.Collator

Compares two strings according to the specified options.

```js
const collator = new Intl.Collator('en-US', {
  sensitivity: 'accent',
});
console.log(collator.compare('cafe', 'café'));
// Output: 0
```

### Intl.PluralRules

Selects the appropriate plural category for a given number and locale.

```js
const pr = new Intl.PluralRules('en-US');
console.log(pr.select(0)); // Output: "other"
console.log(pr.select(1)); // Output: "one"
console.log(pr.select(2)); // Output: "other"
```

### Intl.RelativeTimeFormat

Formats a duration or time difference relative to now.

```js
const rtf = new Intl.RelativeTimeFormat('en-US');
console.log(rtf.format(-1, 'day')); // Output: "1 day ago"
console.log(rtf.format(2, 'month')); // Output: "in 2 months"
```

### Intl.ListFormat

Formats a list of items according to the specified options.

```js
const lf = new Intl.ListFormat('en-US', {
  style: 'long',
  type: 'conjunction',
});
console.log(lf.format(['apples', 'bananas', 'pears'])); // Output: "apples, bananas, and pears"
```

### Intl.Locale

Represents a Unicode locale identifier.

```js
console.log(new Intl.Locale('en-US'));
// Output: { language: "en", script: "", region: "US", extensions: [] }
```

### Intl.DisplayNames

Returns the display name of a language, region, or script code.

```js
const dn = new Intl.DisplayNames('en-US', { type: 'language' });
console.log(dn.of('fr')); // Output: "French"
```

### Intl.Segmenter

Segments a string into its component parts for text analysis.

```js
const segmenter = new Intl.Segmenter('en-US');
console.log([...segmenter.segment('This is a test.')]);
// Output: [{type: "word", value: "This"}, {type: "segmentBreak", value: " "}, {type: "word", value: "is"}, ...]
```

I hope these examples help clarify the usage of each `Intl` function and object! Let me know if you have any further questions

Regenerate response

## Examples

### Intl.DateTimeFormat()

1. Formatting a date and time using a specific locale:

```js
const date = new Date();
const formatter = new Intl.DateTimeFormat('en-US', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
});
console.log(formatter.format(date)); // Example output: "Friday, April 15, 2023, 1:30:45 PM"
```

This code creates a `DateTimeFormat` object with a specific set of options that will format the date and time using the "en-US" locale. The resulting string includes the full name of the weekday, the numeric year, the full name of the month, the numeric day of the month, and the time in hours, minutes, and seconds.

2. Formatting a date and time using the user's locale and custom options:

```js
const date = new Date();
const userLocale = navigator.language;
const formatter = new Intl.DateTimeFormat(userLocale, {
  hour: 'numeric',
  minute: 'numeric',
});
console.log(formatter.format(date)); // Example output: "1:30 PM" (for US English locale)
```

This code creates a `DateTimeFormat` object using the user's default locale, and sets the options to only include the hour and minute values. The resulting string includes the formatted time in 12-hour format (with "AM" or "PM" suffix) based on the user's locale.

3. Formatting a date and time using UTC:

```js
const date = new Date();
const formatter = new Intl.DateTimeFormat('en-US', {
  hour: 'numeric',
  minute: 'numeric',
  timeZone: 'UTC',
});
console.log(formatter.format(date)); // Example output: "11:30 AM" (for UTC)
```

This code creates a `DateTimeFormat` object with the `timeZone` option set to "UTC", which will format the date and time in Coordinated Universal Time (UTC) regardless of the user's local time zone.

These are just a few examples of how `Intl.DateTimeFormat()` can be used to format dates and times in JavaScript. There are many other options and formatting patterns that can be used depending on the specific needs of your application.

Regenerate response

### Intl.ListFormat

Source: <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/ListFormat/ListFormat#parameters>

```js
const vehicles = ['Motorcycle', 'Bus', 'Car'];

const formatter = new Intl.ListFormat('en', {
  style: 'long',
  type: 'conjunction',
});
console.log(formatter.format(vehicles));
// Expected output: "Motorcycle, Bus, and Car"

const formatter2 = new Intl.ListFormat('de', {
  style: 'short',
  type: 'disjunction',
});
console.log(formatter2.format(vehicles));
// Expected output: "Motorcycle, Bus oder Car"

const formatter3 = new Intl.ListFormat('en', {
  style: 'narrow',
  type: 'unit',
});
console.log(formatter3.format(vehicles));
// Expected output: "Motorcycle Bus Car"
```

## Backup

Check this list

```shell
"calendar"
"collation"
"currency"
"dateStyle"
"datetimeStyle"
"numberingSystem"
"localeMatcher"
"hourCycle"
"timeZone"
"timeZoneName"
"weekday"
"era"
"year"
"month"
"day"
"hour"
"minute"
"second"
"fractionalSecondDigits"
"hour12"
"hourCycle"
"numeric"
"style"
"unit"
"unitDisplay"
"notation"
"compactDisplay"
"signDisplay"
"currencySign"
"currencyDisplay"
"currencySpacing"
"minimumIntegerDigits"
"minimumFractionDigits"
"maximumFractionDigits"
"minimumSignificantDigits"
"maximumSignificantDigits"
"roundingIncrement"
"useGrouping"
"grouping"
"currencyMatcher"
"caseFirst"
"sensitivity"
"ignorePunctuation"
"numericOrdering"
"numericSort"
"caseLevel"
"alternate"
"maxVariable"
"segmenter"
```
