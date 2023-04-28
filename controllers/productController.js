const { db } = require("../database");

const paginatedResults = (model) => {
  return async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    const fetchQuery = `SELECT * FROM ${model} LIMIT ${limit} OFFSET ${startIndex}`;

    db.query(fetchQuery, (err, result) => {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .send("An error occurred while fetching products");
      }

      results.results = result;

      const countQuery = `SELECT COUNT(*) as count FROM ${model}`;

      db.query(countQuery, (err, result) => {
        if (err) {
          console.log(err);
          return res
            .status(500)
            .send("An error occurred while counting products");
        }

        const totalResults = result[0].count;
        results.totalPages = Math.ceil(totalResults / limit);

        if (endIndex < totalResults) {
          results.next = {
            page: page + 1,
            limit: limit,
          };
        }

        if (startIndex > 0) {
          results.previous = {
            page: page - 1,
            limit: limit,
          };
        }

        res.paginatedResults = results;
        next();
      });
    });
  };
};

module.exports = {
  paginatedProducts: paginatedResults("product"),
  showUsers: async (req, res) => {
    let fetchQuery = "SELECT * FROM product";
    db.query(fetchQuery, (err, result) => {
      return res.status(200).send(result);
    });
  },
};
