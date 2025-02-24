import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { signal } from '@angular/core';

import { DataView } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { SelectButton } from 'primeng/selectbutton';
import { ListPokemonModel } from '../../model/pokedex-model';

@Component({
  selector: 'app-pokedex-list',
  imports: [
    CommonModule,
    FormsModule,

    DataView,
    ButtonModule,
    SelectButton,
  ],
  templateUrl: './pokedex-list.component.html',
  styleUrl: './pokedex-list.component.scss'
})
export class PokedexListComponent {

  public layout: 'list' | 'grid' = 'grid';
  public options = ['list', 'grid'];
  // TODO - ListPokemonModel
  public listPokemons = ([
    {
      id: '1',
      name: 'Bamboo Watch',
      description: 'Product Description',
      image: 'bamboo-watch.jpg',
      typePokemon: 'Fogo, Água',
    },
    {
      id: '2',
      name: 'Bamboo Watch',
      description: 'Product Description',
      image: 'bamboo-watch.jpg',
      typePokemon: 'Fogo, Água',
    },
    {
      id: '3',
      name: 'Bamboo Watch',
      description: 'Product Description',
      image: 'bamboo-watch.jpg',
      typePokemon: 'Fogo, Água',
    },
    {
      id: '4',
      name: 'Bamboo Watch',
      description: 'Product Description',
      image: 'bamboo-watch.jpg',
      typePokemon: 'Fogo, Água',
    },
  ]);

  constructor() {}

}
