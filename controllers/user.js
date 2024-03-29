const { handleResponse } = require('../utils/responses.js');
const {Task } = require('../models')

//  craete a task
exports.createTask = (req, res) => {
  const body = req.body;
  const user = req.user;
  try{
    Task.create({
      title: body.title,
      description: body.description,
      status: 'Active',
      dueDate: new Date(),
      userId: user.id
    }).then((task) => {
      handleResponse(res, {message: 'Task Created Successfully'})
    })
  }
  catch(err){
    console.log("Error", err)
  }
  
};

// read all Tasks
exports.readTasks = (req, res) => {
  try{
    Task.findAll().then((task) => {
      handleResponse(res, {task: task})
    })
  }
  catch(err){
    console.log("Error", err)
  }
 
};

// Delete a Task
exports.deleteTask = (req, res) => {
  const body = req.body;
  try{
    Task.destroy({
      where:{ id: body.taskId}
    }).then((task) => {
      handleResponse(res, {message: "Task Deleted Successfully."})
    })
  }
  catch(err){
    console.log("Error", err)
  } 
};

// Update a Task
exports.updateTask = (req, res) => {
  const body = req.body;
  try{
    Task.update(
      {
        title: body.title,
        description: body.description,
        status: body.status,
        dueDate: body.dueDate,
        userId: 1
      },
      {
        where: {id: 1}
      } 
    ).then((task) => {
      handleResponse(res, {message: "Task Updated Successfully."})
    })
  }
  catch(err){
    console.log("Error", err)
  } 
}

// Assign a Task to a User
exports.assignTask = (req, res) => {
  const body = req.body;
  try{
    Task.update({
      userId: body.userId
    },{
      where: {id: body.taskId}
    }).then((task) => {
      handleResponse(res, {message: "Task Assign Successfully."})
    })
  }
  catch(err){
    console.log("Error", err)
  } 
}

