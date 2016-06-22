// set update
var express  = require('express');
    var app      = express();                               // create our app w/ express
    var mongoose = require('mongoose');                     // mongoose for mongodb
    var morgan = require('morgan');             // log requests to the console (express4)
    var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
    var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
	
// configuration
mongoose.connect('mongodb://localhost/opinnaytetyot');

app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
    app.use(morgan('dev'));                                         // log every request to the console
    app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    app.use(methodOverride());
	
	// define model 
    var Topic = mongoose.model('Topic', {
        aihe : String,
		kuvaus : String
    });
	
	var User = mongoose.model('User', {
		username : String,
		password : String
	});
	
	// routes 

    // api ---------------------------------------------------------------------
    // get all todos
    app.get('/api/topics', function(req, res) {

        // use mongoose to get all todos in the database
        Topic.find(function(err, topics) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)

            res.json(topics); // return all todos in JSON format
        });
    });

    // create todo and send back all todos after creation
    app.post('/api/topics', function(req, res) {

        // create a todo, information comes from AJAX request from Angular
        Topic.create({
            aihe : req.body.aihe,
			kuvaus : req.body.kuvaus,
            done : false
        }, function(err, topic) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            Topic.find(function(err, topics) {
                if (err)
                    res.send(err)
                res.json(topics);
            });
        });

    });

    // delete a todo
    app.delete('/api/topics/:topic_id', function(req, res) {
        Topic.remove({
            _id : req.params.topic_id
        }, function(err, topic) {
            if (err)
                res.send(err);
            // get and return all the todos after you create another
            Topic.find(function(err, topics) {
                if (err)
                    res.send(err)
                res.json(topics);
            });
        });
    });

	
	
	// application -------------------------------------------------------------
    app.get('*', function(req, res) {
        res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });

    // listen (start app with node server.js) ======================================
    app.listen(8080);
    console.log("App listening on port 8080");