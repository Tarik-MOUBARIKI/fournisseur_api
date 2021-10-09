const express = require('express');
const router = express.Router();
const CartController = require('../controllers/Cart.controller');


router.post('/addToCart', CartController.addToCart);
router.get('/getCart/:id', CartController.getCart);


module.exports = router;