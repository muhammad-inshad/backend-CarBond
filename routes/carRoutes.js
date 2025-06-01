const express = require('express');
const router = express.Router();
const { getCars, addCar, getCardetails } = require('../controllers/carController');
const {addUser,login,deleteUser,carsDelete}=require('../controllers/userControllers/user')
const {AdminLogin,showUser}=require('../controllers/adminController')

router.get("/cars", getCars);
router.post("/cars", addCar);
router.get("/cars/:id", getCardetails);

router.post('/register',addUser)
router.post('/login',login)

router.post('/AdminLogin',AdminLogin)
router.get('/users',showUser)
router.post('/users/:id',deleteUser)
router.post('/carsD/:id',carsDelete)

module.exports = router;
