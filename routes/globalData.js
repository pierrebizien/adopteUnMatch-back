const express = require('express');
const routeur = express.Router();
const globalDataCtrl = require('../controllers/globalData/globalData.js')
const auth = require('../controllers/auth/auth.js')


routeur.get('/getname', globalDataCtrl.getname);
// routeur.post('/newteam', auth, globalDataCtrl.createTeam);
routeur.post('/newteam', auth.auth, globalDataCtrl.createMatch);

routeur.get('/getallmatches', auth.auth, globalDataCtrl.getAllMatches)
routeur.get('/getmymatches', auth.auth, globalDataCtrl.getMyMatches)
routeur.get('/getpastmatches', auth.auth, globalDataCtrl.getPastMatches)
routeur.get('/getupcomingmatches', auth.auth, globalDataCtrl.getUpcomingMatches)

module.exports = routeur;