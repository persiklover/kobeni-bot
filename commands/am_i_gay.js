module.exports = {
  name: /^(я|am i)\s+(п(и|i)(д(о|а)р|door)|гей|gay)\?+/i,
  /** @param {import("discord.js").Message} msg */
  action: (msg) => {
    const responses = [
      'абсолютно и 100%-но да)',
      'da)',
      'с-скорее всего да',
      'мб мб но хз хз',
      'н-нет'
    ];

    const response = responses[Math.floor(Math.random() * responses.length)];
    msg.reply(response);
  }
};