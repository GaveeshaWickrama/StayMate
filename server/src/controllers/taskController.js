// controllers/taskController.js

const Task = require('../models/taskModel');
const Complaint = require('../models/complaintModel');

async function createTask(req, res) {
  const { complaintId, technicianId } = req.body;

  try {
    // only if the complaint exists, its forwarded to the technician
    const complaint = await Complaint.findById(complaintId);
    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    // Create a new task using complaint details
    const newTask = new Task({
      //get the current user id as the hostID
      complaint: complaint.complaintId,
      title: complaint.title,
      technician:technicianId,
      property:complaint.property,
      description: complaint.description,
      category: complaint.category,
      images: complaint.images // You can map or process images as needed
    });

    // Save the task to the database
    await newTask.save();

    res.status(200).json({ message: 'Task created successfully', task: newTask });
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ message: 'An error occurred while creating the task', error });
  }
}

async function assignTaskToTechnician(req, res) {
  const { taskId, technicianId , complaintId } = req.body;

  try {
    // Find the task based on the provided ID
    

    // Assign technician to the task
    const task = await Task.findById(taskId);

    task.technician = technicianId;
    task.status = 'pending'; // Optionally update status

    // Save the updated task
    await task.save();

    res.status(200).json({ message: 'Task assigned to technician successfully', task });
  } catch (error) {
    console.error('Error assigning task:', error);
    res.status(500).json({ message: 'An error occurred while assigning the task', error });
  }
}



async function getAllTasks(req, res) {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}
async function getTaskById(req, res) {
  const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
}



async function acceptTask(req,res){


  const { taskId, technicianId } = req.body;
  task.taskId = taskId;

  Task.findById(taskId)
  .then(task=>{
    task.status = 'pending';
    task.technicianId = technicianId;
    return  task.save();
  })
  .then(updatedTask=>{
      res.status(200).json({message:'you accepted this task', task: updatedTask.title});
  }) 
  .catch(error=>{
    alert('error accepting task');
    res.status(500).json({ message: 'An error occurred while accepting the task', error });

  })


}


module.exports = {
  createTask,
  assignTaskToTechnician,
  getAllTasks,
 
};
