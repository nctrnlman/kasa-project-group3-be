const express = require("express");
const PORT = 8001;
const app = express();
const cors = require("cors");
const { db, query } = require("./database");

app.use(cors());

app.use(express.json());
const resultsPerPage = 3;

// app.get("/", async (req, res) => {
//   console.log("Start...");
// });
app.get("/product", async (req, res) => {
  let fetchQuery = "SELECT * FROM product";
  db.query(fetchQuery, (err, result) => {
   
    console.log(page)

    return res.status(200).send(result);
  });
});

app.listen(PORT, () => {
  console.log("Server is running on port: " + PORT);
});
