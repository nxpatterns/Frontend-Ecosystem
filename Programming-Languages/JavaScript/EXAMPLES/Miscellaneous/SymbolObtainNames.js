var myVehicle = { brand: 'Tesla' };

var isMoving = Symbol('isMoving');
var currentStatus = Symbol('currentStatus');

myVehicle[isMoving] = true;
myVehicle[currentStatus] = 'moving';

Object.getOwnPropertySymbols(myVehicle).forEach((sym, index) =>
  console.log(
    index + 1 + '. Symbol Description: ',
    sym.description + ': ',
    myVehicle[sym],
  ),
);

// console.log(
//   myVehicle[isMoving], // true
//   myVehicle[currentStatus], // 'moving',
//   Reflect.ownKeys(myVehicle), // [ 'brand', Symbol(), Symbol() ]
//   Object.getOwnPropertySymbols(myVehicle), // [ Symbol(), Symbol() ]
//   Object.getOwnPropertyNames(myVehicle),
//   myVehicle,
//   '',
// );

console.log('');
