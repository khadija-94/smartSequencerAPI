const User = require('../models/user');

const registerUser = (req , res) => {
    let user = new User ({
        email: req.body.email,
        password: req.body.password,
        pointer: req.body.pointer,
    });
    return user;
};


// FORMAT OF TOKEN
// Authorization: Bearer <access_token>

// Verify Token
const verifyToken = (req, res, next) => {
    // Get auth header value
    const authHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if(typeof authHeader !== 'undefined') {
      // Split at the space
      const bearer = authHeader.split(' ');
      // Get token from array
      const bearerToken = bearer[1];
      // Set the token
      req.token = bearerToken;
      // Next middleware
      next();
    } else {
      // Forbidden
      res.json({ "error": "Something went wrong"});
    }
 
}

module.exports = { registerUser, verifyToken };