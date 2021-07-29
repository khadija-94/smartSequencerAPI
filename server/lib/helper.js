const User = require('../models/user');
const errorHandler = require('./errorHandler');

function updatePointer(user, req, res, next) {
    if (!user) { return errorHandler("Access denied", req, res) }
    let newPointer = ++(user.pointer);
    if (req.method == "PUT"){
        if (!req.body.pointer)
            return errorHandler("Missing params!", req, res);
        else
            newPointer = req.body.pointer;
    }
    User.updateOne({_id: user._id}, { pointer: newPointer }, { runValidators: true}, function (err, user) {
        if (err){
            return errorHandler(err, req, res);
        }
        else{
            res.status(200).send({
                "pointer" : newPointer,
            })
        }
    });
}

module.exports = { updatePointer };