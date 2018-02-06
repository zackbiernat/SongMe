const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();
const url = process.env.dbUrl;

//Handles User signup req
exports.addNewUser = (req, res) => {
  MongoClient.connect(url, (err, db) => {
    checkIfUserExists(db, req.body.username, (notFound) => {
      if (notFound) {
        dbAddUser(db, req.body, (success) => {
          if (success) {
            res.sendStatus(201);
          } else {
            res.sendStatus(404);
          }
          db.close();
        })
      } else {
        res.sendStatus(409); // Username already exists
      }
    });
  });
}

//Signs up user
const dbAddUser = (db, profile, cb) => {
  let collection = db.collection('users');
  collection.insert(profile, (err, success) => {
    cb(success);
  });
}

//Check if username is unique
const checkIfUserExists = (db, username, cb) => {
  let collection = db.collection('users');
  collection.find({username: username})
  .toArray((err, found) => {
    if (found.length) {
      cb(false);
    } else {
      cb(true);
    }
  });
}

//Handles User auth request
exports.authenticateUser = (req, res) => {
  MongoClient.connect(url, (err, db) => {
    authenticateCredentials(db, req.body, (success) => {
      if (success) {
        res.sendStatus(200); //Auth OK
      } else {
        res.sendStatus(403); //Authentication failed
      }
    });
  });
}

//Check if credentials are valid
const authenticateCredentials = (db, credentials, cb) => {
  let collection = db.collection('users');
  collection.find(credentials)
  .toArray((err, found) => {
    if (found.length) {
      cb(true);
    } else {
      cb(false);
    }
  });
}