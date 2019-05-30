// Yann CARDON 2019
// Times of Legend, Joan of Arc dice rolls

import YAML from 'yaml'
import { BlackDice, RedDice, YellowDice, WhiteDice, attack } from "./dice";

document.getElementById('roll').onclick = () => {

    function value(id: string): number {
        return parseInt((document.getElementById(id) as HTMLInputElement).value) || 0
    }

    let attackDice = new Map
    attackDice.set(new BlackDice, value('black-att'))
    attackDice.set(new RedDice, value('red-att'))
    attackDice.set(new YellowDice, value('yellow-att'))
    attackDice.set(new WhiteDice, value('white-att'))

    let defenceDice = new Map
    defenceDice.set(new BlackDice, value('black-def'))
    defenceDice.set(new RedDice, value('red-def'))
    defenceDice.set(new YellowDice, value('yellow-def'))
    defenceDice.set(new WhiteDice, value('white-def'))

    document.getElementById('result').textContent = YAML.stringify(attack(attackDice, defenceDice))
}

