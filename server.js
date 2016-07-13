

// Babel ES6/JSX Compiler
require('babel-core/register')({
    presets: ['es2015', 'react']
});

require('dotenv').load();
const React = require("react");
const ReactDOM = require('react-dom/server');
const Router = require('react-router');


const passport = require("passport");
const session = require('express-session');

const reactRoutes = require('./src/js/routes');
const routes = require("./src/js/routes/index.js");


const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser   = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


//PASSPORT
require('./src/js/config/passport')(passport);

//MONGOOSE CONNECT
mongoose.connect(process.env.MONGO_URI);



//VIEW ENGINE
app.set("view engine", "ejs");
app.set('views', __dirname + '/dist/views');

//STATIC FILES
app.use('/js', express.static(process.cwd() + '/dist/js'));
app.use('/dist', express.static(process.cwd() + '/dist'));
app.use('/uploads', express.static(process.cwd() + '/uploads'));


//SESSIONS
var MongoStore = require('connect-mongo')(session);
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection, ttl: 1 * 24 * 60 * 60, autoRemove: 'interval', autoRemoveInterval: 10, touchAfter: 24 * 3600 })
}));

app.use(passport.initialize());
app.use(passport.session());

//ROUTES
routes(app, passport);


//FOR SYNCING PROPS
const Todo = require('./src/js/models/todo.js');
const User = require("./src/js/models/users.js");

const todoActions = require("./src/js/actions/todoActions.js");
const todoStore = require("./src/js/stores/todoStore.js");

const loginActions = require("./src/js/actions/loginActions.js");
const loginStore = require("./src/js/stores/loginStore.js");



//REACT ROUTER ROUTES
app.use(function(req, res) {
  Router.match({ routes: reactRoutes.default, location: req.url }, function(err, redirectLocation, renderProps) {
    if (err) {
      res.status(500).send(err.message)
    } else if (redirectLocation) {
      res.status(302).redirect(redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      console.log("being rendered on server", req.user);

      Todo.find({}).exec(function(err, todos) {
        if (err) {
          res.send({err: err});
        }
        else {
          //ADD TODOS TO SERVER STORE
          todoActions.initiateTodos(todos);
          
          //ADD USER TO STORE ON SERVER FOR RENDERING
          let user = req.user ? req.user : null;
          loginActions.initiateUser(user);

          //STRINGIFY TO SEND TO CLIENT
          user = JSON.stringify(user);

          //RENDER DATA TO STRING
          const html = ReactDOM.renderToString(React.createElement(Router.RoutingContext, renderProps));
          const initialState = JSON.stringify(todos);
          

          res.status(200).render("index.ejs", {html, initialState, user});
        }
      });
  
    } else {
      res.status(404).send('Page Not Found')
    }
  });
});


app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening on port 3000!');
});