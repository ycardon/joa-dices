// Yann CARDON 2019
// Times of Legend, Joan of Arc dice rolls

import { BlackDice, RedDice, YellowDice, WhiteDice, attack } from "./dice";

/** web dice wrapper */
export function attackWeb(
    blackAtt: number,
    redAtt: number,
    yellowAtt: number,
    whiteAtt: number,
    blackDef: number,
    redDef: number,
    yellowDef: number,
    whiteDef: number,    
): string {
    
    let attackDice = new Map
    attackDice.set(new BlackDice, blackAtt)
    attackDice.set(new RedDice, redAtt)
    attackDice.set(new YellowDice, yellowAtt)
    attackDice.set(new WhiteDice, whiteAtt)

    let defenceDice = new Map
    defenceDice.set(new BlackDice, blackDef)
    defenceDice.set(new RedDice, redDef)
    defenceDice.set(new YellowDice, yellowDef)
    defenceDice.set(new WhiteDice, whiteDef)

    return JSON.stringify(attack(attackDice, defenceDice))
}
