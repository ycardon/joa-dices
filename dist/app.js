"use strict";
// Yann CARDON 2019
// Time of Legend, Joan of Arc dice rolls
Object.defineProperty(exports, "__esModule", { value: true });
var dice_1 = require("./dice");
exports.isFrenchUI = true;
/** parse CLI and roll dices */
function parseCLI(command) {
    var attack = new dice_1.EmptyDice;
    var defence = new dice_1.EmptyDice;
    var final = new dice_1.EmptyDice;
    var isDefence = false;
    command.map(function (arg) {
        var times = arg.slice(0, -1);
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
                addAttackOrDefense(roll(new dice_1.BlackDice, times));
                break;
            // [R]ouge or [R]ed
            case 'R':
            case 'r':
                addAttackOrDefense(roll(new dice_1.RedDice, times));
                break;
            // [J]aune or [Y]ellow
            case 'J':
            case 'j':
            case 'Y':
            case 'y':
                addAttackOrDefense(roll(new dice_1.YellowDice, times));
                break;
            // [B]lanc or [B]lack
            case 'B':
            case 'b':
                if (exports.isFrenchUI)
                    addAttackOrDefense(roll(new dice_1.WhiteDice, times));
                else
                    addAttackOrDefense(roll(new dice_1.BlackDice, times));
                break;
            // [W]hite
            case 'W':
            case 'w':
                addAttackOrDefense(roll(new dice_1.WhiteDice, times));
                break;
            // [G]igantesque or [G]igantic
            case 'G':
            case 'g':
                addAttackOrDefense(roll(new dice_1.GiganticDice, times));
                break;
            // [D]estin or [D]oom
            case 'D':
            case 'd':
                addAttackOrDefense(roll(new dice_1.DoomDice, times));
                break;
            default:
                console.error('bad syntax');
                process.exit(-1);
        }
    });
    console.log('attaque', attack.toObject().result);
    if (isDefence) {
        console.log('défense', defence.toObject().result);
        final.add(attack).applyDefense(defence).filter(dice_1.Face.Blank).filter(dice_1.Face.Shield);
        console.log('> final', final.toObject().result);
    }
    /** add the dice result either to attack or defence according to the CLI context */
    function addAttackOrDefense(dice) {
        if (isDefence)
            defence.add(dice);
        else
            attack.add(dice);
    }
    /** roll the given dice several times */
    function roll(dice, timesAsString) {
        var n = (timesAsString == '') ? 1 : parseInt(timesAsString);
        for (var i = 0; i < n; i++) {
            dice.roll();
        }
        return dice;
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
