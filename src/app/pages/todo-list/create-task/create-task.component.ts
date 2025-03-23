import { Component } from '@angular/core';
import { Breadcrumb } from 'primeng/breadcrumb';
import { FormCreateEditTaskComponent } from "../component/form-create-edit-task/form-create-edit-task.component";
import { Divider } from 'primeng/divider';

@Component({
  selector: 'app-create-task',
  imports: [Breadcrumb, FormCreateEditTaskComponent, Divider],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.scss'
})
export class CreateTaskComponent {

  public breadcrumbItems = [
    { 
      label: 'Páginas', 
    },
    {
      icon: 'pi pi-fw pi-address-book', label: 'Tarefas',
    },
    {
      icon: 'pi pi-fw pi-plus', label: 'Cadastrar Tarefa',
    }
  ];

}
