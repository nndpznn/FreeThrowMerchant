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

  dateMap: function (dayInt) {
    dayInt = (dayInt + 1) % 7;
    let days = new Map();
    days.set(0, "Sunday");
    days.set(1, "Monday");
    days.set(2, "Tuesday");
    days.set(3, "Wednesday");
    days.set(4, "Thursday");
    days.set(5, "Friday");
    days.set(6, "Saturday");

    return days.get(dayInt);
  },
};
