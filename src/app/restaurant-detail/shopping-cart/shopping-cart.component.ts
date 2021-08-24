import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from './shopping-cart.service';

@Component({
  selector: 'mt-shopping-cart',
  templateUrl: './shopping-cart.component.html'
})
export class ShoppingCartComponent implements OnInit {

  constructor(private shoppingCartService: ShoppingCartService) { }

  ngOnInit() {
  }

  items(): any[] {
    return this.shoppingCartService.items
  }

  clear() {
    return this.shoppingCartService.clear()
  }
  
  addItem(item: any) {
    return this.shoppingCartService.addItem(item)
  }

  removeItem(item: any) {
    return this.shoppingCartService.removeItem(item)
  }

  total(): number {
    return this.shoppingCartService.total()
  }

}
