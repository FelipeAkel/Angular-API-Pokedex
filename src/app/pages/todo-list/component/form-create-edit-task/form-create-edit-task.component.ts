import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Message } from 'primeng/message';
import { DatePickerModule } from 'primeng/datepicker';
import { FluidModule } from 'primeng/fluid';
import { ButtonModule } from 'primeng/button';
import { RadioButton } from 'primeng/radiobutton';

@Component({
  selector: 'app-form-create-edit-task',
  imports: [Message, DatePickerModule, FormsModule, FluidModule, ButtonModule, RadioButton],
  templateUrl: './form-create-edit-task.component.html',
  styleUrl: './form-create-edit-task.component.scss'
})
export class FormCreateEditTaskComponent {

  public checked: boolean = false;
  public dtExpiration: Date | undefined;

}
