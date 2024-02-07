require('dotenv').config();

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

    if (message.content === 'how many free throws does joel embiid have right now') {
        message.reply('too many.');
        // console.log(message);
    }
});

ftm.login(process.env.TOKEN);