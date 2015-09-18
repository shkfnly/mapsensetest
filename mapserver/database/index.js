var pg = require('pg');
var pgDB;
var conString = 'postgres://postgres@localhost/urbinsight';
var pgClient;


var client = new pg.Client(conString);

client.connect();



// pg.connect(conString, function(err, client, done) {
//   if (err) {
//     return console.error('error fetching client from pool', err);
//   }
//   // console.log('im the client');
//   // console.log(client.query);
//   exports.pgClient = client;
//   // console.log(pgClient);
//   client.query('SELECT $1::int AS number', ['1'], function(err, result) {
//     done();
//     if (err) {
//       return console.error('error running query', err);
//     }
//     console.log(result.rows[0].number)
//   });
// });