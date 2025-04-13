import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { ListTasksComponent } from './list-tasks.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BehaviorSubject, of } from 'rxjs';
import { mockFormListFilterValido, mockFormListFilterVazio, mockListTasks, mockMsnArray, mockMsnArrayDeleteTask, mockMsnArrayUpdateTask, mockStatus } from '../../../mocks/todo-list.mock';
import { PriorityEnum, StatusEnum } from '../../../enum/todo-list.enum';
import { DetailsTaskComponent } from '../component/details-task/details-task.component';

describe('ListTasksComponent', () => {
  let component: ListTasksComponent;
  let fixture: ComponentFixture<ListTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ListTasksComponent,
        HttpClientTestingModule,
        NoopAnimationsModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`(U) ao executar ngOnInit(), deverá ordenar a lista por ordem de Prioridade e Status`, () => {
    spyOn(component, 'filterTasks');

    const mockSubject = new BehaviorSubject(mockListTasks);
    component['todoListState'].listTasksState$ = mockSubject.asObservable();

    component.ngOnInit();
  
    expect(component.tasks.length).toEqual(10);
    expect(component.tasksOriginal).toEqual(mockListTasks);
    expect(component.tasks).toEqual(mockListTasks);
    expect(component.filterTasks).toHaveBeenCalled();
  });
  
  it(`(U) ao executar getStatus(), com o typeReturn com valor inexistente`, () => {
    const returnValue = component.getStatus(1, 'valor_inexistente');
    expect(returnValue).toBeUndefined();
  });
  
  it(`(U) ao executar getStatus(), para retornar o icon`, () => {
    const case1 = component.getStatus(1, 'icon');
    const case2 = component.getStatus(2, 'icon');
    const case3 = component.getStatus(3, 'icon');
    const caseDefault = component.getStatus(99, 'icon');
    expect(case1).toEqual('pi pi-flag');
    expect(case2).toEqual('pi pi-chart-line');
    expect(case3).toEqual('pi pi-check');
    expect(caseDefault).toEqual('pi pi-folder');
  });

  it(`(U) ao executar getStatus(), para retornar a severity`, () => {
    const case1 = component.getStatus(1, 'severity');
    const case2 = component.getStatus(2, 'severity');
    const case3 = component.getStatus(3, 'severity');
    const caseDefault = component.getStatus(99, 'severity');
    expect(case1).toEqual('error');
    expect(case2).toEqual('warn');
    expect(case3).toEqual('success');
    expect(caseDefault).toEqual('secondary');
  });

  it(`(U) ao executar getStatus(), para retornar o nameStatus`, () => {
    const case1 = component.getStatus(1, 'nameStatus');
    const case2 = component.getStatus(2, 'nameStatus');
    const case3 = component.getStatus(3, 'nameStatus');
    const caseDefault = component.getStatus(99, 'nameStatus');
    expect(case1).toEqual(StatusEnum[1]);
    expect(case2).toEqual(StatusEnum[2]);
    expect(case3).toEqual(StatusEnum[3]);
    expect(caseDefault).toEqual('Status Não Registrado');
  });

  it(`(U) ao executar getPriority(), com o typeReturn com valor inexistente`, () => {
    const returnValue = component.getPriority(1, 'valor_inexistente');
    expect(returnValue).toBeUndefined();
  });

  it(`(U) ao executar getPriority(), para retornar a cor da fonte`, () => { 
    const case1 = component.getPriority(1, 'font-color');
    const case2 = component.getPriority(2, 'font-color');
    const case3 = component.getPriority(3, 'font-color');
    const case4 = component.getPriority(4, 'font-color');
    const caseDefault = component.getPriority(99, 'font-color');

    expect(case1).toEqual('text-pink-200 hover:text-pink-300 font-bold');
    expect(case2).toEqual('text-pink-400 hover:text-pink-500 font-bold');
    expect(case3).toEqual('text-pink-600 hover:text-pink-700 font-bold');
    expect(case4).toEqual('text-pink-800 hover:text-pink-900 font-bold');
    expect(caseDefault).toEqual('text-primary-500 hover:text-primary-700 font-bold');
  });

  it(`(U) ao executar getPriority(), para retornar o nome da prioridade`, () => {
    const case1 = component.getPriority(1, 'namePriority');
    const case2 = component.getPriority(2, 'namePriority');
    const case3 = component.getPriority(3, 'namePriority');
    const case4 = component.getPriority(4, 'namePriority');
    const caseDefault = component.getPriority(99, 'namePriority');

    expect(case1).toEqual(PriorityEnum[1]);
    expect(case2).toEqual(PriorityEnum[2]);
    expect(case3).toEqual(PriorityEnum[3]);
    expect(case4).toEqual(PriorityEnum[4]);
    expect(caseDefault).toEqual('Prioridade Não Registrada');
  });

  it(`(U) ao executar calculateDaysUntil() com valor undefined`, () => {
    const returnValue = component.calculateDaysUntil(undefined);
    expect(returnValue).toEqual('');
  });

  it(`(U) ao executar calculateDaysUntil() com datas corretas`, () => {
    const mockToday = new Date('2025-04-11T03:00:00.000Z');

    jasmine.clock().install();  // Instala o mock do relógio
    jasmine.clock().mockDate(mockToday); // Define a data fixa

    const FaltamDias = component.calculateDaysUntil('2025-07-15T03:00:00.000Z');
    const passaramDias = component.calculateDaysUntil('2025-04-01T03:00:00.000Z');
    const hoje = component.calculateDaysUntil('2025-04-11T03:00:00.000Z');

    expect(FaltamDias).toEqual('Faltam 95 dias');
    expect(passaramDias).toEqual('Passaram 10 dias');
    expect(hoje).toEqual('É hoje!');

    jasmine.clock().uninstall();  // Libera o mock do relógio
  });

  it(`(U) ao executar detailsTask(), deveria abrir um modal`, () => {
    spyOn(component['dialogService'], 'open');

    const mockSubject = new BehaviorSubject(mockListTasks);
    component['todoListState'].listTasksState$ = mockSubject.asObservable();

    component.ngOnInit();
    component.detailsTask(mockListTasks[1].id);

    const registerTask = component.tasks.find( f => f.id === mockListTasks[1].id );

    expect(component['dialogService'].open).toHaveBeenCalledWith(
      DetailsTaskComponent,
      {
        data: { registerTask },
        header: 'Detalhes da Tarefa',
        width: '60%',
        height: '80%',
        closable: true,                     // Icone fechar modal
        modal: true,                        // Background mais escuro
        dismissableMask: true,              // Clicar fora do modal fecha o dialog
        maskStyleClass: 'backdrop-blur-sm', // Background esfumaçado 
      }
    );
  });
  
  it(`(U) ao executar editTask() deveria mudar de página`, () => {
    spyOn(component['router'], 'navigate');
    component.editTask(1743619313717);
    expect(component['router'].navigate).toHaveBeenCalledWith(['pages/tasks/edit-task', 1743619313717]);
  });
  
  it(`(U) ao executar deleteTask() deveria deletar o registro`, () => {
    const confirmSpy = spyOn(component['confirmationService'], 'confirm').and.callThrough(); // Simulando o click de confirmação do confirmationService
    spyOn(component['todoListState'], 'deleteTaskState');
    spyOn(component['msnToast'], 'add');

    component.deleteTask(mockListTasks[1].id);

    confirmSpy.calls.first().args[0].accept?.(); // Clicke de confirmação
    confirmSpy.calls.first().args[0].reject?.(); // Clique de cancelar

    expect(component['confirmationService'].confirm).toHaveBeenCalled();
    expect(component['todoListState'].deleteTaskState).toHaveBeenCalledWith(mockListTasks[1].id);
    expect(component['msnToast'].add).toHaveBeenCalledWith({ severity: 'warn', summary: 'Delete Confirmado', detail: 'Registro deletado com sucesso' });
  });

  it(`(U) ao executar filterTasks() com os filtros vazios`, () => {
    const mockSubject = new BehaviorSubject(mockFormListFilterVazio);
    component['todoListState'].formFilterTaskState$ = mockSubject.asObservable();

    component.tasksOriginal = mockListTasks;
    component.filterTasks();    

    expect(component.selectedTasks.length).toEqual(0);
    expect(component.tasks.length).toEqual(10);
    expect(component.tasks).toEqual(mockListTasks);
  });

  it(`(U) ao executar filterTasks() deveria filtrar a lista de tarefas de acordo com os filtros selecionados`, () => {
    const mockSubject = new BehaviorSubject(mockFormListFilterValido);
    component['todoListState'].formFilterTaskState$ = mockSubject.asObservable();

    component.tasksOriginal = mockListTasks;
    component.filterTasks();    

    expect(component.selectedTasks.length).toEqual(0);
    expect(component.tasks.length).toEqual(1);
    expect(component.tasks[0]).toEqual(mockListTasks[1]);
  });

  it(`(U) ao executar onSelectedTasks(), com valor inexistente de idStatusOrAllDelete`, () => {
    spyOn(component['msnToast'], 'add');

    const values = mockListTasks.filter( f => f.idStatus === 2);
    component.onSelectedTasks(values, 'Valor_inexistente');

    expect(component['msnToast'].add).toHaveBeenCalledWith({ severity: 'error', summary: 'Erro de Sistema', detail: 'Não foi possivel identificar sua execução' });
  });
  
  it(`(U) ao executar onSelectedTasks(), com objetivo de atualizar o status dos registros selecionados`, () => {
    spyOn(component, 'onMsnConfirmedSelectedTasks');

    const values = mockListTasks.filter( f => f.idStatus === 2);
    let idStatusOrAllDelete = 1;

    component.onSelectedTasks(values, idStatusOrAllDelete);
    // Executado duas vezes para verifica a condicional: severity = severity === 'error' ? 'danger' : severity;
    idStatusOrAllDelete = 3;
    component.onSelectedTasks(values, idStatusOrAllDelete);

    let msnArray = mockMsnArray;
    const nomeStatus = component.getStatus(Number(idStatusOrAllDelete), 'nameStatus');
    const icone = component.getStatus(Number(idStatusOrAllDelete), 'icon');
    let severity = component.getStatus(Number(idStatusOrAllDelete), 'severity');
    severity = severity === 'error' ? 'danger' : severity; // Não existe btn com severity error e sim danger!

    msnArray = {
      ...mockMsnArrayUpdateTask,
      message: "Deseja atualizar o status dos registros selecionados para '" + nomeStatus + "'?",
      icon: "" + icone,
      severity: "" + severity,
    };

    expect(component.onMsnConfirmedSelectedTasks).toHaveBeenCalledWith(values, msnArray, 'updateStatus', Number(idStatusOrAllDelete));
  });

  it(`(U) ao executar onSelectedTasks(), com objetivo de deletar os registros selecionados`, () => {
    spyOn(component, 'onMsnConfirmedSelectedTasks');

    const values = mockListTasks.filter( f => f.id === 2 );
    const idStatusOrAllDelete = 'allDelete';
    const msnArray = mockMsnArrayDeleteTask;
    
    component.onSelectedTasks(values, idStatusOrAllDelete);

    expect(component.onMsnConfirmedSelectedTasks).toHaveBeenCalledWith(values, msnArray, 'deleteTasks');
  });

  it(`(U) ao executar onMsnConfirmedSelectedTasks() com typeAction com valor inválido`, () => {
    const values = mockListTasks.filter(f => f.id === 2);
    const msnArray = mockMsnArrayDeleteTask;
    const typeAction = 'valor_invalido';
    const confirmSpy = spyOn(component['confirmationService'], 'confirm').and.callThrough();

    spyOn(component['msnToast'], 'add');

    component.onMsnConfirmedSelectedTasks(values, msnArray, typeAction);

    confirmSpy.calls.first().args[0].accept?.();
    confirmSpy.calls.first().args[0].reject?.();

    expect(component['msnToast'].add).toHaveBeenCalledWith({ severity: 'error', summary: 'Erro de Sistema', detail: 'Não foi possivel identificar sua execução' });
  });

  it(`(U) ao executar onMsnConfirmedSelectedTasks() confirmando a ação de deletar registros`, () => {
    const values = mockListTasks.filter(f => f.id === 2);
    const msnArray = mockMsnArrayDeleteTask;
    const typeAction = 'deleteTasks';
    const confirmSpy = spyOn(component['confirmationService'], 'confirm').and.callThrough();

    spyOn(component['msnToast'], 'add');
    spyOn(component['todoListState'], 'deleteTaskSelected');

    component.onMsnConfirmedSelectedTasks(values, msnArray, typeAction);

    confirmSpy.calls.first().args[0].accept?.();

    expect(component['todoListState'].deleteTaskSelected).toHaveBeenCalledWith(values);
    expect(component['msnToast'].add).toHaveBeenCalledWith({ 
      severity: mockMsnArrayDeleteTask.msnToastSeverity, 
      summary: mockMsnArrayDeleteTask.msnToastSummary, 
      detail: mockMsnArrayDeleteTask.msnToastDetail }
    );
    expect(component.selectedTasks.length).toEqual(0);
  });
  
  it(`(U) ao executar onMsnConfirmedSelectedTasks() confirmando a ação de alterar status`, () => {
    const values = mockListTasks.filter(f => f.id === 2);
    const typeAction = 'updateStatus';
    const idStatusUpdate = mockStatus[2].id;
    const confirmSpy = spyOn(component['confirmationService'], 'confirm').and.callThrough();
    let msnArray = mockMsnArray;
    msnArray = {
      ...mockMsnArrayUpdateTask,
      message: "Deseja atualizar o status dos registros selecionados para Concluída?",
      icon: "pi pi-check",
      severity: "success",
    };

    spyOn(component['todoListState'], 'updateStatusTasks');
    spyOn(component['msnToast'], 'add');

    component.onMsnConfirmedSelectedTasks(values, msnArray, typeAction, idStatusUpdate);
    
    confirmSpy.calls.first().args[0].accept?.();

    expect(component['todoListState'].updateStatusTasks).toHaveBeenCalledWith(values, Number(idStatusUpdate));
    expect(component['msnToast'].add).toHaveBeenCalledWith({
      severity: msnArray.msnToastSeverity, 
      summary: msnArray.msnToastSummary, 
      detail: msnArray.msnToastDetail
    });
    expect(component.selectedTasks.length).toEqual(0);
  });

  it(`(U) ao executar createMassOfData(), para criar uma massa de dados de tarefas`, fakeAsync(() => {
    spyOn(component['todoListState'], 'setMassOfData');
    spyOn(component['msnToast'], 'add');
    
    component.createMassOfData();
    
    expect(component.loading).toBeTrue();
    tick(1000); // Simula a passagem do tempo do setTimeout
    expect(component.loading).toBeFalse();
    expect(component['todoListState'].setMassOfData).toHaveBeenCalled();
    expect(component['msnToast'].add).toHaveBeenCalledWith({ severity: 'success', summary: 'Tarefas Criadas', detail: 'Massa de dados criadas com sucesso' });
  }));
  
});
