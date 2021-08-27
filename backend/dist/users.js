"use strict";
exports.__esModule = true;
exports.users = exports.User = void 0;
var User = /** @class */ (function () {
    function User(email, name, password) {
        this.email = email;
        this.name = name;
        this.password = password;
    }
    // metodo pra comparar usuarios do login
    User.prototype.matches = function (another) {
        return another !== undefined && // se ele existir
            another.email === this.email && // e as senhas forem iguais
            another.password === this.password; // e os emails forem iguais
    };
    return User;
}());
exports.User = User;
// tipamos a resposta --> [chave: valor] do tipo Usuario
exports.users = {
    "juliana@gmail.com": new User('juliana@gmail.com', 'Juliana', 'juliana23'),
    "amanda@gmail.com": new User('amanda@gmail.com', 'Amanda', 'amanda21')
};
