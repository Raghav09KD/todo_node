const { MongoClient } = require("mongodb");
const mongodbUrl =
  "";

const client = new MongoClient(mongodbUrl);
const connectionResponse = client.connect();
const db = client.db();
connectionResponse
  ? console.log("Successfully Connected to Database")
  : console.log("Error Connecting to Database");

module.exports = { db, client };
