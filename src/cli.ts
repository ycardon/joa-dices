// Yann CARDON 2019
// Times of Legend, Joan of Arc dice rolls

import { Dice, EmptyDice, BlackDice, RedDice, YellowDice, WhiteDice, Face, GiganticDice, DoomDice, attack } from "./dice";

export const isFrenchUI = true

/** parse CLI and roll dices */
export function parseCLI(command: string[]) {

    let attackDice = new Map
    let defenceDice = new Map
    let isDefence = false

    command.map(arg => {
        let times = parseInt(arg.slice(0, -1))
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
                addAttackOrDefense(new BlackDice, times)
                break

            // [R]ouge or [R]ed
            case 'R':
            case 'r':
                addAttackOrDefense(new RedDice, times)
                break

            // [J]aune or [Y]ellow
            case 'J':
            case 'j':
            case 'Y':
            case 'y':
                addAttackOrDefense(new YellowDice, times)
                break

            // [B]lanc or [B]lack
            case 'B':
            case 'b':
                if (isFrenchUI) addAttackOrDefense(new WhiteDice, times)
                else addAttackOrDefense(new BlackDice, times)
                break

            // [W]hite
            case 'W':
            case 'w':
                addAttackOrDefense(new WhiteDice, times)
                break
            
            // [G]igantesque or [G]igantic
            case 'G':
            case 'g':
                addAttackOrDefense(new GiganticDice, times)
                break
            
            // [D]estin or [D]oom
            case 'D':
            case 'd':
                addAttackOrDefense(new DoomDice, times)
                break

            default:
                console.error('bad syntax')
                process.exit(-1)
        }
    })

    console.log(attack(attackDice, defenceDice))

    /** add the dice result either to attack or defence according to the CLI context */
    function addAttackOrDefense(dice: Dice, times: number) {
        if (isDefence) defenceDice.set(dice, times + (defenceDice.get(dice) || 0))
        else attackDice.set(dice, times + (attackDice.get(dice) || 0))
    }
}

// disable debug logs
console.debug = (..._: any[]) => {}

// parse CLI and roll dices
parseCLI(process.argv.slice(2))
