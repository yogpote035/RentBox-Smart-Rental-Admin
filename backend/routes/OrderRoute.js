const express = require("express");
const router = express.Router();
const { verifyAdmin } = require("../middleware/verifyAdmin");
const { GetAllOrdersInfo } = require("../controller/OrderController");

// Route to get all orders information
router.get("/orders", verifyAdmin, GetAllOrdersInfo);
router.get("/recent-activities",verifyAdmin, GetAllOrdersInfo);

module.exports = router;
