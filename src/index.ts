// Yann CARDON 2019
// Times of Legend, Joan of Arc dice rolls

import YAML from 'yaml'
import { BlackDice, RedDice, YellowDice, WhiteDice, attack } from "./dice";

document.getElementById('roll').onclick = () => {

    function value(id: string): number {
        return parseInt((document.getElementById(id) as HTMLInputElement).value) || 0
    }

    let attackDices = new Map
    attackDices.set(new BlackDice, value('black-att'))
    attackDices.set(new RedDice, value('red-att'))
    attackDices.set(new YellowDice, value('yellow-att'))
    attackDices.set(new WhiteDice, value('white-att'))

    let defenceDices = new Map
    defenceDices.set(new BlackDice, value('black-def'))
    defenceDices.set(new RedDice, value('red-def'))
    defenceDices.set(new YellowDice, value('yellow-def'))
    defenceDices.set(new WhiteDice, value('white-def'))

    document.getElementById('result').textContent = YAML.stringify(attack(attackDices, defenceDices))
}

