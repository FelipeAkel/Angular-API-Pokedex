import { Component } from '@angular/core';
import { Breadcrumb } from 'primeng/breadcrumb';
import { FormCreateEditTaskComponent } from "../component/form-create-edit-task/form-create-edit-task.component";
import { Divider } from 'primeng/divider';

@Component({
  selector: 'app-edit-task',
  imports: [Breadcrumb, FormCreateEditTaskComponent, Divider],
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.scss'
})
export class EditTaskComponent {

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

}
