const Product = require("./../../mongodb/warn.js");
const config = require("./../../config.json");
module.exports = { 
    name: "clearwarnings",
    category: "Moderation",
    description: "Clear the warnings from a user",
    aliases: [""],
    Usage: "clearwarnings <mention>",
    run: async (client, message, args, prefix) => {
  if (
    !message.member.hasPermission("ADMINISTRATOR") &&
    !config.testers.includes(message.author.id)
  ) {
    return message.channel.send("You got no permission");
  }
  let member =
    message.mentions.members.first() || message.guild.members.get(args[0]);
  if (!member) {
    return message.channel.send(
      `You must mention someone to clear the warnings`
    );
  }
  Product.find({
    name: "Warnings",
    guildid: message.guild.id,
    userid: member.id
  }).then(result => {
    Product.deleteOne({
      name: "Warnings",
      guildid: message.guild.id,
      userid: member.id
    }).catch(console.error);
  });
  message.channel.send(`Cleared the warnings`);
}
}