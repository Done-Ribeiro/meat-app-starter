"use strict";
exports.__esModule = true;
exports.handleAuthentication = void 0;
var users_1 = require("./users"); // tipando usuario e simulando conexao com banco de dados
var jwt = require("jsonwebtoken"); // biblioteca que cria tokens --> ja previamente declarada no package.json
var api_config_1 = require("./api-config"); //local onde esta nossa senha base para gerar o token
// criando funcao para fazer a autenticacao do login
// este codigo ira processar o post que fizemos pro /login
var handleAuthentication = function (req, resp) {
    var user = req.body; // pega o corpo do request
    if (isValid(user)) { // verifica se o usuario eh valido
        var dbUser = users_1.users[user.email]; // se for atribui ao dbUser o usuario
        var token = jwt.sign({ sub: dbUser.email, iss: 'meat-api' }, api_config_1.apiConfig.secret); /* criando token --> {sub-> destinatario, iss-> remetente}, senha_do_token->''
                                                                                              desta forma nao compartilhamos o passw com o client ('meat-api-password') --> o que impede de gerar chaves
                                                                                            */
        resp.json({ name: dbUser.name, email: dbUser.email,
            acessToken: token // passo o token na resposta para o usuario
        });
    }
    else {
        resp.status(403).json({ message: 'Dados inválidos.' });
    }
    function isValid(user) {
        if (!user) { // se o usuario nao existe retorna false
            return false;
        }
        var dbUser = users_1.users[user.email]; // obter dados do obj users passando o user.email
        return dbUser !== undefined && dbUser.matches(user); // se ele existir e o login existir no "BD" valida
    }
};
exports.handleAuthentication = handleAuthentication;
