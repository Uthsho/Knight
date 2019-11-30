const Discord = require("discord.js");
module.exports = {
  name: "create",
  category: "ticket",
  description: "Create a ticket!",
  aliases: ["crt", "ticket"],
  Usage: "Create",
  run: async(client, message, args) => {
    if(!args[0]) message.channel.send(`:x: Please put a valid reason for ur ticket creation!. :x:`);
    
    if(!message.guild.roles.exists("name", "Support Team")) message.channel.send(`:x: Please create a ***Support Team*** role for me to create a ticket! :x:`)
    
    if (message.guild.channels.exists("name", "ticket-" + message.author.id)) return message.channel.send(`You already have a ticket open.`);
    
    if(args[0]) {
       message.guild.createChannel(`ticket-${message.author.id}`, "text").then(c => {
      let role = message.guild.roles.find("name", "Support Team")
      let role2 = message.guild.roles.find("name", "@everyone");
       c.overwritePermissions(role, {
      SEND_MESSAGES: true,
      READ_MESSAGES: true
    });
    c.overwritePermissions(role2, {
      SEND_MESSAGES: false,
      READ_MESSAGES: false
    });
    c.overwritePermissions(message.author, {
      SEND_MESSAGES: true,
      READ_MESSAGES: true
    });
    message.channel.send(`:white_check_mark: Your ticket has been created, #${c.name}.`);
    const embed = new Discord.RichEmbed()
    .setColor(0xCF40FA)
    .addField(`Hey ${message.author.username}!`, `Please try explain why you opened this ticket with as much detail as possible. Our **Support Staff** will be here soon to help.`)
    .addField(`Given reason`, `${args.join(" ")}`)
    .setTimestamp();
    c.send({
      embed: embed
    });
    }).catch(console.error);
    }
  }
}