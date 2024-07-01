const express = require('express');
const path = require('path');
const venom = require('venom-bot');
const rest = require('./conexion');
const {start} = require('./client.js');
const {clearData} = require('./client.js');
const {regenerarToken, refreshToken} = require('./deskApi/zohoDesk.js');
const app = express();
const port = 4000;
//LIMPIAR DATA
clearData();

//SE GENERA TOKEN INICIAL
refreshToken();

//SE REGENERA TOKEN CADA 55 MINUTOS
regenerarToken()

//CONEXION A BASE DE DATOS
rest

// Configura Express para servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Ruta raíz que envía el archivo HTML al cliente
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

venom
  .create(
    'sessionName',
    (base64Qr, asciiQR, attempts, urlCode) => {
      console.log(asciiQR); // Optional to log the QR in the terminal
      var matches = base64Qr.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
        response = {};

      if (matches.length !== 3) {
        return new Error('Invalid input string');
      }
      response.type = matches[1];
      response.data = new Buffer.from(matches[2], 'base64');

      var imageBuffer = response;
      require('fs').writeFile(
        'public/out.png',
        imageBuffer['data'],
        'binary',
        function (err) {
          if (err != null) {
            console.log(err);
          }
        }
      )
    },
    undefined,
    { logQR: false }
  )
  .then((client) => {
    start(client)
  })
  .catch((erro) => {
    console.log(erro);
  })
// Inicia el servidor Express
app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});
