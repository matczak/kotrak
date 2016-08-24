/**
 * Created by michnik on 24.08.2016.
 */

var jwt     = require('jsonwebtoken');
var User    = require('./models/user');
var Todo    = require('./models/todo');
var express = require('express');

module.exports = function (app, dirname) {

	app.get('/', function (req, res) {
		res.sendFile(dirname + '/public/index.html');
	});

	var apiRoutes = express.Router();

	apiRoutes.post('/login', function (req, res) {
		User.findOne({
			name: req.body.name
		}, function (err, user) {

			if (err) throw err;

			if (!user) {
				res.json({type: 'error', msg: 'Authentication failed. Wrong user or password.'});
			} else
				if (user) {
					if (user.password != req.body.password) {
						res.json({type: 'error', msg: 'Authentication failed. Wrong user or password.'});
					} else {
						req.session.uid = user._id;
						var token       = jwt.sign(user, app.get('superSecret'), {
							expiresIn: 86400 // expires in 24 hours
						});

						res.json({
							type: 'token',
							msg: 'Enjoy your token!',
							token: token
						});
					}
				}
		});
	});

	apiRoutes.post('/signup', function (req, res) {
		User.create({
			name: req.body.name,
			password: req.body.password,
			admin: false
		}, function (err, user) {
			if (err) res.json({type: 'error', msg: 'error!'});

			var token = jwt.sign(user, app.get('superSecret'), {
				expiresIn: 86400 // expires in 24 hours
			});

			return res.json({
				type: 'token',
				msg: 'Enjoy your token!',
				token: token
			});
		});
	});

	apiRoutes.use(function (req, res, next) {
		var token = req.body.token || req.param('token') || req.headers['x-access-token'];

		if (token) {
			jwt.verify(token, app.get('superSecret'), function (err, decoded) {
				if (err) {
					return res.json({type: 'error', msg: 'Failed to authenticate token.'});
				} else {
					req.decoded = decoded;
					next();
				}
			});
		} else {
			return res.status(403).send({
				type: 'error',
				msg: 'No token provided.'
			});
		}

	});

	apiRoutes.get('/', function (req, res) {
		res.json({message: 'Welcome to the coolest API on earth!'});
	});

	apiRoutes.get('/todos', function (req, res) {
		var uid = req.session.uid;
		Todo.find({userID: uid}, '-userID', function (err, todo) {
			return res.json({
				type: 'data', data: {
					items: todo
				}
			});
		});

	});

	apiRoutes.post('/todos', function (req, res) {
		var uid     = req.session.uid;
		var content = req.body.content;

		var todo = new Todo({
			content: content,
			userID: uid
		});

		todo.save(function (err, t) {
			if (err) {
				return res.json({type: 'error', msg: 'error!'});
			} else {
				return res.json({type: 'data', data: {content: content, _id: t._id}, msg: 'todo has been added!'});
			}
		});
	});

	apiRoutes.post('/todos/update', function (req, res) {
		var todo_id = req.body._id;
		var content = req.body.content;

		Todo.findOneAndUpdate({_id: todo_id}, {content: content}, function (err, todo) {
			if (err) {
				return res.json({type: 'error', msg: 'error!'});
			} else {
				return res.json({type: 'success', msg: 'todo has been updated!'});
			}
		});
	});

	app.delete('/api/todos/:todo_id', function (req, res) {
		var uid     = req.session.uid;
		var todo_id = req.params.todo_id;
		Todo.findOneAndRemove({userID: uid, _id: todo_id}, function (err, todo) {
			if (err) {
				return res.json({type: 'error', msg: 'error!'});
			} else {
				return res.json({type: 'success', msg: 'todo has been deleted!'});
			}
		});
	});

	app.use('/api', apiRoutes);

};