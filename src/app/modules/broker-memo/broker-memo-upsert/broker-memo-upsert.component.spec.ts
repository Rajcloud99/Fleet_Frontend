import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrokerMemoUpsertComponent } from './broker-memo-upsert.component';

describe('BrokerMemoUpsertComponent', () => {
  let component: BrokerMemoUpsertComponent;
  let fixture: ComponentFixture<BrokerMemoUpsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrokerMemoUpsertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrokerMemoUpsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
