const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose  = require('mongoose');
const connectDB = require('./config/db');
const passport = require('passport');
const helmet = require("helmet");
const morgan = require('morgan');
const exphbs  = require('express-handlebars');
const methodOverride = require('method-override');

// Load Config 
dotenv.config();

// Passport Config
require('./config/passport')(passport);

// Connect the Database 
connectDB();

// Initialize app with express 
const app = express();

// Body Parser middleware 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

// Set up Morgan Logger (only in development mode)
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

// Sessions Middleware 
app.use(session({ 
    secret: 'bryson tiller',
    resave: 'false',
    saveUninitialized: false,
    //secure: true,
    // httpOnly: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}))

// Helmet Security Middleware (Uncomment for Production)
// app.use(helmet());

// Passport Middleware 
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/auth', require('./routes/auth'));
app.use('/', require('./routes/index'))


// Static Folder 
app.use(express.static(path.join(__dirname, 'public' )));

// Helpers for Handlebars 
const { formatDate, stripTags, truncate, select, ifCond } = require('./helpers/helpers')

// Enable the view engine (Handlebars)
app.engine('.hbs', exphbs({ helpers: { formatDate, stripTags, truncate, select, ifCond }, defaultLayout: 'main', extname: '.hbs', partialsDir: [ path.join(__dirname, 'views/partials') ] }));
app.set('view engine', '.hbs');

//Express Routes Visualizer 
// require('express-middleware-visualizer')(app);

// Listen on port
const PORT = process.env.PORT || 3000
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}. Hit Ctrl+c to quit.`));