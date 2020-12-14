import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSupplyDialogComponent } from './add-supply-dialog.component';

describe('AddSupplyDialogComponent', () => {
  let component: AddSupplyDialogComponent;
  let fixture: ComponentFixture<AddSupplyDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSupplyDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSupplyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
