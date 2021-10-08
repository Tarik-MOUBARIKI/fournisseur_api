const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const SuperAdmin = require('../models/SuperAdmin.model');
const Fournisseur = require('../models/Fournisseur.model');
const Categorie = require('../models/Categories.model');

//_______________________ Super Admin authentication________________________

const addSuperAdmin = (req, res) => {

     bcrypt.hash(req.body.password, 10, function(err, hashPassword) {
              if (err) {
                res.json({error : err})    
              }
          const fullName = req.body.fullName;
          const email = req.body.email;
          const login = req.body.login;
          const password = hashPassword;
          const SuperadminPush = new SuperAdmin({
            fullName,
            email,
            login,
            password,  
          });
          SuperadminPush
            .save()
            .then(() => res.json("SupperAdmin authentication successfully"))
            .catch((err) => res.status(400).json("Error :" + err));
        });
        }
        
//-------------------------login Super Admin-----------------------------
const loginSuperAdmin = (req, res) => {
  
          let login=req.body.login;
          let password=req.body.password;
        
        SuperAdmin.findOne({login : login})
        .then(superadmin => {
        
        if(superadmin){
          bcrypt.compare(password, superadmin.password, function(err, result){
              if (err) {
                  res.json({
                    error : err
                  })
                }
             if(result){
                let token=jwt.sign({login :login},'tokenkey',(err,token) => {
                  res.cookie("token", token)  
                  res.json({
                      token : token
                  })
                })
             }
             
          })
        }else{
          res.json({
              message : 'SuperAdmin not found'
          })
        }
        }).catch((err) => res.status(400).json("Error :" + err));
        }
  // ---------------------add fournisseur------------------
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
              const company = req.body.company
              const status = "InActive";
         
              const FournisseurPush = new Fournisseur({
                  fullName,
                  email,
                  login,
                  password,              
                  status,
                  company
                  
              });
                  let result =  FournisseurPush.save();
                  res.send(result)
          //     FournisseurPush
              
          //         .save()
          //         .then(() => res.json("Fournisseur authentication successfully Please Wait untill Admin ACCEPTER Your Account"))
          //         .catch((err) => res.status(400).json("Error :" + err));
          });
      }
//______________________ get all Fournisseur _____________________ 
const getAllFournisseur= (req, res) => {
    Fournisseur.find()
    .then(FournisseurInfos => {
          res.status(200).json(FournisseurInfos);
        }).catch(error => {
          console.log(error);
          res.status(500).json({
              message: "Error!",
              error: error
          });
        });
};


//________________________updating Fournisseur__________________________________
const updateFournisseur = (req, res) => {
    // Find Seller By ID and update it
    Fournisseur.updateOne(
                     {_id: req.params.id},
                      {
                        status : req.body.status,
                      }
                    )
    .then(() => res.status(201).json("Fournisseur updated successfully"))
    .catch((err) => res.status(400).json("Error :" + err));
  };
  // ______________________get Fournisseur by id__________________
const getFournisseurById = (req, res) => {
    Fournisseur.findById(req.params.id)
        .then(Fournisseur => {
          res.status(200).json(Fournisseur);
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Fournisseur not found with id " + req.params.id,
                    error: err
                });                
            }
            return res.status(500).send({
                message: "Error retrieving Seller with id " + req.params.id,
                error: err
            });
        });
  };
          
  //______________________Delete Fournisseur _____________________ 
  const deleteFournisseur = (req, res) => {
    const {id} = req.params;
    Fournisseur.findOneAndDelete({_id: id})
        .then(fournisseur => {
            if(!fournisseur) {
              res.status(404).json({
                message: "Does Not exist Fournisseur with id = " + id,
                error: "404",
              });
            }
            res.status(200).json({});
        }).catch(err => {
            return res.status(500).send({
              message: "Error -> Can NOT delete a Fournisseur with id = " + id,
              error: err.message
            });
        });
  };
 //-------------------------logout Super Admin and remove token-----------------------------   
 const logout = (req, res) => {
    const deconnect = res.clearCookie("token")
  
    res.json({
        message: 'User is Signout !!'
    })
  }



 //______________________Add Categorie _____________________ 
 const addCategorie = async(req,res) =>{
    
    const nameCategorie= req.body.nameCategorie;
    const imageCategorie= req.body.imageCategorie;
    const description= req.body.description;

   
    const CategoriePush = new Categorie({
          nameCategorie,
          description,
          imageCategorie,
     });
   //Save
   
   let result = await CategoriePush.save();
   res.send(result)
   
   };
   //______________________get all Categorie _____________________ 
   const getAllCategorie = (req, res) => {
    Categorie.find()
     .then(CategorieInfos => {
           res.status(200).json(CategorieInfos);
         }).catch(error => {
           console.log(error);
           res.status(500).json({
               message: "Error!",
               error: error
           });
         });
   };
   
   //______________________Delete Categorie _____________________ 
   const deleteCategorie= (req, res) => {
     const {id} = req.params;
     Categorie.findOneAndDelete({_id: id})
         .then(Categorie => {
             if(!Categorie) {
               res.status(404).json({
                 message: "Does Not exist a Categorie with id = ",
                 error: "404",
               });
             }
             res.status(200).json({});
         }).catch(err => {
             return res.status(500).send({
               message: "Error -> Can NOT delete a Categorie with id = ",
               error: err.message
             });
         });
   };
   
   //________________________updating Categorie______________
   const updateCategorie = (req, res) => {
     // Find Categorie By ID and update it
     Categorie.updateOne({
         _id: req.params.id
       }, {
         nameCategorie: req.body.nameCategorie,
         description: req.body.description,
         imageCategorie: req.body.imageCategorie,
       
       })
       .then(() => res.status(201).json("Categorie updated successfully"))
       .catch((err) => res.status(400).json("Error :" + err));
   };
   
   //________________________Get Categorie By id ____________________
   const getCategorieById = (req, res) => {
    Categorie.findById(req.params.id)
         .then(Categorie => {
           res.status(200).json(Categorie);
         }).catch(err => {
             if(err.kind === 'ObjectId') {
                 return res.status(404).send({
                     message: "Categorie not found with id " + req.params.id,
                     error: err
                 });                
             }
             return res.status(500).send({
                 message: "Error retrieving Category with id " + req.params.id,
                 error: err
             });
         });
   };

module.exports={
    addSuperAdmin, loginSuperAdmin,addFournisseur,getAllFournisseur,updateFournisseur,getFournisseurById,deleteFournisseur,logout,  addCategorie,getAllCategorie,deleteCategorie,updateCategorie,getCategorieById
};