import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"

import { Observable } from "rxjs/Observable"
import 'rxjs/add/operator/do'//obter referencia do usuario antes que eu passe esta informacao pro meu componente

import { MEAT_API } from "app/app.api"
import { User } from "./user.model"


@Injectable()
export class LoginService {

  //criando variavel para armazenar usuario
  user: User

  constructor(private http: HttpClient) { }

  isLoggedIn(): boolean {
    return this.user !== undefined
  }

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${MEAT_API}/login`,
                          { email: email, password: password })
                    .do(user => this.user = user)
  }

}
