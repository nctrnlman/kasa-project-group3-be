const { db, query } = require("../database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("../helpers/nodeMailer");

module.exports = {
  register: async (req, res) => {
    try {
      const { username, phone, store, email, password } = req.body;

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
          phone
        )},${db.escape(store)},${db.escape(email)},${db.escape(
          hashPassword
        )},0);`
      );

      let payload = { id: addUser.insertId };
      const token = jwt.sign(payload, "kasa", { expiresIn: "4h" });

      let mail = {
        from: "Admin <rhazesnote@gmail.com>",
        to: `${email}`,
        subject: `Acount Registration`,
        html: `<div>
        <p>Thanks for register, you need to activate your account,</p>
        <a href="http://localhost:3000/verify/${token}">Click Here</a>
        <span>to activate</span>
        </div>`,
      };

      let response = await nodemailer.sendMail(mail);

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

      let payload = {
        id: checkEmail[0].id_user,
        isActive: checkEmail[0].isActive,
      };

      const token = jwt.sign(payload, "kasa", { expiresIn: "1h" });

      return res.status(200).send({
        message: "Login Success",
        token: token,
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
  verify: async (req, res) => {
    try {
      const id = req.user.id;

      let updateIsActivity = await query(
        `UPDATE user SET isActive = true where id_user = ${db.escape(id)};`
      );

      res.status(200).send({ success: true, message: "account is verified" });
    } catch (e) {
      res.status(e.status || 500).send(e);
    }
  },
  checkLogin: async (req, res) => {
    try {
      const users = await query(
        `SELECT * FROM user WHERE id_user = ${db.escape(req.user.id)}`
      );

      return res.status(200).send({
        data: {
          isActive: users[0].isActive,
          id: users[0].id_user,
          username: users[0].username,
          phone: users[0].phone_number,
          store: users[0].store_name,
          email: users[0].email,
        },
      });
    } catch (e) {
      res.status(e.status || 500).send(e);
    }
  },
};
