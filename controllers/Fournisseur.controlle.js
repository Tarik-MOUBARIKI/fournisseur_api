const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Fournisseur = require('../models/Fournisseur.model');
const Product = require('../models/Product.model');
const ProductPromo = require('../models/ProductPromo.model');
const { populate } = require('../models/Fournisseur.model');



  //-------------------------login Fournisseur-----------------------------
  
  const loginFournisseur = (req, res) => {
  

  
      let login = req.body.login;
      let password = req.body.password;
  
      Fournisseur.findOne({
      login: login
      })
      .then(Fournisseur => {
  
        if (Fournisseur) {
          bcrypt.compare(password, Fournisseur.password, function (err, result) {
            if (err) {
              res.json({
                error: err
              })
            }
  
            if (result) {
  
        // console.log(result.status);
  
  
              if(Fournisseur.status == "InActive"){
                  res.json({
                    status: 'InActive'
                    })
              }
              else if(Fournisseur.status == "Block"){
                res.json({
                  status: 'Block'
                  })
            }
              
              
              
              else {
                let token = jwt.sign({
                  login: login
                }, 'tokenkey', (err, token) => {
                  res.cookie("token", token)
                  res.json({
                    token: token,
                    id:Fournisseur._id

                  })
                
              })
            }
  
  
          }
          
          
          
              
          else {
              res.json({
                message: 'password incorrect try again !!'
              })
            }
          })
        } else {
          res.json({
            message: 'Admin not found'
          })
        }
      }).catch((err) => res.status(400).json("Error :" + err));
  }
  //______________________Add Product_____________________ 
  const addProduct = async(req,res) =>{
    
   const titel= req.body.titel;
   const description= req.body.description;
   const productImg= req.body.productImg;
   const price= req.body.price;
   const quantity= req.body.quantity;  
   const fournisseur= req.body.fournisseur;
   const currentDate= req.body.currentDate;
   const category = req.body.category;
  
   const productPush = new Product({
         titel,
         description,
         productImg,
         price,
         fournisseur,
         Fournisseur,
         quantity,
         currentDate,
         category
    });
  //Save
      
  let result = await productPush.save();
  res.send(result)
  
  };
    //______________________Add Product_____________________ 
    const addProductPromo = async(req,res) =>{
    
      const titel= req.body.titel;
      const description= req.body.description;
      const productImg= req.body.productImg;
      const oldPrice= req.body.oldPrice;
      const newPrice= req.body.newPrice;
      const quantity= req.body.quantity;  
      const fournisseur= req.body.fournisseur;
      const currentDate= req.body.currentDate;
      const category = req.body.category;
     
      const productPromoPush = new ProductPromo({
            titel,
            description,
            productImg,
            oldPrice,
            newPrice,
            fournisseur,
            Fournisseur,
            quantity,
            currentDate,
            category
       });
     //Save
         
     let result = await productPromoPush.save();
     res.send(result)
     
     };
  //________________________ Change Password __________________________________
const ChangePassword = (req, res) => {
  // Find Seller By ID and update it
  Fournisseur.updateOne(
                   {_id: req.params.id},
                    {
                      password : req.body.password,
                    }
                  )
  .then(() => res.status(201).json(" Password Changed successfully"))
  .catch((err) => res.status(400).json("Error :" + err));
};
  //______________________get all Product_____________________ 
  const getAllProduct = (req, res) => {
    Product.find()
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
    //______________________get all Promo Product_____________________ 
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
  //______________________Delete Product_____________________ 
  const deleteProduct = (req, res) => {
    const {id} = req.params;
    Product.findOneAndDelete({_id: id})
        .then(Product => {
            if(!Product) {
              res.status(404).json({
                message: "Does Not exist a Product with id = ",
                error: "404",
              });
            }
            res.status(200).json({});
        }).catch(err => {
            return res.status(500).send({
              message: "Error -> Can NOT delete a Product with id = ",
              error: err.message
            });
        });
  };
    //______________________Delete Product Promo _____________________ 
    const deleteProductPromo = (req, res) => {
      const {id} = req.params;
      ProductPromo.findOneAndDelete({_id: id})
          .then(Product => {
              if(!Product) {
                res.status(404).json({
                  message: "Does Not exist a Product with id = ",
                  error: "404",
                });
              }
              res.status(200).json({});
          }).catch(err => {
              return res.status(500).send({
                message: "Error -> Can NOT delete a Product with id = ",
                error: err.message
              });
          });
    };
  //________________________updating Product____________________
  const updateProduct = (req, res) => {
    // Find Product By ID and update it
    Product.updateOne({
        _id: req.params.id
      }, {
        titel: req.body.titel,
        description: req.body.description,
        productImg: req.body.productImg,
        price: req.body.price,
        quantity: req.body.quantity,  
        fournisseur: req.body.fournisseur,
        currentDate: req.body.currentDate,
      })
      .then(() => res.status(201).json("Product updated successfully"))
      .catch((err) => res.status(400).json("Error :" + err));
  };
    //________________________updating Product Promo____________________
    const updateProductPromo = (req, res) => {
      // Find Product By ID and update it
      ProductPromo.updateOne({
          _id: req.params.id
        }, {
          titel: req.body.titel,
          description: req.body.description,
          productImg: req.body.productImg,
          oldPrice: req.body.oldPrice,
          newPrice: req.body.newPrice,
          quantity: req.body.quantity,  
          fournisseur: req.body.fournisseur,
          currentDate: req.body.currentDate,
        })
        .then(() => res.status(201).json("Product updated successfully"))
        .catch((err) => res.status(400).json("Error :" + err));
    };
    
  //________________________Get Product By id ____________________
  const getProductById = (req, res) => {
    Product.findById(req.params.id)
    .populate('fournisseur')
    .populate('category')
        .then(Product => {
          res.status(200).json(Product);
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Product not found with id " + req.params.id,
                    error: err
                });                
            }
            return res.status(500).send({
                message: "Error retrieving Category with id " + req.params.id,
                error: err
            });
        });
  };
    //________________________Get Product Promo By id ____________________
    const getProductPromoById = (req, res) => {
      ProductPromo.findById(req.params.id)
      .populate('fournisseur')
      .populate('category')
          .then(Product => {
            res.status(200).json(Product);
          }).catch(err => {
              if(err.kind === 'ObjectId') {
                  return res.status(404).send({
                      message: "Product not found with id " + req.params.id,
                      error: err
                  });                
              }
              return res.status(500).send({
                  message: "Error retrieving Category with id " + req.params.id,
                  error: err
              });
          });
    };
   //-------------------------logout fournisseur and remove token-----------------------------   
   const logout = (req, res) => {
    const deconnect = res.clearCookie("token")
  
    res.json({
        message: 'User is Signout !!'
    })
  }
  
  // //________________________Get Product By NameFournisseur ____________________
  // const getProductByFournisseurName = (req, res) => {
  //   Product.find({
  //       fournisseur: req.params.id
  //     })
  //     .then(Product => {
  //       res.send(Product);
  //     }).catch(err => {
  //       res.status(500).send({
  //         message: err.message || "Some error occurred while retrieving question."
  //       });
  //     });
  // };
  
  //  //________________________Get Product By NameFournisseur ____________________
  //  const getProductPromoByFournisseur = (req, res) => {
  //   ProductPromo.find({
  //       fournisseur: req.params.id
  //     })
  //     .then(Product => {
  //       res.send(Product);
  //     }).catch(err => {
  //       res.status(500).send({
  //         message: err.message || "Some error occurred while retrieving question."
  //       });
  //     });
  // };
   
  
  
  module.exports={
      loginFournisseur,addProduct,getAllProduct,deleteProduct,updateProduct,getProductById,logout,ChangePassword,addProductPromo,getAllProductPromo,getProductPromoById,updateProductPromo,deleteProductPromo
  };