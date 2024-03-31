const express = require("express");
const app = express();
const admin = require("firebase-admin");
const authenticateJWT = require("./authenticateJWT");

app.use(express.json());

app.use(authenticateJWT);

app.get("/api/protected-route", (req, res) => {
  res.json({ message: "Protected route accessed successfully", user: req.user });
});

app.get("/api/public-route", (req, res) => {
  res.json({ message: "Public route accessed successfully" });
});

app.get("/api", (req, res) => {
  res.send("Backend API EndPoint By Danu");
});

const serviceAccount = require("./api-glamour-app-firebase-adminsdk-wf5c2-9fbcd7e825.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://api-glamour-app-default-rtdb.asia-southeast1.firebasedatabase.app/",
});

module.exports = app;
