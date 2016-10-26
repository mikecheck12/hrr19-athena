var express = require('express');
//var morgan = require('morgan');

var bodyParser = require('body-parser');
var path = require('path');
// var jwt = require('express-jwt');
var extend = require('util')._extend;
var Persona = require('./persona/personaController.js');
var userController = require('./user/userController.js');

//-------------- DATABASE -------------------------
var mongoose = require('mongoose');

var dbURI = process.env.MONGODB_URI || 'mongodb://localhost/persona';

mongoose.connect(dbURI);

var db = mongoose.connection;

db.on('error', function(err) {
  console.log(err);
});
db.on('open', function(){
  console.log('opened');
});

//------------- EXPRESS SERVER ----------------------
var app = express();

app.set('port', (process.env.PORT || 3000));

app.use(bodyParser.json());

app.use(express.static(__dirname+'/../client'));


app.listen(app.get('port'), function() {
  console.log('Listening on port', app.get('port'));
});



//------------ AUTH0 api call -----------------------
app.get('/api/clientcred', function(req, res) {
  var Auth0Cred = {
    AUTH0_CLIENT_ID : process.env.AUTH0_CLIENT_ID,
    AUTH0_DOMAIN : process.env.AUTH0_DOMAIN
  }
  res.send(Auth0Cred);
});

//-------------- DATABASE ROUTES --------------------
// app.post('/api/users/signin', userController.listOneUser);
// app.post('/api/users/signup', userController.addUser);

// app.get('/api/findAllUsers', userController.listAllUsers);
// app.get('/api/findOneUser', userController.find);


//personaController - where the magic happens
// app.get('/api/user/analysis', Persona.personaData);

app.get('/api/user/analysis', Persona.personaData);

  //when profile page loads for user gets finished results for current

app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname+'/../client/index.html'))
})

