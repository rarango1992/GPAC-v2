const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user");
require("dotenv").config();
const auth = require("../middlewares/auth");
const validateData = require("../middlewares/dataValidation");
const {
  orderData,
  sendErrorResponse,
  sendResponse,
  filterData,
  sendResponseWithToken,
  updateUserMethod
} = require("../utilities/utilities");

router.post("/Login", validateData("loginSchema"), (req, res, next) => {
  userModel.findOne(
    {
      name: req.body.name,
    },
    (err, db) => {
      if (!err) {
        if (db) {
          bcrypt.compare(req.body.password, db.password, (err, result) => {
            if (!err) {
              if (result) {
                const token = jwt.sign(
                  { userId: db._id },
                  process.env.TOKEN_KEY,
                  { expiresIn: "1h" }
                );
                const data = {
                  login: true,
                  name: db.name,
                  adminPrivileges: db.adminPrivileges,
                  _id: db._id,
                };
                sendResponseWithToken(
                  res,
                  data,
                  "Login Success.",
                  200,
                  200,
                  token
                );
              } else
                sendResponse(
                  res,
                  { login: false },
                  "Invalid Password.",
                  10,
                  401
                );
            } else sendErrorResponse(res, err);
          });
        } else sendResponse(res, { login: false }, "Invalid User.", 10, 401);
      } else sendErrorResponse(res, err);
    }
  );
});

router.post("/", [auth, validateData("addUserSchema")], (req, res, next) => {
  const saltRounds = 10;
  bcrypt.genSalt(saltRounds, (err, salt) => {
    if (!err) {
      bcrypt.hash(req.body.password, salt, (err, hash) => {
        if (!err) {
          userModel.find({ name: req.body.name }, (err, db) => {
            if (!err) {
              if (db.length > 0)
                sendResponse(res, {}, "User already exists in DB.", 10, 400);
              else {
                const registro = new userModel({
                  name: req.body.name,
                  password: hash,
                  adminPrivileges: req.body.adminPrivileges,
                });
                registro.save((err, db) => {
                  if (!err)
                    sendResponse(res, db, "User created in DB.", 200, 201);
                  else sendErrorResponse(res, err);
                });
              }
            } else sendErrorResponse(res, err);
          });
        } else sendErrorResponse(res, err);
      });
    } else sendErrorResponse(res, err);
  });
});

router.get("/", [auth, validateData("getUsersSchema")], (req, res, next) => {
  let filter = filterData(req.query);
  userModel.find(filter, { password: 0 }, (err, db) => {
    if (!err) {
      let order = req.query;
      db = orderData(db, order);
      sendResponse(res, db, "User List.", 200, 200);
    } else sendErrorResponse(res, err);
  });
});

router.put("/", [auth, validateData("updateUserSchema")], (req, res, next) => {
  let newData = {};
  const saltRounds = 10;
  if (req.body.adminPrivileges != undefined)
    newData.adminPrivileges = req.body.adminPrivileges;
  bcrypt.genSalt(saltRounds, (err, salt) => {
    if (!err) {
      if (req.body.password) {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
          if (!err) {
            newData.password = hash;
            updateUserMethod(res, req.body._id, newData)
          } else sendErrorResponse(res, err);
        });
      } else updateUserMethod(res, req.body._id, newData)
    } else sendErrorResponse(res, err);
  });
});

router.delete(
  "/",
  [auth, validateData("deleteUserSchema")],
  (req, res, next) => {
    userModel.findOneAndDelete({ _id: req.body._id }, (err, db) => {
      if (!err) {
        if (db) sendResponse(res, db, "User deleted in DB.", 200, 200);
        else sendResponse(res, {}, "User not found in DB.", 10, 400);
      } else sendErrorResponse(res, err);
    });
  }
);

module.exports = router;
