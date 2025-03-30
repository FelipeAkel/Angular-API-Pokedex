import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Message } from 'primeng/message';
import { DatePickerModule } from 'primeng/datepicker';
import { FluidModule } from 'primeng/fluid';
import { ButtonModule } from 'primeng/button';
import { RadioButton } from 'primeng/radiobutton';
import { FormValidationService, validatorBoolean, validatorDate } from '../../../../services/form-validation.service';
import { distinctUntilChanged } from 'rxjs';
import { FormTaskCreateModel } from '../../../../model/todo-list-model';
import { TodoListStateService } from '../../../../services/todo-list/todo-list-state.service';

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
  ],
  templateUrl: './form-create-edit-task.component.html',
  styleUrl: './form-create-edit-task.component.scss'
})
export class FormCreateEditTaskComponent implements OnInit {

  public formTask: FormGroup;
  public checked: boolean = false;
  public dtExpiration: Date | undefined;
  public countCaracteresDescription: number = 1000;

  constructor(
    private formBilder: FormBuilder,
    private formValidation: FormValidationService,
    private todoListState: TodoListStateService,
  ){
    this.formTask = this.formBilder.group({
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(25)]],
      priority: ['', [Validators.required]],
      status: ['', [Validators.required]],
      dtExpiration: ['', [validatorDate()]],
      responsibleUser: ['', [Validators.maxLength(70)]],
      dependencie: [false, [Validators.required, validatorBoolean()]],
      yesTaskDependencie: [''],
      description: ['', [Validators.maxLength(1000)]],
    });
  };

  ngOnInit(): void {

    // Caso dependencie mude de valor validações serão alteradas
    this.formTask.controls['dependencie'].valueChanges
      .pipe(distinctUntilChanged())
      .subscribe((value: boolean) => {
        if(value === true){
          this.formTask.get('yesTaskDependencie')?.setValidators([Validators.required]);
        } else {
          this.formTask.get('yesTaskDependencie')?.clearValidators();
          this.formTask.get('yesTaskDependencie')?.reset('', { emitEvent: false });
        }
        
        this.formTask.get('yesTaskDependencie')?.updateValueAndValidity({ emitEvent: false });

      });

    this.formTask.controls['description'].valueChanges.subscribe((value: string) => {
      const countDescription = value ? value.length : 0;
      this.countCaracteresDescription = 1000 - countDescription;
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

  onSubmitFormTaskCreate(values: FormTaskCreateModel){

    console.warn('values', values);
    console.warn('form.valid', this.formTask.valid);
    
    
    if(this.formTask.valid){

      this.todoListState.setListTasksState(values);

    } else {
      this.formTask.markAllAsTouched();
    }

  }

  onClear(){
    this.formTask.reset();
  }

}
