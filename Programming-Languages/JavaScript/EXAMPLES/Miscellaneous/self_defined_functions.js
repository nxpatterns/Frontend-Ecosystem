var sayYouLoveMe = function (){
  console.log ('I love you!');
  sayYouLoveMe = function () {
    console.log ('Nope!');
  }
}

var sayYouLoveMeAgain = sayYouLoveMe;

sayYouLoveMe();       // I love you!
sayYouLoveMeAgain();  // I love you!
sayYouLoveMeAgain();  // I love you!
sayYouLoveMeAgain();  // I love you!
sayYouLoveMe();       // Nope!
