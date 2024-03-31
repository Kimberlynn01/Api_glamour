const express = require("express");
const admin = require("firebase-admin");

const serviceAccount = require("./api-glamour-app-firebase-adminsdk-wf5c2-9fbcd7e825.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://api-glamour-app-default-rtdb.asia-southeast1.firebasedatabase.app/",
});

const app = express();

app.use(express.json());

// Middleware untuk menangani prefix "/api/v1/"
const apiV1PrefixMiddleware = (req, res, next) => {
  const { originalUrl } = req;
  if (originalUrl.startsWith("/api/v1/")) {
    req.url = originalUrl.slice(7);
  }
  next();
};

app.use(apiV1PrefixMiddleware);

// Rute untuk endpoint "/products"
app.get("/products", (req, res) => {
  // Handler untuk endpoint "/products"
});

// Rute untuk endpoint "/user"
app.get("/user", (req, res) => {
  // Handler untuk endpoint "/user"
});

// Rute untuk endpoint "/category"
app.get("/category", (req, res) => {
  // Handler untuk endpoint "/category"
});

// Rute default untuk endpoint tidak ditemukan
app.use((req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
});

module.exports = app;
