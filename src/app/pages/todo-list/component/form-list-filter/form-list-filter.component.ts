import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { FormFilterTaskModel, FormSelectModel } from '../../../../model/todo-list-model';
import { TodoListApiService } from '../../../../services/todo-list/todo-list-api.service';
import { CommonModule } from '@angular/common';
import { FormValidationService } from '../../../../services/form-validation.service';
import { TodoListStateService } from '../../../../services/todo-list/todo-list-state.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-form-list-filter',
  imports: [
    CommonModule,
    ReactiveFormsModule, 
    FormsModule,
    Message, 
    ButtonModule,
    ToastModule
  ],
  templateUrl: './form-list-filter.component.html',
  styleUrl: './form-list-filter.component.scss'
})
export class FormListFilterComponent implements OnInit {

  public formFilterTask: FormGroup; 
  public listPriority: FormSelectModel[] = [];
  public listStatus: FormSelectModel[] = [];
  public formFilterTaskEmpty: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private todoListApiService: TodoListApiService,
    private formValidation:FormValidationService,
    private todoListStateService: TodoListStateService,
    private msnToast: MessageService,
  ) {
    this.formFilterTask = this.formBuilder.group({
      nameTask: [null, [Validators.minLength(5), Validators.maxLength(70)]],
      idPriority: [null, [Validators.nullValidator]],
      idStatus: [null, [Validators.nullValidator]],
    });
  }

  ngOnInit(): void {
    this.getListPriority();
    this.getListStatus();

    this.todoListStateService.formFilterTaskState$.subscribe((values) => {
      this.formFilterTask.patchValue(values);
    });

  }

  getListPriority() {
    this.todoListApiService.getListPriority.subscribe(( res ) => {
      this.listPriority = res;
    });
  }

  getListStatus() {
    this.todoListApiService.getListStatus.subscribe(( res ) => {
      this.listStatus = res;
    });
  }

  isFieldInvalid(field: string): boolean | undefined {
    return (
      this.formFilterTask.get(field)?.invalid &&
      (this.formFilterTask.get(field)?.dirty || this.formFilterTask.get(field)?.touched)
    );
  }

  getErrorMessage(field: string, labelName?: string): string {
    return this.formValidation.getErrorMessage(this.formFilterTask.get(field), labelName);
  }

  onSubmitFilterTask(values: FormFilterTaskModel) {
    if(!values.nameTask && !values.idPriority && !values.idStatus) {
      this.formFilterTaskEmpty = true;
      return;
    } 
    this.formFilterTaskEmpty = false;

    if(this.formFilterTask.valid) {
      this.todoListStateService.setFormFilterTask(values);
      this.msnToast.add({ severity: 'info', summary: 'Filtro Aplicado', detail: 'Lista de tarefas filtrada' });
    } else {
      this.formFilterTask.markAllAsTouched();
    }
  }

  onClear() {
    this.formFilterTask.reset();
    this.todoListStateService.resetFormFilterTask();
    this.formFilterTaskEmpty = false;
  }

}
