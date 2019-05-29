"use strict";
// Yann CARDON 2019
// Time of Legend, Joan of Arc dice rolls
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/** base class for dices */
var Dice = /** @class */ (function () {
    function Dice() {
        /** the dice roll result */
        this.result = new Map;
    }
    /** roll the dice once, if called multiple times then the results stack */
    Dice.prototype.roll = function () {
        var roll = this.faces[Math.floor(Math.random() * this.faces.length)];
        if (roll) // if the dice has faces 
            this.result.set(roll, (this.result.get(roll) || 0) + 1);
        console.debug(this.constructor.name, 'rolled a', this.result);
        return this;
    };
    /** reset the dice results */
    Dice.prototype.reset = function () {
        this.result.clear();
        return this;
    };
    /** add an other dice result (does not change the faces of the dice) */
    Dice.prototype.add = function (other) {
        var _this = this;
        Faces.map(function (f) {
            var sum = (_this.result.get(f) || 0) + (other.result.get(f) || 0);
            if (sum != 0)
                _this.result.set(f, sum);
        });
        console.debug(this.constructor.name, 'sum is', this.result);
        return this;
    };
    /** convert the dice to an object, useful for logging */
    Dice.prototype.toObject = function () {
        var dice = { type: this.constructor.name, result: {} };
        Array.from(this.result, function (_a) {
            var face = _a[0], number = _a[1];
            dice.result[face] = number;
        });
        return dice;
    };
    /** remove faces (blank, shields... for instance) from the dice result */
    Dice.prototype.filter = function (face) {
        this.result.delete(face);
        return this;
    };
    /** apply a defense roll on a attack roll (shields faces are canceling the hit faces) */
    Dice.prototype.applyDefense = function (defence) {
        this.lower(Face.Push, this.lower(Face.Disrupt, this.lower(Face.Kill, defence.result.get(Face.Shield) || 0)));
        return this;
    };
    /** lower the result @face value by the number of @shields then @return the remaining shields */
    Dice.prototype.lower = function (face, shields) {
        var n = this.result.get(face);
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
    };
    return Dice;
}());
exports.Dice = Dice;
/** an dice without faces, used for dice calculations */
var EmptyDice = /** @class */ (function (_super) {
    __extends(EmptyDice, _super);
    function EmptyDice() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.faces = [];
        return _this;
    }
    return EmptyDice;
}(Dice));
exports.EmptyDice = EmptyDice;
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
var Faces = Object.keys(Face).map(function (k) { return Face[k]; });
/** a black combat dice */
var BlackDice = /** @class */ (function (_super) {
    __extends(BlackDice, _super);
    function BlackDice() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.faces = [
            Face.Kill,
            Face.Disrupt,
            Face.Shield,
            Face.Disrupt,
            Face.Shield,
            Face.Shield,
        ];
        return _this;
    }
    return BlackDice;
}(Dice));
exports.BlackDice = BlackDice;
/** a red combat dice */
var RedDice = /** @class */ (function (_super) {
    __extends(RedDice, _super);
    function RedDice() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.faces = [
            Face.Kill,
            Face.Disrupt,
            Face.Push,
            Face.Disrupt,
            Face.Kill,
            Face.Shield,
        ];
        return _this;
    }
    return RedDice;
}(Dice));
exports.RedDice = RedDice;
/** a yellow combat dice */
var YellowDice = /** @class */ (function (_super) {
    __extends(YellowDice, _super);
    function YellowDice() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.faces = [
            Face.Blank,
            Face.Disrupt,
            Face.Push,
            Face.Blank,
            Face.Push,
            Face.Shield,
        ];
        return _this;
    }
    return YellowDice;
}(Dice));
exports.YellowDice = YellowDice;
/** a white combat dice */
var WhiteDice = /** @class */ (function (_super) {
    __extends(WhiteDice, _super);
    function WhiteDice() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.faces = [
            Face.Shield,
            Face.Blank,
            Face.Disrupt,
            Face.Push,
            Face.Disrupt,
            Face.Shield,
        ];
        return _this;
    }
    return WhiteDice;
}(Dice));
exports.WhiteDice = WhiteDice;
/** a purple gigantic combat dice */
var GiganticDice = /** @class */ (function (_super) {
    __extends(GiganticDice, _super);
    function GiganticDice() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.faces = [
            Face.Kill,
            Face.Disrupt,
            Face.Disrupt,
            Face.Trample,
            Face.Trample,
            Face.Push,
        ];
        return _this;
    }
    return GiganticDice;
}(Dice));
exports.GiganticDice = GiganticDice;
/** a doom dice */
var DoomDice = /** @class */ (function (_super) {
    __extends(DoomDice, _super);
    function DoomDice() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.faces = [
            Face.Disrupt,
            Face.Rally,
            Face.DelayedRally,
            Face.Rally,
            Face.Death,
            Face.Death,
        ];
        return _this;
    }
    return DoomDice;
}(Dice));
exports.DoomDice = DoomDice;
