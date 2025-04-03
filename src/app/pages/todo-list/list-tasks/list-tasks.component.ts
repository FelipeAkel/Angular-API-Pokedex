import { Component } from '@angular/core';

import { Breadcrumb } from 'primeng/breadcrumb';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { Message } from 'primeng/message';
import { Tooltip } from 'primeng/tooltip';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { DialogService } from 'primeng/dynamicdialog';

import { FormListFilterComponent } from "../component/form-list-filter/form-list-filter.component";
import { ListTasksModel } from '../../../model/todo-list-model';
import { TodoListStateService } from '../../../services/todo-list/todo-list-state.service';
import { PriorityEnum, StatusEnum } from '../../../enum/todo-list.enum';
import { mockListTasks } from '../../../mocks/todo-list.mock';
import { DetailsTaskComponent } from '../component/details-task/details-task.component';

@Component({
  selector: 'app-list-tasks',
  imports: [
    FormListFilterComponent,
    Breadcrumb, 
    TableModule, 
    FormsModule, 
    CommonModule,
    ButtonModule,
    SplitButtonModule,
    Message,
    Tooltip,
    ToastModule,
    ConfirmDialog,
  ],
  providers: [
    ConfirmationService,
    MessageService,
    DialogService
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
  public tasks!: ListTasksModel[];
  public selectedTasks!: ListTasksModel[];

  constructor(
    private todoListState: TodoListStateService,
    private confirmationService: ConfirmationService,
    private msnToast: MessageService,
    private dialogService: DialogService,
  ) {}

  ngOnInit() {
    this.todoListState.listTasksState$.subscribe((values) => {
            // TODO Retirar o mockListTasks e colocar o values; 
      // Ordenação por Prioridade e Status (Descrescente)
      const listOrderByPriorityAndStatus = mockListTasks.sort((a, b) => {
        if(b.idPriority === a.idPriority) {
          return b.idStatus - a.idStatus;
        }
        return b.idPriority - a.idPriority;
      });
      this.tasks = listOrderByPriorityAndStatus;
    });
  }

  getStatus(idStatus: number, typeReturn: string): string | undefined {
    if(typeReturn === 'icon') {
      switch(idStatus) {
        case 1:
          return 'pi pi-check';
        case 2:
          return 'pi pi-chart-line';
        case 3:
          return 'pi pi-flag';
        default:
          return 'pi pi-folder';
      }
    } else if(typeReturn === 'severity') {
      switch(idStatus) {
        case 1:
          return "success";
        case 2:
          return "warn";
        case 3:
          return "error";
        default:
          return "secondary";
      }
    } else if(typeReturn === 'nameStatus') {
      return StatusEnum[idStatus] || 'Status Não Registrado';
    }
    return undefined;
  }

  getPriority(idPriority: number, typeReturn: string): string | undefined {
    if(typeReturn === 'font-color') {
      switch(idPriority) {
        case 1:
          return 'text-pink-200 hover:text-pink-300 font-bold';
        case 2:
          return 'text-pink-400 hover:text-pink-500 font-bold';
        case 3:
          return 'text-pink-600 hover:text-pink-700 font-bold';
        case 4:
          return 'text-pink-800 hover:text-pink-900 font-bold';
        default:
          return 'text-primary-500 hover:text-primary-700 font-bold';
      }
    } else if(typeReturn === 'namePriority') {
      return PriorityEnum[idPriority] || 'Prioridade Não Registrada';
    }
    return undefined;
  }

  calculateDaysUntil(dateString: string | undefined): string {
    if (!dateString) return '';

    const today = new Date();
    const targetDate = new Date(dateString);

    today.setHours(0, 0, 0, 0);
    targetDate.setHours(0, 0, 0, 0);

    const diffTime = targetDate.getTime() - today.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays > 0) {
      return `Faltam ${diffDays} dias`;
    } else if (diffDays < 0) {
      return `Passaram ${Math.abs(diffDays)} dias`;
    } else {
      return 'É hoje!';
    }
  }

  detailsTask(id: number) {
    const registerTask = this.tasks.find(f => f.id === id);
    this.dialogService.open(DetailsTaskComponent, {
      data: { registerTask },
      header: 'Detalhes da Tarefa',
      width: '60%',
      height: '80%',
      closable: true,                     // Icone fechar modal
      modal: true,                        // Background mais escuro
      dismissableMask: true,              // Clicar fora do modal fecha o dialog
      maskStyleClass: 'backdrop-blur-sm', // Background esfumaçado 
    });
    
  }

  deleteTask(id: number) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja deletar este registro?',
      header: 'Delete de Registro',
      icon: 'pi pi-info-circle',
      rejectLabel: 'Cancel',
      rejectButtonProps: {
          label: 'Cancelar',
          severity: 'secondary',
          outlined: true,
      },
      acceptButtonProps: {
          label: 'Deletar',
          severity: 'danger',
      },
      accept: () => {
        this.todoListState.deleteTaskState(id)
        this.msnToast.add({ severity: 'info', summary: 'Delete Confirmado', detail: 'Registro deletado com sucesso' });
      },
      reject: () => { },
  });
  }

}
