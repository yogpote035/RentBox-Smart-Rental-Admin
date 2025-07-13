const express = require("express");
const router = express.Router();
const { verifyAdmin } = require("../middleware/verifyAdmin");
const { GetAllOrdersInfo, GetOrderStatsActiveAndExpired } = require("../controller/OrderController");

// Route to get all orders information
router.get("/orders", verifyAdmin, GetAllOrdersInfo);
router.get("/order-state-count", verifyAdmin,GetOrderStatsActiveAndExpired);

module.exports = router;
