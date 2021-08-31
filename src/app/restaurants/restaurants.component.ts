import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations'
import { FormBuilder, FormControl, FormGroup } from '@angular/forms'

import { Restaurant } from './restaurant/restaurant.model'
import { RestaurantsService } from './restaurants.service'

import { Observable, from } from 'rxjs'
import { switchMap, tap, debounceTime, distinctUntilChanged, catchError } from 'rxjs/operators'

@Component({
  selector: 'mt-restaurants',
  templateUrl: './restaurants.component.html',
  animations: [
    trigger('toogleSearch', [
      state('hidden', style({
        opacity: 0,
        "max-height": "0px"
      })),
      state('visible', style({
        opacity: 1,
        "max-height": "70px",
        "margin-top": "20px"
      })),
      transition('* => *', animate('250ms 0s ease-in-out'))
    ])
  ]
})
export class RestaurantsComponent implements OnInit {

  searchBarState = 'hidden'
  restaurants: Restaurant[]

  searchForm: FormGroup
  searchControl: FormControl

  constructor(private restaurantsService: RestaurantsService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.searchControl = this.fb.control('') // limpa o controlador pra nao vir undefined
    this.searchForm = this.fb.group({
      searchControl: this.searchControl
    })

    this.searchControl.valueChanges
        .pipe(
          debounceTime(500), // aguarda 500ms entre dois eventos
          distinctUntilChanged(), // emite somente eventos unicos
          switchMap(searchTerm => // troca a cadeia (ao inves de emitir pra frente o searchTerm.. ele troca por observable de restaurants)
                                  // e o switchMap quando ele executa uma nova query ele faz o unsubscribe da query anterior
            this.restaurantsService
              .restaurants(searchTerm)
              // *** corrigindo aqui pq utilizamos um outro observable
              .pipe(catchError(error => from([]))))// quando estourar o erro ele retorna um array vazio para o subscribe abaixo
        ).subscribe(restaurants => this.restaurants = restaurants)

    this.restaurantsService.restaurants()
      .subscribe(restaurants => this.restaurants = restaurants)
  }

  toogleSearch(iptSearch: HTMLInputElement) {
    this.searchBarState = this.searchBarState === 'hidden' ? 'visible' : 'hidden'

    if (this.searchBarState === 'visible') {
      iptSearch.focus()
    }
  }

}
