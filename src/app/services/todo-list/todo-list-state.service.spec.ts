import { TestBed } from '@angular/core/testing';

import { TodoListStateService } from './todo-list-state.service';

describe('TodoListStateService', () => {
  let service: TodoListStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoListStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
