import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsTaskComponent } from './details-task.component';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ListTasksComponent } from '../../list-tasks/list-tasks.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

class MockDynamicDialogConfig {
  data = { registerTask: {
    id: 1743619925041,
    name: "Conteúdo de Variáveis",
    idPriority: 3,
    idStatus: 3,
    dtExpiration: "2025-02-10T03:00:00.000Z",
    responsibleUser: "Ciclano da Silva ",
    dependencie: false,
    yesIdTaskDependencie: 1743619313717,
    description: "Variáveis do tipo LET podem ter seus valores alterados; \nVariáveis do tipo CONST não podem ter seus valores alterados; ",
    }
  };
}

describe('DetailsTaskComponent', () => {
  let component: DetailsTaskComponent;
  let fixture: ComponentFixture<DetailsTaskComponent>;
  let dynamicDialogRefSpy: jasmine.SpyObj<DynamicDialogRef>;

  beforeEach(async () => {

    dynamicDialogRefSpy = jasmine.createSpyObj('DynamicDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [
        DetailsTaskComponent,
        NoopAnimationsModule
      ],
      providers: [
        { provide: DynamicDialogRef, useValue: dynamicDialogRefSpy },
        { provide: DynamicDialogConfig, useClass: MockDynamicDialogConfig },  // Provedor para o DynamicDialogConfig
        ListTasksComponent,
        ConfirmationService,
        MessageService,
        DialogService,
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    spyOn(component['todoListStateService'], 'getTaskId').and.returnValue(
      of({
        id: 1743619313717,
        name: 'Formulários Reativos',
      })
    );
    component.ngOnInit();

    expect(component).toBeTruthy();
  });
});
