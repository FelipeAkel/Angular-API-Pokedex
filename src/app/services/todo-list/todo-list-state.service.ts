import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FormTaskCreateModel } from '../../model/todo-list-model';
import { mockListTasks } from '../../mocks/todo-list.mock';

@Injectable({
  providedIn: 'root'
})
export class TodoListStateService {

  private listTasksState = new BehaviorSubject<any[]>([]); // TODO any
  listTasksState$ = this.listTasksState.asObservable();

  setListTasksState(values: FormTaskCreateModel): void {
    const newTask = { id: Date.now(), ...values };
    const currentTasks = this.listTasksState.value;
    const updatedTasks = [...currentTasks, newTask];
    this.listTasksState.next(updatedTasks);
  }

  deleteTaskState(id: number): void {
    const currentTasks = this.listTasksState.value;
    const updatedTasks = currentTasks.filter( task => task.id !== id);
    this.listTasksState.next(updatedTasks);
  }

}
