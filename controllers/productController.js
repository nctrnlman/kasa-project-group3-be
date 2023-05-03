const { db, query } = require("../database");

module.exports = {
  addProduct: async (req, res) => {
    try {
      const { name, idUser, price, description, idCategory } = req.body;
      const { file } = req;
      const filePath = file ? "/" + file.filename : null;

      let product = await query(
        `INSERT INTO product VALUES (null,${db.escape(idUser)},${db.escape(
          name
        )},${db.escape(price)},${db.escape(filePath)},${db.escape(
          description
        )},${db.escape(idCategory)},true);`
      );

      return res
        .status(200)
        .send({ data: product, message: "Add Product Success" });
    } catch (e) {
      res.status(e.status || 500).send(e);
    }
  },
  updateProduct: async (req, res) => {
    try {
      const idProduct = req.params.id;
      const { name, price, description, idCategory } = req.body;
      const { file } = req;
      const filePath = file ? "/" + file.filename : null;

      let updateProduct = await query(
        `UPDATE product SET name=${db.escape(name)},price=${db.escape(
          price
        )},image=${db.escape(filePath)},description=${db.escape(
          description
        )},id_category=${db.escape(idCategory)} WHERE id_product=${db.escape(
          idProduct
        )}`
      );

      return res
        .status(200)
        .send({ data: updateProduct, message: "Update Product Success" });
    } catch (e) {
      res.status(e.status || 500).send(e);
    }
  },
  deleteProduct: async (req, res) => {
    try {
      const idProduct = req.params.id;

      let deleteProduct = await query(
        `DELETE FROM product WHERE id_product = ${db.escape(idProduct)};`
      );

      return res
        .status(200)
        .send({ data: deleteProduct, message: "Delete Product Success" });
    } catch (e) {
      res.status(e.status || 500).send(e);
    }
  },
  updateIsActive: async (req, res) => {
    try {
      const idProduct = req.params.id;
      const { isActive } = req.body;

      let updateIsActive = await query(
        `UPDATE product SET isActive = ${db.escape(
          isActive
        )} WHERE id_product = ${db.escape(idProduct)}`
      );
    } catch (e) {
      res.status(e.status || 500).send(e);
    }
  },
};
