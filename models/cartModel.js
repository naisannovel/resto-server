const { Schema, model } = require('mongoose');

const cartSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    address: {
        type: Object,
        required: true
    },
    myCart: [{
        cartItem: {
            type: Schema.Types.ObjectId,
            ref: "Dish",
            required: true,
        },
        quantity:{
            type: Number,
            min: 1,
            max: 5,
            required: true
        }
    }],
}, {
    timestamps: true
})

module.exports.CartModel = model('Cart', cartSchema);