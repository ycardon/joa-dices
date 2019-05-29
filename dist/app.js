"use strict";
// Yann CARDON 2019
// Time of Legend, Joan of Arc dice rolls
Object.defineProperty(exports, "__esModule", { value: true });
const dice_1 = require("./dice");
/** parse CLI and roll dices */
function parseCLI(command) {
    let attack = new dice_1.EmptyDice;
    let defence = new dice_1.EmptyDice;
    let final = new dice_1.EmptyDice;
    let isDefence = false;
    command.map(arg => {
        let times = arg.slice(0, -1);
        switch (arg.slice(-1)) {
            case '-':
            case '/':
            case ':':
                isDefence = true;
                break;
            case 'N':
            case 'n':
                addAttackOrDefense(roll(new dice_1.BlackDice, times));
                break;
            case 'R':
            case 'r':
                addAttackOrDefense(roll(new dice_1.RedDice, times));
                break;
            case 'J':
            case 'j':
                addAttackOrDefense(roll(new dice_1.YellowDice, times));
                break;
            case 'B':
            case 'b':
                addAttackOrDefense(roll(new dice_1.WhiteDice, times));
                break;
            case 'G':
            case 'g':
                addAttackOrDefense(roll(new dice_1.GiganticDice, times));
                break;
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
        let n = (timesAsString == '') ? 1 : parseInt(timesAsString);
        for (let i = 0; i < n; i++) {
            dice.roll();
        }
        return dice;
    }
}
exports.parseCLI = parseCLI;
// disable debug logs
console.debug = (..._) => { };
// parse CLI and roll dices
parseCLI(process.argv.slice(2));
