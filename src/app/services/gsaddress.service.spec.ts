import { TestBed } from '@angular/core/testing';

import { GsaddressService } from './gsaddress.service';

describe('GsaddressService', () => {
  let service: GsaddressService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GsaddressService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
