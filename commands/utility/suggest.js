const Discord = require("discord.js");
const talkedRecently = new Set();

module.exports = {
  name: "suggest",
  category: "utility",
  description: "Suggest us something!",
  aliases: ["sgt"],
  Usage: "suggest <text>",
  run: async(client, message, args) => {
      if (talkedRecently.has(message.author.id)) {
            message.channel.send("Wait 1 minute before getting typing this again. - " + message.author);
      }else{
        if(!args[0]) message.channel.send(`Please type a suggestion for me to send!`)
        const suggest = args.join(" ")
        
        const send = new Discord.RichEmbed()
        .setAuthor(`${message.author.tag} sent a suggestion!`)
        .setDescription(suggest)
        .setColor("RANDOM")
        .setThumbnail(message.author.avatarURL)
        .setFooter(`${message.author.tag} id:(${message.author.id})`, message.author.avatarURL)
        .setTimestamp()
        client.channels.get("648827526218776577").send(send)
        message.channel.send(`:white_check_mark: Your message has been sent to the developers! :white_check_mark:`)
        
        
        talkedRecently.add(message.author.id);
        setTimeout(() => {
          // Removes the user from the set after a minute
          talkedRecently.delete(message.author.id);
        }, 60000);
      } 
  }
}