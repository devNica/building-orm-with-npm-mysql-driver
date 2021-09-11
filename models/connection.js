require("dotenv").config();
const mysql = require("mysql2/promise");
const config = require("../config/db.config");
const dialect = process.env.DBDIALECT || "";

async function connectToMySQL() {
  return await mysql.createConnection(config);
}

async function connectToPgSQL() {
  return {};
}

function connectionToDatabase() {
  try {
    switch (dialect) {
      case "mysql":
        return connectToMySQL();
      case "postgres":
        return connectToPgSQL();

      case "":
        throw new Error("connection to the database has failed");
    }
  } catch (error) {
    return error;
  }
}

module.exports = connectionToDatabase;
