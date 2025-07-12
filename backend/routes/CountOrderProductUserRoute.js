const express = require("express");
const router = express.Router();
const {
  CountOrderProductUser,
} = require("../controller/CountOrderProductUser");
const { verifyAdmin } = require("../middleware/verifyAdmin");
// Route to count orders, products, and users
router.get("/all",verifyAdmin, CountOrderProductUser);

module.exports = router;
