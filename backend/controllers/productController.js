import Product from "../models/Product.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

const formattedProducts = products.map((product) => ({
  ...product.toObject(),
  id: product._id.toString(),
  stock: product.quantity,
  lowStockThreshold: 5,
}));

res.status(200).json(formattedProducts);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch products",
      error: error.message,
    });
  }
};