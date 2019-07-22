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
    next(error);
  }
});
router
  .route("/layers/:layerName/:xmin/:ymin/:xmax/:ymax")
  .get(async (req, res, next) => {
    const { layerName } = req.params;
    const { xmin, ymin, xmax, ymax } = req.params;
    console.log(xmin, ymin, xmax, ymax);
    try {
      console.time("concatenation");
      const data = await db.layers.all(layerName, xmin, ymin, xmax, ymax);
      res.send(data[0].jsonb_build_object);
      console.timeEnd("concatenation");
    } catch (error) {
      console.log(error);
      next(error);
    }
  });
module.exports = router;
