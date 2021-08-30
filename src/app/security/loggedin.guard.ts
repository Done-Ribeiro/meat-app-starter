import { CanLoad, Route } from "@angular/router";
import { Injectable } from "@angular/core";

import { LoginService } from "./login/login.service";

@Injectable()
export class LoggedInGuard implements CanLoad {

  constructor(private loginService: LoginService) { }

  //recebe no parametro (qual a configuracao da rota que vamos associar o loggedinguard)
  canLoad(route: Route): boolean {
    console.log(route);
    const loggedIn = this.loginService.isLoggedIn()
    if (!loggedIn) {
      /*o this.navigateTo do loginComponent guardou a rota que o usuario deseja acessar quando bate no guard,
        quando ele loga.. aqui chama o metodo que redireciona para essa rota passando este parametro*/
      this.loginService.handleLogin(`/${route.path}`)
    }
    return loggedIn
  }

}
