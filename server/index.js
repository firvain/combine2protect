// const db = require("./db");
const express = require("express");
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
const config = {
  host: process.env.HOST,
  port: process.env.PORT,
  database: process.env.DATABASE,
  user: process.env.DBUSER,
  password: process.env.PASSWORD,
  application_name: process.env.APPLICATION_NAME,
  ssl: true
};
router.route("/").get(function(res, req, next) {
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
