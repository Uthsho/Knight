const Discord = require("discord.js");

module.exports = {
    name: "support",
    category: "utility",
    description: "Get link for support server!",
    aliases: ["server"],
    Usage: "support",
    run: async(client, message, args) => {
        const embed = new Discord.RichEmbed()
        .setAuthor(message.author.tag)
        .setDescription(`Link to support server`)
        .addField(`here ya go!`, `[link](https://discord.gg/P3VkjuB)`)
        .setColor(`RANDOM`)
        .setThumbnail(client.user.avatarURL)                
        .setTimestamp()
        message.channel.send(embed);
    }
}