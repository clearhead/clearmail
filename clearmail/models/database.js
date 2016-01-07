var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/todo';

var client = new pg.Client(connectionString);
client.connect();
var query = client.query('CREATE TABLE clearmail(client VARCHAR(40) not null, data json');
query.on('end', function() { client.end(); });