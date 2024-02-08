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
const RATE = 100;

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

let request = new XMLHttpRequest();
request.open('GET', 'https://www.balldontlie.io/api/v1/teams', true);



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

    switch (message.content) {
        case 'how many free throws does joel embiid have right now':
            message.reply('too many.');
            return;
        case 'ftm online?':
            message.reply('yes, online.');
            return;
        case 'gimme teams':
            message.reply('this function is under construction.');
            return;
            // request.onload = function () {
    
            //     let data = JSON.parse(this.response);
            
            //     if (request.status >= 200 && request.status < 400) {
            //         data.data.forEach((team) => {
            //             message.channel.send(team.full_name);
            //         })
            //     } else {
            //         console.log('error');
            //     }
            
            // }
            
            // request.send();
    }

    if (message.author.username === 'crayollaaaa' || message.author.username === 'gloobus') {
        let roll = randomNum(RATE)
        if (roll === 1) {
            message.reply(`bingo! at a rate of 1 in ${RATE}, that took you ${numTries} tries.`);
            numTries = 1;
            console.log("did it.");
        } else {
            numTries++;
            let stringRoll = roll.toString();
            // message.channel.send(stringRoll);
        }
    }

});

ftm.login(process.env.TOKEN);