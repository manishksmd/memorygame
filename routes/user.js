'use strict';

const userController = require('../controllers/user');
const Joi = require('joi');
/*
 * Defining routes to be used in server.js
*/
module.exports = [{
    method: 'Post',
    path: '/addUser',
    config: {
        handler: userController.addUser,
        plugins: {
            'hapi-swagger': {
                payloadType: 'form'
            }
        },
        validate:{
            payload: { 
                name: Joi.string().required(), 
                email: Joi.string().required()
            }
        },
        description: 'Add player',
        notes: 'Creates a new entry in DB if email is not there, or returns existing db entry for email.',
        tags: ['api','user'] 
    }
},{
    method: 'Get',
    path: '/scores',
    config: {
        handler: userController.getAllScores,
        description: 'Get all scores',
        notes: 'Simple API to fetch all palyer scores in descending order.',
        tags: ['api','user','scores'] // ADD THIS TAG
    }
},{
    method: 'Get',
    path: '/scores/reset',
    config: {
        handler: userController.resetScores,
        description: 'Reset game scores',
        notes: 'Resets or empties the scores list.',
        tags: ['api','user','scores'] // ADD THIS TAG
    }
}
,{
    method: 'Post',
    path: '/scores/add',
    config: {
        handler: userController.addNewScore,
        plugins: {
            'hapi-swagger': {
                payloadType: 'form'
            }
        },
        validate:{
            payload: { 
                userId: Joi.string().required(), 
                score: Joi.number().required(),
                time: Joi.number().required(),
                turns: Joi.number().required(),
            }
        },
        description: 'Add new score',
        notes: 'Add new user score to game DB and returns all palyer scores in descending order.',
        tags: ['api','user','scores'] // ADD THIS TAG
    }
}
];