const joi = require("joi");

const loginSchema = joi.object({
  name: joi.string().required(),
  password: joi.string().required(),
});
const addUserSchema = joi.object({
  name: joi.string().alphanum().min(5).max(255).required(),

  password: joi
    .string()
    .pattern(
      new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})")
    )
    .max(255)
    .required(),

  adminPrivileges: joi.boolean().required(),
});
const getUsersSchema = joi.object({
  name: joi.string().alphanum().min(1).max(255),
  adminPrivileges: joi.boolean(),
  orderName: joi.string().valid("asc", "desc"),
  orderAdminPrivileges: joi.string().valid("asc", "desc"),
});
const updateUserSchema = joi.object({
  _id: joi.string().alphanum().min(24).max(24).required(),
  password: joi
    .string()
    .pattern(
      new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})")
    )
    .max(255),
  adminPrivileges: joi.boolean(),
});
const deleteUserSchema = joi.object({
  _id: joi.string().alphanum().min(24).max(24).required(),
});

const addTaskSchema = joi.object({
  userId: joi.string().alphanum().min(24).max(24).required(),
  title: joi.string().max(255).required(),
  description: joi.string().required(),
  endDate: joi.string().min(10).max(10).required(),
});
const getTasksSchema = joi.object({
  userId: joi.string().alphanum().min(24).max(24),
  title: joi.string().max(255),
  description: joi.string(),
  status: joi.number().min(1).max(3),
  priority: joi.number().min(0).max(2),
  tagsText: joi.string(),
  notesText: joi.string(),
  endDate: joi.string().min(10).max(10),
  updateDate: joi.string().min(10).max(10),
  orderStatus: joi.string().valid("asc", "desc"),
  orderPriority: joi.string().valid("asc", "desc"),
  orderTitle: joi.string().valid("asc", "desc"),
  orderEndDate: joi.string().valid("asc", "desc"),
  orderUpdateDate: joi.string().valid("asc", "desc"),
});
const getTasksByUserSchema = joi.object({
  userId: joi.string().alphanum().min(24).max(24).required(),
  title: joi.string().max(255),
  description: joi.string(),
  status: joi.number().min(1).max(3),
  priority: joi.number().min(0).max(2),
  tagsText: joi.string(),
  notesText: joi.string(),
  endDate: joi.string().min(10).max(10),
  updateDate: joi.string().min(10).max(10),
  orderStatus: joi.string().valid("asc", "desc"),
  orderPriority: joi.string().valid("asc", "desc"),
  orderTitle: joi.string().valid("asc", "desc"),
  orderEndDate: joi.string().valid("asc", "desc"),
  orderUpdateDate: joi.string().valid("asc", "desc"),
});
const updateTaskSchema = joi.object({
  userId: joi.string().alphanum().min(24).max(24).required(),
  _id: joi.string().alphanum().min(24).max(24).required(),
  title: joi.string().max(255),
  description: joi.string(),
  endDate: joi.string().min(10).max(10),
  notes: joi.array().items(
    joi.object({
      text: joi.string().required(),
      date: joi.string().min(10).max(10).required(),
    })
  ),
  tags: joi.array().items(
    joi.object({
      text: joi.string().required(),
      color: joi
        .string()
        .valid(
          "primary",
          "secondary",
          "danger",
          "warning",
          "success",
          "info",
          "dark",
          "light",
          "white",
          "muted"
        )
        .required(),
    })
  ),
});
const deleteTaskSchema = joi.object({
  _id: joi.string().alphanum().min(24).max(24).required(),
});

const getStatusSchema = joi.object({
  code: joi.number().min(1).max(3).required(),
});
const getPrioritySchema = joi.object({
  code: joi.number().min(0).max(2).required(),
});

module.exports = {
  loginSchema,
  addUserSchema,
  getUsersSchema,
  updateUserSchema,
  deleteUserSchema,
  addTaskSchema,
  getTasksSchema,
  getTasksByUserSchema,
  updateTaskSchema,
  deleteTaskSchema,
  getStatusSchema,
  getPrioritySchema,
};
