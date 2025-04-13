import { TestBed } from '@angular/core/testing';

import { TodoListStateService } from './todo-list-state.service';
import { mockFormCreateEditValido, mockFormListFilterValido, mockListTasks, mockStatus } from '../../mocks/todo-list.mock';

describe('TodoListStateService', () => {
  let service: TodoListStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoListStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(`(U) ao executar setListTasksState(), deveria cadastrar a tarefa na lista de tarefas`, (done) => {
    const newTask = mockFormCreateEditValido;

    service.setListTasksState(newTask);

    service.listTasksState$.subscribe( tasks => {
      expect(tasks.length).toEqual(1);
      expect(tasks[0].id).toBeTruthy();
      expect(tasks[0].idPriority).toEqual(4);
      expect(tasks[0].idStatus).toEqual(2);
      expect(tasks[0].dtExpiration).toEqual('2025-05-25T03:00:00.000Z');
      expect(tasks[0].responsibleUser).toEqual('Felipe Akel Carvalho Florentino');
      expect(tasks[0].dependencie).toEqual(false);
      expect(tasks[0].yesIdTaskDependencie).toEqual(undefined);
      expect(tasks[0].description).toEqual('Descrição da atividade de testes unitários com Jasmine do Angular');
      done();
    });
  });
  
  it(`(U) ao executar updateTaskState(), deveria atualizar a tarefa com os novos valores recebidos`, (done) => {
    (service as any).listTasksState.next(mockListTasks);

    const idTask = 1743619354614;
    const updateTask = {                            // Antigos valores abaixo:
      name: "API Rest - Update",                    // API Rest
      idPriority: 4,                                // 2
      idStatus: 3,                                  // 1
      dtExpiration: "2025-06-30T03:00:00.000Z",     // 2025-04-15T03:00:00.000Z
      responsibleUser: "Fulano da Silva - Update",  // Fulano da Silva
      dependencie: true,                            // false
      yesIdTaskDependencie: 1743619265209,          // undefined
      description: "API é muito bom - Update"       // API é muito bom.
    }

    service.updateTaskState(idTask, updateTask);

    service.listTasksState$.subscribe( tasks =>  {

      const taskFind = tasks.filter(f => f.id == idTask);

      expect(tasks.length).toEqual(10);
      expect(taskFind).toEqual([{
        id: idTask,
        ...updateTask
      }]);
      done();
    });
  });
  
  it(`(U) ao executar updateStatusTasks(), deveria alterar o status da lista array das tarefas recebidas`, (done) => {
    (service as any).listTasksState.next(mockListTasks);

    const values = mockListTasks.filter(f => f.idStatus === 1);
    const idStatusUpdate = mockStatus[2].id; // Concluída
    const antesUpdateTotalStatus = mockListTasks.filter(f => f.idStatus === idStatusUpdate);
    const totalEsperado = values.length + antesUpdateTotalStatus.length;
    
    service.updateStatusTasks(values, idStatusUpdate);
    
    service.listTasksState$.subscribe( tasks => {
      const depoisUpdateTotalStatus = tasks.filter(f => f.idStatus === idStatusUpdate);
      
      expect(depoisUpdateTotalStatus.length).toBe(
        totalEsperado, 
        `Esperado ${totalEsperado} tarefas com Status ${idStatusUpdate}, mas foi ${depoisUpdateTotalStatus.length}`
      );
      done();
    });

  });
  
  it(`(U) ao executar deleteTaskState(), deveria deletar a tarefa selecionada da lista`, (done) => {
    (service as any).listTasksState.next(mockListTasks);

    const idDelete = 1743619401452;
    const totalEsperado = mockListTasks.length - 1;

    service.deleteTaskState(idDelete);

    service.listTasksState$.subscribe( tasks => {
      const totalDepoisDoDelete = tasks.length;
      const taskFind = tasks.find(f => f.id === idDelete);      

      expect(totalDepoisDoDelete).toBe(totalEsperado, `Esperado o total de ${totalEsperado} na lista, mas foi ${totalDepoisDoDelete}`);
      expect(taskFind).toBeUndefined();
      done();
    });
  });

  it(`(U) ao executar deleteTaskSelected(), deveria deletar os registros de multiplas tarefas selecionadas da lista`, (done) => {
    (service as any).listTasksState.next(mockListTasks);

    const deleteTasks = mockListTasks.filter(f => f.idStatus === mockStatus[1].id);
    const registrosEsperados = mockListTasks.filter(f => f.idStatus !== mockStatus[1].id);

    service.deleteTaskSelected(deleteTasks);

    service.listTasksState$.subscribe( tasks => {
      const registrosRetornados = tasks;

      expect(registrosEsperados).toEqual(registrosRetornados, 
        `Esperado os registros ${registrosEsperados} na lista, mas foi retornado ${registrosRetornados}`
      );
      expect(registrosEsperados.length).toBe(registrosRetornados.length, 
        `O total de registros esperados deveria ser ${registrosEsperados.length}, mas foi retornado ${registrosRetornados.length}`
      );
      done();
    });
  });

  it(`(U) ao executar getTaskId(), deveria retornar os dados do registro selecionado`, () => {
    (service as any).listTasksState.next(mockListTasks);

    const idTaskSeleceted = mockListTasks[0].id;
    const dataTask = mockListTasks[0];
    const returnDataTask = service.getTaskId(idTaskSeleceted);

    expect(dataTask).toEqual(returnDataTask);
  });
  
  it(`(U) ao executar setFormFilterTask(), deveria armazenadar os dados do filtro de tarefa`, (done) => {
    const dataFilter = mockFormListFilterValido;
    
    service.setFormFilterTask(dataFilter);
    
    service.formFilterTaskState$.subscribe( valuesFilter => {
      expect(valuesFilter).toEqual(dataFilter);
      done();
    });
  });
  
  it(`(U) ao executar resetFormFilterTask(), deveria limpar os filtros armazenados de tarefa`, (done) => {
    (service as any).formFilterTaskState.next(mockFormListFilterValido);
    
    service.resetFormFilterTask();
    
    service.formFilterTaskState$.subscribe( values => {
      expect(values).toEqual({});
      done();
    });
  });
  
  it(`(U) ao executar setMassOfData(), deveria criar uma massa de dados de tarefa`, (done) => {
    service.setMassOfData();
    service.listTasksState$.subscribe( values => {
      expect(values.length).toBe(mockListTasks.length, `Deveria criar o total de ${mockListTasks.length} registros`);
      expect(values).toEqual(mockListTasks);
      done();
    });
  });
  
});
