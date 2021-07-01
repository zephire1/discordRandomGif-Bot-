import Discord from 'discord.js';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import { randomInteger } from './utils.js';

const client = new Discord.Client();
const env = dotenv.config().parsed;

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
}); 

let messageCounter = 0;
client.on('message', msg => {

  if (msg.channel.name.includes(env.CHANNEL_NAME)) {
    let userMsg = msg.content.match(/[^\s]+/g);
    messageCounter++;
    console.log(`${messageCounter}) Бот обработал сообщение!`);
    
    if (userMsg[0] === '!random' || userMsg[0] === '!r') {

      if (userMsg[1] !== undefined) {

        fetch(`${env.API_URL}/search?api_key=${env.GIPHY_KEY}&q=${userMsg[1]}`)
          .then(response => response.json())
          .then(commits => {
            let postSize = commits["data"].length;
            msg.reply(env.BOT_REPLY_MSG, { files: [ commits["data"][randomInteger(0, postSize)]["images"]["original"]["url"] ] })
          } );

      } else {

        fetch(`${env.API_URL}/random?api_key=${env.GIPHY_KEY}`)
          .then(response => response.json())
          .then(commits => msg.reply(env.BOT_REPLY_MSG, { files: [ commits["data"]["images"]["downsized_large"]["url"] ] }) );

      }

    } else if (userMsg[0] === '!help' && env.BOT_HELP_ENABLED) {

      msg.reply(`Список моих команд:
      -- !random, !r (Рандомная гифка)
      -- !random mars, !r mars (Рандомная гифка на тему марса)`);

    }

  };

});

client.login(env.DISCORD_KEY);