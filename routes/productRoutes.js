const express = require("express");
const { productController } = require("../controllers");
const upload = require("../middleware/multer");

const router = express.Router();

router.post("/add", upload.single("file"), productController.addProduct);
router.patch(
  "/update/:id",
  upload.single("file"),
  productController.updateProduct
);
router.patch("/isActive/:id", productController.updateIsActive);
router.delete("/delete/:id", productController.deleteProduct);

module.exports = router;
