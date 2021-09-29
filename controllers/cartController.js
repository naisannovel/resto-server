const { CartModel } = require("../models/cartModel");

module.exports.addCart = async (req,res)=>{
    const userId = req.user._id;
    const data = req.body;
    data.user = userId;
    let cartItem = new CartModel(data);
   try{
    const result = await cartItem.save();
    res.status(201).send(result);
   }catch(err){
       res.status(400).send(err)
   }
}

module.exports.getAllCartItem = async (req,res) => {
    const cartItems = await CartModel.find({}).populate('user','name email').populate('myCart.cartItem', 'name price');
    return res.status(200).send(cartItems);
};
