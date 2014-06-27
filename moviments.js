goog.provide('towerofhanoi.validMoveSound');
goog.provide('towerofhanoi.invalidMoveSound');
goog.require('lime.audio.Audio');

towerofhanoi.validMoveSound  = function() {
  var validsound = new Audio();
  validsound.setAttribute("src","sounds/correct_move.wav");
  validsound.play();
}
