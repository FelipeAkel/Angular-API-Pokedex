import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { FluidModule } from 'primeng/fluid';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { MessageModule } from 'primeng/message';

import { TypePokemonModel } from '../../../../model/pokedex-model';
import { FormValidationService } from '../../../../services/form-validation.service';

@Component({
  selector: 'app-pokedex-filter',
  imports: [
    FormsModule, 
    ReactiveFormsModule,
    CommonModule,

    IconFieldModule,
    InputIconModule,
    InputTextModule,
    FluidModule,
    SelectModule,
    ButtonModule,
    ToolbarModule,
    MessageModule,
  ],
  templateUrl: './pokedex-filter.component.html',
  styleUrl: './pokedex-filter.component.scss'
})
export class PokedexFilterComponent {

  public loading: boolean = false;

  public typePokemons: Array<TypePokemonModel> = [
    { value: 'bug', name: 'Inseto - Bug', class: 'bug' },
    { value: 'dark', name: 'Sombrio - Dark', class: 'dark' },
    { value: 'dragon', name: 'Dragão - Dragon', class: 'dragon' },
    { value: 'electric', name: 'Elétrico - Electric', class: 'electric' },
    { value: 'fairy', name: 'Fada - Fairy', class: 'fairy' },
    { value: 'fighting', name: 'Lutador - Fighting', class: 'fighting' },
    { value: 'fire', name: 'Fogo - Fire', class: 'fire' },
    { value: 'flying', name: 'Voador - Flying', class: 'flying' },
    { value: 'ghost', name: 'Fantasma - Ghost', class: 'ghost' },
    { value: 'grass', name: 'Planta - Grass', class: 'grass' },
    { value: 'ground', name: 'Terrestre - Ground', class: 'ground' },
    { value: 'ice', name: 'Gelo - Ice', class: 'ice' },
    { value: 'normal', name: 'Normal - Normal', class: 'normal' },
    { value: 'poison', name: 'Venenoso - Poison', class: 'poison' },
    { value: 'psychic', name: 'Psíquico - Psychic', class: 'psychic' },
    { value: 'rock', name: 'Pedra - Rock', class: 'rock' },
    { value: 'steel', name: 'Aço - Steel', class: 'steel' },
    { value: 'water', name: 'Água - Water', class: 'water' },
  ];

  // public typePokemon = null;

  public pokedexFormFilter: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private formValidation: FormValidationService,
  ){
    this.pokedexFormFilter = this.formBuilder.group({
      inNamePokemon: ['', [Validators.required, Validators.minLength(10)]],
      inTypePokemon: [null, [Validators.required]],
    })
  }

  isFieldInvalid(field: string): boolean | undefined {
    return (
      this.pokedexFormFilter.get(field)?.invalid &&
      (this.pokedexFormFilter.get(field)?.dirty || this.pokedexFormFilter.get(field)?.touched)
    );
  }

  getErrorMessage(field: string, labelName?: string): string {
    return this.formValidation.getErrorMessage(this.pokedexFormFilter.get(field), labelName);
  }

  onSubmitPokedexFormFilter() {
    if(this.pokedexFormFilter.valid) {
      this.loading = true;
  
      setTimeout(() => {
        this.loading = false;
      }, 2000);

    } else {
      this.pokedexFormFilter.markAllAsTouched();
    }
  }

  onClearFormFilter()
  {
    this.pokedexFormFilter.reset()
  }

}
