import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapListViewComponent } from './map-list-view.component';

describe('MapListViewComponent', () => {
  let component: MapListViewComponent;
  let fixture: ComponentFixture<MapListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapListViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
