const { Schema, model } = require('mongoose');
const jwt = require('jsonwebtoken');
const joi = require('joi');


const userAuthSchema = new Schema({
    name: {
        type: String,
        required: [true, "please insert your name"],
        minlength: 2,
        maxlength: 1024
    },
    email: {
        type: String,
        required: [true, "please insert your email"],
        unique: true,
        minlength: 5,
        maxlength: 255
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
}, {
    timestamps: true
})

userAuthSchema.methods.generateJWT = function () {
    const token = jwt.sign({
        _id: this._id,
        email: this.email,
        name: this.name,
        role: this.role
    }, process.env.JWT_SECRET_KEY, {
        expiresIn: '1h'
    })
    return token;
}

const validateUser = user => {
    const schema = joi.object({
        name: joi.string().required().min(2).max(255),
        email: joi.string().min(5).max(255).required().email(),
        password: joi.string().min(5).max(255).required()
    })
    return schema.validate(user)
}

module.exports.User = model('User', userAuthSchema);
module.exports.validate = validateUser;