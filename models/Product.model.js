const mongoose = require("mongoose");
const date = new Date().getTime();
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
        // category : {
        //     type : String,
        //     required : true,
        //     trim : true,
        // },
        quantity : {
            type : Number,
            required : true,
            trim : true,
        },
 
        fournisseur : {
            type : String,
            required : true,
            trim : true,
        },
        currentDate : {
            type : Date,
            required : true,
            trim : true,
        },
        status : {
            type : String,
            required : true,
            trim : true,
        },
        idFournisseur: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Fournisseur'
        },
        Categorie: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Categorie'
        },
    }
);

const productList = mongoose.model("Product",Product);
module.exports = productList;
