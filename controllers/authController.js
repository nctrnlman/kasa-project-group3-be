const { db, query } = require("../database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  register: async (req, res) => {
    try {
      const { username, phone_number, store_name, email, password } = req.body;

      let checkEmail = await query(
        `SELECT * FROM user WHERE email=${db.escape(email)};`
      );

      if (checkEmail.length > 0) {
        return res.status(200).send({ message: "Email has been used" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);

      let addUser = await query(
        `INSERT INTO user VALUES (null,${db.escape(username)},${db.escape(
          phone_number
        )},${db.escape(store_name)},${db.escape(email)},${db.escape(
          hashPassword
        )});`
      );
      return res
        .status(200)
        .send({ data: addUser, message: "Register Success" });
    } catch (e) {
      res.status(e.status || 500).send(e);
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const checkEmail = await query(
        `SELECT * FROM user WHERE email = ${db.escape(email)}`
      );
      if (checkEmail.length == 0) {
        return res
          .status(200)
          .send({ message: "Email is not exist", success: false });
      }

      const validPassword = await bcrypt.compare(
        password,
        checkEmail[0].password
      );
      if (!validPassword) {
        res
          .status(200)
          .send({ message: "Password is incorrect", success: false });
      }

      return res.status(200).send({
        message: "Login Success",
        data: {
          id: checkEmail[0].id_user,
          username: checkEmail[0].username,
          phone: checkEmail[0].phone_number,
          store: checkEmail[0].store_name,
          email: checkEmail[0].email,
        },
        success: true,
      });
    } catch (e) {
      res.status(e.status || 500).send(e);
    }
  },
};
