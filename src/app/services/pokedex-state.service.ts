import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PokedexFormFilterModel } from '../model/pokedex-model';

@Injectable({
  providedIn: 'root'
})
export class PokedexStateService {

  private pokedexFormFilterState = new BehaviorSubject<any>({});
  pokedexFormFilterState$ = this.pokedexFormFilterState.asObservable();

  constructor() { }

  setPokedexFormFilterState(value: PokedexFormFilterModel): void {
    this.pokedexFormFilterState.next(value);    
  }

  resetPokedexFormFilterState(): void {
    this.pokedexFormFilterState.next({});
  }

}
