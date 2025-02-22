import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokedexFilterComponent } from './pokedex-filter.component';

describe('PokedexFilterComponent', () => {
  let component: PokedexFilterComponent;
  let fixture: ComponentFixture<PokedexFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokedexFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokedexFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
