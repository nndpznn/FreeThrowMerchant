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

ftm.on("ready", (f) => {
  console.log(`${f.user.username} is at the line, baby.`);
  // ftm.channels.cache.get("806334669280247829").send(`${f.user.username} is at the line, baby.`);
  // ftm.channels.cache.get("806334669280247829").send("https://tenor.com/view/jordan-airball-missed-shot-basketball-free-throw-gif-13115757");
  // ftm.channels.cache
  //   .get("1208837446209380412")
  //   .send(
  //     "***PATCH NOTES*** \n- listing more commands on `help me ftm` \n- 'mark my words' now actually marks words. please don't abuse this.",
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

  // Default responses.
  switch (message.content) {
    case "we online?":
      message.reply("yes, online.");
      return;

    case "help me ftm":
      message.channel.send(
        "Here's a list of commands you can use right now. \n- `we online?` checks the online status of FTM. \n- `doc ftm` returns a link to the github documentation for this bot. \n- `ftm who's nolan` links to the personal site of yours truly. \n- `ftm [player name]` returns the top search result for your entry in the nba player database. \n- `gimme teams` returns a poorly-thought-out list of every team in the NBA. i'm currently using it to test a future feature, but go ahead and abuse it anyways. \n- `how many free throws does joel embiid have right now` gives the eternally correct answer to that question. \n- there are a few more hidden commands known only to a few ... but you'll see them around.",
      );
      return;

    case "doc ftm":
      message.channel.send(
        "made with love and care <3 and nodejs \n https://github.com/nndpznn/FreeThrowMerchant",
      );
      return;

    case "ftm who's nolan":
      message.channel.send(
        "thought you'd never ask. \n https://nndpznn.github.io/",
      );
      return;

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

    case "how many free throws does joel embiid have right now":
      message.reply("too many.");
      return;

    case "ftm shut up":
      let responses = [
        "nah you shut up",
        "don't hmu again",
        "shut up lil bro",
        "really beefing with a DISCORD BOT dawg",
        "irrelevant",
        "ratio",
        "retire",
        "hang it up bruh",
      ];

      message.channel.send(
        responses[externalfunctions.randomNum(responses.length)],
      );
      return;

    case "gimme teams":
      let teamRequest = new XMLHttpRequest();
      teamRequest.open("GET", "http://api.balldontlie.io/v1/teams", true);
      teamRequest.setRequestHeader("Authorization", API_KEY);

      teamRequest.onload = async function () {
        let data = await JSON.parse(this.response);

        if (teamRequest.status >= 200 && teamRequest.status < 400) {
          data.data.forEach((team) => {
            message.channel.send(team.full_name);
          });
        } else {
          console.log("error");
        }
      };

      teamRequest.send();
      return;

    case "ftm goat":
      message.channel.send(
        "The first player that comes up is Lonnie Walker IV.",
      );
      message.channel.send(
        "https://cdn.discordapp.com/attachments/806334669280247829/1205389341816258590/mwrg9zxzswafyjznyrgk.png?ex=65d8314e&is=65c5bc4e&hm=166d4ccab60e9676aae3b766674a225c5d85fd8db0a5f66ce4aea54833ebc58f&",
      );
      return;
  }

  // FTM SEARCH PLAYER FUNCTION
  if (message.content.slice(0, 3).toLowerCase() == "ftm") {
    if (
      message.channel != "806334669280247829" &&
      message.channel != "966932808369045514" &&
      message.channel != "768234528808370186"
    ) {
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
          for (player in data.data) {
            console.log(data.data[player].last_name);
            if (messageWords.length > 2) {
              if (
                data.data[player].last_name
                  .slice(0, messageWords[2].length)
                  .toLowerCase() === messageWords[2].toLowerCase()
              ) {
                correctPlayer = data.data[player];
                console.log("correct player found!");
                break;
              } else {
                continue;
              }
            } else {
              correctPlayer = data.data[0];
            }
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
    // let statRequest = new XMLHttpRequest();
    return;
  }
});

ftm.login(process.env.TOKEN);
