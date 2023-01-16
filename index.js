require("module-alias/register");
require('dotenv').config()

const { Client, Collection, Intents } = require("discord.js");

const Logger = require('artie-logger');
const system = require("@Handlers/client");
const config = require("@Settings/config");
const Discord = require("discord.js");

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_BANS,
        Intents.FLAGS.GUILD_INVITES,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_MESSAGE_TYPING,
        Intents.FLAGS.GUILD_PRESENCES,
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
        Intents.FLAGS.DIRECT_MESSAGE_TYPING
    ],
    partials: ['CHANNEL', 'REACTION', 'USER', 'MESSAGE', 'GUILD_MEMBER'],
    allowedMentions: {
        repliedUser: true
    }
});

module.exports = client;

client.Gateway = Discord;
client.slash = new Collection();
client.logger = Logger;
client.config = config;
client.logo = 'https://narc.live/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.921d6ac4.png&w=128&q=75';
client.credits = '© 2022 NARC',
client.color = '#2A88BB'
client.utils = require("./handlers/base");

system.loadEvents(client);
system.loadSlashCommands(client);

process.on("uncaughtException", (err) => {

    console.log("Uncaught Exception: " + err);
});
  
process.on("unhandledRejection", (reason, promise) => {

    console.log("[FATAL] Possibly Unhandled Rejection at: Promise ", promise, " reason: ", reason.message);
});

client.login(config.token);


