var pg = require('pg');
var connectionString = 'postgres://aqnzjqbxjaqcya:a0y2Ij41opP2bfAbrCtyN2zfbg@ec2-54-197-255-248.compute-1.amazonaws.com:5432/d2ab9jp36cfls6';

var client = new pg.Client(connectionString);
client.connect();
var query = client.query('CREATE TABLE users(id SERIAL PRIMARY KEY, email VARCHAR(40) not null, fullname VARCHAR(40) not null)');
query.on('end', function() { client.end(); });