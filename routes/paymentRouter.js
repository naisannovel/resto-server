const router = require('express').Router();
const payment = require('../controllers/paymentController');

router.route('/')
    .post(payment)

module.exports = router;