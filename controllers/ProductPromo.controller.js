const ProductPromo = require('../models/ProductPromo.model');  
   
   
   
   //________________________Get Product Promo By Fournisseur ____________________
   const getProductPromoByFournisseur = (req, res) => {
    ProductPromo.find({
        fournisseur: req.params.id
      })
      .populate('category')
      .then(Product => {
        res.send(Product);
      }).catch(err => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving question."
        });
      });
  };
    //________________________Get Product Promo By category ____________________
    const getProductPromoByCategory = (req, res) => {
        ProductPromo.find({
            category: req.params.id
          })
          .populate('category')
          .then(Product => {
            res.send(Product);
          }).catch(err => {
            res.status(500).send({
              message: err.message || "Some error occurred while retrieving question."
            });
          });
      };
        //______________________get all Product Promo _____________________ 
  const getAllProductPromo = (req, res) => {
    ProductPromo.find()
    .populate('fournisseur')
    .populate('category')
    .then(ProductInfos => {
          res.status(200).json(ProductInfos);
        }).catch(error => {
          console.log(error);
          res.status(500).json({
              message: "Error!",
              error: error
          });
        });
  };
       
  module.exports={
    getProductPromoByFournisseur,getProductPromoByCategory,getAllProductPromo
};