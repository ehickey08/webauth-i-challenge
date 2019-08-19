const bcrypt = require('bcryptjs');
const Users = require('../users/usersModel');

module.exports = restricted;

function restricted(req, res, next) {
    const { username, password } = req.headers;
    if (username && password) {
        Users.findByUsername(username)
            .first()
            .then(user => {
                if (user && bcrypt.compareSync(password, user.password)) next();
            })
            .catch(err => {
                next({ err, stat: 401, message: 'Invalid username.' });
            });
    } else {
        next({ stat: 400, message: 'Please send valid credentials.' });
    }
    next();
}
