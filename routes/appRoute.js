const express = require('express');
const {signup, getBill} = require('../controller/appController.js');
const router = express.Router();

router.post("/user/signup", signup);

router.post("/product/get-the-bill", getBill);