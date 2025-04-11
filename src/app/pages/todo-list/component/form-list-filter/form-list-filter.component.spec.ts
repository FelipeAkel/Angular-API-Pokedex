import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormListFilterComponent } from './form-list-filter.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';
import { mockFormListFilterInvalido, mockFormListFilterValido, mockFormListFilterVazio, mockPriority, mockStatus } from '../../../../mocks/todo-list.mock';

describe('FormListFilterComponent', () => {
  let component: FormListFilterComponent;
  let fixture: ComponentFixture<FormListFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormListFilterComponent,
        HttpClientTestingModule
      ],
      providers: [
        MessageService
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormListFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`(U) ao executar getListPriority(), deveria retornar os valores da API para popular a lista de Prioridade`, () => {
    spyOnProperty(component['todoListApiService'], 'getListPriority', 'get').and.returnValue(
      of(mockPriority)
    );

    component.getListPriority();

    expect(component.listPriority.length).toEqual(4);
    expect(component.listPriority).toEqual(mockPriority);
  });

  it(`(U) ao executar getListStatus(), deveria retornar os valores da API para popular a lista de Status`, () => {
    spyOnProperty(component['todoListApiService'], 'getListStatus', 'get').and.returnValue(
      of(mockStatus)
    );

    component.getListStatus();

    expect(component.listStatus.length).toEqual(3);
    expect(component.listStatus).toEqual(mockStatus);
  });

  it(`(U) ao executar getErrorMessage()a, deveria apresentar mensagem de erro`, () => {
    const mockField = 'nameTask';
    const mockLabelName = 'Nome da tarefa';
    const mockErrorMenssaage = 'O campo Nome da tarefa é obrigatório.';

    component.formFilterTask.get(mockField)?.setErrors({required: true});

    const errorMessage = component.getErrorMessage(mockField, mockLabelName);

    expect(errorMessage).toBe(mockErrorMenssaage);
  });

  it(`(U) ao executar onSubmitFilterTask(), com o fomrulário vazio`, () => {
    component.onSubmitFilterTask(mockFormListFilterVazio);
    expect(component.formFilterTaskEmpty).toBeTruthy();
  });

  it(`(U) ao executar onSubmitFilterTask(), com formulário inválido`, () => {
    spyOn(component['formFilterTask'], 'markAllAsTouched');

    component.formFilterTask.patchValue(mockFormListFilterInvalido);
    component.onSubmitFilterTask(mockFormListFilterInvalido);

    expect(component.formFilterTaskEmpty).toBeFalsy();
    expect(component.formFilterTask.invalid).toBeTruthy();
    expect(component.formFilterTask.markAllAsTouched).toHaveBeenCalled();
  });

  it(`(U) ao executar onSubmitFilterTask(), com o fomrulário válido`, () => {
    spyOn(component['todoListStateService'], 'setFormFilterTask');
    spyOn(component['msnToast'], 'add');

    component.onSubmitFilterTask(mockFormListFilterValido);

    expect(component.formFilterTaskEmpty).toBeFalsy();
    expect(component['todoListStateService'].setFormFilterTask).toHaveBeenCalledWith(mockFormListFilterValido);
    expect(component['msnToast'].add).toHaveBeenCalledWith({ severity: 'info', summary: 'Filtro Aplicado', detail: 'Lista de tarefas filtrada' });
  });

  it(`(U) ao executar onClear()`, () => {
    spyOn(component['formFilterTask'], 'reset');
    spyOn(component['todoListStateService'], 'resetFormFilterTask');

    component.onClear();

    expect(component.formFilterTask.reset).toHaveBeenCalled();
    expect(component['todoListStateService'].resetFormFilterTask).toHaveBeenCalled();
    expect(component.formFilterTaskEmpty).toBeFalsy();
  });

});
