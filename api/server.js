const express = require("express");
const server = express();
server.use(express.json());

const helmet = require("helmet");
server.use(helmet());

const router = require("./recipes/recipes-router");
server.use("/api/recipes", router);

// server.use((err, req, res, next) => {
//   // eslint-disable-line
//   res.status(500).json({
//     message: err.message,
//     stack: err.stack,
//   });
// });

module.exports = server;
