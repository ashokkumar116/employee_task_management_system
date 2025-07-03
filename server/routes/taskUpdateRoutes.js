const express = require('express');
const { addUpdate, getUpdates } = require('../controllers/taskUpdateController');
const auth = require('../middlewares/auth');
const router = express.Router();

router.post('/addupdate/:id',auth,addUpdate);
router.get('/gettaskupdate/:id',auth,getUpdates);

module.exports = router;