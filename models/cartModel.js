const { Schema, model } = require('mongoose');

const cartSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    myService: [{
        service: {
            type: Schema.Types.ObjectId,
            ref: "Service",
            required: true,
        },
        quantity:{
            type: Number,
            min: 1,
            max: 5,
            required: true
        },
        status: {
            type: String,
            enum: ['pending', 'ongoing', 'done'],
            default: 'pending',
            required: true
        }
    }],
}, {
    timestamps: true
})

module.exports.CartModel = model('Cart', cartSchema);