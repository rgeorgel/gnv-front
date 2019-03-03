import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStationMapPage } from './add-station-map.page';

describe('AddStationMapPage', () => {
  let component: AddStationMapPage;
  let fixture: ComponentFixture<AddStationMapPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddStationMapPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStationMapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
