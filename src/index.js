const app = require('./server');
require('./database');

app.set('port', process.env.PORT || 3000)

app.listen(app.get('port'), ()=> {
  console.log("El servidor ha iniciado");
})
