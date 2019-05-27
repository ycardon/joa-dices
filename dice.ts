/**
 * DICE by Yann Cardon, 2019
 */
export abstract class Dice {
    result: Map<Face, number> = new Map
    abstract faces(): Face[]
    constructor() {
        this.result = new Map
        this.roll()
    }
    roll(): Dice {
        let roll = this.faces()[Math.floor(Math.random() * this.faces().length)]
        if (roll) // if the dice has faces 
            this.result.set(roll, (this.result.get(roll) || 0) + 1)
        console.debug(this.constructor.name, "rolled a", this.result)
        return this
    }
    reset(): Dice {
        this.result = new Map
        this.roll()
        return this
    }
    add(other: Dice): Dice {
        AllFaces.map(f => {
            let sum = (this.result.get(f) || 0) + (other.result.get(f) || 0)
            if (sum != 0) this.result.set(f, sum)
        })
        console.debug(this.constructor.name, 'sum is', this.result)
        return this
    }
    show() {
        let show = this.constructor.name + ': '
        Array.from(this.result, ([face, number]) => {
            show += face + '=' + number + ' '
        })  
        console.debug(show)
        return show
    }
}

export class Dices extends Dice {
    faces() {return []}
}

// --- Time of Legend, Joan of Arc ---

enum Face {
    Kill = "Tué",
    Disrupt = "Hors combat",
    Push = "Poussé",
    Shield = "Bouclier",
    Blank = "Vide"
}

const AllFaces = [
    Face.Kill,
    Face.Disrupt,
    Face.Push,
    Face.Shield,
    Face.Blank,
]

export class BlackDice extends Dice {
    faces() {return[
        Face.Kill,
        Face.Disrupt,
        Face.Shield,
        Face.Disrupt,
        Face.Shield,
        Face.Shield,
    ]}
}

export class RedDice extends Dice {
    faces() {return[
        Face.Kill,
        Face.Disrupt,
        Face.Push,
        Face.Disrupt,
        Face.Kill,
        Face.Shield,
    ]}
}

export class YellowDice extends Dice {
    faces() {return[
        Face.Blank,
        Face.Disrupt,
        Face.Push,
        Face.Blank,
        Face.Push,
        Face.Shield,
    ]}
}

export class WhiteDice extends Dice {
    faces() {return[
        Face.Shield,
        Face.Blank,
        Face.Disrupt,
        Face.Push,
        Face.Disrupt,
        Face.Shield,
    ]}
}
