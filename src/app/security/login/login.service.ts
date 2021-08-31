import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { Router, NavigationEnd } from "@angular/router"

import { Observable } from "rxjs/Observable"
import 'rxjs/add/operator/do'//obter referencia do usuario antes que eu passe esta informacao pro meu componente
import 'rxjs/add/operator/filter'

import { MEAT_API } from "app/app.api"
import { User } from "./user.model"


@Injectable()
export class LoginService {

  //criando variavel para armazenar usuario
  user: User
  lastUrl: string

  constructor(
    private http: HttpClient,
    private router: Router) {
      //pegando a ultima url que o usuario estava antes de fazer o login()
      this.router.events.filter(e => e instanceof NavigationEnd)  
                        .subscribe( (e: NavigationEnd) => this.lastUrl = e.url)
    }

  isLoggedIn(): boolean {
    return this.user !== undefined
  }

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${MEAT_API}/login`,
                          { email: email, password: password })
                    .do(user => this.user = user)
  }

  logout() {
    this.user = undefined
  }

  //colocando valor default na url ==> this.lastUrl
  handleLogin(path: string = this.lastUrl) {
    //recebe o (path).. se usuario estava no carrinho de comprar antes de estar logado ==> '/order' || '/'
    //neste momento a url esta assim --> %2Forder ... vamos deixar mais amigavel codificando pra base64 --> btoa(path) ex: '/L29yZGVy'
    this.router.navigate(['/login', btoa(path)])
  }

}
