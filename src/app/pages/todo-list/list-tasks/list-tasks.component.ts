import { Component } from '@angular/core';
import { Breadcrumb } from 'primeng/breadcrumb';
import { FormListFilterComponent } from "../component/form-list-filter/form-list-filter.component";
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-list-tasks',
  imports: [
    Breadcrumb, 
    FormListFilterComponent,
    TableModule, 
    FormsModule, 
    CommonModule,
    ButtonModule,
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

  products!: any[];

  selectedProducts!: any;

  public data = [
        {
          id: '1000',
          code: 'f230fh0g3',
          name: 'Bamboo Watch AAA',
          description: 'Product Description',
          image: 'bamboo-watch.jpg',
          price: 65,
          category: 'Accessories',
          quantity: 24,
          inventoryStatus: 'INSTOCK',
          rating: 5
        },
        {
          id: '1050',
          code: 'f230fh050',
          name: 'Bamboo Watch BB',
          description: 'Product Description',
          image: 'bamboo-watch.jpg',
          price: 65,
          category: 'Accessories SSS',
          quantity: 5,
          inventoryStatus: 'INSTOCK',
          rating: 5
        },
      ];

  constructor(
    // private productService: ProductService
  ) {}

  ngOnInit() {
      // this.productService.getProductsMini().then((data) => {
          this.products = this.data;
      // });
  }

}
