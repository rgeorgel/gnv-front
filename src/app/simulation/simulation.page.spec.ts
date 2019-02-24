import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulationPage } from './simulation.page';

describe('SimulationPage', () => {
  let component: SimulationPage;
  let fixture: ComponentFixture<SimulationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimulationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimulationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
