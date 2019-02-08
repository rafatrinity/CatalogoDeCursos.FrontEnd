import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaDetalheModalComponent } from './consulta-detalhe-modal.component';

describe('ConsultaDetalheModalComponent', () => {
  let component: ConsultaDetalheModalComponent;
  let fixture: ComponentFixture<ConsultaDetalheModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultaDetalheModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaDetalheModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
