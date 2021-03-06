const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Product = new Schema(
    {
        titel : {
            type : String,
            required : true,
            trim : true,
        },
        description : {
            type : String,
            required : true,
            trim : true,
        },
        productImg : {
            type : String,
            required : true,
            trim : true,
        },
        price : {
            type : Number,
            required : true,
            trim : true,
        },
        quantity : {
            type : Number,
            required : true,
            trim : true,
        },
        currentDate : {
            type : Date,
            required : true,
            trim : true,
        },

        fournisseur: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Fournisseur'
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Categories'
        },
    }
);

const productList = mongoose.model("Product",Product);
module.exports = productList;
