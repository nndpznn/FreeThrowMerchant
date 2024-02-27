module.exports = {
    // Stupid random number function.
    randomNum: function (chanceTotal) {
        let num = Math.floor(Math.random() * chanceTotal);
        return num;
    }
};
