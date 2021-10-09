const Cart = require('../models/Cart.model');
const { populate } = require('../models/Cart.model');


const addToCart = async(req,res) =>{
    
    const quantity= req.body.quantity;  
    const customer= req.body.customer;
    const product = req.body.product;
    const type = req.body.type;
    const CartPush = new Cart({
          quantity,
          customer,
          product,
          type
     });
   //Save
       
   let result = await CartPush.save();
   res.send(result)
   
   };

  //________________________Get All Product in Cart ____________________
  const getCart = (req, res) => {
    Cart.find({
        customer: req.params.id
      })
      .populate('customer')
      .populate('product')
      .then(Cart => {
        res.send(Cart);
      }).catch(err => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving question."
        });
      });
  };
   





   module.exports={
    addToCart,getCart
};