const { db, query } = require("../database");

module.exports = {
  addCategory: async (req, res) => {
    try {
      const { name, idUser } = req.body;

      let addCategory = await query(
        `INSERT INTO category VALUES (null,${db.escape(idUser)},${db.escape(
          name
        )});`
      );

      return res
        .status(200)
        .send({ data: addCategory, message: "Add Category Success" });
    } catch (e) {
      res.status(e.status || 500).send(e);
    }
  },
  updateCategory: async (req, res) => {
    try {
      const idCategory = req.params.id;
      const { name } = req.body;

      let updateCategory = await query(
        `UPDATE category SET name = ${db.escape(
          name
        )} WHERE id_category = ${db.escape(idCategory)}`
      );

      return res
        .status(200)
        .send({ data: updateCategory, message: "Update Category Success" });
    } catch (e) {
      res.status(e.status || 500).send(e);
    }
  },
  deleteCategory: async (req, res) => {
    try {
      const idCategory = req.params.id;

      let deleteCategory = await query(
        `DELETE FROM category WHERE id_category = ${db.escape(idCategory)}`
      );

      return res
        .status(200)
        .send({ data: deleteCategory, message: "Delete Category Success" });
    } catch (e) {
      res.status(e.status || 500).send(e);
    }
  },
};
