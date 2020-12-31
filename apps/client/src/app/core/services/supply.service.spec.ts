import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SupplyService } from './supply.service';

describe('SupplyService', () => {
  let service: SupplyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SupplyService],
    });
    service = TestBed.inject(SupplyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
