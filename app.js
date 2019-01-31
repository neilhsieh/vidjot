const express = require('express'); // brings in module installed
const path = require('path');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const mongoose = require('mongoose');

const app = express(); // initializes application 

// Load routes
const ideas = require('./routes/ideas')
const users = require('./routes/users')

// Map global promis - get ride of error
mongoose.Promise = global.Promise;

// Connect to mongoose
mongoose.connect('mongodb://localhost/vidjot-dev', {
  useNewUrlParser: true
})
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

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

// Static folder - sets public folder to the express static folder
app.use(express.static(path.join(__dirname, 'public')));

// Method Override Middleware
app.use(methodOverride('_method'))

//Express Session Middleware
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}))

app.use(flash());

// Global Variables
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

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

app.use('/ideas', ideas);
app.use('/users', users)

const port = 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`) // template string or template literal
});
