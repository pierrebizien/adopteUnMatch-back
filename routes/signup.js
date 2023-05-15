const express = require('express');
const routeur = express.Router();
const signupCtrl = require('../controllers/signup/signupCtrl.js')

routeur.post('/', signupCtrl.newTeam);

module.exports = routeur;