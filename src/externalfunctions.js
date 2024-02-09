module.exports = {
    // Stupid random number function.
    randomNum: function (chanceTotal) {
        let num = Math.floor(Math.random() * chanceTotal);
        console.log(num);
        return num;
    }
};