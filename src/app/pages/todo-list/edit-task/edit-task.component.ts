import { Component, OnInit } from '@angular/core';
import { Breadcrumb } from 'primeng/breadcrumb';
import { FormCreateEditTaskComponent } from "../component/form-create-edit-task/form-create-edit-task.component";
import { Divider } from 'primeng/divider';
import { ActivatedRoute } from '@angular/router';
import { ListTasksModel } from '../../../model/todo-list-model';
import { TodoListStateService } from '../../../services/todo-list/todo-list-state.service';

@Component({
  selector: 'app-edit-task',
  imports: [Breadcrumb, FormCreateEditTaskComponent, Divider],
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.scss'
})
export class EditTaskComponent implements OnInit {

  public breadcrumbItems = [
    { 
      label: 'Páginas', 
    },
    {
      icon: 'pi pi-fw pi-address-book', label: 'Tarefas',
    },
    {
      icon: 'pi pi-fw pi-file-edit', label: 'Editar Tarefa',
    }
  ];
  public taskId: number | null = null; 
  public selectedEditTasks!: ListTasksModel;

  constructor(
    private route: ActivatedRoute,
    private todoListState: TodoListStateService,
  ) {}

  ngOnInit(): void {
    this.taskId = Number(this.route.snapshot.paramMap.get('id'));
    this.selectedEditTasks = this.todoListState.getTaskId(this.taskId);    
  }

}
