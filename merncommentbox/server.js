'use strict'

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Comment = require('./comments.js');

var app=express();
var router=express.Router();
var port = process.env.API_PORT || 4001;

var mongoDB = 'mongodb://azkanurunala:10a52b72a9@ds137054.mlab.com:37054/mern';
mongoose.connect(mongoDB,{useMongoClient: true});
var db=mongoose.connection;
db.on('error',console.error.bind(console, 'MongoDB connection error:'));



app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

  //and remove cacheing so we get the most recent comments
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

//now  we can set the route path & initialize the API
router.get('/', function(req, res) {
  res.json({ message: 'API Initialized!'});
});

router.route('/comments')
	.get(function(req,res){
		Comment.find(function(err, comments){
			if(err)
				res.send(err);
			res.json(comments);
		});
	})
	.post(function(req,res){
		var comment = new Comment();
		comment.author = req.body.author;
		console.log(comment.author);
		comment.text = req.body.text;
		console.log(comment.text);

		comment.save(function(err){
			if(err)
				res.send(err);
			res.json({message: 'Comment successfully added!'});
		});
	});

//Use our router configuration when we call /api
app.use('/api', router);

//starts the server and listens for requests
app.listen(port, function() {
  console.log(`api running on port ${port}`);
});