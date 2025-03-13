import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonDetailsComponent } from './pokemon-details.component';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PokedexApiService } from '../../../../services/pokedex/pokedex-api.service';

import { HttpClientTestingModule } from '@angular/common/http/testing';  // Importando o módulo para simular requisições HTTP
import { mockItem, mockItemVazio } from '../../../../services/pokedex/pokedex-api.mock';

class MockDynamicDialogConfig {
  data = { id: 1 };  // Simulando que o dialog está recebendo o ID 1
}

describe('PokemonDetailsComponent', () => {
  let component: PokemonDetailsComponent;
  let fixture: ComponentFixture<PokemonDetailsComponent>;
  let dynamicDialogRefSpy: jasmine.SpyObj<DynamicDialogRef>;

  beforeEach(async () => {

    dynamicDialogRefSpy = jasmine.createSpyObj('DynamicDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [
        PokemonDetailsComponent,
        HttpClientTestingModule  // Importando o módulo para simular o HttpClient
      ],
      providers: [
        { provide: DynamicDialogRef, useValue: dynamicDialogRefSpy },        // Provedor para o DynamicDialogRef
        { provide: DynamicDialogConfig, useClass: MockDynamicDialogConfig },  // Provedor para o DynamicDialogConfig
        PokedexApiService
      ],
    
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { 
    expect(component).toBeTruthy();
  });

  it(`(U) ao executar formattedTypes(), deveria pegar os valores do array e retornar uma string separado por virgula`, () => {
    const returnText = component.formattedTypes(mockItem.status);
    expect(returnText).toBe('Grass, Poison, Normal');
  });

  it(`(U) ao executar formattedTypes(), deveria caso array vazio retornar vazio`, () => {
    const returnText = component.formattedTypes(mockItemVazio);
    expect(returnText).toBe('');
  });
  
  it(`(U) ao executar closeDialog(), deveria fechar o DynamicDialogRef`, () => {
    component.closeDialog();

    expect(dynamicDialogRefSpy.close).toHaveBeenCalled();
  });

});
