const { Router } = require('express');
const router = Router();

const {eliminarAgendada, cambiarFecha, renderCambiarFecha, agendarConsulta2, verResult, newResult, renderResultados, renderAgendar2, eliminarConsulta, RenderConsultas, newConsulta, renderMyResults, login, logout, renderRegister, register, renderEdit, edit, todosLosUsuarios, resultadosUsuario, nuevoResultado, introducirResultado, actualizarResultado, editarResultado, verResultado, eliminarResultado, renderAgendar, agendarConsulta, eliminarUsuario} = require("../controllers/user.controller")

var path = require('path');
const user = require('../models/user');
const consulta = require('../models/consulta');
const consultaAgendada = require('../models/agendada');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const { isAuthenticated, authRole} = require('../config/auth');

const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (request, file, callback) {
    callback(null, process.cwd()+"/src/public/uploads");
  },
  filename: function (request, file, callback) {
    callback(null, Date.now() + path.extname(file.originalname));
  },
});
var upload = multer({ storage: storage, limits: {fileSize: 1000000}});

router.post('/login', login);
router.get('/logout', isAuthenticated, logout)
router.get('/nuevo-paciente', isAuthenticated, authRole, renderRegister);
router.post('/nuevo-paciente', register);
router.get('/editar-usuario/:id', isAuthenticated, renderEdit);
router.post('/editar-usuario/:id', upload.single('image'), edit);
router.get('/mis-pacientes', isAuthenticated, authRole, todosLosUsuarios);
router.get('/historial/:id', isAuthenticated, authRole, resultadosUsuario);
router.get('/historial/nuevo-resultado/:id', isAuthenticated, authRole, nuevoResultado);
router.get('/historial/ver-resultado/:id', isAuthenticated, verResultado);
router.post('/historial/nuevo-resultado/:id', introducirResultado);
router.get('/historial/editar/:id', isAuthenticated, authRole, actualizarResultado);
router.post('/historial/editar/:id', editarResultado);
router.delete('/historial/eliminar/:id', eliminarResultado);
router.get('/usuarios/agendar/:id', isAuthenticated, authRole, renderAgendar);
router.post('/usuarios/agendar/:id', agendarConsulta);
router.delete('/eliminar-usuario/:id', eliminarUsuario)
router.get('/mi-historial', isAuthenticated, renderMyResults)
router.post('/nueva-consulta', newConsulta);
router.get('/consultas', isAuthenticated, authRole, RenderConsultas)
router.delete('/retirar/:id', eliminarConsulta)
router.get('/agendar-consulta/:id', isAuthenticated, authRole, renderAgendar2)
router.post('/agendar-consulta/:id', agendarConsulta2)
router.get('/consulta/introducir-resultados/:id', isAuthenticated, authRole, renderResultados);
router.post('/nuevo-resultado/:id', authRole, newResult);
router.get('/consulta/cambiar-fecha/:id', isAuthenticated, authRole, renderCambiarFecha)
router.post('/consulta/cambiar-fecha/:id', cambiarFecha)
router.delete('/consulta/eliminar/:id', eliminarAgendada)


module.exports = router;