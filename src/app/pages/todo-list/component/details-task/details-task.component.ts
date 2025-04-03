import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ListTasksModel } from '../../../../model/todo-list-model';
import { PriorityEnum, StatusEnum } from '../../../../enum/todo-list.enum';
import { ListTasksComponent } from '../../list-tasks/list-tasks.component';
import { Message } from 'primeng/message';


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
  // public dependencieNameTaks: string;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    public listTasksComponent: ListTasksComponent
  ) {
    this.detailsTask = config.data.registerTask;
    // this.dependencieNameTaks = '';
  }

  ngOnInit(): void {
    
  }

}
