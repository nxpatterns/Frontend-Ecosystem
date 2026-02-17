import { map, mapValues, keyBy } from 'lodash';

let o = { id: 0, size: 10 };
let mapped_o = map(o, (v, k) => ({ key: k, value: v })); // Mapped Object:  [ { key: 'id', value: 0 }, { key: 'size', value: 10 } ]
let mappedValues = mapValues(keyBy(mapped_o, 'key'), 'value'); // MapValues of Mapped Object:  { id: 0, size: 10 }

console.log('Object: ', o);
console.log('Mapped Object: ', mapped_o);
console.log('MapValues of Mapped Object: ', mappedValues);
