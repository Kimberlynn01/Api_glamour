const express = require("express");
const app = express();
const admin = require("firebase-admin");
const route = require("./route");
app.use(express.json());

const serviceAccount = require("./api-glamour-app-firebase-adminsdk-wf5c2-9fbcd7e825.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://api-glamour-app-default-rtdb.asia-southeast1.firebasedatabase.app/",
});

const authenticateMiddleware = (req, res, next) => {
  const { auth } = req.query;

  if (auth === "2006") {
    next();
  } else {
    res.status(403).json({ error: "Access Denied" });
  }
};

app.use("/api/v1", authenticateMiddleware);

app.use("/api/v1", route);

app.use((req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
});

module.exports = app;
