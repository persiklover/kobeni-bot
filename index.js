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