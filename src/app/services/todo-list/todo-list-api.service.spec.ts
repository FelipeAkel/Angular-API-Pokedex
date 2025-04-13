import { TestBed } from '@angular/core/testing';

import { TodoListApiService } from './todo-list-api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TodoListApiService', () => {
  let service: TodoListApiService;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ]
    });
    service = TestBed.inject(TodoListApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
