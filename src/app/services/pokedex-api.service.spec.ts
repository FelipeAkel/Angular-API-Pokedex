import { TestBed } from '@angular/core/testing';

import { PokedexApiService } from './pokedex-api.service';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { mockApiSetListPokemon } from './pokedex-api.mock';
import { of } from 'rxjs';

fdescribe('PokedexApiService', () => {
  let service: PokedexApiService;
  let httpTestingController: HttpTestingController;
  let httpCliente: HttpClient

  const urlAll = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151'; // 1º Geração
  const urlId = 'https://pokeapi.co/api/v2/pokemon/';
  const urlSpeciesId = 'https://pokeapi.co/api/v2/pokemon-species/';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
    });
    httpCliente = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController)
    service = TestBed.inject(PokedexApiService);

    // Simulando `apiGetPokemon()` para retornar os dados do mock corretamente
    spyOn(service, 'apiGetPokemon').and.callFake((url: string) => {
      const pokemon = mockApiSetListPokemon.results.find(p => p.url === url);
      return of(pokemon ? { types: pokemon.status.types } : { types: [] });
    });

  });

  // É executado após beforeEach() 
  afterEach(() => {
    httpTestingController.verify(); // Executado após cada teste, no final
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(`(U) ao executar getListAllPokemons(), deveria retornar a lista que será substituida pelo mock de dados`, (done) => {

    service.getListAllPokemons.subscribe( (res: any) => {
      expect(res.results.length).toBe(9);
      expect(res.results[0].name).toEqual('bulbasaur');
      expect(res.results[0].status.types[0].type.name).toEqual('grass');
      expect(res.results[0].status.types[1].type.name).toEqual('poison');
      expect(res.results[8].name).toEqual('blastoise');
      expect(res.results[8].status.types[0].type.name).toEqual('water');
      done(); // Para finalizar a execução do subscribe
    } );

    // Basicamente estou trocando os dados da API para os dados Mock
    const req = httpTestingController.expectOne(urlAll);
    req.flush(mockApiSetListPokemon);

    expect(req.request.method).toEqual('GET');
  });

});
