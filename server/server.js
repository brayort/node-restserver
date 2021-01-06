
/* Server */

require('./config/config');

const express = require('express');

const app = express();

const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyParser.json());

app.get('/usuario', function(req, res) {
    res.json('Get Usuario');
});
app.post('/usuario', function(req, res) {
    let body = req.body;

    if(body.name == undefined) {

        res.status(400).json({
            ok: false,
            msg: 'El nombre es necesario'
        });
    } else {
        
        res.json({
            usuario: body
        });
    }
    
});
app.put('/usuario/:id', function(req, res) {
    let id = req.params.id;

    res.json({
        id
    });
});

app.listen(process.env.PORT, () => {
    console.log('El servidor está corriendo en el puerto:', process.env.PORT);
});