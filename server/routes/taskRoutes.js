const express = require('express');
const adminAuth = require('../middlewares/adminAuth');
const { addTask, getMyTasks, getAllTasks, viewTask ,editTask, deleteTask} = require('../controllers/taskController');
const auth = require('../middlewares/auth');
const router = express.Router();


router.post('/createtask',adminAuth,addTask);
router.post('/getmytasks',auth,getMyTasks);
router.get('/getalltasks',adminAuth,getAllTasks);
router.get('/task/:id',auth,viewTask);
router.put('/task/edit/:id',adminAuth,editTask);
router.delete('/task/delete/:id',adminAuth,deleteTask);


module.exports = router;