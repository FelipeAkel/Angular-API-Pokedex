import { TestBed } from '@angular/core/testing';

import { ArchitectureDesignerApiService } from './architecture-designer-api.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { mockArchitectureDesign } from '../../mocks/architecture-design.mock';

describe('ArchitectureDesignerApiService', () => {
  let service: ArchitectureDesignerApiService;
  let httpMock: HttpTestingController;

  const urlRepositoryMain: string = 'https://raw.githubusercontent.com/FelipeAkel/Angular-API-Pokedex/refs/heads/main/';
  const urlDataArchitectureDesign: string = 'src/app/services/architecture-designer/list-architecture.json';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        ArchitectureDesignerApiService
      ]
    });
    service = TestBed.inject(ArchitectureDesignerApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Garante que não há requisições pendentes
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  it(`(U) ao executar getListArchitecture(), deveria recuperar os dados da API via GET`, () => {
    
    service.getListArchitecture.subscribe((values) => {
      expect(values).toEqual(mockArchitectureDesign);
    });

    const req = httpMock.expectOne(
      urlRepositoryMain + urlDataArchitectureDesign
    );

    expect(req.request.method).toBe('GET');
  });

});
