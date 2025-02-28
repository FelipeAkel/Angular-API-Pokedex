import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { GetListAllPokemonsModel, ResultsModel } from '../model/pokedex-model';

@Injectable({
  providedIn: 'root'
})
export class PokedexApiService {

  private urlAll: string = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151'; // 1º Geração
  private urlId: string = 'https://pokeapi.co/api/v2/pokemon/';
  private urlSpeciesId: string = 'https://pokeapi.co/api/v2/pokemon-species/';

  constructor(
    private httpClient: HttpClient,
  ) { }

  get getListAllPokemons(): Observable<any>{    // GetListAllPokemonsModel
    return this.httpClient.get<any>(this.urlAll).pipe(
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

  public apiGetPokemon( urlAll: string ):Observable<any>{
    return this.httpClient.get<any>( urlAll ).pipe(
      map( res => res)
    );
  }

  public apiGetPokemonId( id: number ): Observable<any>{
    return this.httpClient.get<any>( this.urlId + id );
  }

  public apiGetPokemonSpeciesId( id: number ): Observable<any>{
    return this.httpClient.get<any>( this.urlSpeciesId + id );
  }

}
