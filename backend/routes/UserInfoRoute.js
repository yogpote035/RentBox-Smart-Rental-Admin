const express = require("express");
const router = express.Router();
const { getUsersWithActivity } = require("../controller/UserAllInformation");
const { verifyAdmin } = require("../middleware/verifyAdmin");

router.get("/user-info", verifyAdmin, getUsersWithActivity);

module.exports = router;
