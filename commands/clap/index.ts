import Command from '../command';

const command : Command = {
  name: 'clap',
  action: message => {
    const text = message.content.slice(5);
    message.channel.send(text.split('').join('👏'));
  }
}

module.exports = command;