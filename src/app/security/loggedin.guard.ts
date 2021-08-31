import { CanLoad, Route, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";

import { LoginService } from "./login/login.service";

@Injectable()
export class LoggedInGuard implements CanLoad, CanActivate  {

  constructor(private loginService: LoginService) { }

  //refatorando --> criando metodo para servir os demais ==> canLoad e canActivate
  checkAuthentication(path: string): boolean {
    const loggedIn = this.loginService.isLoggedIn()
    if (!loggedIn) {
      /*o this.navigateTo do loginComponent guardou a rota que o usuario deseja acessar quando bate no guard,
        quando ele loga.. aqui chama o metodo que redireciona para essa rota passando este parametro*/
      this.loginService.handleLogin(`/${path}`)
    }
    return loggedIn
  }


  //recebe no parametro (qual a configuracao da rota que vamos associar o loggedinguard)
  canLoad(route: Route): boolean {
    console.log('route :>> ', route);
    return this.checkAuthentication(route.path)
  }
  
  //ActivatedRouteSnapshot --> copia da rota que foi ativada
  //RouterStateSnapshot --> eh uma arvore de ActivatedRouteSnapshot ==> tem o caminho de todas as rotas ativadas ate chegar na nossa
  canActivate(activatedRoute: ActivatedRouteSnapshot, routerState: RouterStateSnapshot): boolean {
    console.log('activatedRoute :>> ', activatedRoute);
    //activatedRoute.routeConfig === Route
    return this.checkAuthentication(activatedRoute.routeConfig.path)
  }

}
