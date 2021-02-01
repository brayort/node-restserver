
/*=============================================
=                  Imports                    =
=============================================*/

const express = require('express');

const app = express();



/*=============================================
=               Global Routes                 =
=============================================*/

app.use(require('./usuario'));
app.use(require('./login'));



/*=============================================
=                 Exports                     =
=============================================*/

module.exports = app;