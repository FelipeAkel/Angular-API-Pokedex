import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FormSelectModel } from '../../model/todo-list-model';

@Injectable({
  providedIn: 'root'
})
export class TodoListApiService {

  // TODO - atualizar url
  // private urlGeral: string = '';
  private urlListPriority: string = 'https://raw.githubusercontent.com/FelipeAkel/Angular-API-Pokedex/refs/heads/feat-todo-list/src/app/services/todo-list/list-priority.json';
  private urlListStatus: string = 'https://raw.githubusercontent.com/FelipeAkel/Angular-API-Pokedex/refs/heads/feat-todo-list/src/app/services/todo-list/list-status.json';

  constructor(
    private httpClient: HttpClient,
  ) { }

  get getListPriority(): Observable<any>{
    return this.httpClient.get<FormSelectModel>(this.urlListPriority)
  }

  get getListStatus(): Observable<any>{
    return this.httpClient.get<FormSelectModel>(this.urlListStatus)
  }

}
