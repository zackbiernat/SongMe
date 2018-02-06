const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();
const url = process.env.dbUrl;

exports.addNewUser = (req, res) => {
  MongoClient.connect(url, (err, db) => {
    checkIfUserExists(db, req.body.username, (notFound) => {
      console.log('NF', notFound)
      if (notFound) {
        dbAddUser(db, req.body, (success) => {
          if (success) {
            res.send(success.ops[0]);
          } else {
            res.sendStatus(404);
          }
          db.close();
        })
      } else {
        res.sendStatus(409); // Username already exists
      }
    });
  })
}

//Signs up user
const dbAddUser = (db, profile, cb) => {
  let collection = db.collection('users');
  collection.insert(profile, (err, success) => {
    cb(success);
  });

}

const checkIfUserExists = (db, username, cb) => {
  let collection = db.collection('users');
  collection.find({username: username})
  .toArray((err, found) => {
    if (found.length) {
      cb(false);
    } else {
      cb(true);
    }
  })
}


exports.authenticateUser = (req, res) => {
  MongoClient.connect(url, (err, db) => {

  })
}