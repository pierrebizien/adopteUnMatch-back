const req_prisma = require('../../prisma/requetes/req_prisma.js');
const {checkToken} = require('../checkToken/checkToken.js')
const { format, parseISO } = require('date-fns');

// ...

const formattedDate = format(parseISO('2023-05-24'), 'yyyy-MM-dd HH:mm:ss');
exports.getname = (req, res, next) => 
{
	console.log('REQ GetName')
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
				res.status(500).json({
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
}

exports.createMatch = (req, res, next) =>
{
	const formattedDate = new Date(req.body.date)
	console.log('Creation de Team', req.body.userId);
	req_prisma.getTeamById(req.body.userId)
	.then(resReq => {
			console.log(resReq);
			console.log(req.body);
			
			const data = {
				city : req.body.city,
				teamHomeId : resReq.id,
				date : formattedDate,
				status : 0
			}
			req_prisma.createMatch(data)
			.then(res.status(201).json({message : "Match créé"}))
			.catch(e => {
				console.log(e);
				res.status(500).json({message : "Probleme au niveau du serveur lors de la création du match"})
			});
	})
	.catch(e => console.log(e))
}

exports.getAllMatches = (req, res, next) => {
	req_prisma.getAllMatches()
	.then(resReq =>{
	resReq.map((item) => {
		item.userId = req.body.userId;
	});
	res.status(200).json(resReq)})
	.catch(e => {
		console.log(e);
		res.status(500).json({message : "Erreur serveur lors de la recuperation des matchs"})
	})
}

exports.getMyMatches = (req, res, next) => {
	req_prisma.getmyMatches(req.body.userId)
	.then(resReq =>{
		resReq.map((item) => {
			item.userId = req.body.userId;
		});
		res.status(200).json(resReq)})
	.catch(e => {
		console.log(e);
		res.status(500).json({message : "Erreur serveur lors de la recuperation des matchs"})
	})
}

exports.getFreeMatches = (req, res, next) => {
	req_prisma.getFreeMatches()
	.then(resReq =>{
		resReq.map((item) => {
			item.userId = req.body.userId;
		});
		res.status(200).json(resReq)})
	.catch(e => {
		console.log(e);
		res.status(500).json({message : "Erreur serveur lors de la recuperation des matchs"})
	})
}

exports.getUpcomingMatches = (req, res, next) => {
	req_prisma.getUpcomingMatches(req.body.userId)
	.then(resReq =>{
		resReq.map((item) => {
			item.userId = req.body.userId;
		});
		res.status(200).json(resReq)})
	.catch(e => {
		console.log(e);
		res.status(500).json({message : "Erreur serveur lors de la recuperation des matchs"})
	})
}

exports.joinTeamToMatch = (req, res, next) => {
	console.log('tentative de rejoindre un match');
	req_prisma.joinMatch(req.body.matchId, req.body.userId)
	.then(resReq =>{
		console.log(resReq);
		res.status(201).json({
			message: "Demande enregistree"
		})})
	.catch(e => {
		console.log(e);
		res.status(500).json({message : "Erreur serveur lors de la recuperation des matchs"})
	})
}