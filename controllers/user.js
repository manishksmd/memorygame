'use strict';
let userModel = require('../models/user');
let userScoreModel = require('../models/userScores');

/*
 * Function to add a new game user - 
 *returns existing user with email or creates a new one if email does not exist
*/
let addUser = function(req,res){
    console.log(12)
    let errMsg = null;
    if(!req.payload.email){
        errMsg = "Player's email is required. Please provide a valid email.";
    }else if(!req.payload.name){
        errMsg = "Player's name is required. Please provide a valid name.";
    }
    if(errMsg){
        return res({'msg':errMsg}).code(400);
    }
    userModel.findOne({email:req.payload.email},function(err,userData){
        if(err){
            return res({'msg':'DB error','err':err}).code(400);
        }else{
            if(userData){
                return res({'msg':'success','user':userData}).code(200);       
            }else{
                let newUser = new userModel(req.payload);
                newUser.save(function(err,response){
                    if(err){
                        return res({'msg':'DB error','err':err}).code(400);
                    }else{
                        return res({'msg':'success','user':response}).code(200);       
                    }
                })
            }
        }
    })
}
exports.addUser = addUser;

/*
 * Function to add a new Score for a game user - 
 * Adds score for user's gameplay to database for 
*/
let addNewScore = function(req,res){
    let errMsg = null;
    if(!req.payload.userId){
        errMsg = "Please provide player's id to save results.";
    }else if(!req.payload.score){
        errMsg = "Please provide score of player to save results.";
    }else if(!req.payload.turns){
        errMsg = "Please provide turns made by player to save results.";
    }else if(!req.payload.time){
        errMsg = "Please provide time taken by player to save results.";
    }
    if(errMsg){
        return res({'msg':errMsg}).code(400);
    }
    let newScore = new userScoreModel(req.payload);
    newScore.save(function(err,response){
        if(err){
            return res({'msg':'DB error','err':err}).code(400);
        }else{
            getAllScores(req,res);
        }
    })
}
exports.addNewScore = addNewScore;

/*
 * Function get scores of all users
 * 
*/
let getAllScores = function(req,res){
    userScoreModel.find({active:true},function(err,scores){
        if(err){
            return res({'msg':'DB error','err':err}).code(400);
        }else{
            return res({'msg':'success','scores':scores}).code(200);       
        }
    }).populate('userId').sort({score:-1});
}
exports.getAllScores = getAllScores;

/*
 * Function reset scores of all users
 * 
*/
let resetScores = function(req,res){
    userScoreModel.update({active:true},{active:false},{multi:true},function(err,scores){
        if(err){
            return res({'msg':'DB error','err':err}).code(400);
        }else{
            getAllScores(req,res);      
        }
    });
}
exports.resetScores = resetScores;