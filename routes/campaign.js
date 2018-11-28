var express = require('express');
var router = express.Router();

var detailRouter = require('./detail');

router.use('/detail',detailRouter);

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('search');
});

module.exports = router;
