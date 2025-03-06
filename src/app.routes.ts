import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { PokedexComponent } from './app/pages/pokedex/pokedex.component';

export const appRoutes: Routes = [
    {
        path: '',
        component: AppLayout,
        children: [
            { path: '', component: PokedexComponent }, // Rota inicial do sistema: '/' 
            { path: 'pages', loadChildren: () => import('./app/pages/pages.routes') }
        ]
    },
    { path: '**', redirectTo: '/pages/pokedex' } // Erro 404 - página não encontrada
];
