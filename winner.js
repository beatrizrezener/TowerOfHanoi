goog.provide('_winner');
goog.require('towerofhanoi.result_winner_pro');
goog.require('towerofhanoi.Game');

function _winner() {

  this.game_verify = function game_verify(args){
    towers = args["towers"];
    to_tower = args["to_tower"];
    disks = args["disks"];
    return towers[to_tower].length == disks && to_tower != 0;
  }

  this.pro_verify  = function classic_verify(args){
    max_time = args["max_time"];
    alert("max_time:" + max_time);
    return max_time != 0;
  }

this.verifyWinner = function verifyWinner(args){
    if(Object.keys(args).length == 4){
        if(this.game_verify(args)){
          args_classic = {cont_moviments:args["cont_moviments"],disks:args["disks"]};
          towerofhanoi.result_winner_pro(args_classic);
        }
    }
    if(Object.keys(args).length == 5){
        if(this.game_verify(args)){
        args_pro = {cont_moviments:args["cont_moviments"],disks:args["disks"],act_time:args["act_time"]};
        towerofhanoi.result_winner_pro(args_pro);
    }
      }
      }
}
