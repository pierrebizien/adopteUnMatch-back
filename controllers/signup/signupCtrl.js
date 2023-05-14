const bcrypt = require('bcrypt');
const { createTeamBack } = require('./create.js')

exports.newTeam = (req, res, next) => {

    bcrypt.hash(req.body.password, 10)
	.then (hash => 
		{
			const data = req.body;
			data.password = hash;
			createTeamBack(req, res, next, data);
		})
	.catch (e => console.log(e));

}