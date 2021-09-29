const router = require('express').Router();
const authorize = require('../middlewares/authorize');
const admin = require('../middlewares/admin');
const { addCart, getAllCartItem } = require('../controllers/cartController');

router.route('/')
    .post(authorize,addCart)

router.route('/all/item')
    .get([authorize,admin],getAllCartItem)

module.exports = router;