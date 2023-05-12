const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt')
const express = require('express');
const jwt = require('jsonwebtoken')

async function isValidPassword(user, password)
{
	console.log(password, user.password);
	return (await bcrypt.compare(password, user.password));
}

function managePassword(req, res, next, user)
{
	if (!user)
	{
		console.log('AUTH RATEE');
		res.status(401).json({
			message: "Authentification ratée",
			error_code: 1,
			token: null
		})
		return ;
	}
	console.log('ici', user.password, req.body.password);
	isValidPassword(user, req.body.password)
	.then(valid => {
		if (valid)
		{
			console.log('AUTH REUSSIE');
			res.status(201).json({
				message: "Authentification réussie",
				error_code: 0,
				userId: user.id,
                token: jwt.sign(
					{ userId: user.id },
					process.env.SECRET_TOKEN,
					{ expiresIn: '24h' }
                )
			})
		}
		else
		{
			console.log('AUTH RATEE');
			res.status(401).json({
				message: "Authentification ratée",
				error_code: 1,
				token: null
			})
		}

	})
	.catch(e => console.log(e));

	

}


module.exports = isValidPassword;
module.exports = managePassword;