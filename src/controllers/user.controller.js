const userCtrl = {};
const user = require('../models/user');
const Prescription = require('../models/prescription');
const consultaAgendada = require('../models/agendada');
const consulta = require('../models/consulta');
const passport = require('passport');

userCtrl.login = passport.authenticate('local', {
    failureRedirect: '/login',
    successRedirect: '/mi-historial',
    failureFlash: true,
  });

userCtrl.logout = (req, res) => {
    req.logout();
    req.flash("success_msg", "Sesión cerrada.")
    res.redirect('/');
  }
userCtrl.renderRegister = (req, res) => {
  const { user: { name, image, admin, id } = {} } = req;
  const errors = [];
  res.render('register', { name, image, admin, id, errors })
}

userCtrl.renderResultados = async (req, res) => {
  const { user: { name, image, admin, id } = {} } = req;
  const consulta = await consultaAgendada.findById(req.params.id);
  let errors = [];
  res.render("newResult1", {name, image,admin, id, consulta, errors})
}
userCtrl.register = async (req, res) => {
  const { user: { name, image, admin, id } = {} } = req;
  const {nombre, number, password, password1} = req.body;
  const errors = [];
  if(password != password1) {
    errors.push({text: "Las contraseñas no coinciden"})
  }
  if(password.length < 4) {
    errors.push({text: "La contraseña tiene que tener por lo menos cuaro dígitos."})
  }
  if (req.body.name == '') {
    errors.push({text: "Debes asignarle un nombre al nuevo usuario"})
  }
  if (req.body.number == '') {
    errors.push({text: "Debes asignarle un número telefónico al nuevo usuario"})
  }
  if (req.body.password == '') {
    errors.push({text: "Debes escribir una contraseña"})
  }
  if (req.body.password1 == '') {
    errors.push({text: "Debes confirmar la contraseña"})
  }
  if (errors.length >= 1) {
    res.render("register", {errors, name, image, admin, id})
  }
  else {
    const userName = await user.findOne({name: name});
    if(userName) {
      req.flash('error_msg', 'Ese usuario ya existe en el sistema.');
      res.redirect("/nuevo-paciente")
    }
    else {
      const newUser = new user ({nombre, number, password});
      newUser.password = await newUser.encrypt(password);
      await newUser.save();
      req.flash('success_msg', 'Paciente registrado exitosamente.');
      res.redirect('/')
    }
  }
}

userCtrl.renderEdit = (req, res) => {
  const { user: { name, image, admin, id } = {} } = req;
  res.render('editProfile', { name, image, admin, id })
}

userCtrl.edit = async (req, res) => {
  if (typeof(req.file) == 'undefined') {
    req.flash('error_msg', 'No introdujiste ninguna foto de perfil.');
    res.redirect("/editar-usuario/:id");
    console.log(req.file);
  }
  else {
  const file = req.file.filename;
  await user.findByIdAndUpdate(req.params.id, {image: file});
  req.flash('success_msg', 'Imagen de perfil cambiada.');
  res.redirect('/')
  }
}

userCtrl.todosLosUsuarios = async (req, res) => {
  const { user: { name, image, admin, id} = {} } = req;
  const usuarios = await user.find().lean();
  res.render('users', {name, image, admin, id, usuarios})
 }

 userCtrl.resultadosUsuario = async (req, res) => {
  const { user: { name, image, admin, id} = {} } = req;
  const usuario = await user.findById(req.params.id);
  const results = await Prescription.find({"patient" : {$regex : usuario.name, "$options": "i" }});
  res.render('record', {name, image, admin, id, usuario, results})
 }

userCtrl.newResult = async (req, res) => {
  const { user: { name, image, admin, id} = {} } = req;
  const agendada = await consultaAgendada.findById(req.params.id);
  const {title, presc, date} = req.body;
  const errors = [];
  if(title == '') {
    errors.push({text: "No introdujiste ningún título."})
  }
  if (presc == '') {
    errors.push({text: "No introdujiste una prescripción."})
  }
  if (date == '') {
    errors.push({text: "Es necesaria la fecha de este resultado."})
  }
  if (errors.length >= 1) {
    const consulta = await consultaAgendada.findById(req.params.id);
    res.render("newResult1", {name, image,admin, id, consulta, errors})
  }
  else {
  const newResult = new Prescription({"patient": agendada.patient, title, date, "prescription": presc});
  newResult.save();
  agendada.remove();
  req.flash("success_msg", "Resultado introducido con éxito.");
  res.redirect('/consultas')
  }
}
 userCtrl.verResultado = async (req, res) => {
  const { user: { name, image, admin, id} = {} } = req;
  const result = await Prescription.findById(req.params.id);
  const usuario = await user.find({"name": {$regex : result.patient, "$options": "i" }})
  res.render("myResult", {usuario, result, name, image, admin, id})
 }

 userCtrl.nuevoResultado = async (req, res) => {
  const { user: { name, image, admin, id} = {} } = req;
  const usuario = await user.findById(req.params.id);
  let errors = [];
  res.render('newResult', {name, image, admin, id, usuario, errors})
 }

 userCtrl.introducirResultado = async (req, res) => {
  const usuario = await user.findById(req.params.id);
  const {title, date, prescription} = req.body;
  const errors = [];
  if(title == '') {
    errors.push({text: "No introdujiste ningún título."})
  }
  if (prescription == '') {
    errors.push({text: "No introdujiste una prescripción."})
  }
  if (errors.length >= 1) {
    const { user: { name, image, admin, id} = {} } = req;
    const usuario = await user.findById(req.params.id);
    res.render('newResult', {name, image, admin, id, usuario, errors})
  }
  else {
    req.flash('Success_msg', 'Prescripción guardada.');
    const newPres = new Prescription ({"patient": usuario.name, title, date, prescription});
    await newPres.save();
    res.redirect('/historial/' + usuario._id)
  }
 }


 userCtrl.actualizarResultado = async (req, res) => {
  const { user: { name, image, admin, id } = {} } = req;
  const resultado = await Prescription.findOne({ _id: req.params.id });
  const usuario = await user.findOne({name: resultado.patient});
  res.render("editarPrescripcion", {name, image, admin, id, resultado, usuario})
}


userCtrl.editarResultado = async (req, res) => {
const {title, date, prescription} = req.body;
const result = await Prescription.findById(req.params.id);
const errors = [];
if(title == '') {
  errors.push({text: "No introdujiste ningún título."})
}
if (prescription == '') {
  errors.push({text: "No introdujiste una prescripción."})
}
if (errors.length >= 1) {
  res.redirect("/historial/editar/" + result._id)
}
else {
  req.flash("Success_msg", "Prescripción editada.")
  const account = await user.findOne({name: result.patient});
  await Prescription.findByIdAndUpdate(req.params.id, {title, date, prescription});
  req.flash('success_msg', 'Consulta actualizada.');
  res.redirect('/historial/' + account._id)
}
}

userCtrl.eliminarResultado = async (req, res) => {
  const resultado = await Prescription.findById(req.params.id)
  const usuario = await user.findOne({name: resultado.patient});
  await Prescription.findByIdAndDelete(req.params.id);
  req.flash('Success_msg', 'Prescripción eliminada.');
  res.redirect('/historial/' + usuario._id)
}

userCtrl.renderAgendar = async (req, res) => {
  const { user: { name, image, admin, id } = {} } = req;
  const usuario = await user.findById(req.params.id);
  const consultasAgendadas = await consultaAgendada.find({"patient" : {$regex : usuario.name, "$options": "i" }});
  const consultas = await consulta.find({"author" : {$regex : usuario.name, "$options": "i" }})
  const count = Object.keys(consultasAgendadas).length;
  const count2 = Object.keys(consultas).length;
  if (count > 0 || count2 > 0) {
    req.flash("error_msg", "Ese paciente ya tiene una consulta pendiente.")
    res.redirect('/mis-pacientes')
  }
 else{
   res.render('newConsulta', {name, image, admin, id, usuario})
 }
}

userCtrl.renderAgendar2 = async (req, res) => {
  const { user: { name, image, admin, id } = {} } = req;
  const consul = await consulta.findById(req.params.id);
  const usuario = await user.find({"name" : {$regex : consul.author, "$options": "i" }})
  res.render('newConsulta2', {name, image, admin, id, consul, usuario})
}
userCtrl.agendarConsulta2 = async (req, res) => {
  const consul = await consulta.findById(req.params.id);
  const agendada = new consultaAgendada({"patient": consul.author, "patientImage": consul.image, "patientNumber": consul.number, "date": req.body.date})
  consul.remove();
  agendada.save();
  req.flash('Success_msg', 'Consulta agendada con éxito.');
  res.redirect('/consultas')
}
userCtrl.agendarConsulta = async (req, res) => {
  const usuario = await user.findById(req.params.id);
  const agendada = new consultaAgendada({"patient": usuario.name, "patientImage": usuario.image, "patientNumber": usuario.number, "date": req.body.date});
  agendada.save();
  req.flash('Success_msg', 'Consulta agendada con éxito.');
  res.redirect('/consultas')
}

userCtrl.eliminarUsuario = async(req, res) => {
  const usuario = await user.findById(req.params.id);
  await user.findByIdAndDelete(req.params.id);
  await Prescription.deleteMany({"patient" : {$regex : usuario.name, "$options": "i" }});
  await consulta.deleteMany({"author" : {$regex : usuario.name, "$options": "i" }});
  await consultaAgendada.deleteMany({"patient" : {$regex : usuario.name, "$options": "i" }})
  req.flash('Success_msg', 'Usuario eliminado.');
  
  res.redirect('/mis-pacientes');
}

userCtrl.RenderConsultas = async (req, res) => {
  const { user: { name, image, admin, id } = {} } = req;
  const consultas = await consulta.find().lean();
  const agendadas = await consultaAgendada.find().lean();
  const count = consultas.length;
  const count2 = agendadas.length;
  if(req.user.admin) {
  res.render('consultas', {name, image, admin, id, consultas, count, agendadas, count2})
  }
  else{
    res.redirect('/')
  }
}

userCtrl.renderMyResults = async (req, res) => {
  const { user: { name, image, admin, id } = {} } = req;
  const results = await Prescription.find({"patient" : {$regex : req.user.name, "$options": "i" }}).lean();
  const variable = await consulta.find({"author" : {$regex : req.user.name, "$options": "i" }}).lean();
  const variable2 = await consultaAgendada.find({"patient" : {$regex : req.user.name, "$options": "i" }}).lean();
  const count = Object.keys(variable).length;
  const count2 = Object.keys(variable2).length;
  const count3 = Object.keys(results).length;
  if(!req.user.admin) {
  res.render('miRegistro', {name, image, admin, id, count, variable, variable2, count2, results, count3});
  }
  else {
    res.redirect('/')
  }
}

userCtrl.eliminarConsulta = async (req, res) => {
  await consultaAgendada.findByIdAndDelete(req.params.id);
  await consulta.findByIdAndDelete(req.params.id);
  if(req.user.admin) {
    req.flash('Success_msg', 'Consulta retirada con éxito')
    res.redirect('/consultas')
  }
  else {
  res.redirect('/mi-historial')
  }
}

userCtrl.newConsulta = async (req, res) => {
  var image = req.user.image;
  var author = req.user.name;
  var number2 = req.user.number;
  let newConsulta = new consulta({
    image: image,
    author: author,
    number: number2
  });
  req.flash('Success_msg', 'Has solicitado una consulta al doctor.')
  await newConsulta.save();
  res.redirect('/mi-historial')
}

userCtrl.renderAgendadas = async (req, res) => {
  const { user: { name, image, admin, id} = {} } = req;
  const agendadas = await consultaAgendada.find().lean();
  res.render('consultasAgendadas', {name, image, admin, id, agendadas})
 }

 userCtrl.renderCambiarFecha = async (req, res) => {
  const { user: { name, image, admin, id} = {} } = req;
  const consul = await consultaAgendada.findById(req.params.id);
  const usuario = await user.find({"name" : {$regex : consul.patient, "$options": "i" }});
  res.render('newConsulta3', {name, image, admin, id, consul, usuario})
 }

 userCtrl.cambiarFecha = async (req, res) => {
  const date = req.body.date;
  if(date == '') {
    req.flash('error_msg', 'Introduce una fecha válida.');
    res.redirect('/consulta/cambiar-fecha/' + req.params.id);
  }
  else {
    req.flash('Success_msg', 'Fecha de la consulta cambiada.');
    await consultaAgendada.findByIdAndUpdate(req.params.id, {date});
    res.redirect('/consultas')
  }
 }

userCtrl.eliminarAgendada = async (req, res) => {
  req.flash('Success_msg', 'Consulta eliminada con éxito');
  await consultaAgendada.findByIdAndDelete(req.params.id);
  res.redirect('/consultas');
}
  module.exports = userCtrl 