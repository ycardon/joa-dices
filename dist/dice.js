"use strict";
// Yann CARDON 2019
Object.defineProperty(exports, "__esModule", { value: true });
/** base class for dices */
class Dice {
    constructor() {
        /** the dice roll result */
        this.result = new Map;
    }
    /** roll the dice once, if called multiple times then the results stack */
    roll() {
        let roll = this.faces[Math.floor(Math.random() * this.faces.length)];
        if (roll) // if the dice has faces 
            this.result.set(roll, (this.result.get(roll) || 0) + 1);
        console.debug(this.constructor.name, 'rolled a', this.result);
        return this;
    }
    /** reset the dice results */
    reset() {
        this.result.clear();
        return this;
    }
    /** add an other dice result (does not change the faces of the dice) */
    add(other) {
        Faces.map(f => {
            let sum = (this.result.get(f) || 0) + (other.result.get(f) || 0);
            if (sum != 0)
                this.result.set(f, sum);
        });
        console.debug(this.constructor.name, 'sum is', this.result);
        return this;
    }
    /** convert the dice to an object */
    toObject() {
        let dice = { type: this.constructor.name, result: {} };
        Array.from(this.result, ([face, number]) => {
            dice.result[face] = number;
        });
        return dice;
    }
    /** remove faces (blank, shields... for instance) from the dice result */
    filter(face) {
        this.result.delete(face);
        return this;
    }
    /** apply a defense roll on a attack roll (shields faces are canceling the hit faces) */
    applyDefense(defence) {
        this.lower(Face.Push, this.lower(Face.Disrupt, this.lower(Face.Kill, defence.result.get(Face.Shield) || 0)));
        return this;
    }
    /** lower the result @face value by the number of @shields then @returns the remaining shields */
    lower(face, shields) {
        let n = this.result.get(face);
        if (n)
            if (n - shields > 0) {
                this.result.set(face, n - shields);
                return 0;
            }
            else {
                this.result.delete(face);
                return shields - n;
            }
        return shields;
    }
}
exports.Dice = Dice;
/** an dice without faces, used for dice calculations */
class EmptyDice extends Dice {
    constructor() {
        super(...arguments);
        this.faces = [];
    }
}
exports.EmptyDice = EmptyDice;
// --- Time of Legend, Joan of Arc ---
/** the different dice faces */
var Face;
(function (Face) {
    Face["Kill"] = "\u2022 Tu\u00E9";
    Face["Disrupt"] = "\u2022 Hors combat";
    Face["Push"] = "\u2022 Recul";
    Face["Shield"] = "\u2022 Bouclier";
    Face["Blank"] = "\u2022 Vide";
    Face["Trample"] = "\u2022 Pi\u00E9tinement";
    Face["Death"] = "\u2022 Mort";
    Face["Rally"] = "\u2022 Ralliement";
    Face["DelayedRally"] = "\u2022 Ralliement diffe\u0301re\u0301";
})(Face = exports.Face || (exports.Face = {}));
/** an array of all the dice faces */
const Faces = Object.keys(Face).map(k => Face[k]);
/** a black combat dice */
class BlackDice extends Dice {
    constructor() {
        super(...arguments);
        this.faces = [
            Face.Kill,
            Face.Disrupt,
            Face.Shield,
            Face.Disrupt,
            Face.Shield,
            Face.Shield,
        ];
    }
}
exports.BlackDice = BlackDice;
/** a red combat dice */
class RedDice extends Dice {
    constructor() {
        super(...arguments);
        this.faces = [
            Face.Kill,
            Face.Disrupt,
            Face.Push,
            Face.Disrupt,
            Face.Kill,
            Face.Shield,
        ];
    }
}
exports.RedDice = RedDice;
/** a yellow combat dice */
class YellowDice extends Dice {
    constructor() {
        super(...arguments);
        this.faces = [
            Face.Blank,
            Face.Disrupt,
            Face.Push,
            Face.Blank,
            Face.Push,
            Face.Shield,
        ];
    }
}
exports.YellowDice = YellowDice;
/** a white combat dice */
class WhiteDice extends Dice {
    constructor() {
        super(...arguments);
        this.faces = [
            Face.Shield,
            Face.Blank,
            Face.Disrupt,
            Face.Push,
            Face.Disrupt,
            Face.Shield,
        ];
    }
}
exports.WhiteDice = WhiteDice;
/** a purple gigantic combat dice */
class GiganticDice extends Dice {
    constructor() {
        super(...arguments);
        this.faces = [
            Face.Kill,
            Face.Disrupt,
            Face.Disrupt,
            Face.Trample,
            Face.Trample,
            Face.Push,
        ];
    }
}
exports.GiganticDice = GiganticDice;
/** a doom dice */
class DoomDice extends Dice {
    constructor() {
        super(...arguments);
        this.faces = [
            Face.Disrupt,
            Face.Rally,
            Face.DelayedRally,
            Face.Rally,
            Face.Death,
            Face.Death,
        ];
    }
}
exports.DoomDice = DoomDice;
