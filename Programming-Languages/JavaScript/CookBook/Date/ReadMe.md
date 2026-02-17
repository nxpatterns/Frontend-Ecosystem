# Date

## Basics

### new Date()

```js
const d = new Date(); // 2023-04-15T14:38:07.008Z
```

The string format you are seeing is called the **ISO-8601** format, which is a standard format for representing date and time in a machine-readable way:

**`2023-04-15T14:38:07.008Z`**

Where:

- `YYYY` represents the year (e.g., 2023)
- `MM` represents the month (01-12)
- `DD` represents the day (01-31)
- `T` is a separator between the date and time
- `HH` represents the hour (00-23)
- `mm` represents the minute (00-59)
- `ss` represents the second (00-59)
- `.sss` represents the milliseconds (000-999)
- `Z` represents the time zone (in this case, Z means UTC or "Coordinated Universal Time")

**"T"** im ISO-8601-Format ist Teil der Notation und steht für "time", um das Datum von der Uhrzeit zu trennen. Das "T" ist erforderlich, um das Datum- und Uhrzeitformat nach ISO-8601 zu kennzeichnen. Ein anderer Buchstabe ist nicht normkonform, ein Leerzeichen aber schon.

In the ISO-8601 format, the letter "Z" represents the **UTC time zone**, which is also known as **"Coordinated Universal Time"**. The UTC time zone is based on the time at the Prime Meridian, which passes through the Royal Observatory in Greenwich, London.

Apart from the UTC time zone, the ISO-8601 format allows specifying other time zones using the following formats:

- A positive or negative offset from UTC, specified as ±hh:mm (e.g., +05:30 or -03:00). This represents the difference between the local time zone and **UTC**. For example, if the local time zone is 5 hours and 30 minutes ahead of UTC, you would use +05:30.
- A time zone abbreviation, such as **EST** or **PDT**. However, these abbreviations are not standardized and can be ambiguous, so it is generally recommended to use the offset format instead.

For example, the following strings represent the same point in time, but with different time zone information:

- `2023-04-15T14:31:15.772Z` (UTC)
- `2023-04-15T15:31:15.772+01:00` (Central European Time)
- `2023-04-15T10:31:15.772-04:00` (Eastern Daylight Time)

EST and PDT are time zone abbreviations that represent Eastern Standard Time and Pacific Daylight Time, respectively.

**Eastern Standard Time (EST)** is the time zone used in the eastern part of North America during the winter months, when Daylight Saving Time (DST) is not in effect. **EST is ALWAYS 5 hours** behind Coordinated Universal Time (UTC-5).

**Pacific Daylight Time (PDT)** is the time zone used in the western part of North America during the summer months, when DST is in effect. **PDT is 7 hours behind Coordinated Universal Time (UTC-7).**

**PDT is a daylight saving time (DST) time zone**, which means that it is only used during the summer months in parts of North America, when DST is in effect. **During the rest of the year, the Pacific Time Zone (PT) is used instead, which is 8 hours behind UTC (UTC-8).**

It's worth noting that time zone abbreviations like EST and PDT can be ambiguous and confusing, especially when used in contexts where people in different parts of the world may be communicating. For this reason, it's generally recommended to use the offset format (+/-hh:mm) or the full time zone name (e.g., "Eastern Standard Time" or "Pacific Daylight Time") instead of abbreviations whenever possible.

- UTC (Coordinated Universal Time) - 0 offset
- CET (Central European Time) - UTC+1 offset
- EST (Eastern Standard Time) - UTC-5 offset
- PDT (Pacific Daylight Time) - UTC-7 offset
- PT (Pacific Time) - UTC-8 offset (used during the winter months when daylight saving time is not in effect)

The information about time zones and daylight saving time rules that are used by JavaScript's `Date()` object comes from the operating system that the JavaScript runtime is running on.

In the case of browser-based JavaScript, the time zone information is usually obtained from the user's operating system or device settings. The browser then provides this information to JavaScript via the **`Intl`** object's `DateTimeFormat()` method.

In the case of Node.js, the time zone information is obtained from the underlying operating system on which Node.js is running.

### Time Zones

## Examples

### Same day or before

```js
// moment.js
const moment = require('moment');
const startDate1 = moment('2023-04-16').format('YYYY-MM-DD');
const dueDate1 = moment('2023-04-17').format('YYYY-MM-DD');
const isBeforeOrSame1 = moment(startDate1).isBefore(
  dueDate1,
  'day',
);

// native vanilla js
const startDate2 = new Date('2023-04-16');
const dueDate2 = new Date('2023-04-17');
const isBeforeOrSame2 =
  startDate2.getFullYear() === dueDate2.getFullYear() &&
  startDate2.getMonth() === dueDate2.getMonth() &&
  startDate2.getDate() <= dueDate2.getDate();

console.log('isBeforeOrSame1', isBeforeOrSame1);
console.log('isBeforeOrSame2', isBeforeOrSame2);
```
