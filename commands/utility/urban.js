const urban = require("relevant-urban");
const Discord = require("discord.js");

module.exports = {
  name: "urban",
  category: "utility",
  description: "Get information from the urban directory",
  Usage: "urban <text>",
  run: async(client, message, args) => {
    
    if(!args[0]) return message.channel.send(`__***Please specify a text***__`)
    
    let res = await urban(args.join(" ")).catch(e => {
      return message.channel.send(`SORRY, That was not found....`)
    })
    
    let embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setTitle(res.word)
    .setURL(res.urbanURL)
    .setDescription(`***Definition:***\n*${res.definition}*\n\n**Example:**\n*${res.example}*`)
    .addField(`Author`, res.author, true)
    .addField(`Rating`, `**\`Upvotes: ${res.thumbsUp} | Downvotes: ${res.thumbsDown} \`**`)
    
    if(res.tags.length > 0 && res.tags.join(", ").length < 1024) {
      embed.addField(`Tags`, res.tags.join(" "), true)
    }
    
    message.channel.send(embed);
  }
}