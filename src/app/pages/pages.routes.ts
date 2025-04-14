import { Routes } from '@angular/router';
import { Notfound } from './notfound/notfound';
import { PokedexComponent } from './pokedex/pokedex.component';
import { CreateTaskComponent } from './todo-list/create-task/create-task.component';
import { ListTasksComponent } from './todo-list/list-tasks/list-tasks.component';
import { EditTaskComponent } from './todo-list/edit-task/edit-task.component';
import { UnitTestsComponent } from './unit-tests/unit-tests.component';

export default [
    { path: 'notfound', component: Notfound },
    { path: 'pokedex', component: PokedexComponent },
    { path: 'tasks/create-task', component: CreateTaskComponent },
    { path: 'tasks/edit-task/:id', component: EditTaskComponent },
    { path: 'tasks/list-tasks', component: ListTasksComponent },
    { path: 'unit-tests', component: UnitTestsComponent },
] as Routes;
