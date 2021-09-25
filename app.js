require('express-async-errors');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const fileUpload = require('express-fileupload');
const app = express();

// routers
const userAuthRouter = require('./routes/userAuthRouter');
const dishRouter = require('./routes/dishRouter');
const cartRouter = require('./routes/CartRouter');

// middleware
app.use(express.json());
app.use(cors());
app.use(fileUpload());

// routes
app.use('/api',userAuthRouter);
app.use('/api/dish',dishRouter)
app.use('/api/cart',cartRouter);

// root api
app.get('/',(req,res)=>{
    res.send('hello world, i am root api')
})

app.use((err, req, res, next)=>{
    return res.status(500).send(err.message)
})

module.exports = app;