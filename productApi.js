const express = require("express");
const admin = require("firebase-admin");

const serviceAccount = require("./api-glamour-app-firebase-adminsdk-wf5c2-9fbcd7e825.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://api-glamour-app-default-rtdb.asia-southeast1.firebasedatabase.app/",
});

const app = express();

app.use(express.json());

app.post("/products", async (req, res) => {
  try {
    const { title, price, description, category, images } = req.body;

    if (!title || !price || !description || !category || !images) {
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
      price: price,
      description: description,
      category: category,
      images: images,
    });

    res.status(201).json({
      id: nextId,
      title: title,
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

app.get("/products", async (req, res) => {
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
