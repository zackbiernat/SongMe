const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();
const url = process.env.dbUrl;

exports.addNewUser = (req, res) => {
  MongoClient.connect(url, (err, db) => {
    res.send({message: 'You connected and responded!'});
  })
}