/**
 * Created by michnik on 23.08.2016.
 */
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

module.exports = mongoose.model('User', new Schema({
	name: String,
	password: String,
	admin: Boolean
}));