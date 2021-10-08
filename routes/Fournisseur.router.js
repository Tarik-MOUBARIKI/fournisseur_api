const express = require('express');
const router = express.Router();
const FournisseurController = require('../controllers/Fournisseur.controlle');



router.post('/login', FournisseurController.loginFournisseur);
router.post('/addProduct', FournisseurController.addProduct);
router.get('/getAllProduct', FournisseurController.getAllProduct);
router.delete('/deleteProduct/:id', FournisseurController.deleteProduct);
router.put('/updateProduct/:id', FournisseurController.updateProduct);
router.post('/addProductPromo', FournisseurController.addProductPromo);
router.get('/getAllProductPromo', FournisseurController.getAllProductPromo);
router.delete('/deleteProductPromo/:id', FournisseurController.deleteProductPromo);
router.put('/updateProductPromo/:id', FournisseurController.updateProductPromo);
router.put('/changePassword/:id', FournisseurController.ChangePassword);
router.get('/getProductById/:id', FournisseurController.getProductById);
router.get('/getProductPromoById/:id', FournisseurController.getProductPromoById);
router.get('/logout', FournisseurController.logout);
// router.get('/getProductByFournisseurName/:id', FournisseurController.getProductByFournisseurName);
// router.get('/getProductPromoByFournisseur/:id', FournisseurController.getProductPromoByFournisseur);



module.exports = router;
