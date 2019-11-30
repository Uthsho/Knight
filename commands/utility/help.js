const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const db = require("quick.db")
const config = require("./../../config.json");

module.exports = {
  name: "help",
  category: "utility",
  description: "Returns all commands, or one specific command info",
  usage: "[command | alias]",
  run: async (client, message, args) => {
    var prefix = await db.fetch(`prefix_${message.guild.id}`)
    if(!prefix) prefix = "k!";
    if (args[0]) {
      return getCMD(client, message, args[0]);
    } else {
      // Otherwise send all the commands available
      // Without the cmd info
      const embed = new RichEmbed()
        .setAuthor(`Help info`)
        .setDescription(`Use ${prefix}help <command>.`)
        .addField(`Mod`, `kick, ban, setprefix, whois`)
        .addField(`Utlity`, `help, botinfo, invite, support, urban`)
        .addField(`music`, `play, search, radio, resume, pause, queue, deletetrack, joinchannel, leave, nowplaying, skip, volume`)
        .addField(`ticket`, `create, close`)
        .addField(`fun`, `hug, 8ball`)
        .addFied(`Economy`, `work, daily, bal`)
        .addField(`Updates:`, `No new updates!`)
        .setFooter(`For example: d!help kick`)
        .setColor("RANDOM")
        .setThumbnail(client.user.avatarURL)
        .setTimestamp()
      message.channel.send(embed);
    }
  }
};

function getAll(client, message) {
  const embed = new RichEmbed().setColor("RANDOM");

  // Map all the commands
  // with the specific category
  const commands = category => {
    return client.commands
      .filter(cmd => cmd.category === category)
      .map(cmd => `- \`${cmd.name}\``)
      .join("\n");
  };

  // Map all the categories
  const info = client.categories
    .map(
      cat =>
        stripIndents`**${cat[0].toUpperCase() + cat.slice(1)}** \n${commands(
          cat
        )}`
    )
    .reduce((string, category) => string + "\n" + category);

  return message.channel.send(embed.setDescription(info));
}

function getCMD(client, message, input) {
  const embed = new RichEmbed();

  // Get the cmd by the name or alias
  const cmd =
    client.commands.get(input.toLowerCase()) ||
    client.commands.get(client.aliases.get(input.toLowerCase()));

  let info = `No information found for command **${input.toLowerCase()}**`;

  // If no cmd is found, send not found embed
  if (!cmd) {
    return message.channel.send(embed.setColor("RED").setDescription(info));
  }

  // Add all cmd info to the embed
  if (cmd.name) info = `**name**: ${cmd.name}`;
  if (cmd.aliases)
    info += `\n**Aliases**: ${cmd.aliases.map(a => `\`${a}\``).join(", ")}`;
  if (cmd.description) info += `\n**Description**: ${cmd.description}`;
  if (cmd.usage) {
    info += `\n**Usage**: ${cmd.usage}`;
  }

  return message.channel.send(embed.setFooter(`Syntax: <> = required, [] = optional`).setColor("RANDOM").setDescription(info));
}