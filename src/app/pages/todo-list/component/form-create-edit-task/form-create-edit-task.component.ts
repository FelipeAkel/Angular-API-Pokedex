import { Component } from '@angular/core';
import { Message } from 'primeng/message';
import { DatePickerModule } from 'primeng/datepicker';
import { FormsModule } from '@angular/forms';
import { FluidModule } from 'primeng/fluid';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-form-create-edit-task',
  imports: [Message, DatePickerModule, FormsModule, FluidModule, ButtonModule],
  templateUrl: './form-create-edit-task.component.html',
  styleUrl: './form-create-edit-task.component.scss'
})
export class FormCreateEditTaskComponent {

  date2: Date | undefined;

}
