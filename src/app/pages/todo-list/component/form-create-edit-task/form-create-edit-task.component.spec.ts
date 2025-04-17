import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCreateEditTaskComponent } from './form-create-edit-task.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { mockFormCreateEditInvalido, mockFormCreateEditValido, mockListTasks, mockPriority, mockStatus } from '../../../../mocks/todo-list.mock';
import { ListTasksModel } from '../../../../model/todo-list-model';
import { Validators } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('FormCreateEditTaskComponent', () => {
  let component: FormCreateEditTaskComponent;
  let fixture: ComponentFixture<FormCreateEditTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormCreateEditTaskComponent,
        HttpClientTestingModule,
        NoopAnimationsModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormCreateEditTaskComponent);
    component = fixture.componentInstance;

    component.selectedEditTasks = mockListTasks[0] as ListTasksModel;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`(U) ao executar getListPriority(), deveria retornar os dados da API para popular a lista de Prioridade`, () => {
    spyOnProperty(component['todoListApiService'], 'getListPriority', 'get').and.returnValue(
      of(mockPriority)
    );

    component.getListPriority();

    expect(component.listPriority.length).toEqual(4);
    expect(component.listPriority).toEqual(mockPriority);
  });

  it(`(U) ao executar getListStatus(), deveria retornar os dados da API para popular a lista de Status`, () => {
    spyOnProperty(component['todoListApiService'], 'getListStatus', 'get').and.returnValue(
      of(mockStatus)
    );

    component.getListStatus();

    expect(component.listStatus.length).toEqual(3);
    expect(component.listStatus).toEqual(mockStatus);
  });

  it(`(U) ao executar getErrorMessage(), deveria retornar as mensagem de erro`, () => {
    const mockField = 'name';
    const mockLabelInput = 'Nome da tarefa';
    const mockMensagemErro = 'O campo Nome da tarefa é obrigatório.';

    component.formTask.get(mockField)?.setErrors({required: true});

    const msnRetornoErro = component.getErrorMessage(mockField, mockLabelInput);

    expect(msnRetornoErro).toBe(mockMensagemErro);
  });

  it(`(U) ao executar onSubmitFormTaskCreate(), com formulário inválido`, () => {
    spyOn(component['formTask'], 'markAllAsTouched');

    component.formTask.patchValue(
      mockFormCreateEditInvalido
    );

    component.onSubmitFormTaskCreate(mockFormCreateEditInvalido);

    expect(component.formTask.invalid).toBeTruthy();
    expect(component.formTask.markAllAsTouched).toHaveBeenCalled();
  });
  
  it(`(U) ao executar onSubmitFormTaskCreate(), com o formulário válido`, () => {
    spyOn(component['todoListState'], 'setListTasksState');
    spyOn(component['formTask'], 'reset');
    spyOn(component['msnToast'], 'add');
    spyOn(component, 'onListTasks');
    
    component.formTask.patchValue(mockFormCreateEditValido);
    component.onSubmitFormTaskCreate(mockFormCreateEditValido)
    
    expect(component.formTask.valid).toBeTruthy();
    expect(component['todoListState'].setListTasksState).toHaveBeenCalledWith(mockFormCreateEditValido);
    expect(component.formTask.reset).toHaveBeenCalled();
    expect(component['msnToast'].add).toHaveBeenCalledWith({ severity: 'success', summary: 'Tarefa Cadastrada', detail: 'Registro de tarefa foi cadastrado.', life: 4000 })
    expect(component.onListTasks).toHaveBeenCalled();    
  });

  it(`(U) ao ewxecutar onSubmitFormTaskEdit(), com o formulário inválido`, () => {
    spyOn(component['formTask'], 'markAllAsTouched');

    component.formTask.patchValue(mockFormCreateEditInvalido);
    component.onSubmitFormTaskEdit(mockFormCreateEditInvalido);

    expect(component.formTask.invalid).toBeTruthy();
    expect(component.formTask.markAllAsTouched).toHaveBeenCalled();
  });
  
  it(`(U) ao executar onSubmitFormTaskEdit(), com o formulário válido`, () => {
    spyOn(component['todoListState'], 'updateTaskState');
    spyOn(component['msnToast'], 'add');

    component.formTask.patchValue(mockFormCreateEditValido);
    component.onSubmitFormTaskEdit(mockFormCreateEditValido);
    
    expect(component.formTask.valid).toBeTruthy();
    expect(component['todoListState'].updateTaskState).toHaveBeenCalledWith( component.selectedEditTasks.id, mockFormCreateEditValido);
    expect(component['msnToast'].add).toHaveBeenCalledWith({ severity: 'success', summary: 'Tarefa Atualizada', detail: "Registro de tarefa foi atualizado.", life: 4000 });
  });

  it(`(U) deveria definir no dtExpiration o valor undefined quando dtExpiration não estiver presente em selectedEditTasks`, () => {
    component.selectedEditTasks = mockListTasks[9] as ListTasksModel;
    component.ngOnInit();
    expect(component.dtExpiration).toBeUndefined();
  });

  it(`(U) ao executar onCLear()`, () => {
    spyOn(component['formTask'], 'reset');
    component.onClear();
    expect(component.formTask.reset).toHaveBeenCalled();
  });

  it(`(U) ao executar routePageListTasks()`, () => {
    spyOn(component['router'], 'navigate');
    
    component.routePageListTasks();
    
    expect(component.updateTask).toBeFalsy();
    expect(component['router'].navigate).toHaveBeenCalledWith(['pages/tasks/list-tasks']);
  });

  it(`(U) ao selecionar o dependencie para true o campo yesIdTaskDependencie se torna obrigatório`, () => {
    component.selectedEditTasks = mockListTasks[9] as ListTasksModel;
      
    component.ngOnInit();
    fixture.detectChanges();

    component.formTask.controls['dependencie'].setValue(true);
    component.formTask.controls['dependencie'].updateValueAndValidity();

    expect(component.formTask.get('yesIdTaskDependencie')?.hasValidator(Validators.required)).toBeTrue();
  });

});
