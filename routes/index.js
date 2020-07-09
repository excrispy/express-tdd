var express = require('express');
var router = express.Router();
const users = require('./users');

router.use('/api/users', users);

/* GET home page. */
// router.get('/', function(req, res, next) {
//   // res.render('index', { title: 'Express' });
//   res.send('zxcv');
// });

module.exports = router;
