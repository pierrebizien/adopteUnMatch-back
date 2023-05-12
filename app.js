const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const req_prisma = require ('./prisma/requetes/req_prisma.js');
const managePassword = require('./auth-tools.js');
const express = require('express');
const bcrypt = require('bcrypt')
const jwt = require ('jsonwebtoken')
const app = express();
const {createTeamBack} = require('./create.js');
const {checkToken} = require('./controllers/checkToken.js/checkToken.js');

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// app.use ('/', (req, res, next) =>{
// 	res.status(200).json({message : 'requete recue'});
// 	next();
// }


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


app.get('/api/verifToken', (req, res, next) =>
{
	try {
		// console.log('coucou')
		const token = req.header('authorization').split(' ')[1];
		const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
		// console.log('decoded token');
		res.status(200).json({message:"TOKEN OK"});
	}
	catch (error)
	{
		console.log('error');
		res.status(401).json({error});
	}
	// res.status(200).json({message: "REQUETE RECUE"});
})

app.get('/api/global/getname', (req, res, next) => 
{
	console.log("hey");
	const decodedToken = checkToken(req, res, next);
	if (decodedToken)
	{
		req_prisma.getTeamById(decodedToken.userId)
		.then(resReq => {
			console.log(resReq);
			res.status(200).json(resReq);
		})
		.catch(e => 
			{
				console.log(e);
				res.status(401).json({
					error_message : 'Une erreur est survenue lors de la collection des donnees'
				})
			});
	}
	else
	{
		res.status(401).json({
			name: "No Name (Wrong Token)"
		})
	}
})

module.exports = app;