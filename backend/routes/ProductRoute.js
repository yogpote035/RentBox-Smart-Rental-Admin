const express = require("express");
const router = express.Router();
const { getRecentActivities,GetAllProductInformation } = require("../controller/ProductController");
const { verifyAdmin } = require("../middleware/verifyAdmin");

// Route to count orders, products, and users
router.get("/products",verifyAdmin, GetAllProductInformation);
router.get("/recent-activities",verifyAdmin, getRecentActivities);

module.exports = router;
