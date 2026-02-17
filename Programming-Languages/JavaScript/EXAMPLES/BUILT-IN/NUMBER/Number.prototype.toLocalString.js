var number = 123456.78912;

function toLocaleStringSupportsOptions() {
    return !!(typeof Intl == 'object' && Intl && typeof Intl.NumberFormat == 'function');
}

if (toLocaleStringSupportsOptions()) {
// request a currency format
    console.log(number.toLocaleString('de-DE', {
        style: 'currency',
        currency: 'EUR',
        maximumSignificantDigits: 8,
        minimumFractionDigits: 2
    }));

// → 123.456,79 €
}

