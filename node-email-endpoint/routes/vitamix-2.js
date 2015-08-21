var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://aqnzjqbxjaqcya:a0y2Ij41opP2bfAbrCtyN2zfbg@ec2-54-197-255-248.compute-1.amazonaws.com:5432/d2ab9jp36cfls6';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Clearhead Email Catcher: Vitamix 2' });
});
