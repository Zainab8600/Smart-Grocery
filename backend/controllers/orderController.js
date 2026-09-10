import Order from "../models/Order.js";
import Product from "../models/Product.js";


export const createOrder = async (req, res) => {
  try {
    const {
      items,
      total,
      deliveryAddress,
      deliverySlot,
      paymentMethod,
    } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({
        message: "Order must contain at least one product",
      });
    }

    if (!deliveryAddress) {
      return res.status(400).json({
        message: "Delivery address is required",
      });
    }

    const order = await Order.create({
      items,
      total,
      deliveryAddress,
      deliverySlot,
      paymentMethod,
      status: "Confirmed",
    });
    for (const item of items) {
  const product = await Product.findById(item.productId)

  if (!product) {
    return res.status(404).json({
      message: `Product ${item.name} not found`,
    })
  }

  if (product.quantity < item.quantity) {
    return res.status(400).json({
      message: `Not enough stock for ${item.name}`,
    })
  }

  product.quantity -= item.quantity
  await product.save()
}

    res.status(201).json({
  ...order.toObject(),
  id: order._id.toString(),
  date: order.createdAt
    ? new Date(order.createdAt).toLocaleDateString()
    : new Date().toLocaleDateString(),
});
  } catch (error) {
    res.status(500).json({
      message: "Failed to create order",
      error: error.message,
    });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });

const formattedOrders = orders.map((order) => ({
  ...order.toObject(),
  id: order._id.toString(),
  date: order.createdAt
    ? new Date(order.createdAt).toLocaleDateString()
    : '',
}));

res.status(200).json(formattedOrders);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
};