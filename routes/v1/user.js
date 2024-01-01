const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const { createTask, readTasks, deleteTask, updateTask, assignTask } = require("../../controllers/user.js");
const { validateRequest } = require("../../middleware/validateRequest.js");

router.post(
    "/add-task", 
    [
        body("title").notEmpty().withMessage("Title is required"),
        body("description").notEmpty().withMessage("Description is required"),
    ],
    validateRequest,
    createTask
);

router.get(
    '/read-tasks',
    validateRequest,
    readTasks
);

router.delete(
    '/delete-task',
    [
        body("taskId").notEmpty().withMessage("task Id is required")
    ],
    validateRequest,
    deleteTask
);

router.put(
    '/update-task',
    [
        body("taskId").notEmpty().withMessage("Task Id is required"),
        body("title").notEmpty().withMessage("Title is required"),
        body("description").notEmpty().withMessage("Description is required"),
        body("status").notEmpty().withMessage("Status is required"),
        body("dueDate").notEmpty().withMessage("Due Date is required"),
    ],
    validateRequest,
    updateTask
)

router.post(
    '/assign-task',
    [
        body("taskId").notEmpty().withMessage("Task Id is required"),
        body("userId").notEmpty().withMessage("User Id is required"),
    ],
    validateRequest,
    assignTask
)

module.exports = router;
