goog.provide('towerofhanoi.play_sound_initial');

/* Sound initial screen*/

var audio = new Audio();

towerofhanoi.play_sound_initial = function() {
	audio.setAttribute("src","sounds/01 - Irfan Tahirovic Trio - Torok.mp3");
    audio.play();
}
towerofhanoi.pause_sound = function(){
    audio.pause();
};

towerofhanoi.play_sound_win = function() {
	audio.setAttribute("src","sounds/wins.wav");
    audio.play();
}

towerofhanoi.play_sound_lost = function() {
	audio.setAttribute("src","sounds/gameover.wav");
    audio.play();
}
