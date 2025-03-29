import { Component } from '@angular/core';
import { Breadcrumb } from 'primeng/breadcrumb';
import { FormListFilterComponent } from "../component/form-list-filter/form-list-filter.component";
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TasksModel } from '../../../model/todo-list-model';

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
  public tasks!: TasksModel[];
  public selectedTasks!: any;
  public data = [
    {
      id: 1,
      code: 'abc123',
      name: 'Criar Formulário',
      priority: 'Média',
      status: 'Em Andamento',
      dtExpiration: '28/03/2025',
      responsibleUser: 'Felipe Akel Carvalho Florentino',
      dependencie: false,
      yesTaskDependencie: undefined,
      description: 'Descrição criar formulário'
    },
    {
      id: 2,
      code: 'ddd456',
      name: 'Editar Formulário',
      priority: 'Alta',
      status: 'Pendente',
      dtExpiration: '05/04/2025',
      responsibleUser: 'Ciclano da Silva',
      dependencie: true,
      yesTaskDependencie: 'abc123',
      description: 'Descrição editar formulário'
    },
  ];

  constructor(
    // private productService: ProductService
  ) {}

  ngOnInit() {
      // this.productService.getProductsMini().then((data) => {
          this.tasks = this.data;
      // });
  }

}
