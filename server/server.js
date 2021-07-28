'use strict';

let CONFIG = require('./config');
let HELPER = require('./lib/helper');

const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose')
const errorHandler = require('./lib/errorHandler');
const auth = require('./middleware/auth');

// Connect to DB
mongoose.connect(`${CONFIG.MONGO_DB_CONNECTION}${CONFIG.MONGO_DB_NAME}`, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
  .then(() => console.log('Connection to DB is established..'))
  .catch(err => console.log(err));

mongoose.set('useCreateIndex', true);

// user account
// const { users, cheeses } = require('./data');

// handle json body request
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.status(200).send({ data: { message: 'Hello World!' } });
});

app.post('/api/register', (req, res) => {

    let user = auth.registerUser(req, res);

    if (user){
        let api_key = user.api_key;
        user.save(function(err){
            if (err){
                return errorHandler(err, req, res);
            }
            else{
                res.status(201).send({ data: { "api_key": api_key } });
            }
        })
    }
    else {
        console.log("not here")
        return errorHandler("Something went wrong", req, res)
    }
});

app.get('/api/v1/next', auth.validateKey, (req, res) => {
    HELPER.updatePointer(req, res);
});

app.get('/api/v1/current', auth.validateKey, (req, res) => {
    res.status(200).send({
        data: req.body.user.pointer,
    });
});

app.put('/api/v1/current', auth.validateKey, (req, res) => {
    HELPER.updatePointer(req, res);
});

app.listen(CONFIG.SERVER_PORT, function (err) {
    if (err){
        console.error('Failed to launch server');
        return;
    }
    console.log(`Listening on port ${CONFIG.SERVER_PORT}`);
});