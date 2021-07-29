'use strict';

let CONFIG = require('./config');
let HELPER = require('./lib/helper');

const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose')
const errorHandler = require('./lib/errorHandler');
const auth = require('./middleware/auth');
const jwt = require('jsonwebtoken');
const User = require('./models/user');

// Connect to DB
mongoose.connect(`${CONFIG.MONGO_DB_CONNECTION}${CONFIG.MONGO_DB_NAME}`, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
  .then(() => console.log('Connection to DB is established..'))
  .catch(err => console.log(err));


// handle json body request
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.status(200).send({ data: { message: 'Hello World!' } });
});

app.post('/api/register', (req, res) => {

    let user = auth.registerUser(req, res);

    if (user){
        // let api_key = user.api_key;
        user.save(function(err, user){
            if (!err){
                jwt.sign({user}, CONFIG.SECRET_KEY, (err, token) => {
                    res.json({
                      token
                    });
                });
            }
            else{
                return errorHandler(err, req, res);
            }
        })
    }
    else {
        return errorHandler("Something went wrong", req, res)
    }
});

app.get('/api/v1/next', auth.verifyToken, (req, res) => {
    jwt.verify(req.token, CONFIG.SECRET_KEY, (err, authData) => {
        if(err) {
            errorHandler("Access denied", req, res)
        } else {
            User.findOne({_id: authData.user._id}, function (err, user){
                if(err) {
                    errorHandler("Access denied", req, res)
                } else {
                    HELPER.updatePointer(user, req, res);
                }
            });
        }
    });
});

app.get('/api/v1/current', auth.verifyToken, (req, res) => {
    jwt.verify(req.token, CONFIG.SECRET_KEY, (err, authData) => {
        if (err) {
            errorHandler("Access denied", req, res)
        } else {
            User.findOne({_id: authData.user._id}, function (err, user){
                if (err) {
                    errorHandler("Access denied", req, res)
                } else {
                    res.json({
                        "pointer": user.pointer,
                    });
                }
            });   
        }
    });
});

app.put('/api/v1/current', auth.verifyToken, (req, res) => {
    jwt.verify(req.token, CONFIG.SECRET_KEY, (err, authData) => {
        if(err) {
            errorHandler("Access denied", req, res)
        } else {
            User.findOne({_id: authData.user._id}, function (err, user){
                if (err) {
                    errorHandler("Access denied", req, res)
                } else {
                    HELPER.updatePointer(user, req, res);
                }
            });   
        }
    });
});

app.listen(CONFIG.SERVER_PORT, function (err) {
    if (err){
        console.error('Failed to launch server');
        return;
    }
    console.log(`Listening on port ${CONFIG.SERVER_PORT}`);
});

// app.post('/api/v2/register', verifyToken, (req, res) => {  
//     jwt.verify(req.token, 'secretkey', (err, authData) => {
//       if(err) {
//         res.sendStatus(403);
//       } else {
//         res.json({
//           message: 'Post created...',
//           authData
//         });
//       }
//     });
//   });
// });
  
//   app.post('/api/v2/register', (req, res) => {
//     // Mock user
//     const user = {
//       id: 1, 
//       username: 'brad',
//       email: 'brad@gmail.com'
//     }
  
//     jwt.sign({user}, 'secretkey', { expiresIn: '30s' }, (err, token) => {
//       res.json({
//         token
//       });
//     });
//   });