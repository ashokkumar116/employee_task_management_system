const express = require('express');
const { createAnnouncement, getAnnouncements, getOneAnnouncement, editAnnouncement, deleteAnnouncement } = require('../controllers/announcementsController');
const adminAuth = require('../middlewares/adminAuth');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post('/createannouncement',adminAuth,createAnnouncement);
router.get('/getannouncements',auth,getAnnouncements);
router.get('/viewannouncement/:id',auth,getOneAnnouncement);
router.put('/editannouncement/:id',adminAuth,editAnnouncement)
router.delete('/deleteannouncement/:id',adminAuth,deleteAnnouncement);

module.exports = router;