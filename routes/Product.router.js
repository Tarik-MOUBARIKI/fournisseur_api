const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/Product.controller');


router.get('/getProductByFournisseurName/:id', ProductController.getProductByFournisseurName);
router.get('/getProductByCategory/:id', ProductController.getProductByCategory);


module.exports = router;