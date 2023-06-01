// require("dotenv").config();
// const routes = require("./routes");

// const express = require("express");
// const cors = require("cors");
// const logger = require("morgan");
// const { appDataSource } = require("./models/dataSource");

// const app = express();

// app.use(cors());
// app.use(logger("dev"));
// app.use(express.json());
// app.use(routes);

// app.get("/ping", function (req, res, next) {
//   res.json({ message: "pong" });
// });

// const PORT = process.env.PORT;

// app.listen(PORT, () => {
//   appDataSource
//     .initialize()
//     .then(() => {
//       console.log(`Data Source has been initialized`);
//     })
//     .catch((err) => {
//       console.error(`ERROR during Data Source initialization`, err);
//       appDataSource.destroy();
//     });
//   console.log(`server is running on port ${PORT}`);
// });

require("dotenv").config();
const routes = require("./routes");
const http = require("http");

const cors = require("cors");
const logger = require("morgan");

const express = require("express");
const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(routes);

const server = http.createServer(app);
const PORT = process.env.PORT;

app.get("/ping", function (req, res, next) {
  res.json({ message: "rewe" });
});

const start = async () => {
  try {
    server.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
  } catch (err) {
    console.error(err);
  }
};

start();
