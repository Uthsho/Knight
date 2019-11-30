const Discord = require("discord.js");

module.exports = {
  name: "queue",
  category: "music",
  description: "See queue!",
  aliases: ["qe", "que"],
  Usage: "queue",
  run: async (client, message, args, ops) => {
    let fetched = ops.active.get(message.guild.id);
    if(!fetched)
        return message.channel.send("There isn't any music playing in this guild!");
    let queue = fetched.queue;
    let nowPlaying = queue[0];

    let resp = `__**Now Playing**__\n**${nowPlaying.songTitle}** -- **Requested by:** *${nowPlaying.requester}*\n\n__**Queue**__\n`;

    if(queue.length > 1){
        for(var i=1; i<queue.length; i++){
            resp += `${i}. **${queue[i].songTitle}** -- Requested by **${queue[i].requester}**\n`
        }

        return message.channel.send(resp);    
    
    }
    else {
        return message.channel.send(`There are no songs in the queue!`);    
    }
}
}
