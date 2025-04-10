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
import { Router } from '@angular/router';

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
  private tasksOriginal!: ListTasksModel[];
  public tasks!: ListTasksModel[];
  public selectedTasks!: ListTasksModel[];

  constructor(
    private todoListState: TodoListStateService,
    private confirmationService: ConfirmationService,
    private msnToast: MessageService,
    private dialogService: DialogService,
    private router: Router
  ) {}

  ngOnInit() {
    this.todoListState.listTasksState$.subscribe((values) => {
      // Ordenação por Prioridade e Status (Descrescente)
      const listOrderByPriorityAndStatus = values.sort((a, b) => {
        if(b.idPriority === a.idPriority) {
          return a.idStatus - b.idStatus;
        }
        return b.idPriority - a.idPriority;
      });
      this.tasksOriginal = listOrderByPriorityAndStatus;
      this.tasks = this.tasksOriginal;
    });

    this.filterTasks();

  }

  getStatus(idStatus: number, typeReturn: string): string | undefined {
    if(typeReturn === 'icon') {
      switch(idStatus) {
        case 1:
          return 'pi pi-flag';
        case 2:
          return 'pi pi-chart-line';
        case 3:
          return 'pi pi-check';
        default:
          return 'pi pi-folder';
      }
    } else if(typeReturn === 'severity') {
      switch(idStatus) {
        case 1:
          return "error";
        case 2:
          return "warn";
        case 3:
          return "success";
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

  editTask(id: number) {
    this.router.navigate(['pages/tasks/edit-task', id]);
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
        this.msnToast.add({ severity: 'warn', summary: 'Delete Confirmado', detail: 'Registro deletado com sucesso' });
      },
      reject: () => { },
    });
  }

  filterTasks() {
    this.todoListState.formFilterTaskState$.subscribe((values) => {

      this.selectedTasks = [];

      if(!values.nameTask && !values.idPriority && !values.idStatus) {
        this.tasks = [...this.tasksOriginal];
        return;
      } 

      this.tasks = this.tasksOriginal.filter(task => 
        (values.nameTask == null || task.name.toLowerCase().includes(values.nameTask.toLowerCase())) &&
        (values.idPriority == null || task.idPriority === values.idPriority) &&
        (values.idStatus == null || task.idStatus === values.idStatus)
      );
    });
  }

  onSelectedTasks(values: ListTasksModel[], idStatusOrAllDelete: number | string) {

    const msnArray = {
      message: '',
      header: '',
      icon: '',
      label: '',
      severity: '',
      msnToastSeverity: '',
      msnToastSummary: '',
      msnToastDetail: '',
    };
    
    if(Number(idStatusOrAllDelete)) {
      const nomeStatus = this.getStatus(Number(idStatusOrAllDelete), 'nameStatus');
      const icone = this.getStatus(Number(idStatusOrAllDelete), 'icon');
      let severity = this.getStatus(Number(idStatusOrAllDelete), 'severity');
      severity = severity === 'error' ? 'danger' : severity; // Não existe btn com severity error e sim danger!

      msnArray.message = "Deseja atualizar o status dos registros selecionados para '" + nomeStatus + "'?";
      msnArray.header = "Atualizar o status dos registros?";
      msnArray.icon = "" + icone;
      msnArray.label = "Atualizar registros";
      msnArray.severity = "" + severity;
      msnArray.msnToastSeverity = "info";
      msnArray.msnToastSummary = "Registros Atualizados",
      msnArray.msnToastDetail = "Os registros selecionados foram atualizados",

      this.onMsnConfirmedSelectedTasks(values, msnArray, 'updateStatus', Number(idStatusOrAllDelete));

    } else if(idStatusOrAllDelete === 'allDelete') {
      msnArray.message = "Deseja deletar todos os registros selecionados?";
      msnArray.header = "Deletar os registros?";
      msnArray.icon = "pi pi-trash";
      msnArray.label = "Deletar registros";
      msnArray.severity = "danger";
      msnArray.msnToastSeverity = "warn";
      msnArray.msnToastSummary = "Registros Deletados",
      msnArray.msnToastDetail = "Os registros selecionados foram deletados",

      this.onMsnConfirmedSelectedTasks(values, msnArray, 'deleteTasks');
      
    } else {
      this.msnToast.add({ severity: 'error', summary: 'Erro de Sistema', detail: 'Não foi possivel identificar sua execução' });
      return;
    }

  }

  onMsnConfirmedSelectedTasks(values: ListTasksModel[], msnArray: any, typeAction: string, idStatusUpdate?: number) {
    this.confirmationService.confirm({
      message: msnArray.message,
      header: msnArray.header,
      icon: msnArray.icon,
      rejectLabel: 'Cancel',
      rejectButtonProps: {
        label: 'Cancelar',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: msnArray.label,
        icon: msnArray.icon,
        severity: msnArray.severity,
      },
      accept: () => {
        if(typeAction === 'updateStatus') {
          this.todoListState.updateStatusTasks(values, Number(idStatusUpdate));
        } else if(typeAction === 'deleteTasks') {
          this.todoListState.deleteTaskSelected(values);
        } else {
          this.msnToast.add({ severity: 'error', summary: 'Erro de Sistema', detail: 'Não foi possivel identificar sua execução' });
          return;
        }

        this.msnToast.add({ 
          severity: msnArray.msnToastSeverity, 
          summary: msnArray.msnToastSummary, 
          detail: msnArray.msnToastDetail
        });

        this.selectedTasks = [];
      },
      reject: () => { },
    });
  }

}
