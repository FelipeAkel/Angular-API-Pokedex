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

  updateTaskState(id: number, values: FormTaskCreateModel) {
    const currentTasks = this.listTasksState.value;
    const findIndex = currentTasks.findIndex( task => task.id === id );

    if(findIndex !== -1) {
      const updateTasks = [...currentTasks];
      updateTasks[findIndex] = { ...updateTasks[findIndex], ...values };

      this.listTasksState.next(updateTasks);
    }
  }

  deleteTaskState(id: number): void {
    const currentTasks = this.listTasksState.value;
    const updatedTasks = currentTasks.filter( task => task.id !== id);
    this.listTasksState.next(updatedTasks);
  }

  getTaskId(id: number) {
    const currentTasks = this.listTasksState.value;
    const findTask = currentTasks.find( task => task.id === id );
    return findTask;
  }

}
