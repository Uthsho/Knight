const db = require("quick.db");
const Discord = require("discord.js");

module.exports = {
    name: "setprefix",
    category: "moderation",
    description: "change prefix of the server!",
    aliases: ["prefix", "sprefix"],
    Usage: "setprefix <prefix of your choice>",
    run: async(client, message, args) => {
        const noperms = new Discord.RichEmbed()
        .setTitle(message.author.tag)
        .setDescription(`:x: Sorry ${message.author.tag} you did not specify a prefix.`)
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("**Sorry** but you need ```ADMINISTRATOR``` permission to use this command");
        let newprefix = args.join(" ");
        if(!args[0]) return message.channel.send(noperms);
        if(!args[1]) {
           db.set(`prefix_${message.guild.id}`, newprefix).then
           const embed = new Discord.RichEmbed()    
           .setTitle(`${message.author.tag} used prefix command`)
           .setDescription(`**Successfully** changed the prefix to **${newprefix}**`)
           .setTimestamp()
           .setFooter("Bot made with love by the dev\'s", "https://cdn.discordapp.com/attachments/640330014738350093/641577227602886666/dongito.png")
           message.channel.send(embed);
        }
    }
    
}