goog.provide('towerofhanoi.play_sound_initial');
goog.provide('towerofhanoi.music_sound');

/* Sound initial screen*/

var audio = new Audio();
var music_audio  = new Audio();

towerofhanoi.play_sound_initial = function() {
	music_audio.setAttribute("src","sounds/01 - Irfan Tahirovic Trio - Torok.mp3");
    music_audio.play();
}
towerofhanoi.pause_sound = function(){
    music_audio.pause();
};
towerofhanoi.play_sound_win = function() {
	audio.setAttribute("src","sounds/wins.wav");
    audio.play();
}

towerofhanoi.music_sound = function(){
  if(!music_audio.paused){
    music_audio.pause();
    }
  else
    music_audio.play();
}

towerofhanoi.play_sound_lost = function() {
	audio.setAttribute("src","sounds/gameover.wav");
    audio.play();
}
