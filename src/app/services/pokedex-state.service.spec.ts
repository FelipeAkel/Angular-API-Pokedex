import { TestBed } from '@angular/core/testing';

import { PokedexStateService } from './pokedex-state.service';

describe('PokedexStateService', () => {
  let service: PokedexStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokedexStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
