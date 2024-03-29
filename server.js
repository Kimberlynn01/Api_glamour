// Import library yang dibutuhkan
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const admin = require("firebase-admin");

// Middleware untuk mengizinkan JSON body parsing
app.use(express.json());

// Endpoint contoh
app.get("/", (req, res) => {
  res.send("Backend API EndPoint By Danu");
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});

const serviceAccount = require("api-glamour-app-firebase-adminsdk-wf5c2-9fbcd7e825.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://api-glamour-app-default-rtdb.asia-southeast1.firebasedatabase.app/",
});
