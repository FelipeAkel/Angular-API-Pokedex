import { Component } from '@angular/core';
import { Breadcrumb } from 'primeng/breadcrumb';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { ImageCompareModule } from 'primeng/imagecompare';

@Component({
  selector: 'app-unit-tests',
  imports: [
    Breadcrumb,
    ImageCompareModule,
    CardModule,
    DividerModule
  ],
  templateUrl: './unit-tests.component.html',
  styleUrl: './unit-tests.component.scss'
})
export class UnitTestsComponent {

  public breadcrumbItems = [
    { 
      label: 'Páginas', 
    },
    {
      icon: 'pi pi-fw pi-address-book', label: 'Testes Unitários',
    }
  ];

}
