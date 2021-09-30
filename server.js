const app = require('./app');
const mongoose = require('mongoose');

const DB = process.env.MONGODB_SERVER.replace('<PASSWORD>',process.env.DB_PASSWORD)

mongoose.connect(DB)
    .then(()=>console.log('mongoDB connected successfully'))
    .catch(err=>console.log('mongoDB connection failed'));

app.listen(process.env.PORT || 4002,()=>{
    console.log(`Listening on port ${process.env.PORT}`);
})