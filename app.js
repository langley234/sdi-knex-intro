const express = require('express');
const bodyParser = require('body-parser');
console.log('here');
const app = express();
const PORT = process.env.PORT || 3000;
//const knex = require('knex')(require('./knexfile.js')[process.env.NODE_ENV]);
const knex = require('knex')({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'docker',
        database: 'knex_intro'
    }
});

app.use(bodyParser.json());

app.get('/movies', function(req, res) {
  knex
    .select('*')
    .from('movies')
    .then(data => res.status(200).json(data))
    .catch(err =>
      res.status(404).json({
        message:
          'The data you are looking for could not be found. Please try again'
      })
    );
});

app.listen(PORT, () => {
  console.log(`The server is running on ${PORT}`);
});