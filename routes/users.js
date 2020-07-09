var express = require('express');
var router = express.Router();
const User = require('../models/user');

/* GET users listing. */
router.get('/', async function(req, res, next) {
  const users = await User.find();
  res.send(users);
});

router.get('/:id', async function(req, res, next) {
  const user = await User.findById(req.params.id);
  res.send(user);
});

router.post('/', async function(req, res, next) {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
  });

  try {
    await user.save();
    res.send(user);
  } catch (e) {
    console.log(e);
  }
});

router.put('/:id', async function(req, res, next) {  
  const user = await User.findByIdAndUpdate(req.params.id, {
    name: req.body.name, email: req.body.email },
    { new: true },
  );

  res.send(user);
});

router.delete('/:id', async function(req, res, next) {
  const user = await User.deleteOne({ _id: req.params.id });
  res.send(user);
});

module.exports = router;
