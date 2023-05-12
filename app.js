const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
require('./prisma/requetes/req_prisma.js');
const isValidPassword = require('./auth-tools.js');
const managePassword = require('./auth-tools.js');
const express = require('express');
const bcrypt = require('bcrypt')
const passport = require('passport')
const localStrategy = require('passport-local')
const jwt = require ('jsonwebtoken')
const app = express();
const {createTeamBack} = require('./create.js')



app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});


app.post('/api/createteam', (req, res, next) => {
	bcrypt.hash(req.body.password, 10)
	.then (hash => 
		{
			const data = req.body;
			data.password = hash;
			createTeamBack(req, res, next, data);
		})
	.catch (e => console.log(e));
	
});

app.post('/api/login', (req, res, next) =>
{
	prisma.Team.findFirst({
		where : {login: req.body.login}
	})
	.then(user => {
		managePassword(req, res, next, user);
	})
	.catch(err => console.log(err))
})

module.exports = app;