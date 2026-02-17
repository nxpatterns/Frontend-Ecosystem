var fs = require('fs');
var MapPathPrefix = '../BUILT-IN/MAP/Map.';

var MapProto = Object.getOwnPropertyNames(Map.prototype); //?

MapProto.forEach((entry) => {
  writeFile(MapPathPrefix + 'prototype.' + entry + '.js');
});

function writeFile(fileName) {
  var standardContent = 'console.log ();';

  fs.exists(fileName, (exists) => {
    if (exists) {
      console.log('           Existiert bereits', fileName);
    } else {
      console.log('>>>>>>>>>>> Zu erstellen: ', fileName);

      fs.writeFile(fileName, standardContent, writeCallback);
    }
  });
}

function writeCallback(err) {
  if (err) return console.log(err);
  console.log(`Saved successfully!`);
}
