const express = require("express");
const admin = require("firebase-admin");

const app = express();

app.use(express.json());

app.post("/", async (req, res) => {
  try {
    const { title, nameUser, price, description, category, images } = req.body;

    if (!title || !nameUser || !price || !description || !category || !images) {
      return res.status(400).json({ error: "Data produk tidak lengkap" });
    }

    const productsRef = admin.database().ref("products");

    const snapshot = await productsRef.once("value");
    const productList = snapshot.val();

    const nextId = Object.keys(productList || {}).length + 1;

    const newProductRef = productsRef.child(nextId.toString());

    await newProductRef.set({
      id: nextId,
      title: title,
      nameUser: nameUser,
      price: price,
      description: description,
      category: category,
      images: images,
    });

    res.status(201).json({
      id: nextId,
      title: title,
      nameUser: nameUser,
      price: price,
      description: description,
      category: category,
      images: images,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Terjadi kesalahan saat menambahkan produk" });
  }
});

app.get("/", async (req, res) => {
  try {
    const productsRef = admin.database().ref("products");

    const snapshot = await productsRef.once("value");
    const productList = snapshot.val();

    const productsArray = Object.keys(productList || {}).map((key) => ({
      id: key,
      ...productList[key],
    }));

    res.status(200).json(productsArray);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Terjadi kesalahan saat mengambil data produk" });
  }
});

module.exports = app;
