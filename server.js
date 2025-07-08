const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();
const userRouter = require('./routes/userRoutes');

const app = express(); 

app.use(cors());
app.use(express.json());

connectDB();

// All the routes;
app.use('/web/api/', userRouter);


app.get("/", (req, res) => {
  res.send("Api Working");
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
