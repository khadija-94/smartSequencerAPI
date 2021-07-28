const User = require('../models/user');
const errorHandler = require('./errorHandler');

function updatePointer(req, res, next) {
    if (!req.body.user) { return errorHandler("Access denied", req, res) }

    let user_id = req.body.user.id;
    newPointer = ++req.body.user.pointer;

    if (req.method == "PUT"){
        if (!req.body.current)
            return errorHandler("Missing params!", req, res )
        else
            newPointer = req.body.current
    }

    User.findOneAndUpdate({_id: user_id}, { pointer: newPointer }, { useFindAndModify: false , runValidators: true }, function(err){
        if(err){
            return errorHandler(err, req, res )
        }
        else{
            res.status(200).send({
                data: newPointer,
            })
        }
    })
}

module.exports = { updatePointer };