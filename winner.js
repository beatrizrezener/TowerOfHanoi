goog.provide('_winner');
goog.provide('towerofhanoi.winner_design');
goog.require('towerofhanoi.Game');
goog.require('towerofhanoi.winner_design');

function _winner() {

  this.game_verify = function game_verify(args){
    towers = args["towers"];
    to_tower = args["to_tower"];
    disks = args["disks"];
    return towers[to_tower].length == disks && to_tower != 0;
  }

  this.pro_verify  = function classic_verify(args){
    max_time = args["max_time"];
    return max_time != 0;
  }

this.verifyWinner = function verifyWinner(args){
    if(Object.keys(args).length == 4){
        if(this.game_verify(args)){
          args_classic = {cont_moviments:args["cont_moviments"],disks:args["disks"]};
          towerofhanoi.winner_design(args_classic);
        }
    }
    if(Object.keys(args).length == 2){
      if(this.pro_verify && this.game_verify(args)){
        towerofhanoi.winner_design(args);
    }
  }
}
}
