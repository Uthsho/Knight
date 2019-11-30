const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  _id: {type: mongoose.Schema.Types.ObjectId, required: true},
  guildid: {type:Number, required:true},
  name: {type:String, default: 'Economy'},
  userid: {type:Number, required:true},
  money: {type:Number, required:true}
});

module.exports = mongoose.model("Economy", productSchema);