import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { signal } from '@angular/core';

import { DataView } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { SelectButton } from 'primeng/selectbutton';
import { DialogService } from 'primeng/dynamicdialog';
import { TooltipModule } from 'primeng/tooltip';

import { PokedexApiService } from '../../../../services/pokedex-api.service';
import { PokemonDetailsComponent } from '../pokemon-details/pokemon-details.component';

@Component({
  selector: 'app-pokedex-list',
  imports: [
    CommonModule,
    FormsModule,
    
    DataView,
    ButtonModule,
    SelectButton,
    TooltipModule, 
    
],
  templateUrl: './pokedex-list.component.html',
  styleUrl: './pokedex-list.component.scss',
  providers: [DialogService]
})
export class PokedexListComponent implements OnInit {

  public layout: 'list' | 'grid' = 'grid';
  public options = ['list', 'grid'];
  // TODO - GetListPokemonsModel
  public getListPokemons: any; 

  constructor(
    private pokedexApiService: PokedexApiService,
    private dialogService: DialogService,
  ) {}

  ngOnInit(): void {
    this.pokedexApiService.getListAllPokemons.subscribe(
      res => {
        this.getListPokemons = res.results;
        console.warn('getListPokemons', this.getListPokemons);
      }
      // {
      // next: (v) => console.log('next', v),
      // error: (e) => console.error('error', e),
      // complete: () => console.info('complete') 
      // }
    );
  }

  formattedTypes(item: any): string {
    return item.status?.types
      ?.map((type: any) => 
        type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1).toLowerCase()
      )
      .join(', ') || '';
  }

  details(id: number) {
    // console.log('details', id);
    this.dialogService.open(PokemonDetailsComponent, {
      data: { id },
      header: 'Detalhes do Pokemon',
      width: '60%',
      closable: true,                     // Icone fechar modal
      modal: true,                        // Background mais escuro
      dismissableMask: true,              // Clicar fora do modal fecha o dialog
      maskStyleClass: 'backdrop-blur-sm', // Background esfumaçado 
    });
  }

}
