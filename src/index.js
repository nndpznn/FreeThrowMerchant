/* 
    Thank you to Under Ctrl on YouTube and taniarascia.com for guidance on Discord Bots and
    connecting to APIs with JavaScript.
*/

require('dotenv').config();
// var externalfunctions = require('./externalfunctions.js')
var XMLHttpRequest = require('xhr2').XMLHttpRequest;

var numTries = 1;
const RATE = 100;
// Stupid random number function.
function randomNum(chanceTotal) {
    var num = Math.floor(Math.random() * chanceTotal);
    console.log(num);
    return num;
}

const { Client, IntentsBitField, InteractionCollector } = require('discord.js');

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
    console.log(`${f.user.username} is at the line, baby.`)
});

// EVENT LISTENER for messages being created.
ftm.on('messageCreate', (message) => {

    if (message.author.bot) {
        return;
    }

    if (message.author.username === 'crayollaaaa') {
        if (randomNum(RATE) === 1) {
            message.reply(`WIN! at a rate of 1 in ${RATE}, that took you ${numTries} tries.`);
            numTries = 1;
            console.log("did it.");
        } else {
            numTries++;
        }
        return;
    }

    if (message.content === 'how many free throws does joel embiid have right now') {
        message.reply('too many.');
        // console.log(message);
    }
});

// async function fetchFreeThrows() {
//     const response = await fetch('https://www.balldontlie.io/api/v1/teams');
//     const data = await response.json();
// }

let request = new XMLHttpRequest();
request.open('GET', 'https://www.balldontlie.io/api/v1/teams', true);
request.onload = function () {

    var data = JSON.parse(this.response);

    if (request.status >= 200 && request.status < 400) {
        for (const team in data) {
            console.log(team.full_name)
        }
    } else {
        console.log('error');
    }

}

request.send();




ftm.login(process.env.TOKEN);