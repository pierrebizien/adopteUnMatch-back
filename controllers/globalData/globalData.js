const req_prisma = require('../../prisma/requetes/req_prisma.js');
const {checkToken} = require('../checkToken/checkToken.js')
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
}