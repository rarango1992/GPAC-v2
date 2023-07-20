const express = require("express");
const router = express.Router();
const taskModel = require("../models/task");
const userModel = require("../models/user");
const auth = require("../middlewares/auth");
const validateData = require("../middlewares/dataValidation");
const utilities = require("../utilities/utilities");

router.post("/", [auth, validateData("addTaskSchema")], (req, res, next) => {
  userModel.findOne({ _id: req.body.userId }, (err, db) => {
    if (!err) {
      if (db) {
        let today = utilities.generateTodayDate();
        const registro = new taskModel({
          userId: req.body.userId,
          title: req.body.title,
          description: req.body.description,
          status: 1,
          priority: 2,
          endDate: req.body.endDate,
          updateDate: today,
        });
        registro.save((err) => {
          if (!err)
            utilities.sendResponse(res, registro, "Task created in DB.", 201, 201);
          else utilities.sendErrorResponse(res, err);
        });
      } else utilities.sendResponse(res, {}, "User not found in DB.", 10, 400);
    } else utilities.sendErrorResponse(res, err);
  });
});

router.get("/", [auth, validateData("getTasksSchema")], (req, res, next) => {
  let filter = utilities.filterData(req.query);
  taskModel.find(filter, (err, db) => {
    if (!err) {
      let order = req.query;
      db = utilities.orderData(db, order);
      utilities.sendResponse(res, db, "Tasks List.", 200, 200);
    } else utilities.sendErrorResponse(res, err);
  });
});

router.get(
  "/:userId",
  [auth, validateData("getTasksByUserSchema")],
  (req, res, next) => {
    let filter = utilities.filterData(req.query);
    filter.userId = req.params.userId
    taskModel.find(filter, (err, db) => {
      if (!err) {
        let order = req.query;
        db = utilities.orderData(db, order);
        utilities.sendResponse(res, db, "Tasks List.", 200, 200);
      } else utilities.sendErrorResponse(res, err);
    });
  }
);

router.put("/", [auth, validateData("updateTaskSchema")], (req, res, next) => {
  const filter = {
    userId: req.body.userId,
    _id: req.body._id,
  };

  let newData = utilities.generateTaskNewData(req.body);

  taskModel.findOneAndUpdate(filter, newData, (err, db) => {
    if (!err) {
      if (db) {
        taskModel.findOne({ _id: db._id }, (err, dbUpdated) => {
          if (!err) {
            if (dbUpdated)
              utilities.sendResponse(res, dbUpdated, "Task updated in DB.", 200, 201);
            else utilities.sendResponse(res, {}, "Task not found in DB.", 10, 400);
          } else utilities.sendErrorResponse(res, err);
        });
      } else utilities.sendResponse(res, {}, "Task not found in DB.", 10, 400);
    } else utilities.sendErrorResponse(res, err);
  });
});

router.delete(
  "/",
  [auth, validateData("deleteTaskSchema")],
  (req, res, next) => {
    taskModel.findOneAndDelete({ _id: req.body._id }, (err, db) => {
      if (!err) {
        if (db) utilities.sendResponse(res, db, "Task deleted in DB.", 200, 200);
        else utilities.sendResponse(res, {}, "Task not found in DB.", 10, 400);
      } else utilities.sendErrorResponse(res, err);
    });
  }
);

module.exports = router;
