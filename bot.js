/* **bot.js: root file of the project** */ 
const mongoose = require('mongoose');
const Discord = require('discord.js');
const client = new Discord.Client();

// login with discord bot
const { discord_token } = require('./config/app.js');
client.login(discord_token);

// config mongoose
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/DiscordBot');

// google search util function
const googleSearch = require("./google-search.js");

// function to store and retrieve data from DB
const { storeUserHistory, getUserHistory } = require("./models/UserHistory.js");

// On successful connection
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

// on receiving a message
client.on('message', async (msg) => {

  // find first word
  const firstWord = (msg.content).split(" ")[0].toLowerCase();

  // When someone message 'hey'
  if (firstWord === 'hey') {
    msg.reply('Hi');
  }

  // When someone search using !google 'keyword'.
  if (firstWord === "!google") {
    const query = msg.content.substring(8).toLowerCase();
    try {
      const searchRes = await googleSearch(query);
      msg.reply({embed: searchRes});
      await storeUserHistory(msg.channel.id, msg.author.id, query);
    } catch (err) {
      msg.reply("Some Error Happened, Please Try Again!");
    }
  }

  // When someone search using !recent 'keyword'.
  if (firstWord === "!recent") {
    const keyword = msg.content.substring(8).toLowerCase();
    try {
      const recentHistory = await getUserHistory(msg.channel.id, msg.author.id, keyword);
      msg.reply({embed: recentHistory});
    } catch (err) {
      msg.reply("Some Error Happened, Please Try Again!");
    }
  }

});
