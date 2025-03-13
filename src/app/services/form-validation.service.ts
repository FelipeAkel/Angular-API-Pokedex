import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormValidationService {

  getErrorMessage(control: AbstractControl | null, labelName?: string): string {

    if(!control) return '';

    if(control.hasError('required')) {
      return labelName != undefined 
        ? `O campo ${labelName} é obrigatório.` 
        : `O campo é obrigatório.`
    }

    if(control.hasError('minlength')) {
      return labelName != undefined 
        ? `O campo ${labelName} precisa ter no mínimo ${control.errors?.['minlength'].requiredLength} caracteres.`
        : `O campo precisa ter no mínimo ${control.errors?.['minlength'].requiredLength} caracteres.`;
    }

    if(control.hasError('maxlength')) {
      return labelName != undefined 
      ? `O campo ${labelName} pode ter no máximo ${control.errors?.['maxlength'].requiredLength} caracteres.`
      : `O campo pode ter no máximo ${control.errors?.['maxlength'].requiredLength} caracteres.`;
    }

    if(control.hasError('min')) {
      return `O valor mínimo permitido é ${control.errors?.['min'].min}.`;
    }

    if(control.hasError('max')) {
      return `O valor máximo permitido é ${control.errors?.['max'].max}.`;
    }

    if(control.hasError('email')) {
      return labelName != undefined
        ? `O campo ${labelName} precisa ser um email válido.`
        : `O campo precisa ser um email válido.`
    }

    return '';
  }

}
