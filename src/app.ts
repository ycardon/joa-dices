// Yann CARDON 2019
// Time of Legend, Joan of Arc dice rolls

import { Dice, EmptyDice, BlackDice, RedDice, YellowDice, WhiteDice, Face, GiganticDice, DoomDice } from "./dice";

export const isFrenchUI = true

/** parse CLI and roll dices */
export function parseCLI(command: string[]) {

    let attack = new EmptyDice
    let defence = new EmptyDice
    let final = new EmptyDice
    let isDefence = false

    command.map(arg => {
        let times = arg.slice(0, -1)
        switch (arg.slice(-1)) {

            // defense switch
            case '-':
            case '/':
            case ':':
                isDefence = true
                break

            // [N]oir
            case 'N':
            case 'n':
                addAttackOrDefense(roll(new BlackDice, times))
                break

            // [R]ouge or [R]ed
            case 'R':
            case 'r':
                addAttackOrDefense(roll(new RedDice, times))
                break

            // [J]aune or [Y]ellow
            case 'J':
            case 'j':
            case 'Y':
            case 'y':
                addAttackOrDefense(roll(new YellowDice, times))
                break

            // [B]lanc or [B]lack
            case 'B':
            case 'b':
                if (isFrenchUI) addAttackOrDefense(roll(new WhiteDice, times))
                else addAttackOrDefense(roll(new BlackDice, times))
                break

            // [W]hite
            case 'W':
            case 'w':
                addAttackOrDefense(roll(new WhiteDice, times))
                break
            
            // [G]igantesque or [G]igantic
            case 'G':
            case 'g':
                addAttackOrDefense(roll(new GiganticDice, times))
                break
            
            // [D]estin or [D]oom
            case 'D':
            case 'd':
                addAttackOrDefense(roll(new DoomDice, times))
                break

            default:
                console.error('bad syntax')
                process.exit(-1)
        }
    })

    console.log('attaque', attack.toObject().result)

    if (isDefence) {
        console.log('défense', defence.toObject().result)
        final.add(attack).applyDefense(defence).filter(Face.Blank).filter(Face.Shield)
        console.log('> final', final.toObject().result)    
    }

    /** add the dice result either to attack or defence according to the CLI context */
    function addAttackOrDefense(dice: Dice) {
        if (isDefence) defence.add(dice)
        else attack.add(dice)
    }

    /** roll the given dice several times */
    function roll(dice: Dice, timesAsString: string): Dice {
        let n = (timesAsString == '') ? 1 : parseInt(timesAsString)
        for (let i=0; i<n; i++) {
            dice.roll()
        }
        return dice
    }
}

// disable debug logs
console.debug = (..._: any[]) => {}

// parse CLI and roll dices
parseCLI(process.argv.slice(2))
