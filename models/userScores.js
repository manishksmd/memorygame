/* user score schema*/
var mongoose = require('mongoose');
var userScoreSchema = new mongoose.Schema({	
	userId : {type : mongoose.Schema.Types.ObjectId, ref: 'user',required:"Please provide player's id to save results."},
	time : {type : Number, required:"Please provide time taken by player to save results." },
	score : {type : Number, required:"Please provide score of player to save results." },
	turns : {type : Number, required:"Please provide turns made by player to save results." },
	active :{type: Boolean, default:true},
	createdAt : {type : Date,default:Date.now()}
},{collection: 'userScore'});

var userScore = mongoose.model('userScore',userScoreSchema);

module.exports = userScore;