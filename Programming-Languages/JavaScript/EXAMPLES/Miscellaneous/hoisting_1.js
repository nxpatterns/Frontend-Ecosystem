var me = function () {
  console.log ("I'am outside");
} 

function whereAreYou (){
  console.log (typeof me); // undefined
  // me(); would output "TypeError: me is not a function"
  var me = function (){
    console.log ("I'am inside");
  }; 
  me(); 
}

whereAreYou(); // I'am inside