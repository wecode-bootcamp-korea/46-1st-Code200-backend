require("dotenv").config();

const express = require("express");
const routes = require("./routes");
const cors = require("cors");
const logger = require("morgan");
const { appDataSource } = require("./models/dataSource");
const { globalErrorHandler } = require("./middleware/error");
const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(routes);
app.use(globalErrorHandler);

app.get("/ping", (req, res) => {
  res.json({ message: "pong" });
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  appDataSource
    .initialize()
    .then(() => {
      console.log(`Data Source has been initialized`);
    })
    .catch((err) => {
      console.error(`ERROR during Data Source initialization`, err);
      appDataSource.destroy();
    });
  console.log(`server is running on port ${PORT}`);
});
