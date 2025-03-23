import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormListFilterComponent } from './form-list-filter.component';

describe('FormListFilterComponent', () => {
  let component: FormListFilterComponent;
  let fixture: ComponentFixture<FormListFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormListFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormListFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
