import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokedexFilterComponent } from './pokedex-filter.component';
import { Validators } from '@angular/forms';
import { mockPokedexFormFilter } from '../../../../mocks/pokedex-api.mock';

describe('PokedexFilterComponent', () => {
  let component: PokedexFilterComponent;
  let fixture: ComponentFixture<PokedexFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokedexFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokedexFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`(U) ao executar getErrorMessage(), deveria apresentar menssagem de erro`, () => {
    const mockField = 'inNamePokemon';
    const mockLabelName = 'Pesquisar Pokemon';
    const mockErrorMessage = 'O campo Pesquisar Pokemon é obrigatório.';

    component.pokedexFormFilter.get(mockField)?.setErrors({required: true});

    const errorMessage = component.getErrorMessage(mockField, mockLabelName);

    expect(errorMessage).toBe(mockErrorMessage);
  });

  it(`(U) ao executar onSubmitPokedexFormFilter(), com o formulário válido`, () => {
    spyOn(component['pokedexState'], 'setPokedexFormFilterState'); // Espiona se o método foi chamado

    component.onSubmitPokedexFormFilter(mockPokedexFormFilter);
    
    expect(component.pokedexFormFilter.valid).toBeTruthy(); // Fomulário é válido
    expect(component['pokedexState'].setPokedexFormFilterState).toHaveBeenCalledWith(mockPokedexFormFilter); // Verificando se os valores foram atribuidos
  });

  it(`(U) ao executar onSubmitPokedexFormFilter(), com o formulário inválido`, () => {
    spyOn(component.pokedexFormFilter, 'markAllAsTouched'); // Espiona se o método foi chamado

    component.pokedexFormFilter.get('inNamePokemon')?.setValidators([Validators.required]);
    component.pokedexFormFilter.get('inNamePokemon')?.updateValueAndValidity();

    component.onSubmitPokedexFormFilter({
      inNamePokemon: '',
      inTypePokemon: {
          value: '', 
          name: '', 
          class: '',
      }}
    );

    expect(component.pokedexFormFilter.valid).toBeFalsy(); // Formulário inválido
    expect(component.pokedexFormFilter.markAllAsTouched).toHaveBeenCalled(); // Verifica se foi chamado
  });

  it(`(U) ao executar onClearFormFilter(), deveria resetar os valores do formulário`, () => {
    component.pokedexFormFilter.setValue(mockPokedexFormFilter);
    component.onClearFormFilter();

    expect(component.pokedexFormFilter.get('inNamePokemon')?.value).toEqual(null);
    expect(component.pokedexFormFilter.get('inTypePokemon')?.value).toEqual(null);
    expect(component.pokedexFormFilter.get('inTypePokemon')?.value?.name).toEqual(undefined);
  });

});
