const app = require('./app');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_SERVER_LOCAL)
    .then(()=>console.log('mongoDB connected successfully'))
    .catch(err=>console.log('mongoDB connection failed'));

app.listen(process.env.PORT,()=>{
    console.log(`Listening on port ${process.env.PORT}`);
})