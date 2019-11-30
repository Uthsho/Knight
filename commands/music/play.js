const Discord = require("discord.js");
const ytdl = require("ytdl-core");
const ytsearch = require("yt-search");

module.exports = {
  name: "play",
  category: "music",
  description: "Play music.",
  aliases: ["ply", "start", "p"],
  Usage: "url/search",
  run: async (client, message, args, ops) => {
    voiceChannel = message.member.voiceChannel;
    if(!voiceChannel)
        return message.channel.send("You are not in a voice channel");
    const permissions = voiceChannel.permissionsFor(message.client.user);
    if(!permissions.has('CONNECT'))
        return message.channel.send("You don't have the right permissions");
    if(!permissions.has('SPEAK'))
        return message.channel.send("You don't have the right permissions to speak");
    
    if(!args[0]) message.channel.send(`Please type a url or a name so i can search for it!`);
    let validate = await ytdl.validateURL(args[0]);

    if(!validate) {
      let search = require("./search.js");
      return search.run(client, message, args, ops);
    }

    let info = await ytdl.getInfo(args[0]);

    let data = ops.active.get(message.guild.id) || {};

    if(!data.connection) 
        data.connection = await message.member.voiceChannel.join();
    if(!data.queue)
        data.queue = [];
    data.guildID = message.guild.id;
    
    data.queue.push({
        songTitle: info.title,
        requester: message.author.tag,
        url: args[0],
        announceChannel: message.channel.id
    });

    if(!data.dispatcher) play(client, ops, data);

    else{
        message.channel.send(`Added to queue: **${info.title}** | requested by **${message.author.username}**`);

    }

    ops.active.set(message.guild.id, data);

async function play(client, ops, data){
    
    data.dispatcher = await data.connection.playStream(ytdl(data.queue[0].url, {filter: 'audioonly'}));
    data.dispatcher.setVolume(100/100)
    
    client.channels.get(data.queue[0].announceChannel).send(`:musical_note: Now Playing: ${data.queue[0].songTitle} | Requested by ${data.queue[0].requester}`);

    data.dispatcher.guildID = data.guildID;

    data.dispatcher.once('end', function(){
      if(data.connection) {
        finish(client, ops, this);
      }
    });
}

function finish(client, ops, dispatcher){
    let fetched = ops.active.get(dispatcher.guildID);

    fetched.queue.shift();

    if(fetched.queue.length > 0){
        ops.active.set(dispatcher.guildID, fetched);

        play(client, ops, fetched);
    }

    else{

        ops.active.delete(dispatcher.guildID);

        let vc = client.guilds.get(dispatcher.guildID).me.voiceChannel;

        if(vc) vc.leave();
    }
}    
  }
}
