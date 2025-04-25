const express = require ("express");
const router = express.Router();

const {createTitle,getAllTitles,addTaskToTitle,updateTitle,updateTasks,deleteTaskFromTitle} = require("../controllers/NotesList")


// call all routes
// router.route("/").get(GetAllLists).post(CreateList);
// router.route("/:id").get(GetListById).put(UpdateList).delete(DeleteList);

router.post('/', createTitle);
router.get('/', getAllTitles);
router.post('/:titleid/tasks', addTaskToTitle);
router.put('/:titleId', updateTitle);
router.put('/:titleId/tasks', updateTasks);
router.delete('/:titleId/tasks/:taskId', deleteTaskFromTitle);



// export routes
module.exports = router; 