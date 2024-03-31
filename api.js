const express = require("express");
const router = express.Router();

// Router '/products'
const productsRouter = require("./product");
router.use("/products", productsRouter);

// Router '/category'
const categoryRouter = require('./')


module.exports = router;
