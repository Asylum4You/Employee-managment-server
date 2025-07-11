const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/userRoutes");
const authRouter = require("./routes/authRoutes");
const employeeTaskRouter = require("./routes/employeeTaskRoute");
const adminRouter = require("./routes/adminRoute");
const paymentRoute = require("./routes/paymentRouter");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

connectDB();

const routers = [
  userRouter,
  authRouter,
  employeeTaskRouter,
  adminRouter,
  paymentRoute,
];

routers.forEach((router) => {
  app.use("/web/api/", router);
});

app.get("/", (req, res) => {
  res.send("Api Working");
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
