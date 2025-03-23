import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [CommonModule, AppMenuitem, RouterModule],
    templateUrl: './app.menu.html'
})
export class AppMenu {
    model: MenuItem[] = [];

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [
                    { 
                        label: 'Pokedex', 
                        icon: 'pi pi-fw pi-home', 
                        routerLink: ['/pages/pokedex'] 
                    }
                ]
            },{
                label: 'Páginas',
                icon: 'pi pi-fw pi-briefcase',
                routerLink: ['/pages'],
                items: [
                    {
                        label: 'Tarefas',
                        icon: 'pi pi-fw pi-address-book',
                        items: [
                            {
                                label: 'Cadastrar Tarefa',
                                icon: 'pi pi-fw pi-plus',
                                routerLink: ['/pages/tasks/create-task'],
                            },
                            {
                                label: 'Listar Tarefas',
                                icon: 'pi pi-fw pi-list',
                                routerLink: ['/pages/tasks/list-tasks'],
                            }
                        ]
                    },
                    {
                        label: 'Página em branco',
                        icon: 'pi pi-fw pi-circle-off',
                        routerLink: ['/pages/empty'],
                    },
                ]
            }
        ];
    }
}
