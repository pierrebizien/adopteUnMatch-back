
const req_prisma = require('./req_prisma.js');
const express = require('express');

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.post('/api/stuff', (req, res, next) => {
  // console.log(req.body);
  req_prisma.createTeam(req.body);
  // .then(console.log('EQUIPE CREE'))
  // .catch(e => console.log(e));
  res.status(201).json({
    message: 'Objet créé !'
  });
});

app.use((req, res, next) => {
  console.log('Requête reçue !');
  next();
});


app.use((req, res, next) => {
  res.status(201);
  next();
});

app.use((req, res, next) => {
  res.json({ message: 'Votre requête a bien été reçue !' });
  next();
});

app.use((req, res, next) => {
  console.log('Réponse envoyée avec succès !');
});

module.exports = app;