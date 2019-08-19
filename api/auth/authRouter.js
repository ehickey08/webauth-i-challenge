const express = require('express');
const Users = require('../users/usersModel');
const {checkUserAtReg, checkUserAtLogin } = require('./authMiddleware')
const router = express.Router();

router.post('/register', checkUserAtReg, (req, res, next) => {
    try {
        const user = req.body;
        const hash = bcrypt.hashSync(user.password, 12);
        user.password = hash;
        const newUser = Users.add(user);
        res.status(201).json(newUser);
    } catch (err) {
        next({ err, stat: 500, message: 'Could not register user.' });
    }
});

router.post('/login', checkUserAtLogin, (req, res, next) => {});
module.exports = router;
