import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Message } from 'primeng/message';
import { DatePickerModule } from 'primeng/datepicker';
import { FluidModule } from 'primeng/fluid';
import { ButtonModule } from 'primeng/button';
import { RadioButton } from 'primeng/radiobutton';
import { FormValidationService, validatorBoolean, validatorDate } from '../../../../services/form-validation.service';
import { distinctUntilChanged, take } from 'rxjs';
import { FormSelectModel, FormTaskModel, ListTasksModel } from '../../../../model/todo-list-model';
import { TodoListStateService } from '../../../../services/todo-list/todo-list-state.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { TodoListApiService } from '../../../../services/todo-list/todo-list-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-create-edit-task',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule, 
    Message, 
    DatePickerModule, 
    FluidModule, 
    ButtonModule, 
    RadioButton,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './form-create-edit-task.component.html',
  styleUrl: './form-create-edit-task.component.scss'
})
export class FormCreateEditTaskComponent implements OnInit {

  @Input() selectedEditTasks!: ListTasksModel;

  public formTask: FormGroup;
  public checked: boolean = false;
  public dtExpiration: Date | undefined;
  public countCaracteresDescription: number = 1000;
  public listTasks: FormSelectModel[] = [];
  public listPriority: FormSelectModel[] = [];
  public listStatus: FormSelectModel[] = [];
  public updateTask: boolean = false;

  constructor(
    private formBilder: FormBuilder,
    private formValidation: FormValidationService,
    private todoListState: TodoListStateService,
    private msnToast: MessageService,
    private todoListApiService: TodoListApiService,
    private router: Router,
  ){
    this.formTask = this.formBilder.group({
      name: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(25)]],
      idPriority: [null, [Validators.required]],
      idStatus: [null, [Validators.required]],
      dtExpiration: [null, [validatorDate()]],
      responsibleUser: [null, [Validators.maxLength(70)]],
      dependencie: [false, [Validators.required, validatorBoolean()]],
      yesIdTaskDependencie: [],
      description: [null, [Validators.maxLength(1000)]],
    });
  };

  ngOnInit(): void {

    this.getListPriority();
    this.getListStatus();

    if(this.selectedEditTasks) {
      this.dtExpiration = this.selectedEditTasks.dtExpiration 
        ? new Date(this.selectedEditTasks.dtExpiration) 
        : undefined;
      this.formTask.patchValue(this.selectedEditTasks);
      this.updateTask = true;
    }
    
    // Caso Dependência mude de valor validações serão alteradas
    this.formTask.controls['dependencie'].valueChanges
      .pipe(distinctUntilChanged())
      .subscribe((value: boolean) => {
        if(value === true){
          this.formTask.get('yesIdTaskDependencie')?.setValidators([Validators.required]);
        } else {
          this.formTask.get('yesIdTaskDependencie')?.clearValidators();
          this.formTask.get('yesIdTaskDependencie')?.reset('', { emitEvent: false });
        }
        
        this.formTask.get('yesIdTaskDependencie')?.updateValueAndValidity({ emitEvent: false });
      });

    this.formTask.controls['description'].valueChanges.subscribe((value: string) => {
      const countDescription = value ? value.length : 0;
      this.countCaracteresDescription = 1000 - countDescription;
    });

    this.onListTasks();
  }

  getListPriority() {
    this.todoListApiService.getListPriority.subscribe(( res ) => {
      this.listPriority = res;
    });
  }

  getListStatus() {
    this.todoListApiService.getListStatus.subscribe(( res ) => {      
      this.listStatus = res
    });
  }

  isFieldInvalid(field: string): boolean | undefined {
    return (
      this.formTask.get(field)?.invalid &&
      (this.formTask.get(field)?.dirty || this.formTask.get(field)?.touched)
    );
  }

  getErrorMessage(field: string, labelName?: string): string {
    return this.formValidation.getErrorMessage(this.formTask.get(field), labelName);
  }

  onSubmitFormTaskCreate(values: FormTaskModel){
    if(this.formTask.valid){
      this.todoListState.setListTasksState(values);
      this.formTask.reset();
      this.msnToast.add({ severity: 'success', summary: 'Tarefa Cadastrada', detail: 'Registro de tarefa foi cadastrado.', life: 4000 });
      this.onListTasks();
    } else {
      this.formTask.markAllAsTouched();
    }
  }

  onSubmitFormTaskEdit(values: FormTaskModel) {
    if(this.formTask.valid){
      this.todoListState.updateTaskState(this.selectedEditTasks.id, values);
      this.msnToast.add({ severity: 'success', summary: 'Tarefa Atualizada', detail: "Registro de tarefa foi atualizado.", life: 4000 });
    } else {
      this.formTask.markAllAsTouched();
    }
  }

  onClear(){
    this.formTask.reset();
  }

  onListTasks() {
    this.todoListState.listTasksState$
      .pipe(take(1))
      .subscribe((values: FormSelectModel[]) => {
        this.listTasks = values;
    });
  }

  routePageListTasks() {
    this.updateTask = false;
    this.router.navigate(['pages/tasks/list-tasks']);
  }

}
