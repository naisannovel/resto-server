const { CartModel } = require("../models/cartModel");

module.exports.addCart = async (req,res)=>{
    const userId = req.user._id;
    const serviceId = req.params.id;

    let cartItem = new CartModel({ user: userId,service: serviceId });
   try{
    const result = await cartItem.save();
    res.status(201).send(result);
   }catch(err){
       res.status(400).send(err)
   }
}

module.exports.getAllCartItem = async (req,res) => {
    const cartItems = await CartModel.find()
    .populate("user", "name email")
    .populate("service");
    return res.status(200).send(cartItems);
};

module.exports.cartItemUpdate = async (req,res) =>{
    const id = req.params.id;
    const status = req.body;
    const result = await CartModel.findByIdAndUpdate(id,status,{ new: true });
    if(result){
        return res.status(200).send('successfully updated')
    }
}
