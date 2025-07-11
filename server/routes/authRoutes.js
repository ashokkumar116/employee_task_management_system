const express = require("express");
const {
    addEmployee,
    login,
    getAllEmployees,
    logout,
    getSpecificUser,
    editUser,
    deleteUser,
    getMe,
    updateProfilePic,
    getAdmins,
    getEmp,
    getPositionCounts,
    changePassword,
    sendOtp,
    verifyOtp,
    passReset,
} = require("../controllers/authController");
const upload = require("../middlewares/profileUpload");
const adminAuth = require("../middlewares/adminAuth");
const auth = require("../middlewares/auth");

const router = express.Router();

router.post(
    "/createEmployee",
    adminAuth,
    upload.single("profile_pic"),
    addEmployee
);
router.post("/login", login);
router.get("/employees", auth, getAllEmployees);
router.post("/logout", logout);
router.get("/employees/:id", adminAuth, getSpecificUser);
router.put("/employee/edit/:id", adminAuth,upload.single("profile_pic"), editUser);
router.delete("/employee/delete/:id", adminAuth, deleteUser);
router.get("/me", auth, getMe);
router.put("/updateprofile", auth,upload.single("profile_pic"), updateProfilePic);
router.get('/admins',adminAuth,getAdmins)
router.get('/emp',adminAuth,getEmp);
router.get("/positions-count",adminAuth,getPositionCounts);
router.put("/change-password",auth, changePassword);
router.get('/forgotpass',auth,sendOtp);
router.post('/verifyotp',auth,verifyOtp);
router.put('/passreset',auth,passReset)
module.exports = router;
