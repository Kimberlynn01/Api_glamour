const express = require("express");
const admin = require("firebase-admin");

const app = express();

app.use(express.json());

app.post("/", async (req, res) => {
  try {
    const { username, email, phoneNumber, password, role } = req.body;

    if ((!username || !email || !phoneNumber || !password, role)) {
      return res.status(400).json({ error: "Data users belum lengkap" });
    }

    const userRef = admin.database().ref("users");

    const snapshot = await userRef.once("value");
    const userList = snapshot.val();

    const nextId = Object.keys(userList || {}).length + 1;

    newUsersRef = userRef.child(nextId.toString());

    await newUsersRef.set({
      id: nextId,
      username: username,
      email: email,
      phoneNumber: phoneNumber,
      password: password,
      role: "buyer",
      isLoggedn: false,
    });

    res.status(201).json({
      id: nextId,
      username: username,
      email: email,
      phoneNumber: phoneNumber,
      password: password,
      role: "buyer",
      isLoggedn: false,
    });
  } catch (error) {
    res.status(500).json({ error: "Terjadi kesalahan saat membuat user" });
  }
});

app.get("/", async (req, res) => {
  try {
    const userRef = admin.database().ref("users");
    const snapshot = await userRef.once("value");
    const userList = snapshot.val();

    const usersArray = Object.keys(userList || {}).map((key) => ({
      id: key,
      ...userList[key],
    }));

    res.status(200).json(usersArray);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "terjadi kesalahan saat mengambil data users" });
  }
});

module.exports = app;
