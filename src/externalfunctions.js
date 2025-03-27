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
    if (d.getMonth() < 9) {
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

  teamMap: function (abbrev) {
    let teams = new Map();
    teams.set("ATL", 1)
    teams.set("BOS", 2)
    teams.set("BKN", 3)
    teams.set("CHA", 4)
    teams.set("CHI", 5)
    teams.set("CLE", 6)
    teams.set("DAL", 7)
    teams.set("DEN", 8)
    teams.set("DET", 9)
    teams.set("GSW", 10)
    teams.set("HOU", 11)
    teams.set("IND", 12)
    teams.set("LAC", 13)
    teams.set("LAL", 14)
    teams.set("MEM", 15)
    teams.set("MIA", 16)
    teams.set("MIL", 17)
    teams.set("MIN", 18)
    teams.set("NOP", 19)
    teams.set("NYK", 20)
    teams.set("OKC", 21)
    teams.set("ORL", 22)
    teams.set("PHI", 23)
    teams.set("PHX", 24)
    teams.set("POR", 25)
    teams.set("SAC", 26)
    teams.set("SAS", 27)
    teams.set("TOR", 28)
    teams.set("UTA", 29)
    teams.set("WAS", 30)

    if (teams.has(abbrev)) {
      return teams.get(abbrev)
    }
    return 0
  }
};
