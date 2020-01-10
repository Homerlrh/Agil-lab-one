var express = require('express');
var router = express.Router();

/* GET download request */
router.get('/download', function(req, res, next) {
  //respond with conversion history within one year
  res.send();
});

module.exports = router;
