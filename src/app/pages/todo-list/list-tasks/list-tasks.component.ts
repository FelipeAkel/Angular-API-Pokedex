import { Component } from '@angular/core';
import { Breadcrumb } from 'primeng/breadcrumb';
import { FormListFilterComponent } from "../component/form-list-filter/form-list-filter.component";
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ListTasksModel } from '../../../model/todo-list-model';
import { TodoListStateService } from '../../../services/todo-list/todo-list-state.service';

@Component({
  selector: 'app-list-tasks',
  imports: [
    Breadcrumb, 
    FormListFilterComponent,
    TableModule, 
    FormsModule, 
    CommonModule,
    ButtonModule,
    SplitButtonModule,
  ],
  templateUrl: './list-tasks.component.html',
  styleUrl: './list-tasks.component.scss'
})
export class ListTasksComponent {

  public breadcrumbItems = [
    { 
      label: 'Páginas', 
    },
    {
      icon: 'pi pi-fw pi-address-book', label: 'Tarefas',
    },
    {
      icon: 'pi pi-fw pi-list', label: 'Listar Tarefas',
    }
  ];
  public tasks!: ListTasksModel[];
  public selectedTasks!: any;

  constructor(
    private todoListState: TodoListStateService
  ) {}

  ngOnInit() {
    this.todoListState.listTasksState$.subscribe((values) => {
      this.tasks = values;
    });
  }

}
