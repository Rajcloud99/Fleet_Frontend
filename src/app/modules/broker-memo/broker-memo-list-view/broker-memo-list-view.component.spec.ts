import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrokerMemoListViewComponent } from './broker-memo-list-view.component';

describe('BrokerMemoListViewComponent', () => {
  let component: BrokerMemoListViewComponent;
  let fixture: ComponentFixture<BrokerMemoListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrokerMemoListViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrokerMemoListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
