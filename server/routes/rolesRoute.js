const express = require('express');
const adminAuth = require('../middlewares/adminAuth');
const { addRole, getRoles, deleteRole } = require('../controllers/rolesController');
const router = express.Router();


router.post('/addroles',adminAuth,addRole);
router.get('/getroles',adminAuth,getRoles)
router.delete('/deleterole/:id', adminAuth,deleteRole)

module.exports = router;