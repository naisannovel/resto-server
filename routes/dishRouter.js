const router = require('express').Router();
const authorize = require('../middlewares/authorize');
const admin = require('../middlewares/admin');
const { addDish, fetchAllDishes,deleteDish, updateDishPrice } = require('../controllers/dishController');


router.route('/')
    .get(fetchAllDishes)
    .get([authorize,admin],fetchAllDishesAdmin)
    .post([authorize,admin],addDish)

router.route('/:id')
    .put([authorize,admin],updateDishPrice)
    .delete([authorize,admin],deleteDish)

module.exports = router;