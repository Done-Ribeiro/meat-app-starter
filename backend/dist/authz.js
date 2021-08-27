"use strict";
exports.__esModule = true;
exports.handleAuthorization = void 0;
var jwt = require("jsonwebtoken");
var api_config_1 = require("./api-config"); //local onde esta nossa senha base para gerar o token
// o next nao precisa tipar - pois eh so um callback pra dizer quando ta tudo ok
var handleAuthorization = function (req, resp, next) {
    var token = extractToken(req); // atribui o token
    if (!token) {
        resp.setHeader('WWW-Authenticate', 'Bearer token_type="JWT"'); //devolve um Header (para dizer que esperamos um token do tipo JWT)
        resp.status(401).json({ message: 'Você precisa se autenticar.' });
    }
    else {
        // verify espera os seguintes parametros --> token, password, ()=> de callback
        jwt.verify(token, api_config_1.apiConfig.secret, function (error, decoded) {
            if (decoded) { //se o token passou libera o acesso
                next();
            }
            else {
                resp.status(403).json({ message: 'Não autorizado.' });
            }
        });
    }
};
exports.handleAuthorization = handleAuthorization;
function extractToken(req) {
    var token = undefined;
    if (req.headers && req.headers.authorization) { //se existe cabecalho && se existe token
        //Autorization: Bearer ZZZ.ZZZ.ZZZ
        var parts = req.headers.authorization.split(' '); /*cria um []~para guardar cada parte do token
                                                                                  metodo split(' ') dividide pelo espaco em branco o Bearer do Token*/
        if (parts.length === 2 && parts[0] === 'Bearer') { //se tiver token (2 partes) && primeira parte for a String -> 'Bearer'
            token = parts[1]; //deixa somente o token dentro da variavel token | transformando de [key:value] -> variavel
        }
    }
    return token;
}
