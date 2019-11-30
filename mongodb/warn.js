const mongoose = require('mongoose');
const productSchema = mongoose.Schema({
    _id: {type: mongoose.Schema.Types.ObjectId, required: true},
    guildid: {type:Number, required:true},
    name: {type:String, default: 'Warnings'},
    userid: {type:Number, required:true},
    warner: {type:Array, required: true},
    warnings: {type:Array, required:true}
});
module.exports = mongoose.model('Warnings', productSchema);