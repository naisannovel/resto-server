const router = require('express').Router();
const { signUp,login } = require('../controllers/userAuthController');
const authorize = require('../middlewares/authorize');
const admin = require('../middlewares/admin');

router.route('/signup').post(signUp)
router.route('/login').post(login)

module.exports = router;