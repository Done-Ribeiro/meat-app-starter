"use strict";
exports.__esModule = true;
var jsonServer = require("json-server"); // importando para tipar e ter ajuda do compilador
var fs = require("fs"); // protocolo https
var https = require("https"); // importando o handleAuthentication
var auth_1 = require("./auth");
var authz_1 = require("./authz");
var server = jsonServer.create();
var router = jsonServer.router('db.json');
var middlewares = jsonServer.defaults();
// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);
// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);
// ao inves de passar funcao para o login com req e resp --> passa o handleAuthentication
// middleware para login
server.post('/login', auth_1.handleAuthentication);
server.use('/orders', authz_1.handleAuthorization);
// Use default router
server.use(router);
// referenciando a leitura das chaves
var options = {
    cert: fs.readFileSync('./backend/keys/cert.pem'),
    key: fs.readFileSync('./backend/keys/key.pem')
};
// criando servidor https
// trocando a porta de 3000 ==> 3001 por conta da mudanca de protocolo
https.createServer(options, server).listen(3001, function () {
    console.log('JSON Server is running on https://localhost:3001');
});
