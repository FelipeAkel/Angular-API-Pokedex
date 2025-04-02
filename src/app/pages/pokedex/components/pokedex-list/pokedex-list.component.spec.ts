import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokedexListComponent } from './pokedex-list.component';
import { PokedexApiService } from '../../../../services/pokedex/pokedex-api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PokemonDetailsComponent } from '../pokemon-details/pokemon-details.component';
import { mockApiSetListPokemon, mockItem, mockItemVazio } from '../../../../mocks/pokedex-api.mock';
import { PokedexFormFilterModel } from '../../../../model/pokedex-model';

describe('PokedexListComponent', () => {
  let component: PokedexListComponent;
  let fixture: ComponentFixture<PokedexListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PokedexListComponent,
        HttpClientTestingModule,
      ],
      providers: [
        PokedexApiService,
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokedexListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`(U) ao executar getFormFilter(), deveria filtrar os pokemons pelo tipo`, () => {

    component['setListPokemons'] = mockApiSetListPokemon.results;

    const mockfiltros: PokedexFormFilterModel = { 
      inNamePokemon: '', 
      inTypePokemon: {
        value: 'flying',
        name: 'Voador - flying',
        class: 'flying',
      }
    };
    component.getFormFilter(mockfiltros);

    expect(component.getListPokemons.length).toBe(1);
    expect(component.getListPokemons.map((p: any) => p.name)).toEqual(['charizard']);
  });


  it(`(U) ao executar getFormFilter(), deveria filtrar os pokemons pelo nome`, () => {

    component['setListPokemons'] = mockApiSetListPokemon.results;

    const mockfiltros: PokedexFormFilterModel = { 
      inNamePokemon: 'char', inTypePokemon: {
        value: '',
        name: '',
        class: '',
      } 
    };

    component.getFormFilter(mockfiltros);

    expect(component.getListPokemons.length).toBe(3);
    expect(component.getListPokemons.map((p: any) => p.name)).toEqual(['charmander', 'charmeleon', 'charizard']);
  });

  it(`(U) ao executar getFormFilter(), com o setListPokemons undefaild`, () => {
    const mockfiltros: PokedexFormFilterModel = { 
      inNamePokemon: 'char', inTypePokemon: {
        value: '',
        name: '',
        class: '',
      } 
    };

    spyOn(component, 'getListAllPokemons');

    component['setListPokemons'] = undefined;

    component.getFormFilter(mockfiltros);

    expect(component.getListAllPokemons).toHaveBeenCalled();
  });

  it(`(U) ao executar formattedTypes(), deveria transformar os dados de um array em uma string seprada por virgula`, () => {
    const returnText = component.formattedTypes(mockItem);
    expect(returnText).toEqual('Grass, Poison, Normal');
  });

  it(`(U) ao executar formattedTypes(), deveria caso array vazio retornar vazio`, () => {
    const returnText = component.formattedTypes(mockItemVazio);
    expect(returnText).toEqual('');
  });

  it(`(U) ao executar details(), deveria abrir um modal`, () => {
    spyOn(component['dialogService'], 'open');

    const id = 1;
    component.details(id);

    expect(component['dialogService'].open).toHaveBeenCalledWith(PokemonDetailsComponent, {
      data: { id },
      header: 'Detalhes do Pokemon',
      width: '60%',
      closable: true,
      modal: true,
      dismissableMask: true,
      maskStyleClass: 'backdrop-blur-sm',
    });

  });

});
