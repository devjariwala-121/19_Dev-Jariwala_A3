const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
{
    categoryId:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },

    subCategoryId:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubCategory",
        required: true
    },

    productName:
    {
        type: String,
        required: true
    },

    price:
    {
        type: Number,
        required: true
    },

    description:
    {
        type: String
    },

    image:
    {
        type: String
    }
},
{
    timestamps: true
}
);

module.exports = mongoose.model("Product", productSchema);