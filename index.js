const http = require("http");
const express = require("express");
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000); // i think for good mod cmd we need to config jagrosh bot vortex its on java 
// ima add commands now

const mongoose = require("mongoose");
const Discord = require("discord.js");
const config = require("./config.json");
const client = new Discord.Client();
const d = require("dotenv");
const Enmap = require("enmap")
const fs = require("fs")
client.commands = new Enmap();
client.aliases = new Enmap();
client.categories = fs.readdirSync("./commands/");

mongoose.connect(`mongodb://${config.mongo_atlas.username}:${config.mongo_atlas.password}@${config.mongo_atlas.shard.one},${config.mongo_atlas.shard.two},${config.mongo_atlas.shard.three}/${config.mongo_atlas.cluster}?ssl=true&replicaSet=${config.mongo_atlas.cluster}-shard-0&authSource=admin&retryWrites=true`,{ useNewUrlParser: true, useUnifiedTopology: true });


d.config({
  path: __dirname + "/.env"
});

["commands"].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});

client.on("ready", () => {
  client.user.setStatus("dnd")
  console.log(`Logged in as ${client.user.tag}. With ${client.guilds.size}. With ${client.users.size} users!`)
  client.user.setActivity(`Getting rebuild! | ${client.guilds.size} guilds!`)
});

client.on("message", async message => {
  let ops = {
    ownerID: OwnerID,
    active: active
  };
  if (message.author.client) return;
  var prefix = await db.get(`prefix_${message.guild.id}`)
  if(!prefix) prefix = config.prefix;
  if (message.isMentioned(client.user)) {
    const embed = new Discord.RichEmbed().setDescription(
      `Hello ${message.author}, My prefix is ${prefix} in this guild. use ${prefix} help to see my commands.`
    );
    message.channel.send(embed);
  }
  if (!message.guild) return;
  if (!message.content.startsWith(prefix)) return;
  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (cmd.length === 0) return;

  let command = client.commands.get(cmd);
  if (!command) command = client.commands.get(client.aliases.get(cmd));

  if (command) command.run(client, message, args, ops, prefix);
});


client.login(process.env.TOKEN);
