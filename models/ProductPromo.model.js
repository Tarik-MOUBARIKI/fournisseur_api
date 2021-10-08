const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProductPromo = new Schema(
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
        oldPrice : {
            type : Number,
            required : true,
            trim : true,
        },
        newPrice : {
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

const productPromoList = mongoose.model("ProductPromo",ProductPromo);
module.exports = productPromoList;
