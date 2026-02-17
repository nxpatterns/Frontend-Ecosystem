
// FP is a fictive Functional JS Library
// Some of them are
// https://github.com/lodash/lodash/wiki/FP-Guide
// http://functionaljs.com/
// https://ramdajs.com/
// https://github.com/facebook/immutable-js


var sumOnlyFavorites = FP.compose( [
  FP.filterReducer( FP.gte( 10 ) ),
  FP.filterReducer( FP.lte( 20 ) )
] )( sum );

var printMagicNumber = FP.pipe( [
  FP.reduce( sumOnlyFavorites, 0 ),
  constructMsg,
  console.log
] );

var numbers = [4,10,0,27,42,17,15,-6,58];

printMagicNumber( numbers );        // The magic number is: 42

// ***************

function sum(x,y) { return x + y; }
function constructMsg(v) { return `The magic number is: ${v}`; }