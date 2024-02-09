/**
 * Thank you to Under Ctrl on YouTube and taniarascia.com for guidance on Discord Bots and 
 * connecting to APIs with JavaScript.
 */

/**
 *  TO DO LIST:
 *      - Implement slash commands to accept player names as parameters, and return free throw stats.
 *      - Get better at making HTTP requests and all that.
 */

const { Client, IntentsBitField, InteractionCollector } = require('discord.js');
require('dotenv').config();
// let externalfunctions = require('./externalfunctions.js')
let XMLHttpRequest = require('xhr2').XMLHttpRequest;

let numTries = 1;
const RATE = 20;

// Stupid random number function.
function randomNum(chanceTotal) {
    let num = Math.floor(Math.random() * chanceTotal);
    console.log(num);
    return num;
}

// async function fetchFreeThrows() {
//     const response = await fetch('https://www.balldontlie.io/api/v1/teams');
//     const data = await response.json();
// }

let teamRequest = new XMLHttpRequest();
teamRequest.open('GET', 'https://www.balldontlie.io/api/v1/teams', true);

let pooleRequest = new XMLHttpRequest();
pooleRequest.open('GET', 'https://www.balldontlie.io/api/v1/season_averages?player_ids[]=30', true);

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
        IntentsBitField.Flags.MessageContent
    ],
});


ftm.on('ready', (f) => {

    ftm.channels.cache.get("806334669280247829").send(`${f.user.username} is at the line, baby.`);
    // ftm.channels.cache.get("806334669280247829").send("https://tenor.com/view/jordan-airball-missed-shot-basketball-free-throw-gif-13115757");
    console.log(`${f.user.username} is at the line, baby.`);
});

// EVENT LISTENER for messages being created.
ftm.on('messageCreate', (message) => {

    // console.log(message);

    if (message.author.bot) {
        return;
    }

    // if (message.channel != '806334669280247829') {
    //     return;
    // }

    if (message.author.username === 'crayollaaaa' || message.author.username === 'gloobus') {
        let roll = randomNum(RATE)
        if (roll === 1) {
            message.reply(`bingo! at a rate of 1 in ${RATE}, that took you ${numTries} tries.`);
            numTries = 1;
            console.log("did it.");
        } else {
            numTries++;
            // let stringRoll = roll.toString();
            // message.channel.send(stringRoll);
        }
    }

    if (message.content === 'ftm goat') {
        message.channel.send("The first player that comes up is Lonnie Walker IV.");
        return;
    }

    if (message.content.slice(0,3) == "ftm") {
        let messageWords = message.content.split(" ");

        let playerRequest = new XMLHttpRequest();
        playerRequest.open('GET', `https://www.balldontlie.io/api/v1/players?search=${messageWords[1]}`);

        playerRequest.onload = function () {
    
            let data = JSON.parse(this.response);
        
            if (playerRequest.status >= 200 && playerRequest.status < 400) {
                if (data.data.length > 0) {
                    message.channel.send(`The first player that comes up is ${data.data[0].first_name} ${data.data[0].last_name}.`);
                } else {
                    message.channel.send("Not found.");
                }
            } else {
                console.log('error');
            }
        
        }

        playerRequest.send();

        let statRequest = new XMLHttpRequest();
        return;
    }


    // Default responses.
    switch (message.content) {
        case 'help me ftm':
            message.reply(
                'Here\'s a list of commands you can use right now. \n - `we online?` checks the online status of FTM. \n- `ftm [player name]` returns the top search result for your entry in the nba player database. \n- `how many free throws does joel embiid have right now` gives the always-correct answer to that question. \n '
            );
            return;
        case 'how many free throws does joel embiid have right now':
            message.reply('too many.');
            return;
        case 'we online?':
            message.reply('yes, online.');
            return;
        case 'gimme teams':
            teamRequest.onload = function () {
    
                let data = JSON.parse(this.response);
            
                if (teamRequest.status >= 200 && teamRequest.status < 400) {
                    data.data.forEach((team) => {
                        message.channel.send(team.full_name);
                    })
                } else {
                    console.log('error');
                }
            
            }
            
            teamRequest.send();
            return;

        case 'poole fg':
            pooleRequest.onload = function () {

                let data = JSON.parse(this.response);

                if (pooleRequest.status >= 200 && pooleRequest.status < 400) {
                    let fgpct = data.data[0].fg_pct;
                    message.channel.send(`Jordan Poole has a total FG% of ${fgpct}.`);
                } else {
                    console.log('error');
                }
            }
            pooleRequest.send();
            return;
    }

});

ftm.login(process.env.TOKEN);