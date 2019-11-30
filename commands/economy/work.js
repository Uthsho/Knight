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
    
    let timeout = 86400000;
    let daily = await db.fetch(`work_${message.guild.id}_${message.author.id}`)
    if (daily !== null && timeout - (Date.now() - daily) > 0) {
    let time = ms(timeout - (Date.now() - daily));
      message.channel.send(`Sorry ${message.author.tag}, But you can use it again after 24 hours.`)
    }else{
    let user = message.author;
    
    eco.findOne({name: "Economy", guildid: message.guild.id, userid: user.id}).then(result => {
      
      var work = [`You worked as a prostitute`, `You worked as a engineer`, `You worked as a youtuber`]
      
      var w = work[Math.floor(Math.random() * work.length)];
      
      var amount = Math.floor(Math.random() * 350);
      
      let duck = new eco({_id: new mongoose.Types.ObjectId(), name: "Economy", guildid: message.guild.id, userid: user.id, money: amount});
      
      db.set(`work_${message.guild.id}_${message.author.id}`, Date.now())
      
      if(!result || result == []) {
        message.channel.send(`Congratulations, ${user.tag}, ${w} and earned ${amount}kc.`)
        duck.save().catch(console.error)

      }else{
        result.money = result.money + amount
        result.save().catch(console.error)
        message.channel.send(`Congratulations, ${user.tag}, ${w} and earned ${amount}kc.`)              
      }
    })
    }
  }
}