const fs = require('fs');
let waffleTubesArr = fs.readdirSync(__dirname + '/images').map(item => __dirname +'/images/' + item);

const nextIndex = (() => {
  let index = -1;

  return () => {
    index++;
    if (index == waffleTubesArr.length) {
      index = 0;
    }
    return index;
  };
})();

module.exports = {
  name: /^(доставка|хочу)?\s?(вафельн(ые|ых))?\s?трубоч(ки|ек)/i,
  /** @param {import("discord.js").Message} msg */
  action: msg => {
    msg.reply({
      content: 'Держи',
      files: [waffleTubesArr[nextIndex()]]
    });
  }
};
