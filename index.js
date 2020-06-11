//UPTIME CALLBACK
const http = require('http');
const express = require('express');
const app = express();
var server = http.createServer(app);

app.get('/', (request, response) => {
  console.log(`Ping Received.`);
  response.writeHead(200, { 'Content-Type': 'text/plain' });
  response.end('MUSIC BOT BY UnseenAcoustics');
});

const listener = server.listen(process.env.PORT, function() {
  console.log(`Your app is listening on port ` + listener.address().port);
});
setInterval(() => {
  http.get(`http://speckle-quartz-road.glitch.me/`); //Do for good hosting
}, 280000);

const { CommandoClient } = require('discord.js-commando');
const { Structures } = require('discord.js');
const { MessageEmbed } = require('discord.js');
const path = require('path');
const { prefix, token } = require('./config.json');

Structures.extend('Guild', Guild => {
  class MusicGuild extends Guild {
    constructor(client, data) {
      super(client, data);
      this.musicData = {
        queue: [],
        isPlaying: false,
        nowPlaying: null,
        songDispatcher: null,
        volume: 1
      };
      this.triviaData = {
        isTriviaRunning: false,
        wasTriviaEndCalled: false,
        triviaQueue: [],
        triviaScore: new Map()
      };
    }
  }
  return MusicGuild;
});

const client = new CommandoClient({
  commandPrefix: prefix,
  owner: '300657719721984000' // change this to your Discord user ID
});

client.registry
  .registerDefaultTypes()
  .registerGroups([['music', 'Music Command Group']])
  .registerDefaultGroups()
  .registerDefaultCommands({
    eval: false,
    prefix: false,
    commandState: false
  })
  .registerCommandsIn(path.join(__dirname, 'commands'));

client.once('ready', () => {
  console.log('Ready!');
  client.user.setActivity('d!help | musicdarolus.tk');
});

client.login(token);
