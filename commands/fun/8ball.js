const superagent = require('superagent');
const Discord = require("discord.js");

module.exports = {
  name: "8ball",
  category: "fun",
  description: "Ah a cool command!",
  aliases: [""],
  Usage: "8ball <question>",
  run: async (client, message, args) => {
  if (args.length < 2) return message.channel.send("Please ask a full question! (minimum of 2 words!)")
  superagent.get('https://nekos.life/api/v2/8ball')
    .end((err, response) => {
    const lewdembed = new Discord.RichEmbed()
    .setTitle(`Question: ***${args.join(' ')}***`)
    .setColor('#FF69B4')
    .setImage(response.body.url)
    message.channel.send(lewdembed);
  })
}
}