const express = require("express");
const router = express.Router();
const productsRouter = require("./product");
const categoryRouter = require("./product_category");

// route for products
router.use("/products", productsRouter);

// router for category
router.use("/category", categoryRouter);

module.exports = router;
