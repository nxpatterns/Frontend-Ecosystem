/*
 See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare

    CHECK BROWSER SUPPORT FOR EXTENDED ARGUMENTS

    PERFORMANCE
    When comparing large numbers of strings,
    such as in sorting large arrays, it is better
    to create an Intl.Collator object and use
    the function provided by its compare property.
    See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Collator

 The localeCompare() method returns a number indicating
 whether a reference string comes before or after or
 is the same as the given string in sort order.

 The new locales and options arguments let applications
 specify the language whose sort order should be used
 and customize the behavior of the function. In older
 implementations, which ignore the locales and options
 arguments, the locale and sort order used are entirely
 implementation dependent.

 Syntax:
 referenceStr
    .localeCompare(compareString[, locales[, options]])

 * */
console.log (
    'against'.localeCompare('check'), // -2 or -1
    'check'.localeCompare('against'), // 2 or 1
    'auto'.localeCompare('auto'), // 0
);

// SORTING
// localeCompare enables a case-insensitive sort of an array.

var items = ['réservé', 'communiqué', 'café', 'adieu'];
items.sort((a, b) => a.localeCompare(b));

console.log(items);
// [ 'adieu', 'café', 'communiqué', 'réservé' ]

// USING LOCALES

console.log('ä'.localeCompare('z', 'de'));
// a negative value: in German, ä sorts before z

console.log('ä'.localeCompare('z', 'sv'));
// a positive value: in Swedish, ä sorts after z