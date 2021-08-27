"use strict";
exports.__esModule = true;
exports.handleAuthentication = void 0;
// tipando usuario e simulando conexao com banco de dados
var users_1 = require("./users");
// criando funcao para fazer a autenticacao do login
// este codigo ira processar o post que fizemos pro /login
var handleAuthentication = function (req, resp) {
    // pega o corpo do request
    var user = req.body;
    // verifica se o usuario eh valido
    if (isValid(user)) {
        // se for atribui ao dbUser o usuario
        var dbUser = users_1.users[user.email];
        // resposta da aplicacao
        resp.json({ name: dbUser.name, email: dbUser.email });
    }
    else {
        resp.status(403).json({ message: 'Dados inválidos.' });
    }
    function isValid(user) {
        // se o usuario nao existe retorna false
        if (!user) {
            return false;
        }
        // obter dados do obj users passando o user.email
        var dbUser = users_1.users[user.email];
        // se eke existir e o login existir no "BD" valida
        return dbUser !== undefined && dbUser.matches(user);
    }
};
exports.handleAuthentication = handleAuthentication;
