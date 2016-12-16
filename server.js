const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

//this variable sets it to dynamically listen to and run from heroku or to run locally on 3000
const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  var now = new Date().toString();
  //need to update to es6 injections when I figure out why node 6.2 isnt using them
  var log = ''+ now + ':'+req.method + ''+req.url;

  console.log(`${log}`);
  fs.appendFile('server.log', log + '\n');
  next();
});
//when in maintenance mode, uncomment this section
// app.use((req,res, next)=>{
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () =>{
  return new Date().getFullYear()
});

hbs.registerHelper('getCurrentYear', ()=>{
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req,res) =>{
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    currentYear: new Date().getFullYear(),
    welcomeMessage: 'Greetings and Salutations'
  });
});

app.get('/about', (req,res) =>{
  res.render('about.hbs', {
    pageTitle: 'About Page',
    currentYear: new Date().getFullYear()
  });
});

app.get('/bad', (req,res) =>{
  res.send({
      errorMessage: 'Bad data'
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
