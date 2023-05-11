
const req_prisma = require('./prisma/requetes/req_prisma.js');
const express = require('express');
const bcrypt = require('bcrypt')
const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const app = express();
const {createTeamBack} = require('./create.js')



app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(passport.initialize());


app.post('/api/createteam', (req, res, next) => {
	bcrypt.hash(req.body.password, 10)
	.then (hash => 
		{
			const data = req.body;
			data.password = hash;
			createTeamBack(req, res, next, data);
		})
	.catch (e => console.log(e));
	
})



module.exports = app;