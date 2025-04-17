import { TestBed } from '@angular/core/testing';

import { ArchitectureDesignerApiService } from './architecture-designer-api.service';

describe('ArchitectureDesignerApiService', () => {
  let service: ArchitectureDesignerApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArchitectureDesignerApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
