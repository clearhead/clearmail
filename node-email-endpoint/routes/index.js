var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://aqnzjqbxjaqcya:a0y2Ij41opP2bfAbrCtyN2zfbg@ec2-54-197-255-248.compute-1.amazonaws.com:5432/d2ab9jp36cfls6';

/* GET home page. */
router.get('/', function(req, res, next) {
  pg.connect(connectionString, function(err, client, done) {
    var query = client.query("SELECT * FROM users ORDER BY id ASC");
  });
  res.render('index', { title: 'Clearhead Email Catcher' });
});

// post to homepage
router.post('/', function(req, res, next) {
 res.send('Cross origin post allowed!');
});

router.post('/api/adduser', function(req, res) {

    var results = [];

    // Grab data from http request
    var data = {email: req.body.email, fullname: req.body.fullname};

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {

        // SQL Query > Insert Data
        client.query("INSERT INTO users(email, fullname) values($1, $2)", [data.email, data.fullname]);

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM users ORDER BY id ASC");

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            client.end();
            return res.json(results);
        });

        // Handle Errors
        if(err) {
          console.log(err);
        }

    });
});

// post to vitamix-exp-2 in case of error sending to vitamix backend
router.post('/api/vitamix-2', function(req, res) {

    // Grab data from http request
    var data = {country: req.body.country, usage: req.body.usage, email: req.body.email};

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {

        // SQL Query > Insert Data
        client.query("INSERT INTO vitamixExp2 VALUES (country, userage, email) values($1, $2, $3)", [data.country, data.useage, data.email]);

        // Handle Errors
        if(err) {
          res.send(err);
          client.end();
        }

        // if no error send response
        else {
          res.send('Email successfully saved to clearhead email catcher');
          client.end();
        }

    });
});

module.exports = router;
