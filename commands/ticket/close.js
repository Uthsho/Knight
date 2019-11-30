const Discord = require("discord.js");

module.exports = {
  name: "close",
  category: "ticket",
  description: "Close a ticket!",
  aliases: [""],
  Usage: "close",
  run: async(client, message, args, prefix) => {
    if (!message.channel.name.startsWith(`ticket-`)) return message.channel.send(`You can't use the close command outside of a ticket channel.`);
        // Confirm delete - with timeout (Not command)
        message.channel.send(`Are you sure? Once confirmed, you cannot reverse this action!\nTo confirm, type \`confirm\`. This will time out in 10 seconds and be cancelled.`)
            .then((m) => {
                message.channel.awaitMessages(response => response.content === `confirm`, {
                        max: 1,
                        time: 10000,
                        errors: ['time'],
                    })
                    .then((collected) => {
                        message.channel.delete();
                    })
                    .catch(() => {
                        m.edit('Ticket close timed out, the ticket was not closed.').then(m2 => {
                            m2.delete();
                        }, 3000);
                    });
            });
}
}