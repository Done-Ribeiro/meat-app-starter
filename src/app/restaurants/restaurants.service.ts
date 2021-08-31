import { Injectable } from "@angular/core"

// modulo HttpClient ja trabalha com padrao JSON
import { HttpClient, HttpParams } from "@angular/common/http"

import { Observable } from "rxjs"

import { Restaurant } from "./restaurant/restaurant.model"
import { MenuItem } from "app/restaurant-detail/menu-item/menu-item.model"

import { MEAT_API } from "../app.api"

@Injectable()
export class RestaurantsService {

  constructor(private http: HttpClient) { }

  restaurants(search?: string): Observable<Restaurant[]> {
    let params: HttpParams = undefined
    if (search) {
      // o parametro precisa ser setado no momento da instancia.. caso contrario ele cria uma copia
      params = new HttpParams().set('q', search)
    }
    return this.http.get<Restaurant[]>(`${MEAT_API}/restaurants`, { params: params })
  }

  restaurantById(id: string): Observable<Restaurant> {
    return this.http.get<Restaurant>(`${MEAT_API}/restaurants/${id}`)
  }

  reviewOfRestaurant(id: string): Observable<any> {
    return this.http.get(`${MEAT_API}/restaurants/${id}/reviews`)
  }

  menuOfRestaurant(id: string): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>(`${MEAT_API}/restaurants/${id}/menu`)
  }

}