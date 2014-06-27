goog.provide('towerofhanoi.movementSound');

towerofhanoi.movementSound  = function(msc_option) {

  var validsound = new Audio();
  if(msc_option == 0){
    validsound.setAttribute("src","sounds/correct_move.wav");
    }
  else{
    validsound.setAttribute("src","sounds/incorrect_move.wav");
  }
    validsound.play();
}
