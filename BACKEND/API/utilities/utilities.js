const userModel = require("../models/user");

const orderData = (db, order) => {
  if (order.adminPrivileges === "asc") {
    db.sort((a, b) => {
      if (a.adminPrivileges < b.adminPrivileges) {
        return 1;
      }
      if (a.adminPrivileges > b.adminPrivileges) {
        return -1;
      }
      return 0;
    });
  } else {
    if (order.adminPrivileges === "desc") {
      db.sort((a, b) => {
        if (a.adminPrivileges < b.adminPrivileges) {
          return -1;
        }
        if (a.adminPrivileges > b.adminPrivileges) {
          return 1;
        }
        return 0;
      });
    }
  }
  if (order.name === "asc") {
    db.sort((a, b) => {
      let fa = a.name.toLowerCase(),
        fb = b.name.toLowerCase();

      if (fa < fb) {
        return -1;
      }
      if (fa > fb) {
        return 1;
      }
      return 0;
    });
  } else {
    if (order.name === "desc") {
      db.sort((a, b) => {
        let fa = a.name.toLowerCase(),
          fb = b.name.toLowerCase();

        if (fa < fb) {
          return 1;
        }
        if (fa > fb) {
          return -1;
        }
        return 0;
      });
    }
  }

  if (order.orderAdminPrivileges === "asc") {
    db.sort((a, b) => {
      if (a.adminPrivileges < b.adminPrivileges) {
        return 1;
      }
      if (a.adminPrivileges > b.adminPrivileges) {
        return -1;
      }
      return 0;
    });
  } else {
    if (order.orderAdminPrivileges === "desc") {
      db.sort((a, b) => {
        if (a.adminPrivileges < b.adminPrivileges) {
          return -1;
        }
        if (a.adminPrivileges > b.adminPrivileges) {
          return 1;
        }
        return 0;
      });
    }
  }
  if (order.orderName === "asc") {
    db.sort((a, b) => {
      let fa = a.name.toLowerCase(),
        fb = b.name.toLowerCase();

      if (fa < fb) {
        return -1;
      }
      if (fa > fb) {
        return 1;
      }
      return 0;
    });
  } else {
    if (order.orderName === "desc") {
      db.sort((a, b) => {
        let fa = a.name.toLowerCase(),
          fb = b.name.toLowerCase();

        if (fa < fb) {
          return 1;
        }
        if (fa > fb) {
          return -1;
        }
        return 0;
      });
    }
  }

  if (order.status === "asc") {
    db.sort((a, b) => {
      return a.status - b.status;
    });
  } else {
    if (order.status === "desc") {
      db.sort((a, b) => {
        return b.status - a.status;
      });
    }
  }
  if (order.priority === "asc") {
    db.sort((a, b) => {
      return b.priority - a.priority;
    });
  } else {
    if (order.priority === "desc") {
      db.sort((a, b) => {
        return a.priority - b.priority;
      });
    }
  }
  if (order.title === "asc") {
    db.sort((a, b) => {
      let fa = a.title.toLowerCase(),
        fb = b.title.toLowerCase();

      if (fa < fb) {
        return -1;
      }
      if (fa > fb) {
        return 1;
      }
      return 0;
    });
  } else {
    if (order.title === "desc") {
      db.sort((a, b) => {
        let fa = a.title.toLowerCase(),
          fb = b.title.toLowerCase();

        if (fa < fb) {
          return 1;
        }
        if (fa > fb) {
          return -1;
        }
        return 0;
      });
    }
  }
  if (order.endDate === "asc") {
    db.sort((a, b) => {
      let aArray = a.endDate.split("/"),
        bArray = b.endDate.split("/");

      let fa = aArray[1] + "/" + aArray[0] + "/" + aArray[2],
        fb = bArray[1] + "/" + bArray[0] + "/" + bArray[2];

      let da = new Date(fa),
        db = new Date(fb);

      return da - db;
    });
  } else {
    if (order.endDate === "desc") {
      db.sort((a, b) => {
        let aArray = a.endDate.split("/"),
          bArray = b.endDate.split("/");

        let fa = aArray[1] + "/" + aArray[0] + "/" + aArray[2],
          fb = bArray[1] + "/" + bArray[0] + "/" + bArray[2];

        let da = new Date(fa),
          db = new Date(fb);

        return db - da;
      });
    }
  }
  if (order.updateDate === "asc") {
    db.sort((a, b) => {
      let aArray = a.updateDate.split("/"),
        bArray = b.updateDate.split("/");

      let fa = aArray[1] + "/" + aArray[0] + "/" + aArray[2],
        fb = bArray[1] + "/" + bArray[0] + "/" + bArray[2];

      let da = new Date(fa),
        db = new Date(fb);

      return da - db;
    });
  } else {
    if (order.updateDate === "desc") {
      db.sort((a, b) => {
        let aArray = a.updateDate.split("/"),
          bArray = b.updateDate.split("/");

        let fa = aArray[1] + "/" + aArray[0] + "/" + aArray[2],
          fb = bArray[1] + "/" + bArray[0] + "/" + bArray[2];

        let da = new Date(fa),
          db = new Date(fb);

        return db - da;
      });
    }
  }

  return db;
};
const filterData = (data) => {
  let filter = {};
  if (data.name) {
    let regexp = new RegExp("^" + data.name);
    filter.name = regexp;
  }
  if (data.adminPrivileges) filter.adminPrivileges = data.adminPrivileges;
  if (data.userId) filter.userId = data.userId;
  if (data.title) {
    let regexp = new RegExp("^" + data.title);
    filter.title = regexp;
  }
  if (data.description) {
    let regexp = new RegExp("^" + data.description);
    filter.description = regexp;
  }
  if (data.status) filter.status = data.status;
  if (data.priority != undefined) filter.priority = data.priority;
  if (data.endDate) filter.endDate = data.endDate;
  if (data.updateDate) filter.updateDate = data.updateDate;
  if (data.tags) {
    let regexp = new RegExp("^" + data.tags.text);
    filter["tags.text"] = regexp;
  }
  if (data.notes) {
    let regexp = new RegExp("^" + data.notes.text);
    filter["notes.text"] = regexp;
  }
  if (data.tagsText) {
    let regexp = new RegExp("^" + data.tagsText);
    filter["tags.text"] = regexp;
  }
  if (data.notesText) {
    let regexp = new RegExp("^" + data.notesText);
    filter["notes.text"] = regexp;
  }
  return filter;
};
const generateTaskNewData = (data) => {
  let newData = {};

  if (data.title) newData.title = data.title;
  if (data.description) newData.description = data.description;
  if (data.status) newData.status = data.status;
  if (data.priority) newData.priority = data.priority;
  if (data.endDate) newData.endDate = data.endDate;
  if (data.notes) newData.notes = data.notes;
  if (data.tags) newData.tags = data.tags;

  let today = generateTodayDate();

  newData.updateDate = today;

  return newData;
};
const sendErrorResponse = (res, err) => {
  const response = {
    data: err.toString(),
    msg: "API Error.",
    code: 1,
  };
  res.status(500).send(response);
};
const sendResponse = (res, data, msg, code, status) => {
  const response = {
    data: data,
    msg: msg,
    code: code,
  };
  res.status(status).send(response);
};
const sendResponseWithToken = (res, data, msg, code, status, token) => {
  const response = {
    data: data,
    msg: msg,
    code: code,
    token: token,
  };
  res.status(status).send(response);
};
const updateUserMethod = (res, _id, newData) => {
  userModel.findOneAndUpdate({ _id: _id }, newData, (err, db) => {
    if (!err) {
      if (db) {
        userModel.findOne(
          { _id: db._id },
          { password: 0 },
          (err, dbUpdated) => {
            if (!err) {
              if (dbUpdated)
                sendResponse(res, dbUpdated, "User updated in DB.", 200, 201);
              else sendResponse(res, {}, "User not found in DB.", 10, 400);
            } else sendErrorResponse(res, err);
          }
        );
      } else sendResponse(res, {}, "User not found in DB.", 10, 400);
    } else sendErrorResponse(res, err);
  });
};
const generateTodayDate = () => {
  const date = new Date(),
    day = date.getDate(),
    month = date.getMonth() + 1,
    year = date.getFullYear(),
    dia = day.toString(),
    mes = month.toString();
  let today = "";
  if (day < 10) today = "0";
  today += dia + "/";
  if (month < 10) today += "0";
  today += mes + "/" + year;
  return today;
};

module.exports = {
  orderData,
  filterData,
  generateTaskNewData,
  sendErrorResponse,
  sendResponse,
  sendResponseWithToken,
  updateUserMethod,
  generateTodayDate
};
