const express = require('express');
const { createAnnouncement, getAnnouncements } = require('../controllers/announcementsController');
const adminAuth = require('../middlewares/adminAuth');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post('/createannouncement',adminAuth,createAnnouncement);
router.get('/getannouncements',auth,getAnnouncements);

module.exports = router;