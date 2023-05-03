const express = require("express");
const { categoryController } = require("../controllers");
const router = express.Router();

router.post("/add", categoryController.addCategory);
router.patch("/update/:id", categoryController.updateCategory);
router.delete("/delete/:id", categoryController.deleteCategory);

module.exports = router;
