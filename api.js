const express = require("express");
const router = express.Router();

// Rute untuk endpoint "/products"
router.get("/products", (req, res) => {
  const products = require("./product");
  router.use(products);
});

router.get("/user", (req, res) => {
  res.json({ message: "Get user endpoint" });
});

router.get("/category", (req, res) => {
  res.json({ message: "Get category endpoint" });
});

module.exports = router;
