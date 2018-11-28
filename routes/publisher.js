var express = require('express');
var router = express.Router();

var newAdvRouter = require('./publisher/newAdv');
var myPageRouter = require('./publisher/myPage');

router.use('/newAdv',newAdvRouter);
router.use('/myPage',myPageRouter);

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('publisher');
});

module.exports = router;
