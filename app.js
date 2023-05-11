
const req_prisma = require('./prisma/requetes/req_prisma.js');
const express = require('express');

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.post('/api/createteam', (req, res, next) => {
  // console.log(req.body);
  req_prisma.createTeam(req.body)
  .then(() => res.status(201).json({
    message: 'Équipe créé !',
	error_code: 0
  }))
  .catch(e => {
	if (e.code === 'P2002')
	{
		let err_message = 'L\'équipe n\'a pas pu être crée. ';
		let error = 1;
		if (e.meta.target[0] === 'login')
		{
			err_message = `${message} Ce login existe déjà`;
			error = 2;
		}
		else if (e.meta.target[0] === 'name')
		{
			err_message = `${message} Ce nom d'équipe existe déjà`;
			error = 3;
		}
		res.status(403).json({
			message : err_message,
			error_code : error
		});
		return ;
	}
  });
});

// app.use((req, res, next) => {
//   console.log('Requête reçue !');
//   next();
// });


// app.use((req, res, next) => {
//   res.status(201);
//   next();
// });

// app.use((req, res, next) => {
//   res.json({ message: 'Votre requête a bien été reçue !' });
//   next();
// });

// app.use((req, res, next) => {
//   console.log('Réponse envoyée avec succès !');
// });

module.exports = app;