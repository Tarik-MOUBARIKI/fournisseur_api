const express = require('express');
const router = express.Router();
const ProductPromoController = require('../controllers/ProductPromo.controller');


router.get('/getProductPromoByFournisseur/:id', ProductPromoController.getProductPromoByFournisseur);
router.get('/getProductByCategory/:id', ProductPromoController.getProductPromoByCategory);
router.get('/getAllProductPromo', ProductPromoController.getAllProductPromo);

module.exports = router;