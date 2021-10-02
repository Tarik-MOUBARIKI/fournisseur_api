const express = require('express');
const router = express.Router();
const FournisseurController = require('../controllers/Fournisseur.controlle');


router.post('/authentication', FournisseurController.addFournisseur)
router.post('/login', FournisseurController.loginFournisseur);
router.post('/addProduct', FournisseurController.addProduct);
router.get('/getAllProduct', FournisseurController.getAllProduct);
router.delete('/deleteProduct/:id', FournisseurController.deleteProduct);
router.put('/updateProduct/:id', FournisseurController.updateProduct);
router.get('/getProductById/:id', FournisseurController.getProductById);
router.get('/logout', FournisseurController.logout);
router.get('/getProductByFournisseurName/:fournisseur', FournisseurController.getProductByFournisseurName);



module.exports = router;
