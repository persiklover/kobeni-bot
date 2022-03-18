const { Client } = require('discord.js');
const bot = new Client();

const fs = require('fs');
const commands = fs.readdirSync('./commands')
  .filter(file => file.endsWith('.js'))
  .map(filename => require(`./commands/${filename}`));

bot.on('ready', () => {
  console.log('Bot online');
});

bot.on('message', msg => {
  console.log(msg.content);

  for (let command of commands) {
    if (msg.content.match(command.name)) {
      command.action(msg);
    }
  }
});

bot.login(fs.readFileSync('./token.txt', { encoding: 'utf-8' }));