"use strict";
// Yann CARDON 2019
// Time of Legend, Joan of Arc dice rolls
Object.defineProperty(exports, "__esModule", { value: true });
var dice_1 = require("./dice");
exports.isFrenchUI = true;
/** parse CLI and roll dices */
function parseCLI(command) {
    var attackDice = new Map;
    var defenceDice = new Map;
    var isDefence = false;
    command.map(function (arg) {
        var times = parseInt(arg.slice(0, -1));
        switch (arg.slice(-1)) {
            // defense switch
            case '-':
            case '/':
            case ':':
                isDefence = true;
                break;
            // [N]oir
            case 'N':
            case 'n':
                addAttackOrDefense(new dice_1.BlackDice, times);
                break;
            // [R]ouge or [R]ed
            case 'R':
            case 'r':
                addAttackOrDefense(new dice_1.RedDice, times);
                break;
            // [J]aune or [Y]ellow
            case 'J':
            case 'j':
            case 'Y':
            case 'y':
                addAttackOrDefense(new dice_1.YellowDice, times);
                break;
            // [B]lanc or [B]lack
            case 'B':
            case 'b':
                if (exports.isFrenchUI)
                    addAttackOrDefense(new dice_1.WhiteDice, times);
                else
                    addAttackOrDefense(new dice_1.BlackDice, times);
                break;
            // [W]hite
            case 'W':
            case 'w':
                addAttackOrDefense(new dice_1.WhiteDice, times);
                break;
            // [G]igantesque or [G]igantic
            case 'G':
            case 'g':
                addAttackOrDefense(new dice_1.GiganticDice, times);
                break;
            // [D]estin or [D]oom
            case 'D':
            case 'd':
                addAttackOrDefense(new dice_1.DoomDice, times);
                break;
            default:
                console.error('bad syntax');
                process.exit(-1);
        }
    });
    console.log(dice_1.attack(attackDice, defenceDice));
    /** add the dice result either to attack or defence according to the CLI context */
    function addAttackOrDefense(dice, times) {
        if (isDefence)
            defenceDice.set(dice, times + (defenceDice.get(dice) || 0));
        else
            attackDice.set(dice, times + (attackDice.get(dice) || 0));
    }
}
exports.parseCLI = parseCLI;
// disable debug logs
console.debug = function () {
    var _ = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        _[_i] = arguments[_i];
    }
};
// parse CLI and roll dices
parseCLI(process.argv.slice(2));
