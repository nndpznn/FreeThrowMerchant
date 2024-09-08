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
let externalfunctions = require("./externalfunctions");
let XMLHttpRequest = require("xhr2").XMLHttpRequest;
const { CronJob } = require("cron");

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

// const job = new CronJob("0 00 00 * * *", () => {
//   ftm.channels.cache.get("818687286161702954").send("happy birthday nolan!");
// });

// job.start();

ftm.on("ready", (f) => {
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
  //     "***PATCH NOTES*** \n- modifying personal link commands to embed the link in text(cleaner) \n- new `ftm suggest` command for the new google form!",
  //   );
});

// EVENT LISTENER for messages being created.
ftm.on("messageCreate", (message) => {
  if (message.author.bot) {
    return;
  }

  // console.log(message);
  let messageWords = message.content.split(" ");
  for (word in messageWords) {
    messageWords[word] = messageWords[word].toLowerCase();
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

  // Static response set.
  const basicResponseMap = new Map();
  basicResponseMap.set("we online?", "yes, online.");
  basicResponseMap.set(
    "ftm help",
    "Here's a list of commands you can use right now. \n- `we online?` checks the online status of FTM. \n- `ftm doc` returns a link to the github documentation for this bot. \n- `ftm who is nolan` links to the personal site of yours truly. `akira` and `tyler` also work. \n- `ftmsearch [player name]` returns the top search result for your entry in the nba player database. \n- `how many free throws does joel embiid have right now` gives the eternally correct answer to that question. \n- there are a few more hidden commands known only to a few ... but you'll see them around.",
  );
  basicResponseMap.set(
    "ftm suggest",
    "[let's see what nolan thinks...](https://forms.gle/zEnJa4haN3S7F53T9)",
  );
  basicResponseMap.set(
    "ftm doc",
    "[made with love and care <3 and nodejs](https://github.com/nndpznn/FreeThrowMerchant)",
  );
  basicResponseMap.set(
    "ftm what day is it",
    `${externalfunctions.formatCurrentDate()}.`,
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
    "[this guy builds things.](https://akiraytamaoki.wixsite.com/portfolio)",
  );
  basicResponseMap.set(
    "how many free throws does joel embiid have right now",
    "too many.",
  );

  if (basicResponseMap.has(message.content)) {
    message.reply(basicResponseMap.get(message.content));
    return;
  }

  // Dynamic Response Set
  switch (message.content) {
    case "if no one got me i know ftm got me":
      if (message.author.username === "heynoln") {
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
        "<:hyuga:1125347223249616977>",
        "don't come to the next catchup",
      ];

      message.channel.send(
        responses[externalfunctions.randomNum(responses.length)],
      );
      return;

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

    case "ftm goat":
      message.channel.send(
        "The first player that comes up is Lonnie Walker IV.",
      );
      message.channel.send(
        "https://cdn.discordapp.com/attachments/806334669280247829/1205389341816258590/mwrg9zxzswafyjznyrgk.png?ex=65d8314e&is=65c5bc4e&hm=166d4ccab60e9676aae3b766674a225c5d85fd8db0a5f66ce4aea54833ebc58f&",
      );
      return;
  }

  if (message.content === "ftmgames") {
    console.log(
      `received, sending for date ${externalfunctions.formatCurrentDate()}`,
    );
    //
    let gameRequest = new XMLHttpRequest();
    gameRequest.open(
      "GET",
      `https://api.balldontlie.io/v1/games?start_date=${externalfunctions.formatCurrentDate()}`,
    );
    gameRequest.setRequestHeader("Authorization", API_KEY);

    gameRequest.onload = function () {
      let data = JSON.parse(this.response);

      if (gameRequest.status >= 200 && gameRequest.status < 400) {
        if (data.data.length > 0) {
          let nextGame = data.data[0];
          message.channel.send(
            "Here is the next or current game happening this season.",
          );
          message.channel.send(
            `__${externalfunctions.dateMap(new Date(nextGame.date).getDay())}, ${nextGame.date}__ \n**${nextGame.visitor_team.abbreviation} ${nextGame.visitor_team_score} - ${nextGame.home_team_score} ${nextGame.home_team.abbreviation}** \n${nextGame.status}${nextGame.time === null ? "" : ` - ${nextGame.time} remains.`}`,
          );
        } else {
          message.channel.send(
            "There are no future games for this season! Or Nolan messed up. Either way...",
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
