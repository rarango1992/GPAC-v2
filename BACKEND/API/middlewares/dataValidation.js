const validators = require('./validations/validators')
const utilities = require('../utilities/utilities')


const validateData = (data) => {
  return (req, res, next) => {
  let dataToValidate = {}
  switch (data){
    case "getStatusSchema":
    case "getPrioritySchema":
      dataToValidate = req.params; break;
    case "getUsersSchema":
    case "getTasksSchema":
      dataToValidate = req.query; break;
    case "getTasksByUserSchema":
      dataToValidate = req.query;
      dataToValidate.userId = req.params.userId;
      break;
    default:
      dataToValidate = req.body; 
      break;
  }

  const { error } = validators[data].validate(dataToValidate);
  if (error) utilities.sendResponse(res, error.details, "Invalid Data.", 3, 400); else next();
}
};

module.exports = validateData;