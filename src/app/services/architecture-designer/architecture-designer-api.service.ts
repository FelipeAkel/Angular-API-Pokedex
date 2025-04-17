import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArchitectureDesignerApiService {

  private urlRepositoryMain: string = 'https://raw.githubusercontent.com/FelipeAkel/Angular-API-Pokedex/refs/heads/main/';
  private urlDataArchitectureDesign: string = 'src/app/services/architecture-designer/list-architecture.json';

  constructor(
    private httpClient: HttpClient
  ) { }

  get getListArchitecture(): Observable<any>{
    return this.httpClient.get<any>(this.urlRepositoryMain + this.urlDataArchitectureDesign);
  }

}
