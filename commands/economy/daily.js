const eco = require("./../../mongodb/economy");
const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");
const mongoose = require("mongoose");

module.exports = {
  name: "daily",
  category: "economy",
  description: "claim ur daily rewards.",
  aliases: ["dly", "daly"],
  Usage: "daily",
  run: async(client, message, args) => {
    let timeout = 86400000;
    let daily = await db.fetch(`daily_${message.guild.id}_${message.author.id}`);

    if (daily !== null && timeout - (Date.now() - daily) > 0) {
    let time = ms(timeout - (Date.now() - daily));
      message.channel.send(`Sorry ${message.author.tag}, But you can use it again after 24 hours.`)
    }else{ 
    let user = message.author;
      eco.findOne({name: "Economy", guildid: message.guild.id, userid: user.id}).then(result => {
        let amount = Math.floor(Math.random() * 300);
        let duck = new eco({
          _id: new mongoose.Types.ObjectId(),
          name: "Economy",
          guildid: message.guild.id,
          userid: user.id,
          money: amount
        })
        if(!result || result == []) {
          message.channel.send(`Congratulations, ${user.tag}, You claimed ${amount} as a daily reward`)
          duck.save().catch(console.error)                    
          db.set(`daily_${message.guild.id}_${message.author.id}`, Date.now())

        }else{
          result.money = result.money + amount
          result.save().catch(console.error)                    
          message.channel.send(`Congratulations, ${user.tag}, You claimed ${amount} as a daily reward`)                    
          db.set(`daily_${message.guild.id}_${message.author.id}`, Date.now())

        }
      })
  }
  }
}