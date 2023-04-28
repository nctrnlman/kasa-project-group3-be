const express = require("express")
const {productController}= require('../controllers')
const router = express.Router()

router.get("/", productController.paginatedProducts, (req, res) => {
    res.json(res.paginatedResults);
  });
module.exports=router