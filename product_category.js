const express = require("express");
const admin = require("firebase-admin");

const app = express();

app.use(express.json());

app.post("/", async (req, res) => {
  try {
    const { name, image } = req.body;

    if (!name || !image) {
      return res.status(400).json({ error: "Data category tidak lengkap" });
    }

    const categoryRef = admin.database().ref("category");

    const snapshot = await categoryRef.once("value");
    const categoryList = snapshot.val();

    const nextId = Object.keys(categoryList || {}).length + 1;
    const currentDate = new Date().toISOString();

    const newCategoryRef = categoryRef.child(nextId.toString());

    await newCategoryRef.set({
      id: nextId,
      name: name,
      image: image,
      createdAt: currentDate,
      updatedAt: currentDate,
    });

    res.status(201).json({
      id: nextId,
      name: name,
      image: image,
      createdAt: currentDate,
      updatedAt: currentDate,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Terjadi kesalahan saat menambahkan category" });
  }
});

app.get("/", async (req, res) => {
  try {
    const categoryRef = admin.database().ref("category");

    const snapshot = await categoryRef.once("value");
    const categoryList = snapshot.val();

    const categoryArray = Object.keys(categoryList || {}).map((key) => ({
      id: key,
      ...categoryList[key],
    }));

    res.status(200).json(categoryArray);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Terjadi kesalahan saat mengambil data category" });
  }
});

app.get("/product", async (req, res) => {
  try {
    const { categoryId } = req.query;

    if (!categoryId) {
      return res.status(400).json({ error: "Parameter categoryId tidak ditemukan" });
    }

    const productsRef = admin.database().ref("products");
    const snapshot = await productsRef.orderByChild("category/id").equalTo(parseInt(categoryId)).once("value");
    const productsList = snapshot.val();

    if (!productsList) {
      return res.status(404).json({ error: "Produk tidak ditemukan" });
    }

    const productsArray = Object.keys(productsList).map((key) => ({
      id: key,
      ...productsList[key],
    }));

    res.status(200).json(productsArray);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Terjadi kesalahan saat mengambil data produk" });
  }
});

module.exports = app;
