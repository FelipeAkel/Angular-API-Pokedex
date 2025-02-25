import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { GetListAllPokemonsModel, ResultsModel } from '../model/pokedex-model';

@Injectable({
  providedIn: 'root'
})
export class PokedexApiService {

  private url: string = 'https://pokeapi.co/api/v2/pokemon/?limit=18';

  constructor(
    private httpClient: HttpClient,
  ) { }

  get getListAllPokemons(): Observable<any>{    // GetListAllPokemonsModel
    return this.httpClient.get<any>(this.url).pipe(
      tap( res => res ),
      tap( res => {
        res.results.map( (resPokemons: any) => { // ResultsModel

          this.apiGetPokemon(resPokemons.url).subscribe(
            res => resPokemons.status = res
          );

        });
      })
    );
  } 

  public apiGetPokemon( url: string ):Observable<any>{
    return this.httpClient.get<any>( url ).pipe(
      map( res => res)
    );
  }

}
