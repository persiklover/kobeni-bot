const { Client } = require('discord.js');
const bot = new Client();

const fs = require('fs');
const path = require('path');

function walk(directory) {
  /** @type {string[]} */
  let fileList = [];

  const files = fs.readdirSync(directory);
  for (const file of files) {
    const p = path.join(directory, file);
    if (fs.statSync(p).isDirectory()) {
      fileList = [...fileList, ...walk(p)];
    }
    else {
      fileList.push(p);
    }
  }

  return fileList;
}

function getCommands(directory) {
  return walk(directory)
    .filter(file => file.endsWith('.js'))
    .map(filename => require(`./${filename}`));
}

const commands = getCommands('./commands');

/** @type {TextChannel} */
let defaultTextChannel;

bot.on('ready', () => {
  console.log('Bot online');

  defaultTextChannel = bot.channels.cache.find(channel => channel.type === 'text');
});

bot.on('message', msg => {
  console.log(msg.content);

  for (let command of commands) {
    if (msg.content.match(command.name)) {
      command.action(msg);
    }
  }
});

bot.on('emojiCreate', emoji => {
  defaultTextChannel.send('На сервере появился новый эмоджис!');
  defaultTextChannel.send(`${emoji}`);
});

bot.login(fs.readFileSync('./token.txt', { encoding: 'utf-8' }));