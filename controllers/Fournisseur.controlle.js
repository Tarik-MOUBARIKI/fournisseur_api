const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Fournisseur = require('../models/Fournisseur.model');
const Product = require('../models/Product.model');
const date = new Date();

const addFournisseur = (req, res) => {


  
      bcrypt.hash(req.body.password, 10, function (err, hashPassword) {
          if (err) {
              res.json({
                  error: err
              })
          }
          const fullName = req.body.fullName;
          const email = req.body.email;
          const login = req.body.login;
          const password = hashPassword;
          const status = "InActive";
     
          const FournisseurPush = new Fournisseur({
              fullName,
              email,
              login,
              password,              
              status,
              
          });
          FournisseurPush
          
              .save()
              .then(() => res.json("Fournisseur authentication successfully Please Wait untill Admin ACCEPTER Your Account"))
              .catch((err) => res.status(400).json("Error :" + err));
      });
  }
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
  const addProduct = (req,res) =>{
    
   const titel= req.body.titel;
   const description= req.body.description;
   const productImg= req.body.productImg;
   const price= req.body.price;
//    const category= req.body.category;
   const quantity= req.body.quantity;  
   const fournisseur= req.body.fournisseur;
   const currentDate= date;
   const status = req.body.status;
  
   const productPush = new Product({
         titel,
         description,
         productImg,
         price,
         fournisseur,
         quantity,
         idSeller,
         currentDate,
         status
    });
  //Save
  productPush
  .save()
  .then(() => res.status(201).json("Product added successfully"))
  .catch((err) => res.status(400).json("Error :" + err));
  
  };
  //______________________get all Product_____________________ 
  const getAllProduct = (req, res) => {
    Product.find()
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
        currentDate: date,
        status : req.body.status,
      })
      .then(() => res.status(201).json("Product updated successfully"))
      .catch((err) => res.status(400).json("Error :" + err));
  };
  
  //________________________Get Product By Product____________________
  const getProductById = (req, res) => {
    Product.findById(req.params.id)
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
  
  //________________________Get Product By NameFournisseur ____________________
  const getProductByFournisseurName = (req, res) => {
    Product.find({
        fournisseur: req.params.fournisseur
      })
      .then(Product => {
        res.send(Product);
      }).catch(err => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving question."
        });
      });
  };
  
  
  
  
  module.exports={
      addFournisseur,loginFournisseur,addProduct,getAllProduct,deleteProduct,updateProduct,getProductById,logout,getProductByFournisseurName
  };