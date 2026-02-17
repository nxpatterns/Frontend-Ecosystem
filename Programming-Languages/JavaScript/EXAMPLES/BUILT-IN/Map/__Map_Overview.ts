/**
 * Simple TypeDef for Errors
 * (it is TypeScript but it does not matter in this sense)
 */

enum ERROR_TYPES {
  A = 'ERROR AAA',
  B = 'ERROR BBB',
}

/**
 * Create a Map
 */

const errors = new Map();

/**
 * Multiple assignments count once,
 * try and check it afterwards
 */

errors.set(ERROR_TYPES.A, 'YES');
errors.set(ERROR_TYPES.A, 'YES');
errors.set(ERROR_TYPES.B, 'YES');

console.log('ERRORS AFTER SET', errors, errors.size);
// outputs: ERRORS AFTER SET Map { 'ERROR AAA' => 'YES', 'ERROR BBB' => 'YES' } 2

let r = errors.get(ERROR_TYPES.A);

errors.set(ERROR_TYPES.A, 'NO');
r = errors.has(ERROR_TYPES.A); // true

errors.delete(ERROR_TYPES.A);
r = errors.has(ERROR_TYPES.A); // false

errors.delete('NON_EXISTING'); // false

errors.set(ERROR_TYPES.A, 'YES');
errors.set(ERROR_TYPES.B, 'YES');

console.log('errors', errors);
// outputs: errors Map { 'ERROR BBB' => 'YES', 'ERROR AAA' => 'YES' }

console.log('errors.keys', Array.from(errors.keys()));
// outputs: errors.keys [ 'ERROR BBB', 'ERROR AAA' ]
