const express = require("express");
const PORT = 8001;
const app = express();
const cors = require("cors");
const { db, query } = require("./database");
const { authRoutes,productRoutes } = require("./routes");
const mysql = require("./database/index")
app.use(cors());

app.use(express.json());



app.use("/auth", authRoutes);
app.use("/product", productRoutes);





app.listen(PORT, () => {
  console.log("Server is running on port: " + PORT);
});
