const express = require('express');
const routeur = express.Router();
const globalDataCtrl = require('../controllers/globalData/globalData.js')

routeur.get('/getname', globalDataCtrl.getname);


module.exports = routeur;