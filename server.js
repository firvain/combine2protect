"use strict";

// const { resolve } = require("path");
require("dotenv-flow").config({});
const path = require("path");
const serveStatic = require("serve-static");
const history = require("connect-history-api-fallback");
const express = require("express");
const app = express();
const compression = require("compression");
const morgan = require("morgan");
const cors = require("cors");
const { PORT = 3000 } = process.env;

app.use(morgan("dev"));
app.use(cors());
app.use(compression());
console.log(process.env.HOST);
// API
const api = require("./server/");
app.use("/api", api);

// UI
// app.use(serveStatic(path.join(__dirname, "./client/dist")));
// app.use(
//   history({
//     disableDotRule: true,
//     verbose: true,
//     rewrites: [{ from: /\/api/, to: "/api" }]
//   })
// );

// app.use(serveStatic(path.join(__dirname, "./client/dist")));

// Go
app.listen(PORT, () => console.log(`App running on port ${PORT}!`));
