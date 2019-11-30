const config = require("./../../config.json");
const mongoose = require("mongoose");
const Product = require("./../../mongodb/warn");
module.exports = {
  name: "warn",
  category: "Moderation",
  description: "Warns a user",
  aliases: ["wuser"],
  Usage: "warn <mention> [reason]",
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
    return message.channel.send(`You must mention someone to warn`);
  }
  if(member.hasPermission("ADMINISTRATOR")) return message.reply(`This user is immune for warns`);
  Product.find({
    name: "Warnings",
    guildid: message.guild.id,
    userid: member.id
  }).then(result => {
    var reason = args.slice(1).join(" ");
    if(!reason) reason = "No reason Given";
    if(result[0]){ var warnings = result[0].warnings ? result[0].warnings : [] } else { var warnings = [] };
    warnings.push(reason);
    var duck = new Product({
      _id: new mongoose.Types.ObjectId(), // new mongoose.Types.ObjectId() always generates a unique id in the mongoose.Schema.Types.ObjectId format
      guildid: message.guild.id,
      name: "Warnings",
      userid: member.id,
      warner: message.author.tag,
      warnings: warnings
    });
    member
      .send("you got warned " + reason)
      .catch(error =>
        message.reply(
          `Sorry ${message.author} I couldn't warn because of : ${error}`
        )
      );
    message.channel.send(
      `${member.user.tag} has been warned by ${message.author.tag} because: ${reason}`
    );
    message.react("👌");
    if (!result || result == []) {
      duck.save().catch(console.error);
    } else {
      Product.deleteOne({
        name: "Warnings",
        guildid: message.guild.id,
        userid: member.id
      }).catch(console.error);

      duck.save().catch(console.error);
    }
  });
}
}