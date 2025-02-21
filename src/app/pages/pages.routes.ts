import { Routes } from '@angular/router';
import { Empty } from './empty/empty';
import { HomeComponent } from './home/home.component';

export default [
    { path: 'empty', component: Empty },
    { path: 'home', component: HomeComponent },
] as Routes;
