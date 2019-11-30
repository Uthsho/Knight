const eco = require("./../../mongodb/economy");
const Discord = require("discord.js");
const mongoose = require("mongoose")
const db = require("quick.db");
const ms = require("parse-ms");
module.exports = {
  name: "work",
  category: "economy",
  description: "Work for money",
  aliases: ["wrk", "wk"],
  Usage: "work",
  run: async(client, message, args) => {
    let user = message.author;
    eco.find({
      name: "Economy",
      guildid: message.guild.id,
      userid: message.author.id
    }).then(result => {
      var work = [`You worked as a prostitute`, `You worked as a engineer`, `You worked as a youtuber`]
      var w = work[Math.floor(Math.random() * work.length)];
      var amount = result[0] ? parseInt(result[0].money) + Math.floor(Math.random() * 1000) : Math.floor(Math.random() * 1000);
           let duck = new eco({
        _id: new mongoose.Types.ObjectId(),
        name: "Economy",
        guildid: message.guild.id,
        userid: user.id,
        money: amount,
      });
      message.channel.send(`Congrats, ${user.tag}, ${w} and earned ${amount}.`)
    if (!result || result == []) {
      duck.save().catch(console.error);
    } else {
      console.log(result[0])
      eco.deleteOne({userid: user.id}).catch(err => console.log(err))
      duck.save().catch(err => console.log(err));
      }
    })
  }
}