import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarModule } from 'primeng/toolbar';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';


@Component({
  selector: 'app-pokedex',
  imports: [
    CommonModule,
    ToolbarModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
  ],
  templateUrl: './pokedex.component.html',
  styleUrl: './pokedex.component.scss'
})
export class PokedexComponent {

}
