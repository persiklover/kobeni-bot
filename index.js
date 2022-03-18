const { Client } = require('discord.js');
const bot = new Client();

const fs = require('fs');

function getCommands() {
  const dir = './commands';
  const dirs = fs.readdirSync(dir, { withFileTypes: true });
  const files = dirs.map(dirent => {
    const res = dirent.name;
    return dirent.isDirectory() ? getCommands(res) : res;
  });

  return files
    .filter(file => file.endsWith('.js'))
    .map(filename => require(`./commands/${filename}`));
}

const commands = getCommands();

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