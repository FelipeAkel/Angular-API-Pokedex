import { Component } from '@angular/core';
import { Breadcrumb } from 'primeng/breadcrumb';
import { FormListFilterComponent } from "../component/form-list-filter/form-list-filter.component";
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { Message } from 'primeng/message';
import { ListTasksModel } from '../../../model/todo-list-model';
import { TodoListStateService } from '../../../services/todo-list/todo-list-state.service';
import { PriorityEnum, StatusEnum } from '../../../enum/status.enum';

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
    Message,
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

  getStatus(idStatus: number, typeReturn: string): string | undefined {
    if(typeReturn === 'icon'){
      switch(idStatus) {
        case 1:
          return 'pi pi-check';
        case 2:
          return 'pi pi-chart-line';
        case 3:
          return 'pi pi-flag';
        default:
          return 'pi pi-folder';
      }
    } else if(typeReturn === 'severity') {
      switch(idStatus) {
        case 1:
          return "success";
        case 2:
          return "warn";
        case 3:
          return "error";
        default:
          return "secondary";
      }
    } else if(typeReturn === 'value') {
      return StatusEnum[idStatus] || 'Status Não Registrado';
    }
    return undefined;
  }

  getPriority(idPriority: number, typeReturn: string): string | undefined {
    if(typeReturn === 'font-color'){
      switch(idPriority) {
        case 1:
          return 'text-purple-200 hover:text-purple-300';
        case 2:
          return 'text-purple-400 hover:text-purple-500';
        case 3:
          return 'text-purple-600 hover:text-purple-700';
        case 4:
          return 'text-purple-800 hover:text-purple-900';
        default:
          return 'text-primary-500 hover:text-primary-700';
      }
    } else if(typeReturn === 'value') {
      return PriorityEnum[idPriority] || 'Prioridade Não Registrada';
    }
    return undefined;
  }

}
