enum Face {
    Kill = "Kill",
    Disrupt = "Disrupt",
    Push = "Push",
    Shield = "Shield",
    Blank = "Blank",
}

type Result = Map<Face, number>

abstract class Dice {
    result: Result = new Map
    constructor() {
        this.roll()
    }
    abstract faces(): Face[]
    roll() {
        let roll = this.faces()[Math.floor(Math.random() * 6)]
        this.result.set(roll, 1)
        console.debug(this.constructor.name, "rolled a", this.result)
        return this.result
    }
    reset() {
        this.result = new Map
        this.roll()
    }
    add(other: Dice): Result {
        return this.result // TODO
    }
}

export class NoDice extends Dice {
    faces() {return []}
}

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

let b = new BlackDice
b.roll
