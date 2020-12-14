import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIngredientDialogComponent } from './add-ingredient-dialog.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

describe('AddIngredientDialogComponent', () => {
  let component: AddIngredientDialogComponent;
  let fixture: ComponentFixture<AddIngredientDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      providers: [
        FormBuilder,
        {
          provide: MatDialogRef,
          useValue: { close: () => console.log('hey') },
        },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
      declarations: [AddIngredientDialogComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddIngredientDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call close when calling onSubmit', () => {
    const value = { price: 2, name: 'hey', weight: 3 };
    component.checkoutForm.setValue(value);
    const spy = spyOn(TestBed.inject(MatDialogRef), 'close');
    component.onSubmit();
    expect(spy).toBeCalledWith(value);
  });
});
