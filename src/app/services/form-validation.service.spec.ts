import { TestBed } from '@angular/core/testing';

import { FormValidationService, validatorDate, validatorBoolean } from './form-validation.service';
import { FormControl, Validators } from '@angular/forms';




fdescribe('FormValidationService', () => {
  let service: FormValidationService;
  let validacaoDate: any;
  let validacaoBoolean: any;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormValidationService);

    validacaoDate = validatorDate();
    validacaoBoolean = validatorBoolean();

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(`(U) deveria retornar mensagem de erro required`, () => {
    const control = new FormControl('', {validators: [Validators.required]});
    control.markAsTouched();

    let message = service.getErrorMessage(control, 'NomeCampo');
    expect(message).toBe('O campo NomeCampo é obrigatório.');

    message = service.getErrorMessage(control);
    expect(message).toBe('O campo é obrigatório.');
  });

  it(`(U) deveria retornar mensagem de erro minlength`, () => {
    const control = new FormControl('abc', {validators: [Validators.minLength(10)]});
    control.markAsTouched();

    let message = service.getErrorMessage(control, 'NomeCampo');
    expect(message).toBe('O campo NomeCampo precisa ter no mínimo 10 caracteres.');

    message = service.getErrorMessage(control);
    expect(message).toBe('O campo precisa ter no mínimo 10 caracteres.');
  });

  it(`(U) deveria retornar mensagem de erro maxlength`, () => {
    const control = new FormControl('abcdefghijk', {validators: [Validators.maxLength(10)]});
    control.markAsTouched();

    let message = service.getErrorMessage(control, 'NomeCampo');
    expect(message).toBe('O campo NomeCampo pode ter no máximo 10 caracteres.');

    message = service.getErrorMessage(control);
    expect(message).toBe('O campo pode ter no máximo 10 caracteres.');
  });

  it(`(U) deveria retornar mensagem de erro min`, () => {
    const control = new FormControl(5, {validators: [Validators.min(10)]});
    control.markAsTouched();

    const message = service.getErrorMessage(control);
    expect(message).toBe('O valor mínimo permitido é 10.');
  });

  it(`(U) deveria retornar mensagem de erro max`, () => {
    const control = new FormControl(50, {validators: [Validators.max(10)]});
    control.markAsTouched();

    const message = service.getErrorMessage(control);
    expect(message).toBe('O valor máximo permitido é 10.');
  });

  it(`(U) deveria retornar mensagem de erro email`, () => {
    const control = new FormControl('email_invalido', {validators: [Validators.email]});
    control.markAsTouched();

    let message = service.getErrorMessage(control, 'NomeCampo');
    expect(message).toBe('O campo NomeCampo precisa ser um email válido.');

    message = service.getErrorMessage(control);
    expect(message).toBe('O campo precisa ser um email válido.');
  });

  it(`(U) deveria retornar mensagem de erro data inválida`, () => {
    const control = new FormControl('2025-15-60T03:00:00.000Z', {validators: [validatorDate()]});
    control.markAsTouched();

    let message = service.getErrorMessage(control);
    expect(message).toBe('Data inválida.');
    expect(validacaoDate(control)).toEqual({ invalidDate: true });
  });

  it(`(U) deveria retorna null quando o dado é válido, ao executar validatorDate()`, () => {
    const control = new FormControl('2025-04-10T03:00:00.000Z');
    expect(validacaoDate(control)).toBeNull();
  });

  it(`(U) deveria retorna null quando o dado é indefinido, ao executar validatorDate()`, () => {
    const control = new FormControl('');
    expect(validacaoDate(control)).toBeNull();
  });

  it(`(U) deveria retorna mensagem de erro quando não um dado boolean`, () => {
    const control = new FormControl('dado string', {validators: [validatorBoolean()]})
    control.markAsTouched();

    let message = service.getErrorMessage(control);
    expect(message).toBe('O valor dever ser um boolean.');
    expect(validacaoBoolean(control)).toEqual({ invalidBoolean: true });
  });

  it(`(U) deveria retorna null quando o dado é válido, ao executar validatorBoolean()`, () => {
    const control = new FormControl(true);
    expect(validacaoBoolean(control)).toBeNull();
  });

  it(`(U) deve retornar uma string vazia quando não houver erro`, () => {
    const control = new FormControl('validValue');
    const message = service.getErrorMessage(control);
    expect(message).toEqual('');
  });

  it('(U) deveria retornar uma string vazia se o controle for nulo', () => {
    const message = service.getErrorMessage(null);
    expect(message).toBe('');
  });

});
