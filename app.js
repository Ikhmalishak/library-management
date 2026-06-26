require('dotenv').config();
const cors = require("cors");

process.env.TZ = "Asia/Kuala_Lumpur";

const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth.routes");
const memberRoutes = require("./routes/member.routes");
const bookRoutes = require("./routes/book.routes");
const loanRoutes = require("./routes/loan.routes");
const dashboardRoutes = require("./routes/dashboard.routes")
const authMiddleware = require("./middlewares/auth.middleware");
const errorHandler = require("./middlewares/error.middleware");

const app = express();
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
  })
)
app.use(bodyParser.json());
app.use("/api/auth", authRoutes);
app.use("/api/members", authMiddleware.auth, memberRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/loans", loanRoutes);
app.use("/api/dashboards",dashboardRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
