import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FormTaskCreateModel } from '../../model/todo-list-model';

@Injectable({
  providedIn: 'root'
})
export class TodoListStateService {

  private listTasksState = new BehaviorSubject<any[]>([]); // TODO any
  listTasksState$ = this.listTasksState.asObservable();

  setListTasksState(values: FormTaskCreateModel): void {
    const newTask = { id: Date.now(), ...values };
    const currentTasks = this.listTasksState.value;
    const updateTasks = [...currentTasks, newTask];
    this.listTasksState.next(updateTasks);
  }

}
