import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DependencieTaksModel, ListTasksModel } from '../../../../model/todo-list-model';
import { ListTasksComponent } from '../../list-tasks/list-tasks.component';
import { Message } from 'primeng/message';
import { TodoListStateService } from '../../../../services/todo-list/todo-list-state.service';


@Component({
  selector: 'app-details-task',
  imports: [
    CommonModule,
    Message
  ],
  templateUrl: './details-task.component.html',
  styleUrl: './details-task.component.scss'
})
export class DetailsTaskComponent implements OnInit {

  public detailsTask: ListTasksModel;
  public dependencieTaks: DependencieTaksModel;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    public listTasksComponent: ListTasksComponent,
    public todoListStateService: TodoListStateService,
  ) {
    this.detailsTask = config.data.registerTask;
    this.dependencieTaks = {
      id: undefined,
      name: '',
    };
  }

  ngOnInit(): void {
    
    if(this.detailsTask.yesIdTaskDependencie != undefined && this.detailsTask.yesIdTaskDependencie > 0){
      const task = this.todoListStateService.getTaskId(this.detailsTask.yesIdTaskDependencie);
      if (task) {
        this.dependencieTaks = {
          id: task.id,
          name: task.name,
        };
      }
    }

  }

}
