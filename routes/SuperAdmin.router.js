const express = require('express');
const router = express.Router();
const SuperAdminController = require('../controllers/SuperAdmin.controller');



router.post('/authentication',SuperAdminController.addSuperAdmin);
router.post('/login', SuperAdminController.loginSuperAdmin);
router.get('/logout', SuperAdminController.logout);
router.post('/addFournisseur', SuperAdminController.addFournisseur)
router.delete('/deleteFournisseur/:id',SuperAdminController.deleteFournisseur);
router.put('/updateFournisseur/:id',SuperAdminController.updateFournisseur);
router.get('/getFournisseurById/:id',SuperAdminController.getFournisseurById);
router.get('/getAllFournisseur',SuperAdminController.getAllFournisseur);
router.post('/addCategorie', SuperAdminController.addCategorie);
router.get('/getAllCategorie', SuperAdminController.getAllCategorie);
router.delete('/deleteCategorie/:id', SuperAdminController.deleteCategorie);
router.put('/updateCategorie/:id', SuperAdminController.updateCategorie);
router.get('/getCategorieById/:id', SuperAdminController.getCategorieById);

module.exports = router;