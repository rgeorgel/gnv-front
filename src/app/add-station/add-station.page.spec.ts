import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStationPage } from './add-station.page';

describe('AddStationPage', () => {
  let component: AddStationPage;
  let fixture: ComponentFixture<AddStationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddStationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
