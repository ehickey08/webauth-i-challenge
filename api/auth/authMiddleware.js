const bcrypt = require('bcryptjs');
const Users = require('../users/usersModel');

module.exports = {
    restricted,
    checkUserAtReg,
    checkUserAtLogin,
};

function restricted(req, res, next) {
    const { username, password } = req.headers;
    if (username && password) {
        Users.findByUsername(username)
            .first()
            .then(user => {
                if (user && bcrypt.compareSync(password, user.password)) next();
                else next({ stat: 401, message: 'Invalid credentials.' });
            });
    } else {
        next({ stat: 400, message: 'Please send valid credentials.' });
    }
}

async function checkUserAtReg(req, res, next) {
    const { username, password } = req.body;
    try {
        if (!username || !password)
            next({
                stat: 400,
                message: 'Please include a username and password.',
            });
        else {
            const storedUser = await Users.findByUsername(username).first();
            if (storedUser && username === storedUser.username)
                next({
                    stat: 401,
                    message:
                        'Username is already in use, please choose another.',
                });
            else next();
        }
    } catch (err) {
        next({ err, stat: 500, message: 'Could not register user' });
    }
}

function checkUserAtLogin(req, res, next) {
    const { username, password } = req.body;
    if (!username || !password)
        next({ stat: 400, message: 'Please include a username and password' });
    else next();
}
