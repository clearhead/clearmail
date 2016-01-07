var express = require('express');
var router = express.Router();

/* GET /clearhead */
router.get('/', function(req, res, next) {
  res.send('Get clearhead');
});

module.exports = router;
