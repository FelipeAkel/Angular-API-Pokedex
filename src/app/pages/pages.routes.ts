import { Routes } from '@angular/router';
import { Empty } from './empty/empty';
import { PokedexComponent } from './pokedex/pokedex.component';

export default [
    { path: 'empty', component: Empty },
    { path: 'pokedex', component: PokedexComponent },
] as Routes;
