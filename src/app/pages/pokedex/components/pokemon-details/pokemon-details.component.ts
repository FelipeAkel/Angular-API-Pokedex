import { Component, OnInit } from '@angular/core';

import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-pokemon-details',
  imports: [ButtonModule, InputTextModule],
  templateUrl: './pokemon-details.component.html',
  styleUrl: './pokemon-details.component.scss'
})
export class PokemonDetailsComponent implements OnInit {

  public pokemonId: number | null = null;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
  ) {
    this.pokemonId = config.data.id;
  }

  ngOnInit(): void {
      console.warn('teste ID ', this.pokemonId);
  }

  closeDialog()
  {
    this.ref.close();
  }

}
