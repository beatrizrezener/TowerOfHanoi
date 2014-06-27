goog.provide('towerofhanoi.play_sound');

/* Sound initial screen*/

var audio = new Audio();
audio.setAttribute("src","sounds/initial_sound.mp3");

towerofhanoi.play_sound = function() {
    audio.play();
}
towerofhanoi.pause_sound = function(){
    audio.pause();
};
