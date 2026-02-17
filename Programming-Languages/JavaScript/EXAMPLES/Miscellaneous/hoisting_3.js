var me = function () {
  console.log ("I'am outside");
}; 

function whereAreYou (){
  console.log (typeof me); // function
  me (); // I'am inside
  function me (){
    console.log ("I'am inside");
  } 
  me(); // I'am inside 
}

whereAreYou(); 