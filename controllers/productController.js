const { db,query} = require("../database");

const paginatedResults = (model) => {
  return async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const sort = req.query.sort;
    const filter= req.query.filter;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};
   
    let orderBy = "";

    if (sort === "priceHighLow") {
      orderBy = "price DESC";
    } else if (sort === "priceLowHigh") {
      orderBy = "price ASC";
    } else if (sort === "nameAtoZ") {
      orderBy = "name ASC";
    } else if (sort === "nameZtoA") {
      orderBy = "name DESC";
    } else if (sort) {
      return res.status(400).send("Invalid sort parameter");
    }
  
    
    let fetchQuery=""

    if(filter){
       fetchQuery = `SELECT * FROM ${model} WHERE id_category=${filter} ORDER BY ${orderBy} LIMIT ${limit} OFFSET ${startIndex} `;
    } else{
       fetchQuery = `SELECT * FROM ${model}   ORDER BY ${orderBy} LIMIT ${limit} OFFSET ${startIndex} `;

    }


    db.query(fetchQuery, (err, result) => {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .send("An error occurred while fetching products");
      }

      results.results = result;

      const countQuery = `SELECT COUNT(*) as count FROM ${model}`;

      db.query(countQuery, async(err, result) => {
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
        try {
          const categories = await query("SELECT DISTINCT id_category FROM product");
          results.categories = categories.map((category) => category.id_category);
          res.paginatedResults = results;
          next();
        } catch (err) {
          console.error(err);
          return res.status(500).json({ error: "An error occurred while fetching categories" });
        }
        res.paginatedResults = results;
        next();
      });
    });
  };
};

module.exports = {
  paginatedProducts: paginatedResults("product"),

};
