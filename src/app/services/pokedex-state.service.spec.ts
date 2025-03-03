import { TestBed } from '@angular/core/testing';

import { PokedexStateService } from './pokedex-state.service';

const mockPokedexFormFilter = {
  inNamePokemon: 'pikachu',
  inTypePokemon: {
      value: 'electric', 
      name: 'Elétrico - Electric', 
      class: 'electric',
  }
}

describe('PokedexStateService', () => {
  let service: PokedexStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokedexStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(`(U) ao executar setPokedexFormFilterState(), deveria atribuir o valores do filtro a uma variavel`, () => {
    spyOn(service['pokedexFormFilterState'], 'next');
    
    service.setPokedexFormFilterState(mockPokedexFormFilter);

    expect(service['pokedexFormFilterState'].next).toHaveBeenCalledWith(mockPokedexFormFilter);
  });

  it(`(U) ao executar resetPokedexFormFilterState(), deveria apagar os valores contidos na variavel`, () => {
    spyOn(service['pokedexFormFilterState'], 'next');
    
    service['pokedexFormFilterState'].next(mockPokedexFormFilter);
    service.resetPokedexFormFilterState();

    expect(service['pokedexFormFilterState'].next).toHaveBeenCalledWith({});
  });

});
