function greeting() {
  setTimeout(() => {
    console.log('Welcome!');
  }, 1000);
}

function doWhateverItIs(callback) {
  if (typeof callback === 'function') {
    callback();
  }
}

doWhateverItIs(greeting);
console.log('Hi');

// outputs
/**
 * Hi
 * Welcome!
 */
