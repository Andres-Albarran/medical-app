const express = require('express');
const path = require('path');
const ejs = require("ejs");
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const user = require('./models/user');
const bcrypt = require('bcryptjs');

//Inicializaciones
const app = express();
require('./config/passport.js');

// async function insertAdmin () {
//   const newUser = new user ({image: "medic.jpg", name: "dr", password: "123456", admin: true, number: "0424-6493638"});
//   newUser.password = await newUser.encrypt(newUser.password);
//   await newUser.save();
// }
// insertAdmin()


//Configuracion
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname,'views'));

//Middlewares
app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(express.json());


//Variables globales
app.use((req, res, next) => {
  res.locals.Success_msg = req.flash("Success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.user = req.user || null;
  next();
});

//Rutas
app.use(require('./routes/index.routes'));
app.use(require('./routes/user.routes'));

//Archivos estaticos
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;
