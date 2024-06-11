module.exports = {
  // Stupid random number function.
  randomNum: function (chanceTotal) {
    let num = Math.floor(Math.random() * chanceTotal);
    console.log(num);
    return num;
  },

  formatCurrentDate: function () {
    let zero = "0";
    let d = new Date();
    let year = d.getFullYear();

    let month = String(d.getMonth() + 1);
    if (d.getMonth() < 10) {
      month = zero.concat(month);
    }

    let day = String(d.getDate());
    if (d.getDate() < 10) {
      day = zero.concat(day);
    }

    return `${year}-${month}-${day}`;
  },
};
