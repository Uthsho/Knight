const Discord = require("discord.js");

module.exports = {
  name: "leave",
  category: "music",
  description: "makes the bot leave the channel",
  aliases: ["dis","disc", "disconnect"],
  Usage: "leave",
  run: async(client, message, args, ops) => {
    if(!message.member.voiceChannel) return message.channel.send(`:x: You are not connected to a voice channel! :x:`);
    
    if(message.guild.me.VoiceChannelID === message.member.voiceChannelID) return message.channel.send(`Sorry you aren\'t connected to the same voice channel as me.`);
    
    message.guild.me.voiceChannel.leave();
    
    message.channel.send(`Leaving channel.`);
  }
}
