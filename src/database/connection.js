const { MongoClient } = require("mongodb");
const mongodbUrl =
  "mongodb+srv://raghavdholu09:WGT01doSnsZdzbo1@heyna.rxlvath.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(mongodbUrl);
const connectionResponse = client.connect();
const db = client.db();
connectionResponse
  ? console.log("Successfully Connected to Database")
  : console.log("Error Connecting to Database");

module.exports = { db, client };
