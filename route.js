const express = require("express");
const router = express.Router();
const productsRouter = require("./product");
const categoryRouter = require("./product_category");
const usersRouter = require("./user");

// route for products
router.use("/products", productsRouter);

// router for category
router.use("/category", categoryRouter);

// router for users
router.use("/user", usersRouter);

module.exports = router;
