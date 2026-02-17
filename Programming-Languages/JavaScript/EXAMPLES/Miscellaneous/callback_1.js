function greeting(name) {
  return `Hello ${name}`;
}

function getName() {
  return "James";
}

function doWhateverItIs(callback, itsArgument) {
  console.log(
    callback(itsArgument)
  );
}

function foo () {
  doWhateverItIs(greeting, getName());
}

setTimeout (foo, 2000);
console.log('After or before timeout?');