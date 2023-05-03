const { db, query } = require("../database");

module.exports = {
  getDefaultIncome: async (req, res) => {
    try {
      let income =
        await query(`select date,sum(total_price) as income from transaction
      where date > now() - INTERVAL 7 day
      group by date 
      order by date asc;`);

      return res
        .status(200)
        .send({ data: income, message: "Get Default Income Success" });
    } catch (e) {
      res.status(e.status || 500).send(e);
    }
  },
  getIncomeByRange: async (req, res) => {
    try {
      const { dateX, dateY } = req.query;

      let incomeByRange =
        await query(`select date,sum(total_price) as income from transaction
      where date between date(${db.escape(dateX)}) and date(${db.escape(dateY)})
      group by date ;`);

      return res
        .status(200)
        .send({ data: incomeByRange, message: "Get Income by range Success" });
    } catch (e) {
      res.status(e.status || 500).send(e);
    }
  },

  getDefaultTotalTransaction: async (req, res) => {
    try {
      let totalTransaction =
        await query(`select date,sum(total_price) as income from transaction
      where date > now() - INTERVAL 7 day
      group by date 
      order by date asc;`);

      return res.status(200).send({
        data: totalTransaction,
        message: "Get Default Total Transaction Success",
      });
    } catch (e) {
      res.status(e.status || 500).send(e);
    }
  },
  getTransactionByDate: async (req, res) => {
    try {
      const { dateX, dateY } = req.query;

      let transactionByRange =
        await query(`select date,count(id_transaction) as total_transcation from transaction
      where date between date(${db.escape(dateX)}) and date(${db.escape(dateY)})
      group by date ;`);

      return res.status(200).send({
        data: transactionByRange,
        message: "Get Total Transaction by range Success",
      });
    } catch (e) {
      res.status(e.status || 500).send(e);
    }
  },
};
