var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Clearhead Email Catcher' });
});

// post to homepage
router.post('/', function(req, res, next) {
 res.send('Cross origin post allowed!')
});

module.exports = router;
