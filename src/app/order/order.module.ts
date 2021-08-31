import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"

import { OrderComponent } from "./order.component"
import { OrderItemsComponent } from "./order-items/order-items.component"
import { DeliveryCostsComponent } from "./delivery-costs/delivery-costs.component"

import { SharedModule } from "app/shared/shared.module"

import { LeaveOrderGuard } from "./leave-order.guard"

const ROUTES: Routes = [
  //colocar canDeactivate sempre na rota que tem o componente... o proprio canDeactivate precisa do componente pra isso
  //pois estamos usando o estado do componente pra fazer esta decisao
  { path: '', component: OrderComponent , canDeactivate: [LeaveOrderGuard] }
]

@NgModule({
  declarations: [
    OrderComponent,
    OrderItemsComponent,
    DeliveryCostsComponent
  ],
  imports: [SharedModule, RouterModule.forChild(ROUTES)]
})
export class OrderModule { }