import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToolbarModule } from 'primeng/toolbar';
import { BreadcrumbModule } from 'primeng/breadcrumb';

import { PokedexFilterComponent } from "./components/pokedex-filter/pokedex-filter.component";


@Component({
  selector: 'app-pokedex',
  imports: [
    CommonModule,
    ToolbarModule,
    BreadcrumbModule,
    PokedexFilterComponent
],
  templateUrl: './pokedex.component.html',
  styleUrl: './pokedex.component.scss'
})
export class PokedexComponent {

  public breadcrumbItems = [{ label: 'Home'}, { icon: 'pi pi-home', label: 'Pokedex'}];

}
