import { Dice, EmptyDice, BlackDice, RedDice, YellowDice, WhiteDice, Face, GiganticDice } from "./dice";

console.debug = (..._: any[]) => {}

let command = process.argv.slice(2)

let attack = new EmptyDice
let defense = new EmptyDice
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
            
        default:
            console.error('bad syntax')
            process.exit(-1)
    }
})

console.log('attaque :', attack.result)

if (isDefence) {
    console.log('defense :', defense.result)
    final.add(attack).applyDefense(defense).filter(Face.Blank).filter(Face.Shield)
    console.log('> final :', final.result)    
}


// HELPERS

function addAttackOrDefense(dice: Dice) {
    if (isDefence) defense.add(dice)
    else attack.add(dice)
}

function roll(dice: Dice, timesAsString: string): Dice {
    let n = (timesAsString == '') ? 1 : parseInt(timesAsString)
    for (let i=0; i<n; i++) {
        dice.roll()
    }
    return dice
}
