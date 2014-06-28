goog.provide('_winner');
goog.provide('towerofhanoi.winner_design');
goog.require('towerofhanoi.Game');
goog.require('towerofhanoi.winner_design');

function _winner() {

  this.classic_verify = function classic_verify(args){
    towers = args["towers"];
    to_tower = args["to_tower"];
    disks = args["disks"];
    return towers[to_tower].length == disks && to_tower != 0;
  }

this.verifyWinner = function verifyWinner(args){
    if(Object.keys(args).length == 4){
        if(this.classic_verify(args)){
          towerofhanoi.winner_design(args["cont_moviments"],args["disks"]);
        }
    }
    if(Object.keys(args).length == 2){
    }
  }
}

