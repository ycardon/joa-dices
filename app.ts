import { Dice, Dices, BlackDice, RedDice, YellowDice, WhiteDice } from "./dice";

console.debug = (..._: any[]) => {}

let command = process.argv.slice(2)
let attack = new Dices
let defense = new Dices
let final = new Dices
let isDefence = false

command.map(arg => {
    let times = arg.substr(1)
    switch (arg.substring(0,1)) {

        case '-':
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
        
        default:
    }
})

console.log('attaque :', attack.result)
if (isDefence) {
    console.log('defense :', defense.result)
}


// HELPERS

function addAttackOrDefense(dice: Dice) {
    if (isDefence)
        defense.add(dice)
    else
        attack.add(dice)
}

function roll(dice: Dice, timesAsString: string): Dice {
    let n = parseInt(timesAsString)
    for (let i=1; i<n; i++) {
        dice.roll()
    }
    return dice
}
