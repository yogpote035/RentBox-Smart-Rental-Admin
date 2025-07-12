const OrderModel = require("../model/orderModel");
const UserModel = require("../model/userModel");
const ProductModel = require("../model/productModel");

module.exports.CountOrderProductUser = async (request, response) => {
  try {
    const totalOrders = await OrderModel.countDocuments({});
    const totalProducts = await ProductModel.countDocuments({});
    const totalUsers = await UserModel.countDocuments({});
    return response.status(200).json({
      totalOrders,
      totalProducts,
      totalUsers,
    });
  } catch (error) {
    console.error("Error counting orders, products, and users:", error);
    return response.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
