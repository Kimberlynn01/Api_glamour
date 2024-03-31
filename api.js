const express = require("express");
const router = express.Router();

// Rute untuk endpoint "/products"
const productsRouter = require("./product");

router.use("/products", productsRouter);

router.get("/user", (req, res) => {
  res.json({ message: "Get user endpoint" });
});

router.get("/category", (req, res) => {
  res.json({ message: "Get category endpoint" });
});

module.exports = router;
