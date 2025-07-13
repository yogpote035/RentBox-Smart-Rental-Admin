const OrderModel = require("../model/orderModel");
const UserModel = require("../model/userModel");
const ProductModel = require("../model/productModel");

async function CountTotalRevenue() {
  try {
    const orders = await OrderModel.find({}).populate("product");

    let totalRevenue = 0;

    for (const order of orders) {
      // Extract numeric part before "/" from price string
      const rawPrice = order?.product?.price || "0";
      const numericPart = rawPrice.split("/")[0]; // get '200' from '200/per day'
      const pricePerDay = parseFloat(numericPart);

      if (isNaN(pricePerDay)) continue; // skip if price is invalid

      const quantity = order.quantity || 1;

      const from = new Date(order.from);
      const to = new Date(order.to);

      const durationInDays = Math.ceil((to - from) / (1000 * 60 * 60 * 24));

      const revenue = pricePerDay * durationInDays * quantity;
      totalRevenue += revenue;
    }
    return Math.round(totalRevenue);
  } catch (error) {
    return 0;
  }
}

module.exports.CountOrderProductUser = async (request, response) => {
  try {
    const TotalRevenue =await CountTotalRevenue();
    const totalOrders = await OrderModel.countDocuments({});
    const totalProducts = await ProductModel.countDocuments({});
    const totalUsers = await UserModel.countDocuments({});
    return response.status(200).json({
      totalOrders,
      totalProducts,
      totalUsers,
      TotalRevenue,
    });
  } catch (error) {
    console.error("Error counting orders, products, and users:", error);
    return response.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
