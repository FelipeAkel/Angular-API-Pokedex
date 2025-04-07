import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FormFilterTaskModel, FormTaskModel } from '../../model/todo-list-model';
import { mockListTasks } from '../../mocks/todo-list.mock';

@Injectable({
  providedIn: 'root'
})
export class TodoListStateService {

  private listTasksState = new BehaviorSubject<any[]>([]); // TODO any
  listTasksState$ = this.listTasksState.asObservable();

  private formFilterTaskState = new BehaviorSubject<any>({});
  formFilterTaskState$ = this.formFilterTaskState.asObservable();

  setListTasksState(values: FormTaskModel): void {
    const newTask = { id: Date.now(), ...values };
    const currentTasks = this.listTasksState.value;
    const updatedTasks = [...currentTasks, newTask];
    this.listTasksState.next(updatedTasks);
  }

  updateTaskState(id: number, values: FormTaskModel) {
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

  setFormFilterTask(values: FormFilterTaskModel): void {
    this.formFilterTaskState.next(values);
  }

  resetFormFilterTask(): void {
    this.formFilterTaskState.next({});
  }

}
