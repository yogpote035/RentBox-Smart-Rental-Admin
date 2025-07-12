const jwt = require("jsonwebtoken");
const UserModel = require("../model/userModel");

module.exports.verifyAdmin = async (request, response, next) => {
  const token = request.header("token");

  if (!token) {
    return response.status(401).json({
      message: "Token is missing. Please authenticate using a valid token.",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.secret);
    const userId = decoded.user?.id;

    if (!userId) {
      return response.status(403).json({
        message: "Invalid token payload. User ID not found.",
      });
    }

    const user = await UserModel.findById(userId);

    if (!user) {
      return response.status(404).json({
        message: "User not found.",
      });
    }

    if (user.role !== "admin") {
      return response.status(403).json({
        message: "Access denied. Only admins are allowed.",
      });
    }

    request.user = user;
    next();
  } catch (error) {
    console.error("Admin verification error:", error.message);
    return response.status(500).json({
      message: "Internal Server Error: " + error.message,
    });
  }
};
