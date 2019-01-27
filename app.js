const express = require('express'); // brings in module installed
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express(); // initializes application 

// Map global promis - get ride of error
mongoose.Promise = global.Promise;

// Connect to mongoose
mongoose.connect('mongodb://localhost/vidjot-dev', {
  useNewUrlParser: true
})
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

// Load idea model
require('./models/Idea')
const Idea = mongoose.model('ideas')

/* Handlebars Middleware
Allows us to log submited items based on titles given
*/
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

/* Index Route
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

// Add idea form
app.get('/ideas/add', (req, res) => {
  res.render('ideas/add')
});

// Process form
app.post('/ideas', (req, res) => {
  errors = [];
  if (!req.body.title) {
    errors.push({ text: 'Please add a title.' });
  }
  if (!req.body.details) {
    errors.push({ text: 'Please add some details.' });
  }
  if (errors.length > 0) {
    res.render('ideas/add', {
      errors: errors,
      title: req.body.title,
      details: req.body.details
    });
  } else {
    const newUser = {
      title: req.body.title,
      details: req.body.details
    }

    new Idea (newUser)
      .save()
      .then(idea => {
        res.redirect('/ideas');
      })
  }
});

const port = 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`) // template string or template literal
});
