require('express-async-errors');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const fileUpload = require('express-fileupload');
const app = express();

// router
const userAuthRouter = require('./routes/userAuthRouter');

// middleware
app.use(express.json());
app.use(cors());
app.use(fileUpload());

// route
app.use('/api',userAuthRouter)

// root api
app.get('/',(req,res)=>{
    res.send('hello world, i am root api')
})

app.use((err, req, res, next)=>{
    return res.status(500).send(err.message)
})

module.exports = app;