import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { FormSelectModel } from '../../../../model/todo-list-model';
import { TodoListApiService } from '../../../../services/todo-list/todo-list-api.service';
import { CommonModule } from '@angular/common';
import { FormValidationService } from '../../../../services/form-validation.service';

@Component({
  selector: 'app-form-list-filter',
  imports: [
    CommonModule,
    ReactiveFormsModule, 
    FormsModule,
    Message, 
    ButtonModule],
  templateUrl: './form-list-filter.component.html',
  styleUrl: './form-list-filter.component.scss'
})
export class FormListFilterComponent implements OnInit {

  public formFilterTask: FormGroup; 
  public listPriority: FormSelectModel[] = [];
  public listStatus: FormSelectModel[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private todoListApiService: TodoListApiService,
    private formValidation:FormValidationService,
  ) {
    this.formFilterTask = this.formBuilder.group({
      nameTask: ['', [Validators.required]],
      idPriority: [, [Validators.required]],
      idStatus: [, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getListPriority();
    this.getListStatus();
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

  onSubmitFilterTask(values: any) {
    if(this.formFilterTask.valid) {
      console.warn('valido', values);
    } else {
      this.formFilterTask.markAllAsTouched();
    }
  }

  onClear() {
    this.formFilterTask.reset();
  }

}
