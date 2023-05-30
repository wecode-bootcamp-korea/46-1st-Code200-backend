require("dotenv").config();
const express = require("express");
const routes = require("./routes");
const cors = require("cors");
const logger = require("morgan");

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(routes);

app.get("/ping", function (req, res, next) {
  res.json({ message: "pong" });
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
