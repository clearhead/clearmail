var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/emails';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Clearhead Email Catcher' });
});

// post to homepage
router.post('/', function(req, res, next) {
 res.send('Cross origin post allowed!')
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

module.exports = router;
