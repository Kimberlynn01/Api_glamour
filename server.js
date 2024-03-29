const { createServer } = require("http");
const express = require("express");
const app = express();
const admin = require("firebase-admin");

app.use(express.json());

app.get("/api", (req, res) => {
  res.send("Backend API EndPoint By Danu");
});

const serviceAccount = require("./api-glamour-app-firebase-adminsdk-wf5c2-9fbcd7e825.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://api-glamour-app-default-rtdb.asia-southeast1.firebasedatabase.app/",
});

const server = createServer(app);

server.listen(process.env.PORT || 3000, () => {
  console.log(`Server berjalan di port ${process.env.PORT || 3000}`);
});
