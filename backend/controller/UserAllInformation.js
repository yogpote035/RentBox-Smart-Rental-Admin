const UserModel = require("../model/userModel");
const ProductModel = require("../model/productModel");
const ReviewModel = require("../model/reviewModel");
const OrderModel = require("../model/orderModel");

module.exports.getUsersWithActivity = async (req, res) => {
  try {
    const users = await UserModel.aggregate([
      {
        $lookup: {
          from: "productmodels", // note: Mongo uses lowercase plural by default
          localField: "_id",
          foreignField: "owner",
          as: "products",
        },
      },
      {
        $lookup: {
          from: "reviewmodels",
          localField: "_id",
          foreignField: "owner",
          as: "reviews",
        },
      },
      {
        $lookup: {
          from: "ordermodels",
          localField: "_id",
          foreignField: "owner",
          as: "orders",
        },
      },
      {
        $project: {
          name: 1,
          email: 1,
          phone: 1,
          role: 1,
          city: { $arrayElemAt: ["$address.city", 0] }, // first city in address array or null
          productsCount: { $size: "$products" },
          reviewsCount: { $size: "$reviews" },
          ordersCount: { $size: "$orders" },
        },
      },
    ]);

    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users info:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};
