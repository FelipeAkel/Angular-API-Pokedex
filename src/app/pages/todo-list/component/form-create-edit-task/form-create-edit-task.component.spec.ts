import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCreateEditTaskComponent } from './form-create-edit-task.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { mockFormCreateEditInvalido, mockFormCreateEditValido, mockPriority, mockStatus } from '../../../../mocks/todo-list.mock';

fdescribe('FormCreateEditTaskComponent', () => {
  let component: FormCreateEditTaskComponent;
  let fixture: ComponentFixture<FormCreateEditTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormCreateEditTaskComponent,
        HttpClientTestingModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormCreateEditTaskComponent);
    component = fixture.componentInstance;
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

});
