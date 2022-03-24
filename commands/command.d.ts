import { Message } from 'discord.js';

type Command = {
  /** Название команды (может быть регулярным выражением) */
  name: string | RegExp,

  /** Действие, которое должно произойти при вызове команды */
  action: (message: Message) => void
}

export default Command;