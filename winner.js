goog.provide('result_winner');
goog.require('towerofhanoi.result_winner_pro');
goog.require('towerofhanoi.Game');

function _winner() {

    this.game_verify = function game_verify(args) {
        towers = args["towers"];
        to_tower = args["to_tower"];
        disks = args["disks"];
        return towers[to_tower].length == disks && to_tower != 0;
    }

    this.verifyWinner = function verifyWinner(args) {
        if (Object.keys(args).length == 4) {
            if (this.game_verify(args)) {
                args_classic = {cont_moviments: args["cont_moviments"], disks: args["disks"]};
                towerofhanoi.result_winner_pro(args_classic);
            }
        }
        if (Object.keys(args).length == 6) {
            if (this.game_verify(args)) {
                lime.scheduleManager.unschedule( args["current_scene_game"].decreaseTime,  args["current_scene_game"]);
                args_pro = {cont_moviments: args["cont_moviments"], disks: args["disks"], act_time: args["act_time"]};
                towerofhanoi.result_winner_pro(args_pro);
            }
        }
    }
}
