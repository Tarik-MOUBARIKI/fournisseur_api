const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Categories = new Schema(
{
    nameCategorie: {
        type: String,
        required: true,
        trim: true,
    },
    imageCategorie: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },

},
 {
    versionKey: false
});

const CategoriesList = mongoose.model("Categories",Categories);
module.exports=CategoriesList;