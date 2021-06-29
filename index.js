import Discord from 'discord.js'
import fetch from 'node-fetch'

const client = new Discord.Client();
const APIKEY = "wada****11"; //Discord bot api key
const GIPHYKEY = "dwww****ww"; //giphy api key

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {

  if (msg.channel.name === 'gif') {
    
    if (msg.content === '!random' || msg.content === '!r') {

      fetch(`https://api.giphy.com/v1/gifs/random?api_key=${GIPHYKEY}`)
        .then(response => response.json())
        .then(commits => msg.reply("generate img...", { files: [ commits["data"]["images"]["downsized_large"]["url"] ] }) );

    }

  };

});

client.login(APIKEY);