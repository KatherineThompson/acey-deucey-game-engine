"use strict";

const _ = require("lodash");

function getAceyDeucey(diceRoll) {
    const aceyDeucey = {};
    if (diceRoll.length !== 3) {
        aceyDeucey.isAceyDeucey = false;
        return aceyDeucey;
    }
    
    aceyDeucey.hasOne = _.includes(diceRoll, 1);
    aceyDeucey.hasTwo = _.includes(diceRoll, 2);
    if (aceyDeucey.hasOne && aceyDeucey.hasTwo) {
        const doubles = diceRoll.slice(0);
        doubles.splice(_.indexOf(doubles, 1), 1);
        doubles.splice(_.indexOf(doubles, 2), 1);
        aceyDeucey.doublesVal = doubles[0]; 
        aceyDeucey.isAceyDeucey = true;
    } else {
        aceyDeucey.isAceyDeucey = false;
    }

    return aceyDeucey;
}

module.exports = getAceyDeucey;
