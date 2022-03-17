module.exports = {
  name: /^js\s/i,
  /** @param {import("discord.js").Message} msg */
  action: (msg) => {
    msg.reply(eval(msg.content.slice(3)));
  }
};