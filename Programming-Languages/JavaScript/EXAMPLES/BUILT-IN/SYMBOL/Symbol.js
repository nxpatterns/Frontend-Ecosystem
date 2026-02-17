// use it avoid collisions with other parts of source code

    var myVehicle = { brand: 'Tesla' };

    var isMoving = Symbol();
    var currentStatus = Symbol();

    myVehicle[isMoving] = true;
    myVehicle[currentStatus] = 'moving';

    console.log(
        myVehicle[isMoving],  // true
        myVehicle[currentStatus],  // 'moving',
        Reflect.ownKeys(myVehicle),  // [ 'brand', Symbol(), Symbol() ]
        Object.getOwnPropertySymbols(myVehicle), // [ Symbol(), Symbol() ]
    );