abstract class Dice {
    result: Map<Face, number> = new Map
    abstract faces(): Face[]
    constructor() {
        this.result = new Map
        this.roll()
    }
    roll(): Dice {
        let roll = this.faces()[Math.floor(Math.random() * this.faces.length)]
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
        let result = new Map
        AllFaces.map(f => {
            let sum = (this.result.get(f) || 0) + (other.result.get(f) || 0)
            if (sum != 0) result.set(f, sum)
        })
        this.result = result
        console.debug('dice sum is', this.result)
        return this
    }
}

class Dices extends Dice {
    faces() {return []}
}

// --- Time of Legend, Joan of Arc ---

enum Face {
    Kill = "Kill",
    Disrupt = "Disrupt",
    Push = "Push",
    Shield = "Shield",
    Blank = "Blank"
}

const AllFaces = [
    Face.Kill,
    Face.Disrupt,
    Face.Push,
    Face.Shield,
    Face.Blank,
]

class BlackDice extends Dice {
    faces() {return[
        Face.Kill,
        Face.Disrupt,
        Face.Shield,
        Face.Disrupt,
        Face.Shield,
        Face.Shield,
    ]}
}

class RedDice extends Dice {
    faces() {return[
        Face.Kill,
        Face.Disrupt,
        Face.Push,
        Face.Disrupt,
        Face.Kill,
        Face.Shield,
    ]}
}

class YellowDice extends Dice {
    faces() {return[
        Face.Blank,
        Face.Disrupt,
        Face.Push,
        Face.Blank,
        Face.Push,
        Face.Shield,
    ]}
}

class WhiteDice extends Dice {
    faces() {return[
        Face.Shield,
        Face.Blank,
        Face.Disrupt,
        Face.Push,
        Face.Disrupt,
        Face.Shield,
    ]}
}

// --- have fun ---

let b = new BlackDice
b.roll()
b.roll()
b.roll()
b.roll()
b.roll()
b.roll()
b.roll()
b.roll()
b.roll()
b.roll()
b.roll()

let set = new Dices
set.add(b)
set.add(b)
set.add(b)

new Dices().add(new BlackDice).add(new RedDice).add(new WhiteDice)