const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/userRoutes");
const authRouter = require("./routes/authRoutes");
const employeeTaskRouter = require("./routes/employeeTaskRoute");
const hrRouter = require("./routes/hrRoutes");
const adminRouter = require("./routes/adminRoutes");
const paymentRoute = require("./routes/paymentRouter");

const app = express();

app.use(
  cors({
    origin: 'https://worksyncemployee.netlify.app',
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
  hrRouter,
  paymentRoute,
  adminRouter,
];

routers.forEach((router) => {
  app.use("/web/api/", router);
});

app.get("/", (req, res) => {
  res.send("Hi I'm working perfectly");
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
