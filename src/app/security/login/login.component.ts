import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';//para pegar qual foi o parametro usado na rota
import { NotificationService } from 'app/shared/messages/notification.service';

import { LoginService } from './login.service';
import { User } from './user.model';

@Component({
  selector: 'mt-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup
  navigateTo: string

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private notificationService: NotificationService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required])
    })
    //pegar referencia aos parametros da rota que ele iria ['to']--> /order || se ninguem passar rota --> navega pro / --> [/login]
    this.navigateTo = this.activatedRoute.snapshot.params['to'] || '/'
  }

  login() {
    //subscribes de api http tem 3 callbacks ---> 1: resposta | 2: erro | 3: quando o observable terminar
    this.loginService.login(this.loginForm.value.email,
                            this.loginForm.value.password)
                      .subscribe(user => 
                                  this.notificationService.notify(`Bem vindo, ${user.name}`),
                                response => //HttpErrorResponse
                                  this.notificationService.notify(response.error.message),
                                  //neste ponto o login deu certo e vamos navegar para esta rota
                                  ()=> {
                                    this.router.navigate([this.navigateTo])
                                  })
  }

}
