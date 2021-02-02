

const jwt = require('jsonwebtoken');

/*=============================================
=              Token Verification             =
=============================================*/

let tokenVerification = (req, res, next ) => {

    let token = req.get('token');

    jwt.verify(token, process.env.SEED_TOKEN, (err, decoded) => {

        if(err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'El token es invalido'
                }
            });
        }

        req.usuario = decoded.usuario;
        
        next();
    });
    
};

/*=============================================
=           Admin Role Verification           =
=============================================*/

let tokenVerificationAdminRole = (req, res, next ) => {


    let usuario = req.usuario;


    if (usuario.role === 'ADMIN_ROLE') {
        next();
    } else {
        return res.json({
            ok: false,
            err: {
                message: 'No puedes ejecutar esta acción'
            }
        });
    }

    
};


/*=============================================
=                   Exports                   =
=============================================*/

module.exports = {
    tokenVerification,
    tokenVerificationAdminRole
};