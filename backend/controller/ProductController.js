const OrderModel = require("../model/orderModel");
const ProductModel = require("../model/productModel");
const ReviewModel = require("../model/reviewModel");
const UserModel = require("../model/userModel");
const { format } = require("date-fns");

module.exports.GetAllProductInformation = async (req, res) => {
  try {
    console.log("Fetching all product information...");
    // Step 1: Fetch all products with owner info
    const products = await ProductModel.find({}).populate("owner", "name"); // only populate the owner's name

    // Step 2: Fetch all reviews (only need product id)
    const reviews = await ReviewModel.find({}, "product");

    // Step 3: Fetch all orders (only need product id)
    const orders = await OrderModel.find({}, "product");

    // Step 4: Build a map for review count per product
    const reviewCountMap = {};
    reviews.forEach((review) => {
      const productId = review.product.toString();
      reviewCountMap[productId] = (reviewCountMap[productId] || 0) + 1;
    });

    // Step 5: Build a map for order count per product
    const orderCountMap = {};
    orders.forEach((order) => {
      const productId = order.product.toString();
      orderCountMap[productId] = (orderCountMap[productId] || 0) + 1;
    });

    // Step 6: Build the response
    const result = products.map((product) => ({
      name: product.name,
      price: product.price,
      ownerName: product.owner?.name || "Unknown",
      reviewsCount: reviewCountMap[product._id.toString()] || 0,
      ordersCount: orderCountMap[product._id.toString()] || 0,
    }));

    res.status(200).json(result);
  } catch (error) {
    console.error("Error in GetAllProductInformation:", error);
    res.status(500).json({ message: "Error fetching product info", error });
  }
};

module.exports.getRecentActivities = async (req, res) => {
  try {
    const formatTime = (date) => format(new Date(date), "dd-MM-yyyy hh:mm a");

    const users = await UserModel.find({})
      .sort({ createdAt: -1 })
      .limit(2)
      .select("name createdAt");

    const products = await ProductModel.find({})
      .sort({ createdAt: -1 })
      .limit(2)
      .select("name createdAt");

    const orders = await OrderModel.find({})
      .sort({ createdAt: -1 })
      .limit(2)
      .populate("owner", "name")
      .populate("product", "name")
      .select("owner product createdAt");

    const activities = [];

    users.forEach((user) => {
      activities.push({
        type: "user",
        description: `New user registered: ${user.name}`,
        time: formatTime(user.createdAt),
        createdAt: user.createdAt,
      });
    });

    products.forEach((product) => {
      activities.push({
        type: "product",
        description: `Product added: ${product.name}`,
        time: formatTime(product.createdAt),
        createdAt: product.createdAt,
      });
    });

    orders.forEach((order) => {
      const username = order.owner?.name || "Unknown user";
      const productName = order.product?.name || "Unknown product";

      activities.push({
        type: "order",
        description: `Order placed by ${username} for ${productName}`,
        time: formatTime(order.createdAt),
        createdAt: order.createdAt,
      });
    });

    // Sort all activities by date descending
    activities.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // Remove raw date from final response
    const formattedActivities = activities.map(
      ({ createdAt, ...rest }) => rest
    );

    res.status(200).json(formattedActivities);
  } catch (err) {
    console.error("Error fetching recent activities:", err);
    res.status(500).json({ message: "Failed to fetch recent activities" });
  }
};
