var myFName = 'myFoto.postfix.jpg';
var nameWithPath = 'css/styles.css';

console.log (
  myFName.substr(0, myFName.lastIndexOf('.')) || myFName, // myFoto.postfix
  myFName.split(".").shift(), // myFoto
  myFName.split(".").pop(), // jpg
  require('path').extname(nameWithPath) // css
);

