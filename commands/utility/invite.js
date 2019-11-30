const Discord = require("discord.js");

module.exports = {
    name: "invite",
    category: "utility",
    description: "get invite link",
    aliases: [""],
    Usage: "invite",
    run: async (client, message, args) => {  

        // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
        // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip
        
        let embed = new Discord.RichEmbed()
        .setTitle(`${client.user.username}'s invite link`)
        .setURL("https://discordapp.com/oauth2/authorize?client_id=545979318875062290&scope=bot&permissions=2146958847%60")
        .setThumbnail(client.user.displayAvatarURL)
        .addField("Join support server", "[Link](https://discord.gg/P3VkjuB)", true)
        .setTimestamp()
        .setFooter("© Knight Development 2019." , client.user.avatarURL)
        .setTimestamp()
        message.channel.send(embed);
    }
    
}