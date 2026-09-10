import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    items: [
      {
        productId: {
          type: String,
          required: true,
        },

        name: {
          type: String,
          required: true,
        },

        category: {
          type: String,
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

        quantity: {
          type: Number,
          required: true,
        },

        image: {
          type: String,
        },

        expiryDate: {
          type: Date,
        },
      },
    ],

    total: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      default: "Confirmed",
    },

    deliveryAddress: {
      type: String,
      required: true,
    },

    deliverySlot: {
      type: String,
      required: true,
    },

    paymentMethod: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;