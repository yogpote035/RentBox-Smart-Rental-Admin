const OrderModel = require("../model/orderModel");
const ProductModel = require("../model/productModel");
const UserModel = require("../model/userModel");
const { format, differenceInDays, isBefore } = require("date-fns");

module.exports.GetAllOrdersInfo = async (req, res) => {
  try {
    const orders = await OrderModel.find()
      .populate({
        path: "product",
        select: "name price address",
      })
      .populate({
        path: "owner",
        select: "name address",
      })
      .sort({ createdAt: -1 });

    const today = new Date();

    const formattedOrders = orders.map((order) => {
      const product = order.product;
      const user = order.owner;

      const fromDate = new Date(order.from);
      const toDate = new Date(order.to);
      const createdDate = new Date(order.createdAt);

      const totalDaysRented = Math.max(differenceInDays(toDate, fromDate), 1);
      const quantity = order.quantity || 1;
      const pricePerDay = parseFloat(product?.price || 0);
      const totalPrice = quantity * totalDaysRented * pricePerDay;
      const status = isBefore(toDate, today) ? "Expired" : "Active";

      return {
        _id: order._id,
        productName: product?.name || "Unknown",
        ordererName: user?.name || "N/A",
        city: user?.address?.[0]?.city || "N/A",
        quantity,
        pricePerDay,
        totalDaysRented,
        totalPrice,
        createdAt: format(createdDate, "dd MMM yyyy"),
        from: format(fromDate, "dd MMM yyyy"),
        to: format(toDate, "dd MMM yyyy"),
        status,
      };
    });

    // Sort: active first, then expired
    const activeOrders = formattedOrders.filter((o) => o.status === "Active");
    const expiredOrders = formattedOrders.filter((o) => o.status === "Expired");

    const sortedOrders = [...activeOrders, ...expiredOrders];

    res.status(200).json(sortedOrders);
  } catch (err) {
    console.error("Failed to fetch orders:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.GetOrderStatsActiveAndExpired = async (req, res) => {
  try {
    const orders = await OrderModel.find({}, "to"); // Only fetch 'to' field
    const TotalOrders = await OrderModel.countDocuments({}); // Only fetch 'to' field

    const today = new Date();

    let totalActive = 0;
    let totalExpired = 0;

    orders.forEach((order) => {
      const isExpired = isBefore(new Date(order.to), today);
      if (isExpired) totalExpired++;
      else totalActive++;
    });

    res.status(200).json({ totalActive, totalExpired, TotalOrders });
  } catch (err) {
    console.error("Error getting order stats:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
