"use strict";
require("dotenv-flow").config({});
const repos = require("./repos"); // loading all repositories
console.log(repos);
const config = {
  host: process.env.HOST,
  port: process.env.PORT,
  database: process.env.DATABASE,
  user: process.env.USER,
  password: process.env.PASSWORD,
  application_name: process.env.APPLICATION_NAME,
  ssl: true
};
// pg-promise initialization options:
const initOptions = {
  // Use a custom promise library, instead of the default ES6 Promise:
  // promiseLib: promise,
  // Extending the database protocol with our custom repositories;
  // API: http://vitaly-t.github.io/pg-promise/global.html#event:extend
  extend(obj) {
    // Database Context (dc) is mainly useful when extending multiple databases
    // with different access API-s.

    // Do not use 'require()' here, because this event occurs for every task
    // and transaction being executed, which should be as fast as possible.
    obj.pages = new repos.Pages(obj, pgp);
  }
};
// Load and initialize pg-promise:
const pgp = require("pg-promise")(initOptions);
// Create the database instance:
const db = pgp(config);
module.exports = db;
