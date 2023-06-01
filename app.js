require("dotenv").config();

const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const { appDataSource } = require("./models/dataSource");
const routes = require("./services");
const { accessToken } = require("./middleware/auth");
const { globalHanderError } = require("./middleware/error");

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(routes);
app.use(globalHanderError);

app.get("/ping", function (req, res) {
    res.json({ message: "pong" });
});

const PORT = process.env.PORT;

app.listen(PORT, function () {
    console.log(`server listening on port ${PORT}`);
});
