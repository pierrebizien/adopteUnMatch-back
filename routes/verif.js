const express = require('express');
const routeur = express.Router();
const verifCtrl = require('../controllers/verif/verifCtrl.js')

routeur.get('/token', verifCtrl.verifToken);

module.exports = routeur;