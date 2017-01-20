/* user schema*/
var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({	
	name : {type : String, required:"Player's name is required."},
	email : {type : String, required:"player's email is required." },
	active :{type: Boolean, default:true},
	createdAt : {type : Date,default:Date.now()}
},{collection: 'user'});

var user = mongoose.model('user',userSchema);

module.exports = user;