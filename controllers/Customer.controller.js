const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");
const jwt_decode = require('jwt-decode');

const Customer = require('../models/Customer.model');


//------------------------Client authentication---------------------
const addCustomer = async (req, res) => {


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
        const role = "Epicier";
        const status = "InValide";
        const verified = false;      
        const CustomerPush = new Customer({
            fullName,
            email,
            login,
            role,
            status,
            password,
            verified
        });
        CustomerPush
        
            .save()
            .then(() => res.json("Customer ADDED!!!!!"))
            .catch((err) => res.status(400).json("Error :" + err));
    });
// ----------------------send email validation -------------------------------   
    const token = jwt.sign({login: req.body.login, email : req.body.email}, 'tokenkey');

    const transport = nodemailer.createTransport({
      service: "gmail",
          auth: {
            user: 'tarek.brief@gmail.com',//email
            pass: 'brief@2021'//password
          }
      })
    
      await transport.sendMail({
          from: 'tarek.brief@gmail.com',
          to: req.body.email,
          subject: "Email Activated Account",
          html: `
          <h2>Please click on below link to activate your account</h2>
          <p>http://localhost:3000/customer/activateCompte/${token}</p>
      `
      })
  
    
}
//------------------------Customer authentication---------------------
const activateCompteCustomer =  async(req, res) => {
    const token = req.params.token;
  
    jwt.verify(token, 'tokenkey');
  
    let decoded = await jwt_decode(token);
    let login = decoded.login;
  
     await Customer.findOneAndUpdate({ login: login },{verified : true});
  
     res.json({
             message : "ok"
     });
  }
  
//-------------------------login Customer-----------------------------
const loginCustomer = (req, res) => {


    let login = req.body.login;
    let password = req.body.password;
  
    Customer.findOne({
        login: login
      })
      .then(Customer => {
  
        if (Customer) {
          bcrypt.compare(password, Customer.password, function (err, result) {
            if (err) {
              res.json({
                error: err
              })
            }
            if (result) {

              if(Customer.verified == false){
                res.json({
                  verified: 'InActive'
                  })
            }if(Customer.role != "Customer"){
              res.json({
                role: Customer.role
                })
          }else{

            let token = jwt.sign({
                login: login
              }, 'tokenkey', (err, token) => {
                res.cookie("token", token),
                // res.cookie("role", role)
                res.json({
                  token: token,
                  role: Customer.role,
                  id:Customer._id,
                  verified:Customer.verified,
                })
              })
            }



            } 
            
          })
        } else {
          res.json({
            message: 'Customer not found'
          })
        }
      }).catch((err) => res.status(400).json("Error :" + err));
  }
 //-------------------------logout Customer and remove token-----------------------------   
 const logout = (req, res) => {
    const deconnect = res.clearCookie("token")
  
    res.json({
        message: 'User is Signout !!'
    })
  }

module.exports={
    addCustomer,activateCompteCustomer,loginCustomer,logout
  };