import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoListApiService {

  // TODO - atualizar url
  private urlListPriority: string = 'https://raw.githubusercontent.com/FelipeAkel/Angular-API-Pokedex/refs/heads/feat-todo-list/src/app/services/todo-list/list-priority.json';

  constructor(
    private httpClient: HttpClient,
  ) { }

  get getListPriority(): Observable<any>{
    return this.httpClient.get<any>(this.urlListPriority)
  }

}
