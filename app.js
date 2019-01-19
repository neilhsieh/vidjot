const express = require('express'); // brings in module installed
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');

const app = express(); // initializes application 

// Map global promis - get ride of error
mongoose.Promise = global.Promise;

// Connect to mongoose
mongoose.connect('mongodb://localhost/vidjot-dev', {
  useNewUrlParser: true
})
.then(()=> console.log('MongoDB Connected...'))
.catch( err => console.log(err));

// Load idea model
require('./models/Idea')
const Idea = mongoose.model('ideas')

// Handlebars Middleware
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');


//  Index Route
/*
/ - takes you to the home url, in this case, it is localhost:5000
All route request requres two parameters, req (request object), and res (response project)
*/
app.get('/', (req, res) => {
  const title = 'Welcome!';
  res.render('index', {
    title: title
  })
});

//  About Route
app.get('/about', (req, res) => {
  res.render('about')
});

const port = 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`) // template string or template literal
});
