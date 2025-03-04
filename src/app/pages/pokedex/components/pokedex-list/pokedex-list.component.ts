import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { signal } from '@angular/core';

import { DataView } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { SelectButton } from 'primeng/selectbutton';
import { DialogService } from 'primeng/dynamicdialog';
import { TooltipModule } from 'primeng/tooltip';

import { PokedexApiService } from '../../../../services/pokedex/pokedex-api.service';
import { PokemonDetailsComponent } from '../pokemon-details/pokemon-details.component';
import { PokedexFormFilterModel } from '../../../../model/pokedex-model';
import { PokedexStateService } from '../../../../services/pokedex/pokedex-state.service';

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

  public pokedexFormFilter: PokedexFormFilterModel = {
    inNamePokemon: '',
    inTypePokemon: {
      value: '',
      name: '',
      class: '',
    }
  };
  public layout: 'list' | 'grid' = 'grid';
  public options = ['list', 'grid'];

  private setListPokemons: any; 
  public getListPokemons: any; 
  public apiError: boolean = false;

  constructor(
    private pokedexApiService: PokedexApiService,
    private dialogService: DialogService,
    private pokedexState: PokedexStateService
  ) {}

  ngOnInit(): void {
    this.pokedexState.pokedexFormFilterState$.subscribe(
      values => {
        this.pokedexFormFilter = values;        
        if(Object.keys(this.pokedexFormFilter).length === 0) {
          this.getListAllPokemons();
        } else {
          this.getFormFilter(this.pokedexFormFilter);
        }
      }
    )
  }

  getListAllPokemons() {
    this.pokedexApiService.getListAllPokemons.subscribe(
      res => {
        this.setListPokemons = res.results;
        this.getListPokemons = res.results;
      }, 
      error => {
        this.apiError = true;
      }
      // {
      // next: (v) => console.log('next', v),
      // error: (e) => console.error('error', e),
      // complete: () => console.info('complete') 
      // }
    );
  }

getFormFilter(valuesFilter: PokedexFormFilterModel) {
  this.getListPokemons = this.setListPokemons.filter((res: any) => {
    const nameMatch = valuesFilter.inNamePokemon
      ? res.name.toLowerCase().includes(valuesFilter.inNamePokemon.toLowerCase())
      : true;

    const typeMatch = valuesFilter.inTypePokemon?.value
      ? res.status.types.some((type: any) =>
          type.type.name.toLowerCase().includes(valuesFilter.inTypePokemon.value.toLowerCase())
        )
      : true;

    return nameMatch && typeMatch;
  });
}

  formattedTypes(item: any): string {
    return item.status?.types
      ?.map((type: any) => 
        type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1).toLowerCase()
      )
      .join(', ') || '';
  }

  details(id: number) {
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
