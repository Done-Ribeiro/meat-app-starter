import { Injectable, Injector } from "@angular/core"
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http"
import { Observable } from "rxjs/Observable"

import { LoginService } from "./login/login.service"

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    // private loginService: LoginService,//DEU ERRO PORQUE TEM DEPENDENCIA CICLICA... RESOLVEMOS COM INJECTOR

    private injector: Injector/*eh uma referencia pro mecanismo de injecao de dependencia do angular
                                atravez dele conseguimos obter qualquer objeto registrado
                                dentro do container de injecao de dependencia
                                ex: referencia para --> NotificationService
                                ex: referencia para --> LoginService
                                ele tem o metodo get() onde voce passa qual tipo vc quer
                                e ele te da a instancia e as dependencias desta instancia
                                completamente resolvida... como se estivesse recebendo isto no construtor
                                na verdade eh uma maneira manual... mas resolvemos o nosso problema de injecao de dependencia*/
  ) { }

  //request => request que queremos interceptar ===> eh um objeto imutavel.. se quiser modificar usar metodo clone()
  //next => representa o proximo interceptor na fila de interceptors.. OU... ultimo objeto responsavel pela chamada final
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const loginService = this.injector.get(LoginService)//obtendo acesso a referencia de LoginService
    //colocando token personalizado(HEADER) caso usuario esteja autenticado
    if (loginService.isLoggedIn()) {
      //clonando o obj request e add header --> 'Authorization': `Bearer ${loginService.user.accessToken}`
      const authRequest = request.clone({ setHeaders: { 'Authorization': `Bearer ${loginService.user.accessToken}` } })
      return next.handle(authRequest)
    } else {
      return next.handle(request)//passar a chamada pro resto da fila/cadeia
    }
  }

}
