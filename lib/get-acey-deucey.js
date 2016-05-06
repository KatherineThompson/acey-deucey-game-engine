"use strict";

const _ = require("lodash");

function getAceyDeucey(diceRoll) {
    const aceyDeucey = {};
    if (diceRoll.length !== 3) {
        if (diceRoll.length === 2 && _.includes(diceRoll, 1) && _.includes(diceRoll, 2)) {
            const err = new Error("This acey deucey roll does not have a doubles value");
            err.diceRoll = diceRoll;
            throw err;
        }
        
        aceyDeucey.isAceyDeucey = false;
        return aceyDeucey;
    }
    
    aceyDeucey.hasOne = _.includes(diceRoll, 1);
    aceyDeucey.hasTwo = _.includes(diceRoll, 2);
    if (aceyDeucey.hasOne && aceyDeucey.hasTwo) {
        diceRoll.splice(_.indexOf(diceRoll, 1), 1);
        diceRoll.splice(_.indexOf(diceRoll, 2), 1);
        aceyDeucey.doublesVal = diceRoll[0]; 
        aceyDeucey.isAceyDeucey = true;
    } else {
        aceyDeucey.isAceyDeucey = false;
    }

    return aceyDeucey;
}

module.exports = getAceyDeucey;
