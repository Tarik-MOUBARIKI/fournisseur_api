const Product = require('../models/Product.model');
 
 //________________________Get Product By NameFournisseur ____________________
  const getProductByFournisseurName = (req, res) => {
    Product.find({
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
  
  
  //________________________Get Product By category ____________________
  const getProductByCategory = (req, res) => {
    Product.find({
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
   
  
  module.exports={
      getProductByFournisseurName,getProductByCategory
  };