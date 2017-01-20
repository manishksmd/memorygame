var mongoose=require('mongoose');

mongoose.connection;
mongoose.connect('mongodb://localhost/testTask');

module.exports = mongoose;