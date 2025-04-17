import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchitectureDesignComponent } from './architecture-design.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { mockArchitectureDesign } from '../../mocks/architecture-design.mock';

describe('ArchitectureDesignComponent', () => {
  let component: ArchitectureDesignComponent;
  let fixture: ComponentFixture<ArchitectureDesignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ArchitectureDesignComponent,
        HttpClientTestingModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArchitectureDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it(`(U) ao executar ngOnInit(), deveria executar a getListArchitecture`, () => {
    spyOnProperty(component['architectureService'], 'getListArchitecture', 'get').and.returnValue(
      of(mockArchitectureDesign)
    );
    
    component.ngOnInit();
    
    expect(component.dataArchitectureDesign).toEqual(mockArchitectureDesign);
  });
  
  it(`(U) ao executar getIconClass(), deveria retornar o nome da class`, () => {
    const spinnerDotted = component.getIconClass('pi pi-spin pi-spinner-dotted');
    const fileCheck = component.getIconClass('pi pi-fw pi-file-check');
    const file = component.getIconClass('pi pi-fw pi-file');
    const code = component.getIconClass('pi pi-fw pi-code');
    const sparkles = component.getIconClass('pi pi-fw pi-sparkles');
    const folder = component.getIconClass('pi pi-fw pi-folder');
    const folderOpen = component.getIconClass('pi pi-fw pi-folder-open');
    const returnDefault = component.getIconClass('pi pi-fw pi-times');

    expect(spinnerDotted).toEqual('json-yellon');
    expect(fileCheck).toEqual('file-check-orange');
    expect(file).toEqual('file-blue');
    expect(code).toEqual('code-orange');
    expect(sparkles).toEqual('sparkles-pink');
    expect(folder).toEqual('folder-gray');
    expect(folderOpen).toEqual('folder-open-primary-color');
    expect(returnDefault).toEqual('icon-default');
  });

});
