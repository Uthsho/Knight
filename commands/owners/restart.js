const Discord = require("discord.js");
const config = require("./../../config.json")
module.exports = {
  name: "restart",
  category: "owners",
  description: "restarts the bot",
  aliases: ["r", "rebbot", "re"],
  Usage: "restart",
  run: async (client, message, args, ops) => {
    if(config.owner.includes === `message.author.id`) {
      return message.channel.send("No can do pal");
    message.channel.send("Restarting Silently");
    process.exit(1);
  }
}
}// ??