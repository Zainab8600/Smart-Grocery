import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },
brand: {
  type: String,
},
size: {
  type: String,
},

    price: {
      type: Number,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    quantity: {
      type: Number,
      default: 20,
    },

    expiryDate: {
      type: Date,
      required: false,
    },

    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;