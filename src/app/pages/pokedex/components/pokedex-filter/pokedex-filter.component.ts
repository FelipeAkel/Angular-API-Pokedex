import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { FluidModule } from 'primeng/fluid';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';

import { TypePokemonModel } from '../../../../models/pokedex-model';

@Component({
  selector: 'app-pokedex-filter',
  imports: [
    FormsModule, 
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    FluidModule,
    SelectModule,
    ButtonModule,
    ToolbarModule,
  ],
  templateUrl: './pokedex-filter.component.html',
  styleUrl: './pokedex-filter.component.scss'
})
export class PokedexFilterComponent {

  public typePokemons: Array<TypePokemonModel> = [
    { value: 'bug', name: 'Inseto', class: 'bug' },
    { value: 'dark', name: 'Sombrio', class: 'dark' },
    { value: 'dragon', name: 'Dragão', class: 'dragon' },
    { value: 'electric', name: 'Elétrico', class: 'electric' },
    { value: 'fairy', name: 'Fada', class: 'fairy' },
    { value: 'fighting', name: 'Lutador', class: 'fighting' },
    { value: 'fire', name: 'Fogo', class: 'fire' },
    { value: 'flying', name: 'Voador', class: 'flying' },
    { value: 'ghost', name: 'Fantasma', class: 'ghost' },
    { value: 'grass', name: 'Planta', class: 'grass' },
    { value: 'ground', name: 'Terrestre', class: 'ground' },
    { value: 'ice', name: 'Gelo', class: 'ice' },
    { value: 'normal', name: 'Normal', class: 'normal' },
    { value: 'poison', name: 'Venenoso', class: 'poison' },
    { value: 'psychic', name: 'Psíquico', class: 'psychic' },
    { value: 'rock', name: 'Pedra', class: 'rock' },
    { value: 'steel', name: 'Aço', class: 'steel' },
    { value: 'water', name: 'Água', class: 'water' },
  ];

  // public typePokemon = null;

}
