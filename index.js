const { Client } = require('discord.js');
const bot = new Client();

const fs = require('fs');

bot.on('ready', () => {
  console.log('Bot online');
});

bot.on('message', msg => {
  console.log(msg.content);
});

bot.login(fs.readFileSync('./token.txt', { encoding: 'utf-8' }));