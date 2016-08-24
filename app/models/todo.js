/**
 * Created by michnik on 23.08.2016.
 */
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

module.exports = mongoose.model('Todo', new Schema({
	content: String,
	userID: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
}));