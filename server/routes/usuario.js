
const express = require('express');

const app = express();

const bcrypt = require('bcrypt');

const _ = require('underscore');

const Usuario = require('./models/usuario');

app.get('/usuario/:id', function(req, res) {
    let id = req.params.id;

    Usuario.findById(id).exec((err, usuarioDB) => {
        if( err ) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });
    
});
app.get('/usuarios/', function(req, res) {
    
    Usuario.find({}, 'nombre email google')
    .limit(10)
    .exec((err, usuarios) => {
        if( err ) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        Usuario.count({}, (err, numero) => {
            res.json({
                ok: true,
                usuarios,
                conteo: numero
            });
        });

    });
});
app.post('/usuario', function(req, res) {
    let body = req.body;


    let usuario = new Usuario({

        nombre: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role

    });

    usuario.save( ( err, usuarioDB ) => {

        if( err ) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });
    
});
app.put('/usuario/:id', function(req, res) {
    let id = req.params.id;
    let body = _.pick(req.body, ['name', 'email', 'img', 'role', 'status_account' ]);

    Usuario.findByIdAndUpdate( id, body, {new: true}, (err, usuarioDB ) => {

        if( err ) {
            return res.status(400).json({
                ok: false,
                err
            });
        }


        res.json({
            ok: true,
            usuario: usuarioDB
        });

    });
});

app.delete('/usuario/:id', function(req, res) {
    let id = req.params.id;

    Usuario.findByIdAndUpdate( id ,{ status_account: false, new: true },(err, usuarioRemovido) => {

        if( err ) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if(!usuarioRemovido) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El usuario no existe'
                }
            });
        }

        res.json({
            ok: true,
            usuario: usuarioRemovido
        });
    });
});

module.exports = app;