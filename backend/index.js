const express = require("express");
const cors = require("cors");
const connectToDatabase = require("./connectToDatabase");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const app = express();
const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectToDatabase();

app.get("/health", (req, res) => res.status(200).send("ok"));
app.head("/health", (req, res) => res.status(200).send("ok"));

app.get("/", (req, res) => {
  res.send("Welcome to RentBox Admin Panel Backend");
});

app.use("/admin/auth", require("./routes/AuthenticationRoutes"));
app.use("/admin/count", require("./routes/CountOrderProductUserRoute"));
app.use("/admin/product", require("./routes/ProductRoute"));
app.use("/admin/user", require("./routes/UserInfoRoute"));
app.use("/admin/order", require("./routes/OrderRoute"));

app.listen(port, () => {
  console.log(`⛳ Server listening on port ${port} ⛳`);
});
