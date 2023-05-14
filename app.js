const express = require('express');
const app = express();
const signupRoutes = require('./routes/signup.js')
const loginRoutes = require('./routes/login.js')
const verifRoutes = require('./routes/verif.js')
const globalDataRoutes = require('./routes/globalData.js')

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use('/api/signup', signupRoutes);
app.use('/api/login', loginRoutes);
app.use('/api/verif', verifRoutes)
app.use('/api/globaldata', globalDataRoutes)


app.get('/', (req, res, next) =>{
	console.log('REQ 404')
	res.status(404).json({message : 'Erreur 404'});
	next();
})

module.exports = app;