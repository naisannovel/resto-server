const { User, validate } = require('../models/userAuthModel');
const bcrypt = require('bcrypt');
const _ = require('lodash');

module.exports.signUp = async (req, res) => {

    const { value, error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({
        email: req.body.email
    })

    if (user) return res.status(400).send('user already exist');

    user = new User(value);

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt)

    const token = user.generateJWT()
    try{
        const result = await user.save()
        return res.status(201).send({
            message:'signup success',
            token,
            data: _.pick(result,["_id","name","email"])
        })
    }catch(err){
        return res.status(400).send(err)
    }
}

module.exports.login = async (req,res)=>{
    const user = await User.findOne({email:req.body.email});
    if(!user) return res.status(400).send('Invalid email or password');

    const validUser = await bcrypt.compare(req.body.password,user.password);
    if(!validUser) return res.status(400).send('Invalid email or password');

    const token = user.generateJWT();

    res.send({
        message:'login success',
        token,
        data:_.pick(user,['_id','name','email'])
    })
}