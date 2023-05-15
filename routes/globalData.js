const express = require('express');
const routeur = express.Router();
const globalDataCtrl = require('../controllers/globalData/globalData.js')
const auth = require('../controllers/auth/auth.js')


routeur.get('/getname', globalDataCtrl.getname);
// routeur.post('/newteam', auth, globalDataCtrl.createTeam);
routeur.post('/newteam', auth.auth, globalDataCtrl.createMatch);


module.exports = routeur;