const Discord = require("discord.js");

module.exports = {
  name: "role",
  category: "Moderation",
  description: "Assign or remove a role!",
  aliases: ["rle", "rol"],
  Usage: "role <user tag or id> <role id or name>",
  run: async(client, message, args) => {
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`:x: You must have the ***ADMINISTRATOR*** permission!`);
    
    let member = message.mentions.users.first() || client.users.get(args[0]);
    
    if(!member) return message.channel.send(`Please specify a user or a id.`)
    
    let role = message.guild.roles.find(role => role.name === args.slice(1).join(" ")) || client.roles.get(args.slice(1).join(" "));
    
    if(!role) return message.channel.send(`Please specify a role name or a id!`);
    
    if(member.roles.has(role.id)) {
      member.removeRole(role)
      message.channel.send(`:white_check_mark: Changed roles for ${member.tag}, -${role.name}.`)
    }
    if(!member.roles.has(role.id)) {
      member.addRole(role)
      message.channel.send(`:white_check_mark: Changed roles for ${member.tag}, +${role.name}.`)
    }
  }
}