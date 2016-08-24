/**
 * Created by michnik on 23.08.2016.
 */
var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var morgan     = require('morgan');
var mongoose   = require('mongoose');
var session    = require('express-session');
var config = require('./config/config');


var port = process.env.PORT || 8080;
mongoose.connect(config.database);
app.set('superSecret', config.secret);
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(morgan('dev'));
app.use(session({
	resave: true,
	saveUninitialized: true,
	secret: 'twartekrzesla'
}));

require('./app/routes.js')(app, __dirname);

app.listen(port, function () {
	console.log('works');
});