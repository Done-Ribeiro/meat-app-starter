import { ErrorHandler, Injectable, Injector, NgZone } from "@angular/core"
import { HttpErrorResponse } from "@angular/common/http"
import { Observable } from "rxjs/Observable"
import 'rxjs/add/Observable/throw'


import { NotificationService } from "./shared/messages/notification.service"
import { LoginService } from "./security/login/login.service"

@Injectable()//porque ele eh um PROVIDER || todo provider que recebe uma injecao tem que ter um Injectable()
export class ApplicationErrorHandler extends ErrorHandler {

  constructor(
    private ns: NotificationService,
    private injector: Injector,
    private zone: NgZone) {
    /*como criamos um construtor personalizado.. ele parou de chamar o da classe padrao.. (que extends de ErrorHandler)
    ai fazemos uma chamada ao construtor do ErrorHandler ==> super()*/
    super()
  }

  //ErrorHandler padrao ==> se nao tratarmos o erro.. ele emprime no console
  handleError(errorResponse: HttpErrorResponse | any) {
    //provocando um erro pra ver a notificacao
    // this.ns.notify('ERRO')
    if (errorResponse instanceof HttpErrorResponse) {
      //pega mensagem de erro vinda do backend... caso exista
      const message = errorResponse.error.message
      /*
        GARANTINDO QUE O QUE VAI EXECUTAR NO SWITCH... SEJA EXECUTADO EM UMA ZONA
        PARA VOLTAR A FUNCIONAR CORRETAMENTE O NOTIFICATIONSERVICE
      */
      this.zone.run(()=> {
        //colocamos todo o switch agora aqui pra dentro
        switch (errorResponse.status) {
          case 401://aqui ele cai quando tenta acessar uma parte protegida da aplicacao.. entao vamos mandar para o '/login'
            this.injector.get(LoginService).handleLogin()/*faz referencia => loginService ... depois chama o metodo
                                                          que manda logar ou seja.. se o sistema devolver um 401..
                                                          ele ja manda direto pra tela de login*/
            break;
          case 403:
            this.ns.notify(message || 'Não autorizado.')
            break;
          case 404:
            this.ns.notify(message || 'Recurso não encontrado. Verifique o console para mais detalhes')
            break;
        
          default:
            break;
        }
      })
    }
    super.handleError(errorResponse)
  }
}
