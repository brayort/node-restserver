
/*=============================================
=                  Imports                    =
=============================================*/

require('./config/config');

const express = require('express');

const mongoose = require('mongoose');

const app = express();

const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded

app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json

app.use(bodyParser.json());


/* Require to Global Routes */

app.use(require('./routes/global_routes'));



/*=============================================
=              Mongodb Connection             =
=============================================*/

mongoose.connect('mongodb://localhost:27017/brayer_db',{ useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true}, (err, res) => {

    if(err) throw err;

    console.log('Bases de datos corriendo...');

});



/*=============================================
=              Application Port                =
=============================================*/

app.listen(process.env.PORT, () => {
    console.log('El servidor está corriendo en el puerto:', process.env.PORT);
});