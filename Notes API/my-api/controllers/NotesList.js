const mongoose = require("mongoose");
// const List = require("../Models/List");
const Title = require("../Models/Title")

const createTitle = async (req, res) => {
       try {
         const { title, tasks } = req.body;
         const newTitle = new Title({ title, tasks });
         await newTitle.save();
         res.status(201).json(newTitle);
       } catch (err) {
         res.status(500).json({ message: err.message });
       }
     };


const getAllTitles = async (req, res) => {
       try {
         const titles = await Title.find();
         res.json(titles);
       } catch (err) {
         res.status(500).json({ message: err.message });
       }
     };


const addTaskToTitle = async (req, res) => {
       try {
         const title = await Title.findById(req.params.id);
         title.tasks.push(req.body);
         await title.save();
         res.json(title);
       } catch (err) {
         res.status(500).json({ message: err.message });
       }
     };

// Update Title Name
const updateTitle = async (req, res) => {
       const { titleId } = req.params;
       const { title } = req.body;
     
       if (!mongoose.Types.ObjectId.isValid(titleId)) {
         return res.status(400).json({ message: 'Invalid title ID' });
       }
     
       try {
         const titleToUpdate = await Title.findById(titleId);
         if (!titleToUpdate) {
           return res.status(404).json({ message: 'Title not found' });
         }
     
         // Update the title if provided
         if (title) {
           titleToUpdate.title = title;
         }
     
         await titleToUpdate.save();
         res.json({ message: "Title updated successfully", titleToUpdate });
       } catch (err) {
         console.error('Error:', err); // Log the error for more insight
         res.status(500).json({ message: err.message });
       }
     };
     
     // Update Tasks for a Title
     const updateTasks = async (req, res) => {
       const { titleId } = req.params;
       const { tasks } = req.body; // Update tasks array
     
       try {
         const titleToUpdate = await Title.findById(titleId);
         if (!titleToUpdate) {
           return res.status(404).json({ message: 'Title not found' });
         }
     
         // Update the tasks array
         if (tasks) {
           titleToUpdate.tasks = tasks;
         }
     
         await titleToUpdate.save();
         res.json({ message: "Tasks updated successfully", titleToUpdate });
       } catch (err) {
         res.status(500).json({ message: err.message });
       }
     };   

const deleteTaskFromTitle = async (req, res) => {
       try {
         const title = await Title.findById(req.params.titleId);
         title.tasks = title.tasks.filter(task => task._id.toString() !== req.params.taskId);
         await title.save();
         res.json(title);
       } catch (err) {
         res.status(500).json({ message: err.message });
       }
     };





module.exports = {createTitle,getAllTitles,addTaskToTitle,updateTitle,updateTasks,deleteTaskFromTitle};