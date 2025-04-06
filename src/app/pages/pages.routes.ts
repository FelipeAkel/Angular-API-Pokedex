import { Routes } from '@angular/router';
import { Empty } from './empty/empty';
import { PokedexComponent } from './pokedex/pokedex.component';
import { CreateTaskComponent } from './todo-list/create-task/create-task.component';
import { ListTasksComponent } from './todo-list/list-tasks/list-tasks.component';
import { EditTaskComponent } from './todo-list/edit-task/edit-task.component';

export default [
    { path: 'empty', component: Empty },
    { path: 'pokedex', component: PokedexComponent },
    { path: 'tasks/create-task', component: CreateTaskComponent },
    { path: 'tasks/edit-task/:id', component: EditTaskComponent },
    { path: 'tasks/list-tasks', component: ListTasksComponent },
] as Routes;
