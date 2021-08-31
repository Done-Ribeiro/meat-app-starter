import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { Router } from "@angular/router"

import { Observable } from "rxjs/Observable"
import 'rxjs/add/operator/do'//obter referencia do usuario antes que eu passe esta informacao pro meu componente

import { MEAT_API } from "app/app.api"
import { User } from "./user.model"


@Injectable()
export class LoginService {

  //criando variavel para armazenar usuario
  user: User

  constructor(
    private http: HttpClient,
    private router: Router) { }

  isLoggedIn(): boolean {
    return this.user !== undefined
  }

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${MEAT_API}/login`,
                          { email: email, password: password })
                    .do(user => this.user = user)
  }

  handleLogin(path?: string) {
    //recebe o (path).. se usuario estava no carrinho de comprar antes de estar logado ==> '/order' || '/'
    //neste momento a url esta assim --> %2Forder ... vamos deixar mais amigavel codificando pra base64 --> btoa(path) ex: '/L29yZGVy'
    this.router.navigate(['/login', btoa(path)])
  }

}
