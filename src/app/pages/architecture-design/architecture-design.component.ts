import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TreeNode } from 'primeng/api';
import { Breadcrumb } from 'primeng/breadcrumb';
import { TreeTableModule } from 'primeng/treetable';
import { ButtonModule } from 'primeng/button';

import { mockArchitectureDesign } from '../../mocks/architecture-design.mock';
import { ArchitectureDesignerApiService } from '../../services/architecture-designer/architecture-designer-api.service';

@Component({
  selector: 'app-architecture-design',
  imports: [
    CommonModule,
    Breadcrumb,
    TreeTableModule,
    ButtonModule,
  ],
  standalone: true,
  templateUrl: './architecture-design.component.html',
  styleUrl: './architecture-design.component.scss'
})
export class ArchitectureDesignComponent implements OnInit {
  
  public breadcrumbItems = [
    {
      label: 'Páginas', 
    },
    {
      icon: 'pi pi-fw pi-share-alt', label: 'Arquitetura do Projeto',
    }
  ];
  
  public dataArchitectureDesign?: TreeNode[];

  constructor(
    private architectureService: ArchitectureDesignerApiService
  ) { }

  ngOnInit(): void {
    this.architectureService.getListArchitecture.subscribe((values) => {
      this.dataArchitectureDesign = mockArchitectureDesign;
    });
  }

  getIconClass(value: string): string {
    switch(value){
      case 'pi pi-spin pi-spinner-dotted':
        return 'json-yellon';
      case 'pi pi-fw pi-file-check':
        return 'file-check-orange';
      case 'pi pi-fw pi-file':
        return 'file-blue';
      case 'pi pi-fw pi-code':
        return 'code-orange';
      case 'pi pi-fw pi-sparkles':
        return 'sparkles-pink';
      case 'pi pi-fw pi-folder':
        return 'folder-gray';
      case 'pi pi-fw pi-folder-open':
        return 'folder-open-primary-color';
      default:
        return 'icon-default';
    }
  }

}
