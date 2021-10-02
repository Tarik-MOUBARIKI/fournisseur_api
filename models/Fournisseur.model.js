const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Fournisseur = new Schema(
    {
        fullName: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
        },
        login: {
            type: String,
            required: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            trim: true,
        },

        status : {
            type : String,
            required : true,
            trim : true,
        },
        company : {
            type : String,
            required : true,
            trim : true,
        },
          listedProduct: {
            type: Number,
            default: 0,
          }
      
    }
);
const FournisseurList = mongoose.model("Fournisseur",Fournisseur);
module.exports = FournisseurList;
