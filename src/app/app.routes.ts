import { Routes } from '@angular/router'

import { HomeComponent } from './home/home.component'
import { LoginComponent } from './security/login/login.component'

import { RestaurantsComponent } from './restaurants/restaurants.component'
import { RestaurantDetailComponent } from './restaurant-detail/restaurant-detail.component'
import { MenuComponent } from './restaurant-detail/menu/menu.component'
import { ReviewsComponent } from './restaurant-detail/reviews/reviews.component'
import { OrderSumaryComponent } from './order-sumary/order-sumary.component'
import { NotFoundComponent } from './not-found/not-found.component'

import { LoggedInGuard } from './security/loggedin.guard'

export const ROUTES: Routes = [
  { path: '', component: HomeComponent },
  //depois de fazer o login va para esta url --> /:to
  { path: 'login/:to', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'restaurants/:id', component: RestaurantDetailComponent,
    children: [
      { path: '', redirectTo: 'menu', pathMatch: 'full' },
      { path: 'menu', component: MenuComponent },
      { path: 'reviews', component: ReviewsComponent }
    ]
  },
  { path: 'restaurants', component: RestaurantsComponent },
  { path: 'order', loadChildren: './order/order.module#OrderModule',
      canLoad: [LoggedInGuard], canActivate: [LoggedInGuard] },
  { path: 'order', loadChildren: './order/order.module#OrderModule',
      canLoad: [LoggedInGuard], canActivate: [LoggedInGuard] },
  { path: 'order-sumary', component: OrderSumaryComponent },
  { path: 'about', loadChildren: './about/about.module#AboutModule' },
  //regra de wildcard --> precisa ficar no final pq é top-down
  { path: '**', component: NotFoundComponent }
]
