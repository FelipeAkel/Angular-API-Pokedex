import { Component } from '@angular/core';
import { Message } from 'primeng/message';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-form-list-filter',
  imports: [Message, ButtonModule],
  templateUrl: './form-list-filter.component.html',
  styleUrl: './form-list-filter.component.scss'
})
export class FormListFilterComponent {

}
