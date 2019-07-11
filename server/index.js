// const db = require("./db");
require("dotenv-flow").config({});
const express = require("express");
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
const config = {
  host: process.env.DBHOST,
  port: process.env.DBPORT,
  database: process.env.DBDATABASE,
  user: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  application_name: process.env.DBAPPLICATION_NAME,
  ssl: true
};
router.route("/").get(function(req, res, next) {
  res.send(config);
});
// router.route("/pages").get(async (req, res, next) => {
//   try {
//     const data = await db.pages.all();
//     res.send(data.map(e => e.page));
//   } catch (error) {
//     console.log(error);
//   }
// });

module.exports = router;
