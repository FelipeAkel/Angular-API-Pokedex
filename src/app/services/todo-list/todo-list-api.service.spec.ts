import { TestBed } from '@angular/core/testing';

import { TodoListApiService } from './todo-list-api.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { mockPriority, mockStatus } from '../../mocks/todo-list.mock';

describe('TodoListApiService', () => {
  let service: TodoListApiService;
  let httpMock: HttpTestingController;
  const urlRepositoryMain: string = 'https://raw.githubusercontent.com/FelipeAkel/Angular-API-Pokedex/refs/heads/main/';
  const urlListPriority: string = 'src/app/services/todo-list/list-priority.json';
  const urlListStatus: string = 'src/app/services/todo-list/list-status.json';


  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        TodoListApiService
      ]
    });
    service = TestBed.inject(TodoListApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(`(U) ao executar getListPriority(), deveria recuperar os dados da API via GET`, (done) => {
    service.getListPriority.subscribe(values => {
      expect(values).toEqual(mockPriority); // mockStatus
      done();
    });

    const req = httpMock.expectOne(
      urlRepositoryMain + urlListPriority
    );

    expect(req.request.method).toBe('GET');
    req.flush(mockPriority);
  });
  
  it(`(U) ao exeutar getListStatus(), deveia recuperar os dados da API via GET`, (done) => {
    service.getListStatus.subscribe(values => {
      expect(values).toEqual(mockStatus);
      done();
    });

    const req = httpMock.expectOne(
      urlRepositoryMain + urlListStatus
    );

    expect(req.request.method).toBe('GET');
    req.flush(mockStatus);
  });

});
