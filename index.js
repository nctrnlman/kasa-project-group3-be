const express = require("express");
const PORT = 8001;
const app = express();
const cors = require("cors");
const { db, query } = require("./database");
const { authRoutes } = require("./routes");

app.use(cors());

app.use(express.json());

// app.get("/", async (req, res) => {
//   console.log("Start...");
// });
// app.get("/user", async (req, res) => {
//   let fetchQuery = "SELECT * FROM user";
//   db.query(fetchQuery, (err, result) => {
//     return res.status(200).send(result);
//   });
// });

app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log("Server is running on port: " + PORT);
});
