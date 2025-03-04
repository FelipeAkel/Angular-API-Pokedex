import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokedexListComponent } from './pokedex-list.component';
import { PokedexApiService } from '../../../../services/pokedex/pokedex-api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PokemonDetailsComponent } from '../pokemon-details/pokemon-details.component';
import { mockSetListPokemon } from '../../../../services/pokedex/pokedex-api.mock';
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

  it(`(U) ao executar getListAllPokemons(), deveria filtrar os pokemons pelo tipo`, () => {

    component['setListPokemons'] = mockSetListPokemon;

    const filter: PokedexFormFilterModel = { 
      inNamePokemon: '', 
      inTypePokemon: {
        value: 'flying',
        name: 'Voador - flying',
        class: 'flying',
      }
    };
    component.getFormFilter(filter);

    expect(component.getListPokemons.length).toBe(1);
    expect(component.getListPokemons.map((p: any) => p.name)).toEqual(['charizard']);
  });


  it(`(U) ao executar getListAllPokemons(), deveria filtrar os pokemons pelo nome`, () => {

    component['setListPokemons'] = mockSetListPokemon;

    const filtros: PokedexFormFilterModel = { 
      inNamePokemon: 'char', inTypePokemon: {
        value: '',
        name: '',
        class: '',
      } 
    };

    component.getFormFilter(filtros);

    expect(component.getListPokemons.length).toBe(3);
    expect(component.getListPokemons.map((p: any) => p.name)).toEqual(['charmander', 'charmeleon', 'charizard']);
  });

  it(`(U) ao executar formattedTypes(), deveria transformar os dados de um array em uma string seprada por virgula`, () => {
    const mockItem = {
      status: {
        types: [
          {
            slot: 1,
            type: {
              name: "grass",
            }
          },
          {
            slot: 2,
            type: {
              name: "poison",
            }
          },
          {
            slot: 3,
            type: {
              name: "normal",
            }
          }
        ]
      }
    };

    const returnText = component.formattedTypes(mockItem);

    expect(returnText).toEqual('Grass, Poison, Normal');
  });

  it(`(U) ao executar formattedTypes(), deveria caso array vazio retornar vazio`, () => {
    const mockItem = {
      status: {
        types: [
          {
            slot: 1,
            type: {
              name: "",
            }
          },
        ]
      }
    };

    component.formattedTypes(mockItem);

    expect(component.formattedTypes(mockItem)).toEqual('');
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
