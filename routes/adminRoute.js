const { getAllUsers, getSingleUserData } = require('../controllers/adminController');

const router = require('express').Router();

router.get('/getAllUsers', getAllUsers);
router.get('/getSingleUserData/:userId', getSingleUserData);

module.exports = router;
