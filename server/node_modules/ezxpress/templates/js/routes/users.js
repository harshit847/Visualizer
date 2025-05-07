var router = require('express').Router();
var knex = require('../db');

router.get('/', function(req, res) {
  knex('users')
    .then(users => {
      res.json(users);
    });
});

module.exports = router;