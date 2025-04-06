import { TestBed } from '@angular/core/testing';

import { TodoListApiService } from './todo-list-api.service';

describe('TodoListApiService', () => {
  let service: TodoListApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoListApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
