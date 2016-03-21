"use strict";

function getAceyDeucey(diceRoll) {
    const aceyDeucey = {};
    diceRoll.forEach(function(roll) {
        if (roll === 1 && !aceyDeucey.hasOne) {
            aceyDeucey.hasOne = true; 
        } else if (roll === 2 && !aceyDeucey.hasTwo) {
            aceyDeucey.hasTwo = true;
        } else if (!aceyDeucey.doublesVal) {
            aceyDeucey.doublesVal = roll;
        } else {
            aceyDeucey.isAceyDeucey = false;
        }
    });
    return aceyDeucey;
}

module.exports = getAceyDeucey;
