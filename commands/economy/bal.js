const eco = require("./../../mongodb/economy");
const Discord = require("discord.js");

module.exports = {
  name: "bal",
  category: "economy",
  description: "Check ur kc!",
  aliases: ["bl", "bal"],
  Usage: "bal [usertag]",
  run: async(client, message, args) => {
    var user = message.mentions.members.first()
    if(!user) user = message.author
    eco.find({
      name: "Economy",
      guildid: message.guild.id,
      userid: user.id,
    }).then(result => {
      var bal = result[0].money
      if(bal === undefined) bal = "0"
      const embed = new Discord.RichEmbed()
      .setAuthor(user.tag)
      .setDescription(`${user.tag} has: ${bal}kc.`)
      message.channel.send(embed);
    }).catch(console.error)
    
  }
}