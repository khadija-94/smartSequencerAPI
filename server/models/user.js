const mongoose = require('mongoose');
const validate = require('mongoose-validator');
const bcrypt = require("bcryptjs");
const findOrCreate = require('mongoose-findorcreate');

emailValidator = [
    validate({
        validator: 'isEmail',
        message: 'is not valid',
    }),
    validate({
        validator: function(v){
            return this.model('User').findOne({ email: v }).then(user => !user)
        },
        message: "is already taken"
    }),
];

const userSchema = new mongoose.Schema({
    email: { type: String, required: [true, 'Email is required'], trim: true, lowercase: true, unique: [true, 'Email is already taken'], validate: emailValidator },
    password: { type: String, required: [true, 'Password is required'], trim: true},
    api_key: { type: String , unique: true},
    pointer: { type: Number, default: 1, validate: [validate({
            validator: function(v){
                return v > 0
            },
            message: 'must be a positive number.',
        })]
    },
},
{ timestamps: true })

userSchema.plugin(findOrCreate)

userSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        const salt = bcrypt.genSaltSync(5)
        this.password = bcrypt.hashSync(this.password, salt)
    }
    if (this.isModified('api_key')) {
        const salt = bcrypt.genSaltSync(10)
        this.api_key = bcrypt.hashSync(this.api_key, salt)
    }

    return next();
})

userSchema.static('hashPassword', (password) => {
    if (password) {
        const salt = bcrypt.genSaltSync(5)
        return bcrypt.hashSync(password, salt)
    }
})

userSchema.static('hashApiKey', (api_key) => {
    if (api_key) {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(api_key, salt)
    }
})

userSchema.static('verifyPassword', (password, hash) => {
    if (password && hash) {
      return bcrypt.compareSync(password, hash)
    }
})

userSchema.static('verifyApiKey', (api_key, hash) => {
    if (api_key && hash) {
      return bcrypt.compareSync(api_key, hash)
    }
})

module.exports = mongoose.model('User', userSchema)