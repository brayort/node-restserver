
/*=============================================
=                  Imports                    =
=============================================*/

const express = require('express');

const bcrypt = require('bcrypt');

const Usuario = require('./models/usuario');

const app = express();

/*=============================================
=                  Routes                     =
=============================================*/

app.post('/login', (req, res) => {
    res.json({
        ok: true
    });
});



/*=============================================
=                  Exports                    =
=============================================*/

module.exports = app;