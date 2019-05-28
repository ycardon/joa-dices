import { Dice, EmptyDice, BlackDice, RedDice, YellowDice, WhiteDice, Face, GiganticDice, DoomDice } from "./dice";

/** parse CLI and roll dices */
export function parseCLI(command: string[]) {

    let attack = new EmptyDice
    let defence = new EmptyDice
    let final = new EmptyDice
    let isDefence = false

    command.map(arg => {
        let times = arg.slice(0, -1)
        switch (arg.slice(-1)) {

            case '-':
            case '/':
            case ':':
                isDefence = true
                break

            case 'N':
            case 'n':
                addAttackOrDefense(roll(new BlackDice, times))
                break

            case 'R':
            case 'r':
                addAttackOrDefense(roll(new RedDice, times))
                break

            case 'J':
            case 'j':
                addAttackOrDefense(roll(new YellowDice, times))
                break

            case 'B':
            case 'b':
                addAttackOrDefense(roll(new WhiteDice, times))
                break

            case 'G':
            case 'g':
                addAttackOrDefense(roll(new GiganticDice, times))
                break
            
            case 'D':
            case 'd':
                addAttackOrDefense(roll(new DoomDice, times))
                break

            default:
                console.error('bad syntax')
                process.exit(-1)
        }
    })

    console.log('attaque :', attack.toObject().result)

    if (isDefence) {
        console.log('défense :', defence.toObject().result)
        final.add(attack).applyDefense(defence).filter(Face.Blank).filter(Face.Shield)
        console.log('> final :', final.toObject().result)    
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
