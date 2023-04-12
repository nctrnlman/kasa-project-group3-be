const express = require("express");
const PORT = 8001;
const app = express();

app.use(express.json());

app.get("/", async (req, res) => {
  console.log("Start...");
});

app.listen(PORT, () => {
  console.log("Server is running on port: " + PORT);
});
