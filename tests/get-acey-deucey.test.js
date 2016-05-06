"use strict";

const test = require("tape");
const aceyDeuceyGameEngine = require("../");
const getAceyDeucey = aceyDeuceyGameEngine.getAceyDeucey;

test("get acey deucey", t => {
    t.test("two dice", t => {
        t.plan(4);
        
        const aceyDeucey = {isAceyDeucey: false};
        const oneDiceRoll = [1, 6];
        t.deepEqual(getAceyDeucey(oneDiceRoll), aceyDeucey, "returns the correct object when two dice contain a 1");
        
        const twoDiceRoll = [4, 2];
        t.deepEqual(getAceyDeucey(twoDiceRoll), aceyDeucey, "returns the correct object when two dice contain a 2");
        
        const diceRoll = [5, 3];
        t.deepEqual(
            getAceyDeucey(diceRoll),
            aceyDeucey,
            "returns the correct object when two dice do not contain a 1 or 2"
        );
        const aceyDeuceyRoll = [1, 2];

        try {
            getAceyDeucey(aceyDeuceyRoll);
            t.fail("getAceyDeucey should have thrown an error for an acey deucey roll without doubles");
        } catch (error) {
            t.equal(error.diceRoll, aceyDeuceyRoll, "error.diceRoll is the same as diceRoll");
        }
    });
    
    t.test("three dice", t => {
        t.plan(2);
        
        const aceyDeuceyRoll = [3, 2, 1];
        const aceyDeucey = {
            hasOne: true,
            hasTwo: true,
            doublesVal: 3,
            isAceyDeucey: true
        };
        t.deepEqual(
            getAceyDeucey(aceyDeuceyRoll),
            aceyDeucey,
            "returns the correct object when three dice are an acey deucey"
        );        
        
        const threeDiceRoll = [4, 5, 6];
        const notAceyDeucey = {
            hasOne: false,
            hasTwo: false,
            isAceyDeucey: false
        };
        t.deepEqual(
            getAceyDeucey(threeDiceRoll),
            notAceyDeucey,
            "returns the correct object when three dice are not an acey deucey"
        );
        
    });
    
    t.test("four dice", t => {
        t.plan(2);
        
        const doublesRoll = [3, 3, 3, 3];
        const aceyDeucey = {isAceyDeucey: false};
        t.deepEqual(
            getAceyDeucey(doublesRoll),
            aceyDeucey,
            "returns the correct object when there are four dice with the same number"
        );
        
        const fourDiceRoll = [1, 2, 3, 4];
        t.deepEqual(
            getAceyDeucey(fourDiceRoll),
            aceyDeucey,
            "returns the correct object when there are four dice with the same number"
        );
    });
    t.test("impossible rolls", t => {
        t.plan(2);
        
        const oneDieRoll = [2];
        const aceyDeucey = {isAceyDeucey: false};
        t.deepEqual(
            getAceyDeucey(oneDieRoll),
            aceyDeucey,
            "returns the correct object when there is one die"
        );
        
        const tooManyDice = [1, 2, 3, 4, 5, 6];
        t.deepEqual(
            getAceyDeucey(tooManyDice),
            aceyDeucey,
            "returns the correct object when there are too many dice"
        );
    });
});