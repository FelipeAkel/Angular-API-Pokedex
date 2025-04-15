import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { Breadcrumb } from 'primeng/breadcrumb';
import { Tree } from 'primeng/tree';
import { TreeTableModule } from 'primeng/treetable';

import { CommonModule } from '@angular/common';

import { mockArchitectureDesign } from '../../mocks/architecture-design.mock';
import { ButtonModule } from 'primeng/button';


@Component({
  selector: 'app-architecture-design',
  imports: [
    CommonModule,
    Breadcrumb,
    Tree,
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

  ngOnInit(): void {
    this.dataArchitectureDesign = mockArchitectureDesign;
  }

}
