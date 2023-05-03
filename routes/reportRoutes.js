const express = require("express");
const { reportController } = require("../controllers");

const router = express.Router();

router.get("/default-income", reportController.getDefaultIncome);
router.get("/income-byrange", reportController.getIncomeByRange);
router.get("/default-transaction", reportController.getDefaultTotalTransaction);
router.get("/transaction-byrange", reportController.getTransactionByDate);

module.exports = router;
