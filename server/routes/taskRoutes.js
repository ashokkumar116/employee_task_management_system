const express = require('express');
const adminAuth = require('../middlewares/adminAuth');
const { addTask, getMyTasks, getAllTasks, viewTask ,editTask, deleteTask, updateTaskStatus, getCompletedTasks, getProgressTasks, getNotStartedTasks, getHisTask} = require('../controllers/taskController');
const auth = require('../middlewares/auth');
const router = express.Router();


router.post('/createtask',adminAuth,addTask);
router.get('/getmytasks',auth,getMyTasks);
router.get('/gethistask/:id',adminAuth,getHisTask);
router.get('/getalltasks',adminAuth,getAllTasks);
router.get('/task/:id',auth,viewTask);
router.put('/task/edit/:id',adminAuth,editTask);
router.delete('/task/delete/:id',adminAuth,deleteTask);
router.put('/task/updatestatus/:id',auth,updateTaskStatus);
router.get('/completed',adminAuth,getCompletedTasks);
router.get('/progress',adminAuth,getProgressTasks);
router.get('/notstarted',adminAuth,getNotStartedTasks);


module.exports = router;