const crypto = require('crypto');
const errorHandler = require('../lib/errorHandler');
const User = require('../models/user');

const genKey = () => {
    var rand = new Buffer.alloc(32, 'base64'); // multiple of 3 for base64
    this.sequenceNumber = (this.sequenceNumber + 1) | 0;

    rand.writeInt32BE(this.sequenceNumber, 28);

    crypto.randomBytes(29).copy(rand);

    return rand.toString('base64').replace(/\//g, '_').replace(/\+/g, '-');
};

const registerUser = (req , res) => {
    let user = new User ({
        email: req.body.email,
        password: req.body.password,
        api_key: genKey(),
        pointer: req.body.current,
    });
    return user;
};

const validateKey = (req, res, next) => {
    let api_key = req.get('Authorization');
    User.find({}, function(err, users) {

        if (err){

            return errorHandler(err, req, res)
        }
        else {
            users.forEach(function(user) {
                
                if (User.verifyApiKey(api_key, user.api_key)){
                    req.body.user = user;
                }
            })
            if (!req.body.user) { errorHandler("Access denied", req, res)}
            next()
        }
    });
};

module.exports = { registerUser, validateKey };