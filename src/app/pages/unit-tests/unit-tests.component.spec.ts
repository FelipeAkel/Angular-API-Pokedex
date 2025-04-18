import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitTestsComponent } from './unit-tests.component';

fdescribe('UnitTestsComponent', () => {
  let component: UnitTestsComponent;
  let fixture: ComponentFixture<UnitTestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnitTestsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnitTestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
