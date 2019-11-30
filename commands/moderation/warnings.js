const config = require("./../../config.json");
const mongoose = require("mongoose");
const Product = require("./../../mongodb/warn");
const { RichEmbed} = require("discord.js");
module.exports = {
  name: "warnings",
  category: "Moderation",
  description: "Check the warnings from a user",
  aliases: ["userw"],
  Usage: "warnings <mention>",
  run: async (client, message, args, prefix) => {
  if (
    !message.member.hasPermission("ADMINISTRATOR") &&
    !config.testers.includes(message.author.id)
  ) {
    return message.channel.send("You got no permission");
  }
  let member = message.mentions.members.first() || message.guild.members.get(args[0]);
  if (!member) {
    return message.channel.send(
      `You must mention someone to check the warnings`
    );
  }
  Product.find({
    name: "Warnings",
    guildid: message.guild.id,
    userid: member.id
  }).then(result => {
    let warnings;
    if (!result[0]) warnings = [];
    if (result[0]) warnings = result[0].warnings;
    let warner;
    if(!result[0]) warner = [];
    if(result[0]) warner = result[0].warner
    
    const embed = new RichEmbed() 
			.setAuthor(`${member}'s Warnings`, member.displayAvatarURL)
			.setDescription("These are all of the warnings which have been issued to this user.")
			.setColor("#9500d6")
      .setDescription(`**Reason:** ${warnings.join("\n")}.`, true) // || bot.fetchUser(w.warner)).tag}
      message.channel.send(embed); 
   /* message.channel.send(
      `${member.displayName} has ${
        warnings.length
      } warnings: \`\`\` ${warnings.join("\n")}\`\`\``
    ); */
  });
}
}