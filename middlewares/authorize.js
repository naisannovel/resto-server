const jwt = require('jsonwebtoken');

module.exports = (req,res,next)=>{
    let token = req.header('Authorization');
    if(!token) return res.status(401).send('access denied, no token provide');
    token = token.split(' ')[1].trim();

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
        req.user = decoded;
        next();
    }catch(err){
        return res.status(401).send('invalid token');
    }
}