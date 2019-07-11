const db = require("./db");
const express = require("express");
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.route("/").get(function(req, res, next) {
  res.send("api");
});
router.route("/pages").get(async (req, res, next) => {
  try {
    const data = await db.pages.all();
    res.send(data.map(e => e.page));
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
