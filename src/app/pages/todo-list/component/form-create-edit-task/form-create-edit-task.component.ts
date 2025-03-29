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
import { TasksModel } from '../../../../model/todo-list-model';

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
  ){
    this.formTask = this.formBilder.group({
      inName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(25)]],
      inPriority: ['', [Validators.required]],
      inStatus: ['', [Validators.required]],
      inDtExpiration: ['', [validatorDate()]],
      inResponsibleUser: ['', [Validators.maxLength(70)]],
      inDependencie: [false, [Validators.required, validatorBoolean()]],
      inYesTaskDependencie: [''],
      inDescription: ['', [Validators.required, Validators.maxLength(1000)]],
    });
  };

  ngOnInit(): void {

    // Caso inDependencie mude de valor validações serão alteradas
    this.formTask.controls['inDependencie'].valueChanges
      .pipe(distinctUntilChanged())
      .subscribe((value: boolean) => {
        if(value === true){
          this.formTask.get('inYesTaskDependencie')?.setValidators([Validators.required]);
        } else {
          this.formTask.get('inYesTaskDependencie')?.clearValidators();
          this.formTask.get('inYesTaskDependencie')?.reset('', { emitEvent: false });
        }
        
        this.formTask.get('inYesTaskDependencie')?.updateValueAndValidity({ emitEvent: false });

      });

    this.formTask.controls['inDescription'].valueChanges.subscribe((value: string) => {
      const countInDescription = value ? value.length : 0;
      this.countCaracteresDescription = 1000 - countInDescription;
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

  onSubmitFormTask(values: TasksModel){

    console.warn('values', values);
    console.warn('form.valid', this.formTask.valid);
    
    
    if(this.formTask.valid){
    } else {
      this.formTask.markAllAsTouched();
    }

  }

  onClear(){
    this.formTask.reset();
  }

}
