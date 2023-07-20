const express = require("express");
const router = express.Router();
const statusModel = require("../models/status");
const priorityModel = require("../models/priority");
const auth = require("../middlewares/auth");
const validateData = require("../middlewares/dataValidation");
const utilities = require("../utilities/utilities");

router.get(
  "/status/:code",
  [auth, validateData("getStatusSchema")],
  (req, res, next) => {
    let filter = {
      code: req.params.code,
    };
    statusModel.findOne(filter, (err, db) => {
      if (!err) utilities.sendResponse(res, db, "Status Title.", 200, 200);
      else utilities.sendErrorResponse(res, err);
    });
  }
);

router.get(
  "/priority/:code",
  [auth, validateData("getPrioritySchema")],
  (req, res, next) => {
    let filter = {
      level: req.params.code,
    };
    priorityModel.findOne(filter, (err, db) => {
      if (!err) utilities.sendResponse(res, db, "Priority Title.", 200, 200);
      else utilities.sendErrorResponse(res, err);
    });
  }
);

module.exports = router;
