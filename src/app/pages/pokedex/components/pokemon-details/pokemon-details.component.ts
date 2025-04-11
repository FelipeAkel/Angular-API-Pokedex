import { Component, OnInit } from '@angular/core';
import { TabsModule } from 'primeng/tabs';
import { CommonModule } from '@angular/common';

import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ImageCompareModule } from 'primeng/imagecompare';
import { DividerModule } from 'primeng/divider';
import { ImageModule } from 'primeng/image';

import { PokedexApiService } from '../../../../services/pokedex/pokedex-api.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-pokemon-details',
  imports: [
    CommonModule,
    TabsModule,
    CardModule,
    ButtonModule, 
    ImageCompareModule,
    DividerModule,
    ImageModule,
  ],
  templateUrl: './pokemon-details.component.html',
  styleUrl: './pokemon-details.component.scss'
})
export class PokemonDetailsComponent implements OnInit {

  public pokemonId: number;
  public dataPokemon: any;
  public loading: boolean = true;
  public apiError: boolean = false;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private pokedexApiService: PokedexApiService
  ) {
    this.pokemonId = config.data.id;
  }

  ngOnInit(): void {
    this.getPokemon();
  }

  public getPokemon() {
    const pokemon = this.pokedexApiService.apiGetPokemonId(this.pokemonId);
    const species = this.pokedexApiService.apiGetPokemonSpeciesId(this.pokemonId);

    return forkJoin([pokemon, species]).subscribe(
      res => {
        this.dataPokemon = res;     
        this.loading = false;
      },
      error => {
        this.apiError = true;
      }
    );
  }

  formattedTypes(item: any): string {    
    return item.types
      ?.map((type: any) => 
        type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1).toLowerCase()
      )
      .join(', ') || '';
  }

  closeDialog()
  {
    this.ref.close();
  }

}
