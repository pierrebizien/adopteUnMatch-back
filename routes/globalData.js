const express = require('express');
const routeur = express.Router();
const globalDataCtrl = require('../controllers/globalData/globalData.js')
const auth = require('../controllers/auth/auth.js')


routeur.get('/getname', globalDataCtrl.getname);
// routeur.post('/newteam', auth, globalDataCtrl.createTeam);
routeur.post('/newteam', auth.auth, globalDataCtrl.createMatch);

routeur.post('/getallmatches', auth.auth, globalDataCtrl.getAllMatches)
routeur.post('/getmymatches', auth.auth, globalDataCtrl.getMyMatches)
routeur.post('/getfreematches', auth.auth, globalDataCtrl.getFreeMatches)
routeur.post('/getupcomingmatches', auth.auth, globalDataCtrl.getUpcomingMatches)
routeur.get('/getmyteam', auth.auth, globalDataCtrl.getMyTeam)
routeur.get('/getmylastfive', auth.auth, globalDataCtrl.getMyLastFive)
routeur.put('/jointeamtomatch', auth.auth, globalDataCtrl.joinTeamToMatch)
module.exports = routeur;