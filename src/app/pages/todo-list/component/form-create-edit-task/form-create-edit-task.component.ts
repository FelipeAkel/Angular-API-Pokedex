import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Message } from 'primeng/message';
import { DatePickerModule } from 'primeng/datepicker';
import { FluidModule } from 'primeng/fluid';
import { ButtonModule } from 'primeng/button';
import { RadioButton } from 'primeng/radiobutton';
import { FormValidationService } from '../../../../services/form-validation.service';
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

  constructor(
    private formBilder: FormBuilder,
    private formValidation: FormValidationService,
  ){
    this.formTask = this.formBilder.group({
      inName: ['', [Validators.required]],
      inPriority: ['', [Validators.required]],
      inStatus: ['', [Validators.required]],
      inDtExpiration: ['', [Validators.required]],
      inResponsibleUser: ['', [Validators.required]],
      inDependencie: [false, [Validators.required]],
      inYesTaskDependencie: [''],
      inDescription: ['', [Validators.required]],
    });
  };

  ngOnInit(): void {

    // Caso inDependencie mude de valor validações serão adicionadas/excluidas
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

    if(this.formTask.valid){
      console.warn('values', values);
      console.warn('form.valid', this.formTask.valid);
    } else {
      this.formTask.markAllAsTouched();
    }

  }

}
