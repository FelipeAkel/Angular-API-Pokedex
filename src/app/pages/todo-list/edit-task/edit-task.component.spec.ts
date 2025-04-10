import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { EditTaskComponent } from './edit-task.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('EditTaskComponent', () => {
  let component: EditTaskComponent;
  let fixture: ComponentFixture<EditTaskComponent>;

  // Simulando a obtenção de um ID da rota
  const mockActivatedRoute = {
    snapshot: {
      paramMap: {
        get: (key: string) => (key === 'id' ? '1743619265209' : null)
      }
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        EditTaskComponent,
        HttpClientTestingModule
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: mockActivatedRoute
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it(`(U) deve obter o id da rota da página`, () => {
    expect(component.taskId).toBe(1743619265209);
  });

});
