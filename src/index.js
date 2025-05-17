/**
 * Thank you to Under Ctrl on YouTube and taniarascia.com for guidance on Discord Bots and
 * connecting to APIs with JavaScript. Thank you to W3Schools for general guidance on JavaScript.
 * And thank you to my server for funny ideas and good times, always.
 */

/**
 *  TO DO LIST:
 *      - Implement commands to accept player names as parameters, and return free throw stats.
 *      - Get better at making HTTP requests and all that.
 */

const { Client, IntentsBitField, InteractionCollector } = require("discord.js");
require("dotenv").config();
const externalfunctions = require("./externalfunctions");
const {swampIzzon, swampIzzoff, swampIzwhat, findAdLib} = require("./adLib")

const XMLHttpRequest = require("xhr2").XMLHttpRequest;
const { CronJob } = require("cron");
const isOdd = require('is-odd');

const API_KEY = "0f065204-dba8-428a-9a9a-e51406aba334";

const ftm = new Client({
  // A set of permissions the bot needs to be able to respond to and interpret server events.
  intents: [
    // Server stuff.
    IntentsBitField.Flags.Guilds,
    // Server members.
    IntentsBitField.Flags.GuildMembers,
    // Server messages.
    IntentsBitField.Flags.GuildMessages,
    // Message content.
    IntentsBitField.Flags.MessageContent,
  ],
});

// const job = new CronJob("0 00 16 * * *", () => {
//   ftm.channels.cache.get("818687286161702954").send("HBD GRAYSON!!!!!");
// });

// job.start();

ftm.on("ready", async (f) => {
  console.log(`${f.user.username} is at the line, baby.`);
  // ftm.channels.cache.get("1249562113199050792").send("henlo");
  // ftm.channels.cache
  //   .get("806334669280247829")
  //   .send(`${f.user.username} is at the line, baby.`);
  // ftm.channels.cache
  //   .get("806334669280247829")
  //   .send(
  //     "https://tenor.com/view/jordan-airball-missed-shot-basketball-free-throw-gif-13115757",
  //   );
  // ftm.channels.cache
  //   .get("1208837446209380412")
  //   .send(
  //     "***PATCH NOTES*** \n- `ftm adlib` enables me to follow you around with swamp izzo-esque ad-libs. `ftm stop adlib` turns it off but why would you ever do that. \n- SWAMP IZZO!!",
  //   );
});

let swampCounter = 0
// EVENT LISTENER for messages being created.
ftm.on("messageCreate", (message) => {
  if (message.author.bot) {
    return;
  }

  let username = message.author.username
  let messageWords = message.content.split(" ");
  for (word in messageWords) {
    messageWords[word] = messageWords[word].toLowerCase();
  }

  if (message.content.startsWith("ftm adlib") || message.content.startsWith("ftma")) {
    swampIzzon(username)
  }

  if (message.content.startsWith("ftm stop adlib") || message.content.startsWith("ftmsa")) {
    swampIzzoff(username)
  }

  if (swampIzwhat(username)) {
    message.channel.send(findAdLib(message.content).toUpperCase() + "!")
  }

  if (
    messageWords.includes("mark") &&
    messageWords.includes("my") &&
    messageWords.includes("words")
  ) {
    message.pin(message);
    // message.unpin();
    message.channel.send("your words have been marked.");
    return;
  }

  if (
    messageWords.includes("lonnie") &&
    messageWords.includes("walker") &&
    messageWords.includes("iv")
  ) {
    message.channel.send("DID SOMEONE SAY GOAT?");
    return;
  }

  let responses = [
    "SWAMP!",
    "SWAMP!",
    "SWAMP!",
    "SWAMP IZZO!!"
  ];
  
  if (
    messageWords.includes("free") &&
    messageWords.includes("throw")
  ) {
    message.channel.send(
      responses[swampCounter]
    );
    swampCounter = (swampCounter + 1) % 4
    return;
  }

  // Static response set.
  const basicResponseMap = new Map();
  basicResponseMap.set("we online?", "yes, online.");
  basicResponseMap.set(
    "ftm help",
    "Here's a list of commands you can use right now. \n- `we online?` checks the online status of FTM. \n- `ftm doc` returns a link to the github documentation for this bot. \n- `ftm who is nolan` links to the personal site of yours truly. `akira` and `tyler` also work. \n- `ftmgames [team abbreviation(OPTIONAL)]` returns the next or current 5 games. including team abbreviation narrows search down to that team's games. \n- `ftmsearch [player name]` returns the top search result for your entry in the nba player database. \n- `how many free throws does shai have right now` gives the eternally correct answer to that question. \n- there are a few more hidden commands known only to a few ... but you'll see them around.",
  );
  basicResponseMap.set(
    "ftm suggest",
    "[let's see what nolan thinks...](https://forms.gle/zEnJa4haN3S7F53T9)",
  );
  basicResponseMap.set(
    "ftm doc",
    "[made with love and care, and nodejs](https://github.com/nndpznn/FreeThrowMerchant)",
  );
  basicResponseMap.set(
    "ftm who is nolan",
    "[thought you'd never ask.](https://nndpznn.github.io/)",
  );
  basicResponseMap.set(
    "ftm who is tyler",
    "[hire this man.](https://tyleranthonylee.myportfolio.com/)",
  );
  basicResponseMap.set(
    "ftm who is akira",
    "[this guy builds things.](https://akiratamaoki.myportfolio.com/home)",
  );
  basicResponseMap.set(
    "how many free throws does shai have right now",
    "too many.",
  );

  if (basicResponseMap.has(message.content)) {
    message.reply(basicResponseMap.get(message.content));
    return;
  }

  if (message.content.startsWith("ftm is") && message.content.endsWith("odd") && !isNaN(message.content.split(" ")[2])) {
    if (message.content.split(" ")[2].length > 5) {
      message.channel.send("i aint readin allat :skull:")
    } else if (isOdd(message.content.split(" ")[2])) {
      message.reply("yeah")
    } else {
      message.reply("nah")
    }
    return;
  }
  // Dynamic Response Set
  switch (message.content) {
    case "if no one got me i know ftm got me":
      if (message.author.username === "nolndn") {
        message.reply("yk we locked in :handshake:");
        return;
      } else if (message.author.username === "crayollaaaa") {
        message.reply("you aight");
        return;
      } else {
        message.reply("bro who are you");
        return;
      }
    case "ftm shut up":
      let responses = [
        "don't hmu again",
        "shut up lil bro",
        "really beefing with a DISCORD BOT dawg",
        "irrelevant",
        "ratio",
        "retire",
        "hang it up bruh",
        ":hyuga:",
        "don't come to the next catchup",
      ];

      message.channel.send(
        responses[externalfunctions.randomNum(responses.length)],
      );
      return;
    case "ftm market check":
      let stockResponses = [
        "bad",
        "good",
        "REALLY BAD!",
        "REALLY GOOD!",
        "[ask the goat](https://x.com/jimcramer)",
        "[ask the REAL goat](https://x.com/cramertracker)",
        "CANCUN!!!",
        "sell everything",
        "buy EVERYTHING",
        "you're cooked",
        "bad?",
        "good?",
        "i can't even look",
        "we are so back",
        "it is so over"
      ]

      message.channel.send(stockResponses[externalfunctions.randomNum(stockResponses.length)])

    // case "gimme teams":
    //   let teamRequest = new XMLHttpRequest();
    //   teamRequest.open("GET", "http://api.balldontlie.io/v1/teams", true);
    //   teamRequest.setRequestHeader("Authorization", API_KEY);

    //   teamRequest.onload = async function () {
    //     let data = await JSON.parse(this.response);

    //     if (teamRequest.status >= 200 && teamRequest.status < 400) {
    //       data.data.forEach((team) => {
    //         message.channel.send(team.full_name);
    //       });
    //     } else {
    //       console.log("error");
    //     }
    //   };

    //   teamRequest.send();
    //   return;

    case "ftmsearch goat":
      message.channel.send(
        "The first player that comes up is Lonnie Walker IV.",
      );
      message.channel.send(
        "https://cdn.discordapp.com/attachments/806334669280247829/1205389341816258590/mwrg9zxzswafyjznyrgk.png?ex=65d8314e&is=65c5bc4e&hm=166d4ccab60e9676aae3b766674a225c5d85fd8db0a5f66ce4aea54833ebc58f&",
      );
      return;
  }

  if (message.content.startsWith("ftmgames")) {

    let messageWords = message.content.split(" ")

    console.log(
      `received, sending for date ${externalfunctions.formatCurrentDate()}`,
    );
    
    let requestStr = `https://api.balldontlie.io/v1/games?start_date=${externalfunctions.formatCurrentDate()}`

    if (messageWords.length === 2) {
      let abbrev = messageWords[1].toUpperCase()

      if (abbrev === "DAL") {
        message.channel.send("season's over chief https://vxtwitter.com/TheNBACentel/status/1897021015601066094")
        return
      }
      requestStr = requestStr + `&team_ids[]=${externalfunctions.teamMap(abbrev)}`
    }
    let gameRequest = new XMLHttpRequest();
    gameRequest.open(
      "GET", requestStr
    );
    gameRequest.setRequestHeader("Authorization", API_KEY);

    gameRequest.onload = function () {
      let data = JSON.parse(this.response);

      // console.log(data.data)

      if (gameRequest.status >= 200 && gameRequest.status < 400) {
        if (data.data.length > 0) {
          message.channel.send(
            "Here are the next or current games happening this season.",
          );
          for (const nextGame of data.data.slice(0,5)) {
            message.channel.send(
            `__${externalfunctions.dateMap(new Date(nextGame.date).getDay())}, ${nextGame.date}__ \n**${nextGame.visitor_team.abbreviation} ${nextGame.visitor_team_score} - ${nextGame.home_team_score} ${nextGame.home_team.abbreviation}** \n${nextGame.status}${nextGame.time === null ? "" : ` - ${nextGame.time} remains.`}`,
          );
          }
        
        } else {
          message.channel.send(
            // "There are no future games for this season! Or Nolan messed up. Either way...",
            "where they goin chat",
          );
        }
      } else {
        console.log(`ERROR ${gameRequest.status}`);
      }
    };

    gameRequest.send();
    return;
  }

  // FTM SEARCH PLAYER FUNCTION
  let allowedChannels = [
    "806334669280247829", // #test-channel in TWCO
    "966932808369045514", // #sports in TWCO
    "768234528808370186", // #breneral in TWCO
    "1249562113199050792", // #nolan-testing in sophomores
  ];

  if (message.content.startsWith("ftmsearch")) {
    if (!allowedChannels.includes(message.channelId)) {
      message.channel.send(
        "uhhh... i don't think i'm allowed to talk sports in here.",
      );
      return;
    }

    let correctPlayer = "none";
    let messageWords = message.content.split(" ");

    let firstNameRequest = new XMLHttpRequest();
    firstNameRequest.open(
      "GET",
      `http://api.balldontlie.io/v1/players?search=${messageWords[1]}`,
    );
    firstNameRequest.setRequestHeader("Authorization", API_KEY);

    firstNameRequest.onload = function () {
      let data = JSON.parse(this.response);

      if (firstNameRequest.status >= 200 && firstNameRequest.status < 400) {
        if (data.data.length > 0) {
          if (messageWords.length > 2) {
            for (player in data.data) {
              if (
                data.data[player].last_name
                  .slice(0, messageWords[2].length)
                  .toLowerCase() === messageWords[2].toLowerCase()
              ) {
                correctPlayer = data.data[player];
                break;
              } else {
                continue;
              }
            }
          } else {
            correctPlayer = data.data[0];
          }
          if (correctPlayer != "none") {
            message.channel.send(
              `The first player that comes up is ${correctPlayer.first_name} ${correctPlayer.last_name} #${correctPlayer.jersey_number}, with NBA ID ${correctPlayer.id}.`,
            );
            message.channel.send(
              `He was last on the ${correctPlayer.team.full_name}. Height: ${correctPlayer.height}". Weight: ${correctPlayer.weight} lbs.`,
            );
            return;
          }
        }
        message.channel.send(
          "Sorry, we couldn't find anyone. Did you spell something wrong? You know our budget's not big enough to correct that for you.",
        );
      } else {
        console.log("error");
      }
    };

    firstNameRequest.send();
    return;
  }
});

ftm.login(process.env.TOKEN);
