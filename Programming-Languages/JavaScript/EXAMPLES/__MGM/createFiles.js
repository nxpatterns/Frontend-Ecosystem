
var fs = require('fs');

var type = Symbol;
var aktuell = '../BUILT-IN/SYMBOL/Symbol.';

var m0 = Object.getOwnPropertyNames(type);

var m1 = m0.filter (i => typeof type[i] !== 'function');


var m00 = Object.getOwnPropertyNames(type.prototype);

var forbiddenOnStrictMode = ['caller', 'callee', 'arguments'];

var m2 = m00.filter (i => {
    var x = false;
    if (forbiddenOnStrictMode.indexOf(i) == -1) {
        return typeof type.prototype[i] !== 'function'
    }
    return x;}
    );

// console.log(m1,m2);





m1.forEach (i => {
    writeFile (aktuell+i+'.js');
});

m2.forEach (i => {
    writeFile (aktuell+'prototype.'+i+'.js');
});

function writeFile (fileName) {
    var standardContent = 'console.log ();';

    fs.exists(fileName, exists => {
        if (exists) {
            console.log ('           Existiert bereits', fileName);
        } else {

            console.log('>>>>>>>>>>> Zu erstellen: ',fileName);

          fs.writeFile(fileName, standardContent, writeCallback);
        }
    });
}

function writeCallback (err) {
    if (err) return console.log(err);
    console.log (`Saved successfully!`);
}

