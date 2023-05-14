const express = require('express');
const routeur = express.Router();
const loginCtrl = require('../controllers/login/loginCtrl.js')

routeur.post('/', loginCtrl.login);


module.exports = routeur;