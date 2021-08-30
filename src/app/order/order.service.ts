import { Injectable } from "@angular/core";

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';

import { ShoppingCartService } from "app/restaurant-detail/shopping-cart/shopping-cart.service";
import { CartItem } from "app/restaurant-detail/shopping-cart/cart-item.model";
import { Order, OrderItem } from "./order.model";

import { MEAT_API } from "app/app.api";
import { LoginService } from "app/security/login/login.service";//precisamos pegar uma referencia de quem esta logado

@Injectable()
export class OrderService {

  constructor(
    private cartService: ShoppingCartService,
    private http: HttpClient,
    private loginService: LoginService) { }

  itemsValue(): number {
    return this.cartService.total()
  }

  cartItems(): CartItem[] {
    return this.cartService.items
  }

  increaseQty(item: CartItem) {
    this.cartService.increaseQty(item)
  }

  decreaseQty(item: CartItem) {
    this.cartService.decreaseQty(item)
  }

  removeItem(item: CartItem) {
    this.cartService.removeItem(item)
  }

  clear() {
    this.cartService.clear()
  }

  /*pega informacao do usuario autenticado..
    se estiver autenticado.. ele vai criar um HEADER
    que vai carregar o accessToken que recebemos no momento do login*/
  checkOrder(order: Order): Observable<string> {
    let headers = new HttpHeaders()//objeto imutavel.. com os metodos append() e set() para atribuir valores a um header
    if (this.loginService.isLoggedIn()) {
      headers = headers.set('Authorization', `Bearer ${this.loginService.user.accessToken}`)
    }
    //agora precisamos passar este objeto headers como mais um parametro do nosso POST --> {headers: headers}
    return this.http.post<Order>(`${MEAT_API}/orders`, order, { headers: headers })
                    .map(order => order.id)
  }

}
