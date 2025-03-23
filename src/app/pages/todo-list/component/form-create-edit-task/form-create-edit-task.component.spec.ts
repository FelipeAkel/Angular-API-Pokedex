import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCreateEditTaskComponent } from './form-create-edit-task.component';

describe('FormCreateEditTaskComponent', () => {
  let component: FormCreateEditTaskComponent;
  let fixture: ComponentFixture<FormCreateEditTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormCreateEditTaskComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormCreateEditTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
