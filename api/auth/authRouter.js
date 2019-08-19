const express = require('express');
const Users = require('../users/usersModel');
const router = express.Router();

router.post('/register', (req, res, next) => {
    const { user } = req.body;
    const hash = bcrypt.hashSync(user.password, 12);
    user.password = hash;
    Users.add(user).then(([id]) => U;
});

router.post('/login', (req, res, next) => {});
module.exports = router;
