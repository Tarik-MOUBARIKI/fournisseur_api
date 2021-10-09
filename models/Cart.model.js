const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Cart = new Schema(
    {
        quantity : {
            type : Number,
            required : true,
            trim : true,
        },
        type : {
            type : String,
            required : true,
            trim : true,
        },
        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Customer'
        },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        },
    }
);

const cartList = mongoose.model("Cart",Cart);
module.exports = cartList;
