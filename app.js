require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http");
const helmet = require("helmet");
const app = express();

const server = http.createServer(app);

let cors_whitelist =
  process.env["NODE_ENV"] === "production"
    ? ["http://10.94.102.59"]
    : ["http://localhost:3000"];

const corsOptionsDelegate = (req, callback) => {
  let corsOptions;
  if (cors_whitelist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true };
  } else {
    corsOptions = { origin: false };
  }
  callback(null, corsOptions);
};

app.use(cors(corsOptionsDelegate));

app.use(helmet());

const logger = require("./middleware/logger");
const schemaValidator = require("./middleware/schemaValidator");
const completeJobs = require("./routes/api/completeJobRoutes");

app.set("json spaces", 2);

//Init middlewares

app.use(express.json({ limit: "100mb" }));

app.use(express.urlencoded({ limit: "100mb", extended: false }));
app.use(logger.logger);

// Get wordkpace details
app.use("/api/jobs", completeJobs);

app.use(schemaValidator.validationErrorMiddleware);
app.use(logger.errorLogger);

const PORT =
  process.env["NODE_ENV"] === "development"
    ? process.env.SERVERPORT || 5003
    : 5003;

server.listen(PORT, () =>
  console.log(`Server started on port ${PORT} in ${process.env["NODE_ENV"]}`)
);
